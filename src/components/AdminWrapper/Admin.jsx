import React from 'react'
import apiService from '../../services/ApiService'
import { withRouter } from "react-router";
const Admin = (props) => {
    React.useEffect(() => {
      if (!apiService.isAdmin() ) {
        props.history.push("/login");
      }
      
    }, []);
    return <>{props.children}</>;
  };
  
  export default withRouter(Admin);