import axios from 'axios';
axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.baseURL = 'https://moc-server.herokuapp.com';

axios.defaults.headers.post['Content-Type'] = 'application/json';
let axiosInstance = axios;
export default axiosInstance;
