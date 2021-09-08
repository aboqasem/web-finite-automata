import { configureStore } from '@reduxjs/toolkit';
import { faSectionsReducer } from './finite-automata-sections/finiteAutomataSectionsSlice';
import { pagesReducer } from './pages/pagesSlice';

export const store = configureStore({
  reducer: {
    pages: pagesReducer,
    faSection: faSectionsReducer,
  },
  devTools: import.meta.env.DEV,
});

export const getState = store.getState;

export const dispatch = store.dispatch;
