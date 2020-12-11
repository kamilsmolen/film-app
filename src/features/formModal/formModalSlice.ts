import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

interface FormModalState {
  isOpened: boolean;
}

const initialState: FormModalState = {
  isOpened: false,
};

export const formModalSlice = createSlice({
  name: "formModal",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isOpened = action.payload;
    },
  },
});

export const { toggleModal } = formModalSlice.actions;

export const selectIsModalOpened = (state: RootState) =>
  state.formModal.isOpened;

export default formModalSlice.reducer;
