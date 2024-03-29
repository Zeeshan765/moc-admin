import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./editComponent.css";
import { toast } from "react-toastify";
import apiService from "../../services/ApiService";
//import Chart from '../../components/chart/Chart';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const EditComponent = (props) => {
  const [name, setName] = useState("");
  const [coolingsockets, setCoolingsockets] = useState([]);
  const [image1, setImage1] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [socket, setSocket] = useState("");
  const [ramSupport, setRamSupport] = useState("");
  const [size, setSize] = useState("");
  const [watt, setWatt] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
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
  const [temp, setTemp] = useState([]);
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
  //   socket,
  //   ramSupport,
  //   size,
  //   watt,
  //   company,
  //   category,
  //   image,
  //   coolingsockets,
  // });

  function show() {
    console.log(coolingsockets);
  }
  function handleClick(e) {
    e.preventDefault();
    setCoolingsockets((coolingsockets) => [...coolingsockets, temp]);
  }
  //get that exsisting product

  const id = props.match.params.id;
  console.log(id);
  React.useEffect(() => {
    apiService.get("/api/components/find/admin/" + id).then((res) => {
      console.log(res.data);
      setName(res.data.name);
      setPrice(res.data.price);
      setDescription(res.data.description);
      setImage1(res.data.picture);
      setSocket(res.data.socket);
      setRamSupport(res.data.ramSupport);
      setSize(res.data.size);
      setWatt(res.data.watt);
      setCompany(res.data.company);
      // setCategory(res.data.category);
      setImage(res.data.picture);
      setinfo1(res.data.info1);
      setinfo2(res.data.info2);
      setinfo3(res.data.info3);
      setinfo4(res.data.info4);
      setSite(res.data.site);
      setCoolingsockets(res.data.coolingsockets);
    });
  }, []);

  //Handle Create Function
  const handleupdate = (e) => {
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
    apiService
      .put("/api/components/" + id, formData)
      .then((data) => {
        toast.success("Component update successfully", {
          position: toast.POSITION.TOP_LEFT,
          theme: "colored",
        });
        console.log(data);
        props.history.push("/components");
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  };

  //Handle Back
  const handleback = () => {
    props.history.push("/components");
  };

  // let formData = new FormData();
  // formData.append('name', name);
  // formData.append('price', price);
  // formData.append('description', description);
  // formData.append('socket', socket);
  // formData.append('ramSupport', ramSupport);
  // formData.append('size', size);
  // formData.append('watt', watt);
  // formData.append('company', company);

  // formData.append('category', category);
  // formData.append('image', image);
  // formData.append('info1', info1);
  // formData.append('info2', info2);
  // formData.append('info3', info3);
  // formData.append('info4', info4);
  // formData.append('site', site);
  // formData.append('coolingsockets', coolingsockets);



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
    if (item.length < 3 || item.length > 40) {
      setinfo1error(true);
    } else {
      setinfo1error(false);
    }
    setinfo1(item);
  };
  //Info2 Handler
  const info2Handler = (e) => {
    let item = e.target.value;
    if (item.length < 3 || item.length > 40) {
      setinfo2error(true);
    } else {
      setinfo2error(false);
    }
    setinfo2(item);
  };
  //Info3 Handler
  const info3Handler = (e) => {
    let item = e.target.value;
    if (item.length < 3 || item.length > 40) {
      setinfo3error(true);
    } else {
      setinfo3error(false);
    }
    setinfo3(item);
  };
  //Info4 Handler
  const info4Handler = (e) => {
    let item = e.target.value;
    if (item.length < 3 || item.length > 40) {
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
          <h1 className="editCompTitle"> Update Component</h1>
          <button className="" onClick={show}>
            show
          </button>
        </div>

        <div className="productBottom">
          <form className="addProductFormEdit">
            <div className="addProductItem">
              <label>Category</label>
              <select
                name="category"
                id="category"
                // value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value === "Processor") {
                    console.log(isSocket);
                    setisSocket(true);
                    setisRam(false);
                    setisSize(false);
                    setissupportedSocket(false);
                  } else if (e.target.value === "Motherboard") {
                    setisSocket(true);
                    setisRam(true);
                    setisSize(true);
                    setisWatt(false);
                    setissupportedSocket(false);
                  } else if (
                    e.target.value === "Gpu" ||
                    e.target.value === "Psu"
                  ) {
                    setisWatt(true);
                    setisSocket(false);
                    setisRam(false);
                    setisSize(false);
                    setissupportedSocket(false);
                  } else if (e.target.value === "Ram") {
                    setisRam(true);
                    setisWatt(false);
                    setisSocket(false);
                    setissupportedSocket(false);
                    setisSize(false);
                  } else if (e.target.value === "Casing") {
                    setisSize(true);
                    setisRam(false);
                    setisWatt(false);
                    setisSocket(false);
                    setissupportedSocket(false);
                  } else if (
                    e.target.value === "Hdd" ||
                    e.target.value === "Ssd"
                  ) {
                    setisSize(false);
                    setisRam(false);
                    setisWatt(false);
                    setisSocket(false);
                    setissupportedSocket(false);
                  } else if (e.target.value === "Cooler") {
                    setisSize(false);
                    setisRam(false);
                    setisWatt(false);
                    setisSocket(false);
                    setissupportedSocket(true);
                  }
                }}
              >
                <option selected disabled>
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
              style={{ marginLeft: "190px", marginRight: "190px" }}
            >
              <label>Component Name</label>
              <input
                type="text"
                placeholder="Enter Component Name"
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
            </div>
            <div className="addProductItem" style={{ marginRight: "190px" }}>
              <label>Price</label>
              <input
                type="text"
                placeholder="Enter Component Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>

            <div className="addProductItem" style={{ marginRight: "190px" }}>
              <label>Info#1</label>
              <input
                type="text"
                placeholder="Enter Info#1"
                value={info1}
                onChange={info1Handler}
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
              />
              {info1error ? (
                <span className='error-handler'>
                  Info1 must be greater than 3 and less than 40 characters
                </span>
              ) : (
                ''
              )}
            </div>
            <div
              className="addProductItem"
              style={{ marginLeft: "1px", marginRight: "190px" }}
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
                  Info2 must be greater than 3 and less than 40 characters
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
                  Info3 must be greater than 3 and less than 40 characters
                </span>
              ) : (
                ''
              )}
            </div>

            <div className="addProductItem" style={{ marginRight: "190px" }}>
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
                  Info4 must be greater than 3 and less than 40 characters
                </span>
              ) : (
                ''
              )}
            </div>
            <div
              className="addProductItem"
              style={{ marginLeft: "1px", marginRight: "190px" }}
            >
              <label>Site</label>
              <input
                type="text"
                placeholder="Enter URL"
                value={site}
                onChange={(e) => {
                  setSite(e.target.value);
                }}
              />
            </div>

            {isSocket && (
              <div className="addProductItem">
                <label>Socket</label>
                <input
                  type="text"
                  placeholder="Enter Socket"
                  value={socket}
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
                  value={ramSupport}
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
                  value={size}
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
                  value={watt}
                  onChange={(e) => {
                    setWatt(e.target.value);
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
                  value={temp}
                  onChange={(e) => {
                    setTemp(e.target.value);
                  }}
                />
                <div>
                  <button
                    style={{ marginTop: "10px" }}
                    className="editCompButton"
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

            <div
              className="addProductItem"
              style={{ marginLeft: "1px", marginRight: "190px" }}
            >
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
            <div className="addProductItem" style={{ marginRight: "190px" }}>
              <label>Description</label>
              <textarea
                className="textfield"
                type="text"
                placeholder="Enter Component Description"
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
              className="editCompButton"
              onClick={handleupdate}
              // onClick={(e) => {
              //   apiService
              //     .put('/api/components' + id, formData)
              //     .then((data) => {
              //       console.log(data);
              //       window.location.href = '/components';
              //       // props.history.push('/products');
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

export default EditComponent;
