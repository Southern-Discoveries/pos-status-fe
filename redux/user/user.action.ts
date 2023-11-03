import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  IAuthResponse,
  ICreateUserInfo,
  ILoginInfo,
  ILoginResponse,
} from './user.interface';

import { errorCatch } from '@/utils/helper/api/api-helper';
import { removeFromStorage } from '@/utils/helper/auth/auth-helper';
import authService from '@/utils/helper/auth/auth-service';

export const register = createAsyncThunk<IAuthResponse, ICreateUserInfo>(
  'auth/register',
  async (data, thunkApi) => {
    try {
      const response = await authService.register(data);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<ILoginResponse, ILoginInfo>(
  'auth/login',
  async (data, thunkApi) => {
    try {
      const response = await authService.login(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await authService.logout();
    removeFromStorage();
    return response;
  } catch (error) {}
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
  'user',
  async (_, thunkApi) => {
    try {
      const response = await authService.getAuthUser();

      return response;
    } catch (error) {
      if (errorCatch(error) === 'jwt expired') {
        thunkApi.dispatch(logout());
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);
