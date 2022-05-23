import React, { useState } from "react";

import "./featureboxes.css";
import { ArrowUpward } from "@material-ui/icons";
import apiService from "../../services/ApiService";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  Person,
  ShoppingBasket,
  Money,
} from "@material-ui/icons";

const Featureboxes = () => {
  const [users, setUsers] = useState("");
  const [orders, setOrders] = useState("");
  const [revenue, setRevenue] = useState("");

  //Get All Users
  const getUsers = () => {
    apiService.get("/api/user/get/totalusers").then((res) => {
      setUsers(res.data);
    });
  };
  React.useEffect(getUsers, []);

  //Get All Orders Count
  const getOrders = () => {
    apiService.get("/api/orders/get/countorders").then((res) => {
      setOrders(res.data);
    });
  };
  React.useEffect(getOrders, []);

  //Get All Revenue

  const getRevenue = () => {
    apiService.get("/api/orders/get/totalrevenue").then((res) => {
      setRevenue(res.data);
    });
  };
  React.useEffect(getRevenue, []);

  return (
    <>
      <div className="featured">
        <div className="featuredItem_1">
          <Person className="TotUserIcon" />
          <span className="featuredTitle">Total Users</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{users}</span>
          </div>
        </div>
        <div className="featuredItem_2">
          <ShoppingBasket className="TotUserIcon" />
          <span className="featuredTitle">Total Orders</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{orders}</span>
          </div>
        </div>
        <div className="featuredItem_3">
          <Money className="TotUserIcon" />
          <span className="featuredTitle">Total Revenue</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoneyR">{revenue}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featureboxes;
