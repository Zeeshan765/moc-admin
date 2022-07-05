import React from 'react'
import apiService from '../../services/ApiService'
import { withRouter } from "react-router";
import { toast } from "react-toastify";

// import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
const Admin = (props) => {
    React.useEffect(() => {
      if (!apiService.isAdmin() ) {
        // toast.error("You are not authorized to access this page", {
        //   position: toast.POSITION.TOP_LEFT,
        //   theme: "colored",
        //   });
        props.history.push("/Login");
      }
      
    }, []);
    return <>{props.children}</>;
  };
  
  export default withRouter(Admin);