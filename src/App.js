import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import Topbar from "./components/topbar/Topbar";
import Home from "./pages/Home/Home";
import UserList from "./pages/usersList/UserList";
import User from "./pages/user/User";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/NewProductForm/NewProduct";
import ComponentList from "./pages/componentList/ComponentList";
import NewComponent from "./pages/NewComponentForm/NewComponent";
import EditComponent from "./pages/EditComponent/EditComponent";
import Order from "./pages/order/Order";
import Admin from "./components/AdminWrapper/Admin";
import NewOrder from "./pages/order/NewOrder";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Messanger from "./pages/Messanger/Messanger";
import { useLocation } from "react-router-dom";
// import { useHistory } from "react-router";

function App() {
  // const location = useHistory();
  // console.log(location.pathname);
 
  return (
    <>
      <Router>
        <Admin>
          <ToastContainer />
          <Route path="/Login" exact component={Login} />
          <Topbar />
          <div className="container">
            <Sidebar />
            <Switch>
              <Route
                path="/"
              
                exact
                component={Home}
              />

              <Route path="/users/:page?" exact component={UserList} />
              <Route
                path="/user/:userId"

                exact
                component={User}
              />
              <Route path="/products/:page?" exact component={ProductList} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/update/password" exact component={ChangePassword} />
              <Route path="/product/:id" exact component={Product} />
              <Route path="/newproduct" exact component={NewProduct} />
              <Route
                path="/components/:page?"
                exact
                component={ComponentList}
              />
              <Route path="/newcomponent" exact component={NewComponent} />
              <Route path="/component/:id" exact component={EditComponent} />
              <Route path="/allorders/:page?" exact component={Order} />
              <Route path="/messages" exact component={Messanger} />

              {/* <Route path='/orders' exact component={NewOrder} /> */}
            </Switch>
          </div>
        </Admin>
      </Router>
    </>
  );
}

export default App;
