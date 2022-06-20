import React from "react";
import { Link } from "react-router-dom";

import "./topbar.css";
//import { Settings } from '@material-ui/icons';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import apiService from "../../services/ApiService";
import Admin from "../AdminWrapper/Admin"
const Topbar = () => {
  //Logout
  const handlelogout = (e) => {
    // localStorage.setItem('token', '');
    localStorage.removeItem("token");
    //removeCookie("cart");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">MoC</span>
          </div>
          <div className="topRight">
          
            <div className="topbarIconContainer">
              <Admin>

              <button className="logoutbtn" onClick={handlelogout}>Logout</button>
              </Admin>
              {/* {!apiService.isAdmin() ? (
                <Link to="/login">
                  <LockOpenIcon />
                </Link>
              ) : (
                <button className="logoutbtn" onClick={handlelogout}>Logout</button>
              )} */}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
