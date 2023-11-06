import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createNewChat } from './chat-action';
import { IChatData } from './chat-interface';

interface ConversationsState {
  listChat: IChatData[];
  currentChatID: string | null;
  isChatLoading: boolean;
}

const initialState: ConversationsState = {
  listChat: [],
  currentChatID: null,
  isChatLoading: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChatID: (state, action: PayloadAction<string | null>) => {
      state.currentChatID = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createNewChat.pending, state => {
        state.isChatLoading = true;
      })
      .addCase(createNewChat.fulfilled, (state, action: any) => {
        state.isChatLoading = false;
        state.currentChatID = action.payload.id;
      })
      .addCase(createNewChat.rejected, state => {
        state.isChatLoading = false;
        state.currentChatID = null;
      });
  },
});
export const { setCurrentChatID } = chatSlice.actions;
