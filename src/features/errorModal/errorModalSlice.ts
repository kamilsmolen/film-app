import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

interface ErrorModalState {
  isOpened: boolean;
  errorMessage: string;
}

const initialState: ErrorModalState = {
  isOpened: false,
  errorMessage: "",
};

export const errorModalSlice = createSlice({
  name: "errorModal",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isOpened = action.payload;
    },
    cacheErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      if (action.payload !== "") state.isOpened = true;
    },
  },
});

export const { toggleModal, cacheErrorMessage } = errorModalSlice.actions;

export const selectIsModalOpened = (state: RootState) =>
  state.errorModal.isOpened;
export const selectErrorMessage = (state: RootState) =>
  state.errorModal.errorMessage;

export default errorModalSlice.reducer;
