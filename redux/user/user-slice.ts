import { createSlice } from '@reduxjs/toolkit';

import { checkAuth, login, logout, register } from './user-action';
import { IInitialState } from './user-interface';

import { getItemFromLocal } from '@/utils/getLocalStorage';

const initialState: IInitialState = {
  user: getItemFromLocal('user'),
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(register.rejected, state => {
        state.isLoading = false;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(login.rejected, state => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.user = payload;
      });
  },
});
