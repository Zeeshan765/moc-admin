import React, { useState } from "react";
import "./UserOrder.css";
import apiService from "../../services/ApiService";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const UserOrder = (props) => {
  const [detail, setDetail] = useState([]);
  const [total, setTotal] = React.useState(0);
  const [orderItems, setOrderItems] = useState([]);

  const orderid = props.match.params.id;

  const getData = () => {
    apiService.get("/api/orders/adminorders/" + orderid).then((res) => {
      // setOrders(data.data);
      // setTotal(data.data.total);
      // setOrderItems(data.data.orderItems);
      setDetail(res.data);
      console.log(res.data);
      console.log(detail);
      // setOrderItems(res.data.orderItems);
    });
  };
  React.useEffect(getData, [orderid]);
  // console.log(orders);
  // console.log(total);
  // console.log(orderItems);
  // console.log(orderid);

  const handleback = () => {
    props.history.push("/users");
  };

  return (
    <>
      <ArrowBackIcon className="backbtn" size="large" onClick={handleback} />
      {detail.length == 0 ? (
        <div className="orderList">
          <h1>There is No Order</h1>
        </div>
      ) : (
        <div className="orderList">
          <h1 className="addCompTitle">User Orders</h1>

          {detail.map((p) => (
            <div className="main-box">
              <h2 className="subheadings">Order-Id</h2>
              <h3 className="orderss">{p._id}</h3>

              <h2 className="subheadings">Order Amount</h2>
              <h3 className="orderss">Rs.{p.amount}</h3>

              <h2 className="subheadings">Order Date</h2>
              <h3 className="orderss">{p.createdAt}</h3>
              <hr />
              <h2 className="subheadings">Order Items</h2>

              {p.orderItems.map((o) => (
                <div className="order-items">
                  <h3 className="orderss">
                    Product Id: <span className="itemText">{o._id}</span>
                  </h3>
                  <h3 className="orderss">
                    Product Name: <span className="itemText">{o.name}</span>
                  </h3>

                  <h3 className="orderss">
                    Product Price:{" "}
                    <span className="itemText">Rs.{o.price}</span>
                  </h3>
                  <h3 className="orderss">
                    Product Quantity:{" "}
                    <span className="itemText">{o.quantity}</span>
                  </h3>
                  {/* <hr /> */}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrder;
