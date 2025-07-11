
import axios from 'axios';
import Cookies from 'js-cookie'

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
})

export const storagePost = axios.create({
  baseURL: 'http://localhost:8080/storage',
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

storagePost.interceptors.request.use(function (config) {
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

export async function buy(data) {
  return API.post('/orders/buy', data).then(res => res.data);
}

export async function getAddresses() {
  return API.get('/users/addresses').then(res => res.data);
}

export async function sendRevisao(data) {
  return API.post('/reviews', data).then(res => res.data);
}

export async function createProduct(data) {
  return API.post('/products', data).then(res => res.data);
}

export async function createPromotion(data) {
  return API.post('/promotions', data).then(res => res.data);
}

export default API;
