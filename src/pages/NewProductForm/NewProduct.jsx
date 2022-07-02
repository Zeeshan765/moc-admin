import React, { useState } from 'react';
import apiService from '../../services/ApiService';
import { toast } from 'react-toastify';
import './newProduct.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const NewProduct = (props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [info1, setinfo1] = useState('');
  const [info2, setinfo2] = useState('');
  const [info3, setinfo3] = useState('');
  const [info4, setinfo4] = useState('');
  const [nameerror, setNameerror] = useState(false);
  const [deserror, setDeserror] = useState(false);
  const [info1error, setinfo1error] = useState(false);
  const [info2error, setinfo2error] = useState(false);
  const [info3error, setinfo3error] = useState(false);
  const [info4error, setinfo4error] = useState(false);
  const [comperror, setComperror] = useState(false);


  // console.log({
  //   name,
  //   price,
  //   description,
  //   company,
  //   category,
  //   image,
  //   info1,
  //   info2,
  //   info3,
  //   info4,
  // });

  const handleback = () => {
    props.history.push('/products');
  };

  //Handle Create Function
  const handlecreate = (e) => {
    e.preventDefault();
    if (
      name === '' ||
      price === '' ||
      description === '' ||
      company === '' ||
      category === '' ||
      image === '' ||
      info1 === '' ||
      info2 === '' ||
      info3 === '' ||
      info4 === ''
    ) {
      // setError(true);
      toast.error('Please fill all required fields', {
        position: toast.POSITION.TOP_LEFT,
        theme: 'colored',
      });
    } else {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('company', company);
      formData.append('category', category);
      formData.append('image', image);
      formData.append('info1', info1);
      formData.append('info2', info2);
      formData.append('info3', info3);
      formData.append('info4', info4);
      apiService
        .post('/api/products', formData)
        .then((data) => {
          toast.success('Product Add successfully', {
            position: toast.POSITION.TOP_LEFT,
            theme: 'colored',
          });
          console.log(data);
          props.history.push('/products');
        })
        .catch((error) => {
          console.log(error.message);
          toast.error(error.response.data, {
            position: toast.POSITION.TOP_LEFT,
            theme: 'colored',
          });
        });
    }
  };

  //Us
  const nameHandler = (e) => {
    let item = e.target.value;
    if (item.length < 3 || item.length > 20) {
      setNameerror(true);
    } else {
      setNameerror(false);
    }
    setName(item);
  };

  //Description Handler
  const descriptionHandler = (e) => {
    let item = e.target.value;
    if (item.length < 3 || item.length > 200) {
      setDeserror(true);
    } else {
      setDeserror(false);
    }
    setDescription(item);
  };
  //Company Handler
  const companyHandler = (e) => {
    let item = e.target.value;
    if (item.length < 3 || item.length > 20) {
      setComperror(true);
    } else {
      setComperror(false);
    }
    setCompany(item);
  };
  //Info1 Handler
  const info1Handler = (e) => {
    let item = e.target.value;
    if (item.length < 3 || item.length > 20) {
      setinfo1error(true);
    } else {
      setinfo1error(false);
    }
    setinfo1(item);
  };
  //Info2 Handler
  const info2Handler = (e) => {
    let item = e.target.value;
    if (item.length < 3 || item.length > 20) {
      setinfo2error(true);
    } else {
      setinfo2error(false);
    }
    setinfo2(item);
  };
  //Info3 Handler
  const info3Handler = (e) => {
    let item = e.target.value;
    if (item.length < 3 || item.length > 20) {
      setinfo3error(true);
    } else {
      setinfo3error(false);
    }
    setinfo3(item);
  };
  //Info4 Handler
  const info4Handler = (e) => {
    let item = e.target.value;
    if (item.length < 3 || item.length > 20) {
      setinfo4error(true);
    } else {
      setinfo4error(false);
    }
    setinfo4(item);
  };

  return (
    <div className='newProduct'>
      <ArrowBackIcon
        className='backbtnNewProd'
        size='large'
        onClick={handleback}
      />
      <h1 className='addProductTitle'>Create Product</h1>
      <form className='addProductForm'>
        <div className='addProductItem'>
          <label>Product Name</label>
          <input
            type='text'
            placeholder='Enter Product Name'
            onChange={nameHandler}
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}
          />
          {nameerror ? (
            <span className='error-handler'>
              Product Name must be greater than 3 and less than 20 characters
            </span>
          ) : (
            ''
          )}
        </div>
        <div
          className='addProductItem'
          style={{ marginLeft: '270px', marginRight: '30px' }}
        >
          <label>Price</label>
          <input
            type='text'
            placeholder='Enter Product Price'
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>

        <div className='addProductItem'>
          <label>Info#1</label>
          <input
            type='text'
            placeholder='Enter Info#1'
            onChange={info1Handler}
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}
          />
          {info1error ? (
            <span className='error-handler'>
              Info1 must be greater than 3 and less than 20 characters
            </span>
          ) : (
            ''
          )}
        </div>
        <div
          className='addProductItem'
          style={{ marginLeft: '270px', marginRight: '30px' }}
        >
          <label>Info#2</label>
          <input
            type='text'
            placeholder='Enter Info#2'
            onChange={info2Handler}
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}
          />
          {info2error ? (
            <span className='error-handler'>
              Info2 must be greater than 3 and less than 20 characters
            </span>
          ) : (
            ''
          )}
        </div>

        <div className='addProductItem'>
          <label>Info#3</label>
          <input
            type='text'
            placeholder='Enter Info#3'
            onChange={info3Handler}
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}
          />
          {info3error ? (
            <span className='error-handler'>
              Info3 must be greater than 3 and less than 20 characters
            </span>
          ) : (
            ''
          )}
        </div>

        <div
          className='addProductItem'
          style={{ marginLeft: '270px', marginRight: '30px' }}
        >
          <label>Info#4</label>
          <input
            type='text'
            placeholder='Enter Info#4'
            onChange={info4Handler}
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}
          />
          {info4error ? (
            <span className='error-handler'>
              Info4 must be greater than 3 and less than 20 characters
            </span>
          ) : (
            ''
          )}
        </div>

        <div className='addProductItem' style={{ marginRight: '270px' }}>
          <label>Description</label>
          <textarea
            className='textfield'
            type='text'
            placeholder='Enter Product Description'
            onChange={descriptionHandler}
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}
          />
          {deserror ? (
            <span className='error-handler'>
              Description must be greater than 3 and less than 200 characters
            </span>
          ) : (
            ''
          )}
        </div>
        <div className='addProductItem' style={{ marginRight: '70px' }}>
          <label>Company</label>
          <input
            type='text'
            placeholder='Enter Company Name '
            onChange={companyHandler}
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}
          />
          {comperror ? (
            <span className='error-handler'>
              Company Name must be greater than 3 and less than 20 characters
            </span>
          ) : (
            ''
          )}
        </div>
        <div className='addProductItem'>
          <label>Category</label>
          <select
            name='category'
            id='category'
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option disabled selected>
              Select Category
            </option>
            <option value='low budget'>Low budget</option>
            <option value='med budget'>Medium budget</option>
            <option value='high budget'>High budget</option>
            <option value='Keyboard'>Keyboard</option>
            <option value='Mouse'>Mouse</option>
            <option value='controller'>controller</option>
            <option value='Monitor'>Monitor</option>
            <option value='Headphone'>Headphone</option>
            <option value='speaker'>speaker</option>
            <option value='Mic'>Mic</option>
          </select>
        </div>
        <div className='addProductItem'>
          <label>Image</label>
          <input
            type='file'
            id='file'
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <button className='addProductButton' onClick={handlecreate}>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
