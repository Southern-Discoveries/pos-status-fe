/* eslint-disable no-unused-vars */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';

import api from '@/axios/config';

export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading',
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  type?: string;
}

export interface AuthState {
  accessToken: string;
  loading: AuthStates;
  me?: User;
  error: SerializedError | null; // Ensure error is of the correct type
}

const initialAuthState: AuthState = {
  accessToken: '',
  loading: AuthStates.IDLE,
  me: undefined,
  error: null,
};

export const fetchUser = createAsyncThunk<
  User,
  void,
  { rejectValue: SerializedError }
>('auth/me', async (_, thunkAPI) => {
  try {
    const response = await api.get<User>('user');
    return response.data;
  } catch (error: any) {
    const customError: SerializedError = {
      name: 'FetchUserError',
      message: error.message,
    };
    return thunkAPI.rejectWithValue(customError);
  }
});

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post<{ accessToken: string }>(
        'auth/login',
        credentials
      );
      const refetch = await api.get<{ name: string }>('user', {
        headers: { Authorization: `Bearer ${response.data.accessToken}` },
      });
      return {
        accessToken: response.data.accessToken,
        me: { name: refetch.data.name },
      };
    } catch (error: any) {
      const customError: SerializedError = {
        name: 'LoginError',
        message: error.message,
      };
      return thunkAPI.rejectWithValue(customError);
    }
  }
);

// Repeat a similar pattern for other async thunks like `register` and `logout`.

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    reset: () => initialAuthState,
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.me = action.payload.me;
        state.loading = AuthStates.IDLE;
        state.error = null; // Reset error on success
      })
      .addCase(login.rejected, (state, action) => {
        state.accessToken = '';
        state.loading = AuthStates.IDLE;
        state.error = action.payload || null;
      })
      // Repeat for other async thunks
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload || null;
      });
  },
});

export const { updateAccessToken, reset } = authSlice.actions;

export default authSlice.reducer;
