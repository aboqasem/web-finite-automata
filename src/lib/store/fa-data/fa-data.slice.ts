import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const faDataSlice = createSlice({
  name: 'faData',
  initialState: null as null | (Omit<Fsm, 'transitions'> & { transitions?: Fsm['transitions'] }),
  reducers: {
    setFaData: (_, action: PayloadAction<Omit<Fsm, 'transitions'>>) => {
      return {
        ...action.payload,
      };
    },
    setTransitions: (state, action: PayloadAction<Fsm['transitions']>) => {
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
