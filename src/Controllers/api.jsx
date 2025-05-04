
import axios from 'axios';
import Cookies from 'js-cookie'

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
})


API.interceptors.request.use(function (config) {
  const token = Cookies.get('token')
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config;
  }, function (error) {
    return Promise.reject(error);
});

export default API;
