import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IChatData } from './chat.interface';

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
});
export const { setCurrentChatID } = chatSlice.actions;
