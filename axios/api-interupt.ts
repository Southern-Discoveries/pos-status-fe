import axios from 'axios';

import { errorCatch, getContentType } from './api-helper';

import { getAccessToken, removeFromStorage } from '@/redux/user/user-helper';
import authService from '@/redux/user/user-service';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'https://127.0.0.1:8000',
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
    if (
      error?.response?.status === 401 ||
      (errorCatch(error) === 'Token are expired' &&
        error.config &&
        !error.config._isRetry)
    ) {
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
