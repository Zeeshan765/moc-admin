import React, { useState, useEffect } from "react";
import apiService from "../../services/ApiService";

import BasicModal from "./BasicModal";
import { toast } from "react-toastify";
import { Modal, Box } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import "./order.css";
import { EditOutlined } from "@material-ui/icons";
import green from "@material-ui/core/colors/green";
import OrderFeatureboxes from "../../components/orderfeatureboxes/OrderFeatureboxes";
const Order = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleEdit() {
    console.log("i am clicked");
  }

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

  const [id, setid] = useState("");
  const [orders, setOrders] = useState([]);
  const page = props.match.params.page ? props.match.params.page : 1;
  const [total, setTotal] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);
  const [sortorder, setSortorder] = useState("ASC");
  const [statustype, setStatustype] = useState("");

  //const [name, setName] = useState("");
  const [city, setCity] = useState("nothing");
  const [phoneNo, setphoneNo] = useState("nothing");
  const [paidAt, setpaidAt] = useState("nothing");
  const [createdAt, setcreateAt] = useState("nothing");
  const [delieveredAt, setDelieveredAt] = useState("nothing");
  const [status, setStatus] = useState("");
  const [type, settype] = useState("nothing");
  const [address, setaddress] = useState("nothing");
  const [amount, setamount] = useState("nothing");
  // console.log(orders.address);

  //console.log(orders[0].address)
  const getData = () => {
    apiService.getOrders(page, perPage).then((data) => {
      setOrders(data.data.orders);
      setTotal(data.data.total);
    });
  };
  React.useEffect(getData, [page, perPage]);

  //const id = props.match.params._id;

  //Delete the Product
  //const handledelete = () => {
  //console.log(props.match.params._id);
  // apiService
  //   .deleteProduct('/api/products/' + id)
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // };

  function handleView(p) {
    console.log(p._id);
    apiService.get("/api/orders/find/" + p._id).then((res) => {
      console.log(res.data);
      //console.log(res.data.user.name);
      //setName(res.data.user.name);
      setCity(res.data.city);
      setphoneNo(res.data.phoneNo);
      setpaidAt(res.data.paidAt);
      setcreateAt(res.data.createdAt);
      setDelieveredAt(res.data.deliveredAt);
      setStatus(res.data.status);
      settype(res.data.type);
      setaddress(res.data.address);
      setamount(res.data.amount);
      setid(res.data._id);
      handleOpen();
    });
  }
  //const newid = props.match.params.id;
  const orderupdate = (e) => {
    e.preventDefault();
    apiService
      .put("/api/orders/status/" + id, { status })
      .then((data) => {
        toast.success("Order update successfully", {
          position: toast.POSITION.TOP_LEFT,
          theme: "colored",
        });
        console.log(data);
        window.location.reload();
        // window.location.href = "/allorders";
        //  props.history.push('/allorders');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //Sorting the Table Head
  const sorting = (col) => {
    if (sortorder === "ASC") {
      const sorted = [...orders].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setOrders(sorted);
      setSortorder("DSC");
    }

    if (sortorder === "DSC") {
      const sorted = [...orders].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setOrders(sorted);
      setSortorder("ASC");
    }
  };

  // status type color
  const statusColor = (status) => {
    if (status === "Pending") {
      return "#cf9f0e";
    } else if (status === "Delivered") {
      return "#28a745";
    } else if (status === "cancelled") {
      return "#dc3545";
    }
  };

  return (
    <>
      <div className="productList">
        <OrderFeatureboxes />
        <table className="data-table">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Order Id</th>
              <th onClick={() => sorting("amount")}>Total Amount</th>
              <th onClick={() => sorting("status")}>Status</th>
              <th onClick={() => sorting("type")}>Order Type</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((p, index) => (
              <tr key={index}>
                <td>{p.user}</td>
                <td>{p._id}</td>
                <td>Rs. {p.amount}</td>
                <td style={{ color: statusColor(p.status) }}>{p.status}</td>
                <td>{p.type}</td>

                <td>{p.createdAt}</td>
                <td>
                  {/* <button className="del-btn">Delete</button> */}
                  {/* <button className="edit-btn" onClick={handleOpen}></button> */}
                  <EditOutlined
                    className="ActionIcon"
                    onClick={() => handleView(p)}
                  >
                    View
                  </EditOutlined>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          count={Math.ceil(total / perPage)}
          className="pagination"
          variant="outlined"
          shape="circular"
          color="secondary"
          size="large"
          onChange={(e, value) => {
            console.log(value);
            props.history.push("/allorders/" + value);
          }}
        />{" "}
        <p className="paginationText">
          Showing <b>{(page - 1) * perPage}</b> -{" "}
          <b>{(page - 1) * perPage + orders.length}</b> of <b>{total}</b>{" "}
          results
        </p>
        {/* Total: {total} Showing {(page - 1) * perPage} to{' '}
        {(page - 1) * perPage + orders.length} */}
      </div>

      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">
          <button className="close-btn" onClick={handleClose}>
            CLOSE
          </button>
          <h1>Order Details</h1>
          <h3>Order Id:</h3>
          <h4>{id}</h4>
          {/* <h3>UserName:</h3>
          <h4>{name}</h4> */}
          <h3>City:</h3>
          <h4> {city}</h4>
          <h3>Address:</h3>
          <h4>{address}</h4>
          <h3>Phone No:</h3>
          <h4>{phoneNo}</h4>
          <h3>Created At:</h3>
          <h4>{createdAt}</h4>
          <h3>Paid At:</h3>
          <h4>{paidAt}</h4>
          <h3>Amount:</h3>
          <h4>{amount}</h4>
          {/* <h3>Delievered At:</h3>
          <h4>{delieveredAt}</h4> */}
          <h3>Payment Method:</h3>
          <h4>{type}</h4>
          <h3>Status:</h3>
          <h4>{status}</h4>
          <h2>Update Status</h2>
          <select
            className="statusDrop"
            id=""
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="Pending"> Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button className="update-btn" onClick={orderupdate}>
            Update
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default Order;
