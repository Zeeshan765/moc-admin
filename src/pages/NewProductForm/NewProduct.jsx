import React, { useState } from "react";
import apiService from "../../services/ApiService";
import { toast } from "react-toastify";
import "./newProduct.css";

const NewProduct = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [info1, setinfo1] = useState("");
  const [info2, setinfo2] = useState("");
  const [info3, setinfo3] = useState("");
  const [info4, setinfo4] = useState("");
  console.log({
    name,
    price,
    description,
    company,
    category,
    image,
    info1,
    info2,
    info3,
    info4,
  });

  //Handle Create Function
  const handlecreate = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("company", company);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("info1", info1);
    formData.append("info2", info2);
    formData.append("info3", info3);
    formData.append("info4", info4);
    apiService
      .post("/api/products", formData)
      .then((data) => {
        toast.success("Product Add successfully",{
          theme:"colored",
        });
        console.log(data);
        props.history.push("/products");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });

      });
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Create Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Enter Product Name"
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
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="addProductItem">
          <label>Company</label>
          <input
            type="text"
            placeholder="Enter Company Name "
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
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option disabled selected>
              Select Category
            </option>
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
        <button className="addProductButton" onClick={handlecreate}>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
