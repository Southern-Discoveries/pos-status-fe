import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { chatSlice } from './chat/chat-slice';
import { trainSlice } from './train/train-slice';
import { userSlice } from './user/user-slice';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: [],
  /*  blacklist: ['chat'], */
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  chat: chatSlice.reducer,
  train: trainSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof rootReducer>;
