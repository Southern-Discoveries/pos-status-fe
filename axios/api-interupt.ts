import axios from 'axios';

import { getContentType } from './api-helper';

import { getAccessToken, removeFromStorage } from '@/redux/user/user-helper';
import authService from '@/redux/user/user-service';

export const instance = axios.create({
  baseURL: process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000',
  headers: getContentType(),
});

// Add an interceptor to include the token in headers for authorized requests
instance.interceptors.request.use(config => {
  const accessToken = getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Renew Access Token , if failed logout
instance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;

    if (error?.response?.status === 401) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens();
        return instance.request(originalRequest);
      } catch (error) {
        removeFromStorage();
      }
    }
    return error.response;
  }
);
