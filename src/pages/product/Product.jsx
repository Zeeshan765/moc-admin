import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./product.css";
import apiService from "../../services/ApiService";
import { toast } from "react-toastify";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
      setImage(res.data.picture);
      setinfo1(res.data.info1);
      setinfo2(res.data.info2);
      setinfo3(res.data.info3);
      setinfo4(res.data.info4);
    });
  }, []);

  //Handle Create Function
  const handlecreate = (e) => {
    e.preventDefault();
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
        toast.success("Product update successfully",{
          position: toast.POSITION.TOP_LEFT,
          theme:"colored",
        });
        console.log(data);
        props.history.push("/products");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


//Handle Back
const handleback = ()=>{
  props.history.push("/products")
}








  // let formData = new FormData();
  // formData.append('name', name);
  // formData.append('price', price);
  // formData.append('description', description);
  // formData.append('company', company);
  // formData.append('category', category);
  // formData.append('image', image);
  // formData.append('info1', info1);
  // formData.append('info2', info2);
  // formData.append('info3', info3);
  // formData.append('info4', info4);
  return (
    <>
      <div className="product">
        <div className="productTitleContainer">
           <ArrowBackIcon size = "large" onClick={handleback}/>
            
           
          <h1 className="productTitle"> Update Product</h1>
        </div>

        <div className="productBottom">
          <form className="addProductForm">
            <div className="addProductItem">
              <label>Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="addProductItem">
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
                onChange={(e) => {
                  setinfo1(e.target.value);
                }}
              />
            </div>
            <div className="addProductItem">
              <label>Info#2</label>
              <input
                type="text"
                placeholder="Enter Info#2"
                value={info2}
                onChange={(e) => {
                  setinfo2(e.target.value);
                }}
              />
            </div>
            <div className="addProductItem">
              <label>Info#3</label>
              <input
                type="text"
                placeholder="Enter Info#3"
                value={info3}
                onChange={(e) => {
                  setinfo3(e.target.value);
                }}
              />
            </div>
            <div className="addProductItem">
              <label>Info#4</label>
              <input
                type="text"
                placeholder="Enter Info#4"
                value={info4}
                onChange={(e) => {
                  setinfo4(e.target.value);
                }}
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input
                type="text"
                placeholder="Enter Product Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="addProductItem">
              <label>Company</label>
              <input
                type="text"
                placeholder="Enter Company Name"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
              />
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
