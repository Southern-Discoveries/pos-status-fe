// store.ts
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducer/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers as needed
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
