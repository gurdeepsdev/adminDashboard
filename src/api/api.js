import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.steptosale.com/api', // Update to your backend URL
});

export default API;
