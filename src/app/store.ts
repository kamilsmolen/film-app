import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import gridReducer from "../features/grid/gridSlice";
import inputReducer from "../features/input/inputSlice";
import modalReducer from "../features/modal/modalSlice";
import formModalReducer from "../features/formModal/formModalSlice";
import errorModalReducer from "../features/errorModal/errorModalSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    grid: gridReducer,
    input: inputReducer,
    modal: modalReducer,
    formModal: formModalReducer,
    errorModal: errorModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
