// axiosConfig.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000',
});

// Add an interceptor to include the token in headers for authorized requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
