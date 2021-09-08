import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const PAGES = ['Home', 'Finite Automata', 'Help'] as const;
export type Page = typeof PAGES[number];

interface PagesState {
  currentPage: typeof PAGES[number];
}

const initialState: PagesState = {
  currentPage: PAGES[0],
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
