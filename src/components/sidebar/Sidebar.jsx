import React from "react";
import "./sidebar.css";
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
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import apiService from "../../services/ApiService";
const Sidebar = (props) => {
  return (
    <>   
   

      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/" className="link">
                <li className="sidebarListItem">
                  <LineStyle className="sidebarIcon" />
                  Home 
                </li>
              </Link>

             
              <Link to="/allorders" className="link">
                <li className="sidebarListItem">
                  <TrendingUp className="sidebarIcon" />
                  Orders
                </li>
              </Link>
            </ul>
            <hr className="hrline"></hr>
          </div>
          <div className="sidebarMenu">
            <ul className="sidebarList">
            
              <Link to="/users" className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </Link>
            
              <Link to="/products" className="link">
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Products
                </li>
              </Link>

              <Link to="/components" className="link">
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Components
                </li>
              </Link>


              <Link to="/components" className="link">
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Messages
                </li>
              </Link>
              <Link to="/profile" className="link">
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Profile
                </li>
              </Link>
              {/* <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Reports
              </li>
            
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Notifications</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem"> */}
              {/* <MailOutline className="sidebarIcon" />
                Mail
              </li>
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Feedback
              </li>
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </ul> */}
            </ul>
          </div>
          {/* <div className="sidebarMenu">
            <h3 className="sidebarTitle">Staff</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Manage
              </li>
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
              <li className="sidebarListItem">
                <Report className="sidebarIcon" />
                Reports
              </li>
            </ul>
          </div> */}
        </div>
      </div>
      
    </>
    

  );
};

export default Sidebar;
