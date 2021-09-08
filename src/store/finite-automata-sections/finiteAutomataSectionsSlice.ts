import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const FA_SECTIONS = ['NFA', 'DFA', 'Min DFA', 'Test', 'RG'] as const;
export type FaSection = typeof FA_SECTIONS[number];

interface FaSectionsState {
  currentFaSection: typeof FA_SECTIONS[number];
}

const initialState: FaSectionsState = {
  currentFaSection: FA_SECTIONS[0],
};

export const faSectionsSlice = createSlice({
  name: 'faSections',
  initialState,
  reducers: {
    to: (state, payload: PayloadAction<FaSection>) => {
      state.currentFaSection = payload.payload;
    },
  },
});

export const faSectionsActions = faSectionsSlice.actions;

export const faSectionsReducer = faSectionsSlice.reducer;
