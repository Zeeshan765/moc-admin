import React, { useState } from "react";
import apiService from "../../services/ApiService";
import { toast } from "react-toastify";
//import Checkbox from '../../components/Checkbox/Checkbox';
import "./newComponent.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
  const [nameerror, setNameerror] = useState(false);
  const [deserror, setDeserror] = useState(false);
  const [info1error, setinfo1error] = useState(false);
  const [info2error, setinfo2error] = useState(false);
  const [info3error, setinfo3error] = useState(false);
  const [info4error, setinfo4error] = useState(false);
  const [comperror, setComperror] = useState(false);





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

  const handleback = () => {
    props.history.push("/components");
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
    }
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
    <div className="NewComponent">
      <ArrowBackIcon className="backbtnNewProd" size="large" onClick={handleback} />
      <h1 className="addCompTitle">Create Component</h1>

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

        <div className="addProductItem" style={{ marginRight: "90px" }}>
          <label>Component Name</label>
          <input
            type="text"
            placeholder="Enter Product Name"
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
          <div className="addProductItem">
            <label>Info#2</label>
            <input
              type="text"
              placeholder="Enter Info#2"
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

          <div className="addProductItem">
            <label>Info#4</label>
            <input
              type="text"
              placeholder="Enter Info#4"
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
             <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
              <button className="addProductButton" onClick={handlecreate}>
          Create
        </button>
        </div>
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
                className="addProductButton"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                {" "}
                Add Socket
              </button>
            </div>
          </div>
        )}

     

    
      </form>
    </div>
  );
};

export default NewComponent;
