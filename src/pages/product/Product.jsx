import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./product.css";
import apiService from "../../services/ApiService";
import { toast } from "react-toastify";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
//import Chart from '../../components/chart/Chart';

const Product = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [info1, setinfo1] = useState("");
  const [info2, setinfo2] = useState("");
  const [info3, setinfo3] = useState("");
  const [info4, setinfo4] = useState("");
  const [image1, setImage1] = useState("");
  const [nameerror, setNameerror] = useState(false);
  const [deserror, setDeserror] = useState(false);
  const [info1error, setinfo1error] = useState(false);
  const [info2error, setinfo2error] = useState(false);
  const [info3error, setinfo3error] = useState(false);
  const [info4error, setinfo4error] = useState(false);
  const [comperror, setComperror] = useState(false);

  //get that exsisting product

  const id = props.match.params.id;
  //console.log(id);
  React.useEffect(() => {
    apiService.get("/api/products/find/admin/" + id).then((res) => {
      //console.log(res.data);
      setName(res.data.name);
      setPrice(res.data.price);
      setDescription(res.data.description);
      setCompany(res.data.company);
      setCategory(res.data.category);
      setImage1(res.data.picture);
      setinfo1(res.data.info1);
      setinfo2(res.data.info2);
      setinfo3(res.data.info3);
      setinfo4(res.data.info4);
    });
  }, []);

  //Handle Create Function
  const handlecreate = (e) => {
    e.preventDefault();


    if (
      name === '' ||
      price === '' ||
      description === '' ||
      company === '' ||
      category === '' ||
      // image === '' ||
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
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("company", company);
    formData.append("image", image);
    formData.append("info1", info1);
    formData.append("info2", info2);
    formData.append("info3", info3);
    formData.append("info4", info4);
    apiService
      .put("/api/products/" + id, formData)
      .then((data) => {
        toast.success("Product update successfully", {
          position: toast.POSITION.TOP_LEFT,
          theme: "colored",
        });
        console.log(data);
        props.history.push("/products");
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  };

  //Handle Back
  const handleback = () => {
    props.history.push("/products");
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
    <>
      <div className="product">
        <div className="productTitleContainer">
          <ArrowBackIcon
            className="backbtn"
            size="large"
            onClick={handleback}
          />

          <h1 className="editCompTitle"> Update Product</h1>
        </div>

        <div className="productBottom">
          <form className="updateProductForm">
            <div className="addProductItem">
              <label>Product Name</label>
              <input
                type="text"
                value={name}
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
              {/* <span>Invalid</span> */}

            </div>
            <div
              className="addProductItem"
              style={{ marginLeft: "190px", marginRight: "190px" }}
            >
              <label>Price</label>
              <input
                type="text"
                placeholder="Enter Product Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="addProductItem">
              <label>Info#1</label>
              <input
                type="text"
                placeholder="Enter Info#1"
                value={info1}
                onChange={nameHandler}
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
              className="addProductItem"
              style={{ marginLeft: "190px", marginRight: "190px" }}
            >
              <label>Info#2</label>
              <input
                type="text"
                placeholder="Enter Info#2"
                value={info2}
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
            <div className="addProductItem">
              <label>Info#3</label>
              <input
                type="text"
                placeholder="Enter Info#3"
                value={info3}
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
              className="addProductItem"
              style={{ marginLeft: "190px", marginRight: "190px" }}
            >
              <label>Info#4</label>
              <input
                type="text"
                placeholder="Enter Info#4"
                value={info4}
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

            <div className="addProductItem">
              <label>Company</label>
              <input
                type="text"
                placeholder="Enter Company Name"
                value={company}
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
            <div
              className="addProductItem"
              style={{ marginLeft: "190px", marginRight: "190px" }}
            >
              <label>Description</label>
              <textarea
                className="textfield"
                type="text"
                placeholder="Enter Product Description"
                value={description}
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
            <div className="addProductItem">
              <label>Category</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {/* <option disabled selected>
                  Select Category
                </option> */}
                <option value="low budget">Low budget</option>
                <option value="med budget">Medium budget</option>
                <option value="high budget">High budget</option>
                <option value="Keyboard">Keyboard</option>
                <option value="Mouse">Mouse</option>
                <option value="controller">controller</option>
                <option value="Monitor">Monitor</option>
                <option value="Headphone">Headphone</option>
                <option value="speaker">speaker</option>
                <option value="Mic">Mic</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Image</label>
              <input
                type="file"
                id="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>

            <div className="addProductItem">
              <label>Current:</label>
              <img src={image1} alt="" />
            </div>
            <button
              className="addProductButton"
              onClick={handlecreate}
              // onClick={(e) => {
              //   apiService
              //     .put('/api/products/' + id, formData)
              //     .then((data) => {
              //       console.log(data);
              //       //window.location.href = '/products';
              //       props.history.push('/products');
              //     })
              //     .catch((err) => {
              //       console.log(err);
              //     });
              // }}
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Product;
