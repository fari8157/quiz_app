// Redux/Store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default localStorage for web
import quizReducer from './Slice'; // your slice

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, quizReducer);

export const store = configureStore({
  reducer: {
    quiz: persistedReducer,
  },
});

export const persistor = persistStore(store);
