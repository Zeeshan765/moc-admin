import React, { useState } from 'react';
import apiService from '../../services/ApiService';
import { toast } from 'react-toastify';
import Pagination from '@material-ui/lab/Pagination';
import { Modal, Box } from "@material-ui/core";

import './productList.css';
import { EditOutlined, DeleteOutlineOutlined } from '@material-ui/icons';
const ProductList = (props) => {
  const [products, setProducts] = useState([]);
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
    apiService.getProducts(page, perPage).then((data) => {
      setProducts(data.data.products);

      setTotal(data.data.total);
    });
  };
  React.useEffect(getData, [page, perPage]);

  const handleadd = () => {
    window.location.href = '/newproduct';
  };

  function handleView() {
    console.log("view");
    setOpen(true);
  }

  return (
    <>
      <div className='productList'>
        <button className='btn-add' onClick={handleadd}>
          Create
        </button>
        <p className='usersText'>Products List</p>
        <table className='data-table'>
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={index}>
                <td>{p._id}</td>
                <td>{p.name}</td>
                <td>{p.price} pkr</td>
                <td>
                  <EditOutlined
                   className='ActionIconEdit'
                    onClick={(e) => {
                      console.log('navigate to update');
                      props.history.push('/product/' + p._id);
                    }}
                  >
                    Edit
                  </EditOutlined>
                  <DeleteOutlineOutlined
                    className='ActionIconDelete'
                    onClick={() => {
                      handleView();
                      setId(p._id);
                      
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
          className="paginationProductList"
          variant='outlined'
          shape='circlular'
          color="secondary"
           size="large"
          onChange={(e, value) => {
            console.log(value);
            props.history.push('/products/' + value);
          }}
        />{' '}
        <p className="paginationTextUserList">
        Showing <b>{(page - 1) * perPage}</b> -{' '}
        <b>{(page - 1) * perPage + products.length}</b> of <b>{total}</b> results
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
                        .deleteUser('/api/products/' +id)
                        .then((data) => {
                          toast.success('Product Deleted Successfully', {
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

export default ProductList;
