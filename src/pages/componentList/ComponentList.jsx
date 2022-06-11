import React, { useState } from "react";
import apiService from "../../services/ApiService";
import { toast } from "react-toastify";
import Pagination from '@material-ui/lab/Pagination';
import { Modal, Box } from "@material-ui/core";

import "./componentList.css";
import { DeleteOutlineOutlined, EditOutlined } from "@material-ui/icons";
const ComponentList = (props) => {
  const [components, setComponents] = useState([]);
  const page = props.match.params.page ? props.match.params.page : 1;
  const [total, setTotal] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const getData = () => {
    apiService.getComponents(page, perPage).then((data) => {
      setComponents(data.data.components);
      setTotal(data.data.total);

    });
  };
  React.useEffect(getData, [page, perPage]);

  const handleadd = () => {
    window.location.href = "/newcomponent";
  };
  function handleView() {
    console.log("view");
    setOpen(true);
  }


  return (
    <>
      <div className="componentList">
        <button className="btn-add" onClick={handleadd}>
          Create
        </button>
        <p className='usersText'>Components List</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Component Id</th>
              <th>Component Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {components.map((c, index) => (
              <tr key={index}>
                <td>{c._id}</td>
                <td>{c.name}</td>
                <td>{c.price}</td>
                <td>
                  <EditOutlined
                    className='ActionIconEdit'
                    onClick={(e) => {
                      console.log("navigate to update");
                      props.history.push("/component/" + c._id);
                    }}
                  >
                    Edit
                  </EditOutlined>
                  <DeleteOutlineOutlined
                    className='ActionIconDelete'
                    onClick={() => {
                      handleView();
                      setId(c._id);
                      
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
          className="pagination"
          variant='outlined'
          shape='circular'
          color="secondary"
           size="large"
          onChange={(e, value) => {
            console.log(value);
            props.history.push('/components/' + value);
          }}
        />{' '}
        <p className="paginationTextUserList">
        Showing <b>{(page - 1) * perPage}</b> -{' '}
        <b>{(page - 1) * perPage + components.length}</b> of <b>{total}</b> results
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
                        .deleteUser('/api/components/' +id)
                        .then((data) => {
                          toast.success('Component Deleted Successfully', {
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
    </>
  );
};

export default ComponentList;
