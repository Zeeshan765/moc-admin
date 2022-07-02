import React, { useState, useEffect } from 'react';
import apiService from '../../services/ApiService';
import { toast } from 'react-toastify';
import Pagination from '@material-ui/lab/Pagination';
import { Modal, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './productList.css';
import { EditOutlined, DeleteOutlineOutlined } from '@material-ui/icons';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: "absolute",
    // bottom: theme.spacing(2),
    right: theme.spacing(5),
    margin: theme.spacing(-1),
    top: theme.spacing(22),
    // bottom: theme.spacing(-16),
    backgroundColor: "#b04edd",
    "&:hover":{
      backgroundColor: "#8738ab",
    }
  },
}));

const ProductList = (props) => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const page = props.match.params.page ? props.match.params.page : 1;
  const [total, setTotal] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);
  const [keyword, setKeyword] = useState('');
// const[company,setCompany]=useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sortorder, setSortorder] = useState('ASC');

  //id of the user to be deleted
  const [id, setId] = useState('');

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
    console.log('view');
    setOpen(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://moc-server.herokuapp.com/api/products/search/${keyword}`
      );
      if (keyword.length > 0) {
        setProducts(res.data);
      }
    };
    // if (keyword.length === 0 || keyword.length > 2) fetchData();
    fetchData();
  }, [keyword]);

  //Sorting the Table Head
  const sorting = (col) => {
    if (sortorder === 'ASC') {
      const sorted = [...products].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      setProducts(sorted);
      setSortorder('DSC');
    }

    if (sortorder === 'DSC') {
      const sorted = [...products].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      setProducts(sorted);
      setSortorder('ASC');
    }
  };

  return (
    <>
      <div className='productList'>
        <div className='first-component'>
          <Fab
            color='primary'
            aria-label='add'
            size='large'
            className={classes.addBtn}
            onClick={handleadd}
          >
            <AddIcon />
          </Fab>

          <p className='usersText'>Product List</p>

          <input
            className='searchProds'
            placeholder='Search...'
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />
        </div>
        <table className='data-table'>
          <thead>
            <tr>
              <th>Product Id</th>
              <th onClick={() => sorting('name')}>Product Name <ImportExportIcon className='sortIcon' /> </th>
              <th onClick={() => sorting('price')}>Price <ImportExportIcon className='sortIcon' /></th>
              <th onClick={() => sorting('company')}>Brand <ImportExportIcon className='sortIcon' /> </th>
              <th onClick={() => sorting('category')}>Category <ImportExportIcon className='sortIcon' /></th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={index}>
                <td>{p._id}</td>
                <td>{p.name}</td>
                <td> Rs {p.price}</td>
                <td>{p.company}</td>
                <td>{p.category}</td>
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
          className='paginationProductList'
          variant='outlined'
          shape='circlular'
          color='secondary'
          size='large'
          onChange={(e, value) => {
            console.log(value);
            props.history.push('/products/' + value);
          }}
        />{' '}
        <p className='paginationTextUserList'>
          Showing <b>{(page - 1) * perPage}</b> -{' '}
          <b>{(page - 1) * perPage + products.length}</b> of <b>{total}</b>{' '}
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
                  .deleteUser('/api/products/' + id)
                  .then((data) => {
                    toast.success('Product Deleted Successfully', {
                      theme: 'colored',
                      position: toast.POSITION.TOP_LEFT,
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
