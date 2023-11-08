import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createNewChat, deleteChat, getChatMessage } from './chat-action';

interface ConversationsState {
  currentChatID: string | null;
  isChatLoading: boolean;
}

const initialState: ConversationsState = {
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
      })
      .addCase(getChatMessage.pending, state => {
        state.isChatLoading = true;
      })
      .addCase(getChatMessage.rejected, state => {
        state.isChatLoading = false;
        state.currentChatID = null;
      })
      .addCase(getChatMessage.fulfilled, state => {
        state.isChatLoading = false;
        /*    state.currentChatID = null; */
      })
      .addCase(deleteChat.pending, state => {
        state.isChatLoading = true;
      })
      .addCase(deleteChat.rejected, state => {
        state.isChatLoading = false;
      })
      .addCase(deleteChat.fulfilled, state => {
        state.isChatLoading = false;
      });
  },
});
export const { setCurrentChatID } = chatSlice.actions;
