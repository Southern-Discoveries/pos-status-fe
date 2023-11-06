import { createAsyncThunk } from '@reduxjs/toolkit';

import { IFilterData } from './chat-interface';
import chatService from './chat-service';

export const createNewChat = createAsyncThunk<string, string>(
  'chat/new-chat',
  async (data, thunkApi) => {
    try {
      const response = await chatService.createNewChat(data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getOwnChats = createAsyncThunk<any, IFilterData>(
  'chat/my-chat',
  async (data, thunkApi) => {
    try {
      const response = await chatService.getOwnChats(data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
