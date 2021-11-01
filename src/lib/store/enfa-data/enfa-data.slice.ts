import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const enfaDataSlice = createSlice({
  name: 'enfaData',
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

export const enfaDataActions = enfaDataSlice.actions;

export const enfaDataReducer = enfaDataSlice.reducer;
