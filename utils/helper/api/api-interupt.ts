import axios from 'axios';

import { getAccessToken, removeFromStorage } from '../auth/auth-helper';
import authService from '../auth/auth-service';

import { getContentType } from './api-helper';

export const instance = axios.create({
  baseURL: process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000',
  headers: getContentType(),
});

instance.interceptors.request.use(config => {
  const accessToken = getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

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
  }
);
