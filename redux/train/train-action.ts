import { createAsyncThunk } from '@reduxjs/toolkit';

import { IBrainInfo } from './train-interface';
import trainService from './train-service';

export const createNewBrain = createAsyncThunk<any, IBrainInfo>(
  'brain/new-brain',
  async (data, thunkApi) => {
    try {
      const response = await trainService.createBrain(data);
      return response;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteBrain = createAsyncThunk<any, string>(
  'brain/delete-brain',
  async (data, thunkApi) => {
    try {
      const response = await trainService.deleteBrain(data);
      return response;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
