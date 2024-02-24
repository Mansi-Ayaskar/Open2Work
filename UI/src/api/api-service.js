import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://10.53.103.204:5000/'
});

export default axiosClient;
