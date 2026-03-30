import axios from 'axios';

const BASE = '/api';

// Products
export const getProducts = (params) => axios.get(`${BASE}/products`, { params });
export const getProduct = (id) => axios.get(`${BASE}/products/${id}`);
export const getProductsByCategory = (category, params) => axios.get(`${BASE}/products/category/${category}`, { params });
export const searchProducts = (query) => axios.get(`${BASE}/products/search`, { params: { q: query } });

// Orders
export const createOrder = (data) => axios.post(`${BASE}/orders`, data);
export const getOrders = () => axios.get(`${BASE}/orders`);
export const getOrder = (id) => axios.get(`${BASE}/orders/${id}`);
export const cancelOrder = (id) => axios.patch(`${BASE}/orders/${id}/cancel`);
export const createReturn = (id, reason) => axios.post(`${BASE}/orders/${id}/return`, { reason });

// User
export const getProfile = () => axios.get(`${BASE}/users/me`);
export const updateProfile = (data) => axios.put(`${BASE}/users/me`, data);
export const getAddresses = () => axios.get(`${BASE}/users/me/addresses`);
export const addAddress = (data) => axios.post(`${BASE}/users/me/addresses`, data);
export const getLoyaltyPoints = () => axios.get(`${BASE}/users/me/loyalty`);

// Boutiques
export const getBoutiques = () => axios.get(`${BASE}/boutiques`);
export const getBoutique = (id) => axios.get(`${BASE}/boutiques/${id}`);

// Payments
export const createPaymentIntent = (data) => axios.post(`${BASE}/payments/intent`, data);

export default {
  getProducts, getProduct, getProductsByCategory, searchProducts,
  createOrder, getOrders, getOrder, cancelOrder, createReturn,
  getProfile, updateProfile, getAddresses, addAddress, getLoyaltyPoints,
  getBoutiques, getBoutique, createPaymentIntent
};
