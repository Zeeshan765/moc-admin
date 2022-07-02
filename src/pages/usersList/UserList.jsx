import React, { useEffect } from 'react';
import './userList.css';
import { toast } from 'react-toastify';
import Pagination from '@material-ui/lab/Pagination';
import { Modal, Box } from '@material-ui/core';
import { DeleteOutlineOutlined } from '@material-ui/icons';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import axios from 'axios';

import { useState } from 'react';
import apiService from '../../services/ApiService';
import {
 
  Search,
} from "@material-ui/icons";
const UserList = (props) => {
  const [user, setUser] = useState([]);
  const page = props.match.params.page ? props.match.params.page : 1;
  const [total, setTotal] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //id of the user to be deleted
  const [id, setId] = useState('');
  const [keyword, setKeyword] = useState('');
  const [sortorder, setSortorder] = useState('ASC');

  console.log(id);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  console.log(user);
  const getData = () => {
    apiService.getUsers(page, perPage).then((data) => {
      setUser(data.data.users1);
      setTotal(data.data.total);
    });
  };
  React.useEffect(getData, [page, perPage]);

  function handleView() {
    console.log('view');
    setOpen(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://moc-server.herokuapp.com/api/user/search/${keyword}`
      );
      if (keyword.length > 0) {
        setUser(res.data);
      }
    };
    // if (keyword.length === 0 || keyword.length > 2) fetchData();
    fetchData();
  }, [keyword]);

  //Sorting the Table Head
  const sorting = (col) => {
    if (sortorder === 'ASC') {
      const sorted = [...user].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setUser(sorted);
      setSortorder('DSC');
    }

    if (sortorder === 'DSC') {
      const sorted = [...user].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setUser(sorted);
      setSortorder('ASC');
    }
  };

  return (
    <>
      <div className='productList'>
        <p className='usersText'>Users List</p>
        <input
          className='search1'
          placeholder='Search...'
          onChange={(e) => setKeyword(e.target.value.toLowerCase())}
        />

        <table className='data-table'>
          <thead>
            <tr>
              <th>User Id</th>
              <th  onClick={() => sorting('name')}>User Name <ImportExportIcon className='sortIcon' /> </th>
              <th onClick={() => sorting('email')}>Email <ImportExportIcon className='sortIcon' /></th>
              <th>Phone No </th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((p, index) => (
              <tr key={index}>
                <td>{p._id}</td>

                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.phone}</td>

                <td>
                  <DeleteOutlineOutlined
                    className='ActionIconDelete'
                    onClick={() => {
                      handleView();
                      setId(p._id);
                    }}
                    // onClick={(e) => {
                    //   apiService
                    //     .deleteUser('/api/user/' + p._id)
                    //     .then((data) => {
                    //       toast.success('User Deleted Successfully', {
                    //         theme: "colored",
                    //       });
                    //       console.log(p._id);

                    //       console.log(data);
                    //       console.log(getData());
                    //     })
                    //     .catch((err) => {
                    //       console.log(err);
                    //     });
                    // }}
                  >
                    Delete
                  </DeleteOutlineOutlined>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <Pagination
            count={Math.ceil(total / perPage)}
            className='paginationUserList'
            variant='outlined'
            shape='circlular'
            color='secondary'
            size='large'
            onChange={(e, value) => {
              console.log(value);
              props.history.push('/users/' + value);
            }}
          />{' '}
          <p className='paginationTextUserList'>
            Showing <b>{(page - 1) * perPage}</b> -{' '}
            <b>{(page - 1) * perPage + user.length}</b> of <b>{total}</b>{' '}
            results
          </p>
        </div>

        <Modal
          // className="modal"
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <h2>Are you Sure you want to delete ?</h2>
            <div className='btn-group'>
              <button className='btn-style' onClick={handleClose}>
                No
              </button>
              <button
                className='btn-style'
                onClick={(e) => {
                  apiService
                    .deleteUser('/api/user/' + id)
                    .then((data) => {
                      toast.success('User Deleted Successfully', {
                        theme: 'colored',
                        position: 'top-left',
                      });
                      console.log(id);

                      console.log(data);
                      console.log(getData());
                      setOpen(false);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Yes
              </button>
            </div>
          </Box>
        </Modal>

        {/* Chatmodel */}
      </div>
    </>
  );
};

export default UserList;
