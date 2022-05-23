import axiosInstance from './axiosInstance';
import jwtDecode from 'jwt-decode';

class APIService {
  getProducts = (page = 1, perPage = 10) =>
    this.get('/api/products/all?page=' + page + '&perPage=' + perPage);
  getComponents = (page = 1, perPage = 10) =>
    this.get('/api/components/all?page=' + page + '&perPage=' + perPage);
  getOrders = (page = 1, perPage = 10) =>
    this.get('/api/orders/allorders?page=' + page + '&perPage=' + perPage);
  getUsers = (page = 1, perPage = 10) =>
    this.get('/api/user/all?page=' + page + '&perPage=' + perPage);
  get = (url) => axiosInstance.get(url);
  post = (url, data) => axiosInstance.post(url, data);
  deleteProduct = (url) => axiosInstance.delete(url);
  deleteComponent = (url) => axiosInstance.delete(url);
  deleteUser = (url) => axiosInstance.delete(url);
  put = (url, data) => axiosInstance.put(url, data);

  // Check User Log or not
  isLoggedIn = () => {
    return localStorage.getItem('token') ? true : false;
  };

  //Get Logged In user name
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem('token');
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };

  //Check admin
  isAdmin = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedInUser().role === 'admin') return true;
      else return false;
    } else return false;
  };
}

let apiService = new APIService();
export default apiService;
