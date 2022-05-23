import React from 'react';
import './userList.css';
import { toast } from 'react-toastify';
import Pagination from '@material-ui/lab/Pagination';

import { DeleteOutlineOutlined } from '@material-ui/icons';

//import { Link } from 'react-router-dom';
import { useState } from 'react';
import apiService from '../../services/ApiService';

const UserList = (props) => {
  const [user, setUser] = useState([]);
  const page = props.match.params.page ? props.match.params.page : 1;
  const [total, setTotal] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);


  console.log(user);
  const getData = () => {
    apiService.getUsers(page, perPage).then((data) => {
      setUser(data.data.users1);
      setTotal(data.data.total);

    });
  };
  React.useEffect(getData, [page, perPage]);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  return (
    <>
      <div className='productList'>
        <p className='usersText'>Users List</p>
        <table className='data-table'>
          <thead>
            <tr>
              <th>User Id</th>
              <th>User Name</th>
              <th>Email</th>
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
                    onClick={(e) => {
                      apiService
                        .deleteUser('/api/user/' + p._id)
                        .then((data) => {
                          toast.success('User Deleted Successfully', {
                            theme: "colored",
                          });
                          console.log(p._id);

                          console.log(data);
                          console.log(getData());
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Delete
                  </DeleteOutlineOutlined>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          count={Math.ceil(total / perPage)}
          className="paginationUserList"
          variant='outlined'
          shape='circlular'
          color="secondary"
           size="large"
          onChange={(e, value) => {
            console.log(value);
            props.history.push('/users/' + value);
          }}
        />{' '}
        <p className="paginationTextUserList">
        Showing <b>{(page - 1) * perPage}</b> -{' '}
        <b>{(page - 1) * perPage + user.length}</b> of <b>{total}</b> results
        </p>
      </div>
    </>
  );
};

export default UserList;
