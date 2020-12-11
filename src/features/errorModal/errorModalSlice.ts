import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { fetchMovieDetails } from "../common/fetchMovieDetails";
import { fetchMovies } from "../common/fetchMovies";

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
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.isOpened = true;
      state.errorMessage = action.error.message || "";
    });
    builder.addCase(fetchMovieDetails.rejected, (state, action) => {
      state.isOpened = true;
      state.errorMessage = action.error.message || "";
    });
  },
});

export const { toggleModal, cacheErrorMessage } = errorModalSlice.actions;

export const selectIsModalOpened = (state: RootState) =>
  state.errorModal.isOpened;
export const selectErrorMessage = (state: RootState) =>
  state.errorModal.errorMessage;

export default errorModalSlice.reducer;
