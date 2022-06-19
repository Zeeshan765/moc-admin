import React from 'react';
import './userList.css';
import { toast } from 'react-toastify';
import Pagination from '@material-ui/lab/Pagination';
import { Modal, Box } from "@material-ui/core";
import {  DeleteOutlineOutlined } from '@material-ui/icons';
import { ChatBubbleOutlineOutlined } from '@material-ui/icons';
import Chat from '../../components/Chat/Chat';  

//import { Link } from 'react-router-dom';
import { useState } from 'react';
import apiService from '../../services/ApiService';

const UserList = (props) => {
  const [user, setUser] = useState([]);
  const page = props.match.params.page ? props.match.params.page : 1;
  const [total, setTotal] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);

  const [open, setOpen] = React.useState(false);
  const [Chatopen, setChatOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChatClose = () => setChatOpen(false);
  //id of the user to be deleted
  const [id, setId] = useState("");

console.log(id);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
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

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };


  function handleView() {
    console.log("view");
    setOpen(true);
  }
  function handleChat() {
    console.log("view");
    setChatOpen(true);
    console.log(id);
  }
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
                
                <td>{p._id} 
                
                </td>
                

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

                  <ChatBubbleOutlineOutlined
                    className='ActionIconChat'
                    onClick={() => {
                      handleChat();
                     
                      
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
                    Chat
                  </ChatBubbleOutlineOutlined>
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
      <Modal
        // className="modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <h2>Are you Sure you want to delete ?</h2>
          <div className='btn-group'>
          <button className="btn-style" onClick={handleClose}>No</button>
          <button className="btn-style" 
             onClick={(e) => {
                      apiService
                        .deleteUser('/api/user/' +id)
                        .then((data) => {
                          toast.success('User Deleted Successfully', {
                            theme: "colored",
                            position: "top-left",
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

      <Modal
        // className="modal"
        open={Chatopen}
        onClose={handleChatClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Chat id = {id} />
          <div className='btn-group'>
          <button className="btn-style" onClick={handleChatClose}>Close</button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UserList;
