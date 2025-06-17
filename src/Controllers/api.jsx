
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

export async function getProduct(id) {
  return API.get(`/products/${id}`).then(res => res.data);
}

export async function getProducts() {
  return API.get(`/products`).then(res => res.data);
}

export async function getProductImages(id) {
  return API.get(`/products/${id}/images`).then(res => res.data);
}

export async function getProductReviews(id) {
  return API.get(`/reviews/product/${id}`).then(res => res.data);
}

export async function getProductPromotions(id) {
  return API.get(`/promotions/product/${id}`).then(res => res.data);
}

export async function getPromotions() {
  return API.get(`/promotions`).then(res => res.data);
}

export async function getMyCart() {
  return API.get('/carts/my').then(res => res.data);
}

export async function addCartItem(data) {
  return API.post('/carts/addItem', data).then(res => res.data);
}

export async function removeCartItem(item_id) {
  return API.delete(`/carts/removeItem/${item_id}`).then(res => res.data);
}

export default API;
