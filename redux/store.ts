// store.ts
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducer/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
