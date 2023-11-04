import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  ICreateUserInfo,
  ILoginInfo,
  ILoginResponse,
  IUser,
} from './user.interface';

import { errorCatch } from '@/utils/helper/api/api-helper';
import { removeFromStorage } from '@/utils/helper/auth/auth-helper';
import authService from '@/utils/helper/auth/auth-service';

export const register = createAsyncThunk<string, ICreateUserInfo>(
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
      if (response.status != 200) {
        return thunkApi.rejectWithValue(response);
      }
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

// This Function user for CheckAuth and Fetch Data User
export const checkAuth = createAsyncThunk<IUser>(
  'user',
  async (_, thunkApi) => {
    try {
      const response = await authService.getAuthUser();
      return response;
    } catch (error) {
      if (errorCatch(error) === 'Token has expired') {
        thunkApi.dispatch(logout());
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);
