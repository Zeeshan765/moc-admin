import React from 'react'
import apiService from '../../services/ApiService'
import { withRouter } from "react-router";
const Admin = (props) => {
    React.useEffect(() => {
      if (!apiService.isAdmin() ) {
        props.history.push("/Login");
      }
      
    }, []);
    return <>{props.children}</>;
  };
  
  export default withRouter(Admin);