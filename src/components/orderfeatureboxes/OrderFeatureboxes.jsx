import React, { useState } from "react";

import './orderfeatureboxes.css';
import {  ArrowUpward } from '@material-ui/icons';
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
  MoreHoriz,
  ArrowForward,
  Done
} from "@material-ui/icons";

const OrderFeatureboxes = () => {

  const[pending,setPending]=useState("");
  const[processing,setProcessing]=useState("");
  const[delivered,setDelivered]=useState("");
  const[cancelled,setCancelled]=useState("");



//Get Pending Orders Count 
const getPending = () => {
  apiService.get("/api/orders/get/pendingorders").then((res) => {
      setPending(res.data);
      
  });
};
React.useEffect(getPending, []);
//Get Processing Orders Count 
const getProcessing = () => {
  apiService.get("/api/orders/get/processingorders").then((res) => {
      setProcessing(res.data);
      
  });
};
React.useEffect(getProcessing, []);



//Get Delivered Orders Count 
const getDelivered = () => {
  apiService.get("/api/orders/get/delieveredorders").then((res) => {
      setDelivered(res.data);
      
  });
};
React.useEffect(getDelivered, []);


//Get Cancelled Orders Count
const getCancelled = () => {
  apiService.get("/api/orders/get/cancelledorders").then((res) => {
      setCancelled(res.data);

  });
}
React.useEffect(getCancelled, []);




  return (
    <>
      <div className='featured'>
        <div className='featuredItem_1'>
        <MoreHoriz className="TotUserIcon" />
          <span className='featuredTitle'>Pending Orders</span>
          <div className='featuredMoneyContainer'>
            <span className='featuredMoneyPending'>{pending}</span>
           
          </div>
           
        </div>
        <div className='featuredItem_2'>
        <ArrowForward className="TotUserIcon" />
          <span className='featuredTitle'>Processing Orders</span>
          <div className='featuredMoneyContainer'>
            <span className='featuredMoneyProcessing'>{processing}</span>
            
          </div>
          
        </div>
        <div className='featuredItem_3'>
        <Done className="TotUserIcon" />
          <span className='featuredTitle'>Delivered Orders</span>
          <div className='featuredMoneyContainer'>
            <span className='featuredMoneyDelivered'>{delivered}</span>
            
          </div>
         
        </div>


        <div className='featuredItem_3'>
        <Report className="TotUserIcon" />
          <span className='featuredTitle'>Cancelled Orders</span>
          <div className='featuredMoneyContainer'>
            <span className='featuredMoneyDelivered'>{cancelled}</span>
            
          </div>
         
        </div>
      </div>
    </>
  );
};

export default OrderFeatureboxes;
