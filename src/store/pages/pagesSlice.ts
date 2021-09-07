import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const pages = ['Home', 'Finite Automata', 'Help'] as const;
export type Page = typeof pages[number];

interface PagesState {
  currentPage: typeof pages[number];
}

const initialState: PagesState = {
  currentPage: pages[0],
};

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    to: (state, payload: PayloadAction<Page>) => {
      state.currentPage = payload.payload;
    },
  },
});

export const pagesActions = pagesSlice.actions;

export const pagesReducer = pagesSlice.reducer;
