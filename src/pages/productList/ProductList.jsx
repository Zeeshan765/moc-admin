import React, { useState } from 'react';
import apiService from '../../services/ApiService';
import { toast } from 'react-toastify';
import Pagination from '@material-ui/lab/Pagination';
import './productList.css';
import { EditOutlined, DeleteOutlineOutlined } from '@material-ui/icons';
const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const page = props.match.params.page ? props.match.params.page : 1;
  const [total, setTotal] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);

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
                    onClick={(e) => {
                      apiService
                        .deleteProduct('/api/products/' + p._id)
                        .then((data) => {
                          toast.success('Product Deleted Successfully', {
                            theme: 'colored',
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
    </>
  );
};

export default ProductList;
