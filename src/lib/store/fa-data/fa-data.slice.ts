import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FaDataState {
  states: string[];
  alphabet: string[];
  initialState: string;
  finalStates: string[];
  transitions?: { [k: string]: string };
}

export const faDataSlice = createSlice({
  name: 'faData',
  initialState: null as null | FaDataState,
  reducers: {
    setFaData: (_, action: PayloadAction<FaDataState>) => {
      return {
        ...action.payload,
      };
    },
    setTransitions: (state, action: PayloadAction<FaDataState['transitions']>) => {
      return (
        state && {
          ...state,
          transitions: action.payload,
        }
      );
    },
  },
});

export const faDataActions = faDataSlice.actions;

export const faDataReducer = faDataSlice.reducer;
