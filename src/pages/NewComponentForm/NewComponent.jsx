import React, { useState } from "react";
import apiService from "../../services/ApiService";
import { toast } from "react-toastify";
//import Checkbox from '../../components/Checkbox/Checkbox';
import "./newComponent.css";

const NewComponent = (props) => {
  const [name, setName] = useState("");
  const [coolingsockets, setCoolingsockets] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [socket, setSocket] = useState("");
  const [ramSupport, setRamSupport] = useState("");
  const [size, setSize] = useState("");
  const [watt, setWatt] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [rgb, setRgb] = useState("");
  const [image, setImage] = useState("");
  const [info1, setinfo1] = useState("");
  const [info2, setinfo2] = useState("");
  const [info3, setinfo3] = useState("");
  const [info4, setinfo4] = useState("");
  const [site, setSite] = useState("");
  const [isSocket, setisSocket] = useState(false);
  const [isRam, setisRam] = useState(false);
  const [isWatt, setisWatt] = useState(false);
  const [isSize, setisSize] = useState(false);
  const [isSupportedSocket, setissupportedSocket] = useState(false);
  const [isRGB, setisRGB] = useState(false);
  const [temp, setTemp] = useState([]);

  console.log({
    name,
    price,
    description,
    socket,
    ramSupport,
    size,
    watt,
    company,
    category,
    image,
    coolingsockets,
    rgb,
  });

  function handleClick(e) {
    e.preventDefault();
    if (coolingsockets.includes(temp)) {
      return alert(temp + " Already added");
    } else {
      setCoolingsockets((coolingsockets) => [...coolingsockets, temp]);
      alert(temp + "  was added");
    }
  }
  //Handle Create Function
  const handlecreate = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("socket", socket);
    formData.append("ramSupport", ramSupport);
    formData.append("size", size);
    formData.append("watt", watt);
    formData.append("company", company);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("info1", info1);
    formData.append("info2", info2);
    formData.append("info3", info3);
    formData.append("info4", info4);
    formData.append("site", site);
    formData.append("coolingsockets", coolingsockets);
    formData.append("rgb", rgb);
    apiService
      .post("/api/components", formData)
      .then((data) => {
        toast.success("Component add successfully", {
          position: toast.POSITION.TOP_LEFT,
          theme: "colored",
        });
        console.log(data);
        props.history.push("/components");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_LEFT,
          theme: "colored",
        });
      });
  };
  // const validation = (e) => {
  //   e.preventDefault();
  //   if (name === "" || price === ""|| description === ""|| info1 === ""|| info2 === "" || info3 === "" || info4 === ""||  company === ""|| category === ""||  site === "" ) {
  //     toast.error("Please Fill The Required Field");
  //   } else if (name.length<3 && name.length>15) {
  //     toast.error("Name  Must be  greater than 3 Characters and Less than 15 Characters ");
  //   }  else {
  //     handlecreate(e);

  //   }
  // };

  return (
    <div className="NewComponent">
      <h1 className="addProductTitle">Create Component</h1>

      <form className="addComponentForm">
        <div className="addProductItem">
          <label>Category</label>
          <select
            name="category"
            id="category"
            onChange={(e) => {
              setCategory(e.target.value);
              if (e.target.value === "Processor") {
                console.log(isSocket);
                setisSocket(true);
                setisRam(false);
                setisSize(false);
                setisRGB(false);
                setissupportedSocket(false);
              } else if (e.target.value === "Motherboard") {
                setisSocket(true);
                setisRam(true);
                setisSize(true);
                setisWatt(false);
                setisRGB(false);
                setissupportedSocket(false);
              } else if (e.target.value === "Gpu" || e.target.value === "Psu") {
                setisWatt(true);
                setisSocket(false);
                setisRam(false);
                setisSize(false);
                setisRGB(false);
                setissupportedSocket(false);
              } else if (e.target.value === "Ram") {
                setisRam(true);
                setisWatt(false);
                setisSocket(false);
                setissupportedSocket(false);
                setisSize(false);
                setisRGB(false);
              } else if (e.target.value === "Casing") {
                setisSize(true);
                setisRam(false);
                setisWatt(false);
                setisSocket(false);
                setisRGB(true);
                setissupportedSocket(false);
              } else if (e.target.value === "Hdd" || e.target.value === "Ssd") {
                setisSize(false);
                setisRam(false);
                setisWatt(false);
                setisSocket(false);
                setissupportedSocket(false);
                setisRGB(false);
              } else if (e.target.value === "Cooler") {
                setisSize(false);
                setisRam(false);
                setisWatt(false);
                setisSocket(false);
                setissupportedSocket(true);
                setisRGB(false);
              }
            }}
          >
            <option disabled selected>
              Select Category
            </option>
            <option value="Processor">Processor</option>
            <option value="Gpu">Gpu</option>
            <option value="Motherboard">Motherboard</option>
            <option value="Psu">Psu</option>
            <option value="Hdd">Hdd</option>
            <option value="Ssd">Ssd</option>
            <option value="Ram">Ram</option>
            <option value="Casing">Casing</option>
            <option value="Cooler">Cooler</option>
          </select>
        </div>

        <div
          className="addProductItem"
          style={{ marginLeft: "30px", marginRight: "190px" }}
        >
          <label>Company</label>
          <input
            type="text"
            placeholder="Enter Company Name "
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
        </div>

        <div className="addProductItem" style={{ marginRight: "90px" }}>
          <label>Component Name</label>
          <input
            type="text"
            placeholder="Enter Product Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="addProductItem" style={{ marginRight: "230px" }}>
          <label>Price</label>
          <input
            type="text"
            placeholder="Enter Product Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />

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
            <label>Site</label>
            <input
              type="text"
              placeholder="Enter URL"
              onChange={(e) => {
                setSite(e.target.value);
              }}
            />
          </div>
        </div>
        <div
          className="addProductItem"
          style={{ marginLeft: "40px", marginRight: "490px" }}
        >
          <label>Description</label>
          <textarea
            className="textfield"
            type="text"
            placeholder="Enter Product Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        {isSocket && (
          <div className="addProductItem">
            <label>Socket</label>
            <input
              type="text"
              placeholder="Enter Socket"
              onChange={(e) => {
                setSocket(e.target.value);
              }}
            />
          </div>
        )}
        {isRam && (
          <div className="addProductItem">
            <label>Ram Support</label>
            <input
              type="text"
              placeholder="Enter Ram Support"
              onChange={(e) => {
                setRamSupport(e.target.value);
              }}
            />
          </div>
        )}

        {isSize && (
          <div className="addProductItem">
            <label>Size</label>
            <input
              type="text"
              placeholder="Enter Size"
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </div>
        )}
        {isWatt && (
          <div className="addProductItem">
            <label>Watt</label>
            <input
              type="text"
              placeholder="Enter Watt"
              onChange={(e) => {
                setWatt(e.target.value);
              }}
            />
          </div>
        )}
        {isRGB && (
          <div className="addProductItem">
            <label>RGB</label>
            <input
              type="text"
              placeholder="Enter 1 for Yes 0 for No"
              onChange={(e) => {
                setRgb(e.target.value);
              }}
            />
          </div>
        )}

        {isSupportedSocket && (
          <div className="addProductItem">
            <label>Enter Supported Sockets</label>

            <input
              type="text"
              placeholder="Enter Supported Sockets"
              onChange={(e) => {
                setTemp(e.target.value);
              }}
            />
            <div>
              <button
                style={{ marginTop: "10px" }}
                className="addProductItem"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                {" "}
                Add Supported Socket
              </button>
            </div>
          </div>
        )}

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

export default NewComponent;
