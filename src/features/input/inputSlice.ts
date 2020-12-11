import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

interface InputState {
  query: string;
}

const initialState: InputState = {
  query: "",
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    cacheQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { cacheQuery } = inputSlice.actions;

export const selectQuery = (state: RootState) => state.input.query;

export default inputSlice.reducer;
