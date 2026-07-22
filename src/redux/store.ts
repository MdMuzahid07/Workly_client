import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import baseApi from './api/baseApi';
import authSlice from './feature/auth/authSlice';
import notificationSoundSlice from './feature/notification/notificationSoundSlice';

const persistConfig = {
  key: 'auth',
  storage,
};

const soundPersistConfig = {
  key: 'notificationSound',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);
const persistedSoundReducer = persistReducer(soundPersistConfig, notificationSoundSlice);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedReducer,
    notificationSound: persistedSoundReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

const persistor = persistStore(store);
export default persistor;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
