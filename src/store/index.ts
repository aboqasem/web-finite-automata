import { configureStore } from '@reduxjs/toolkit';
import { pagesReducer } from './pages/pagesSlice';

export const store = configureStore({
  reducer: {
    pages: pagesReducer,
  },
  devTools: import.meta.env.DEV,
});

export const getState = store.getState;

export const dispatch = store.dispatch;
