import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import detailsModalReducer from "../features/detailsModal/detailsModalSlice";
import errorModalReducer from "../features/errorModal/errorModalSlice";
import gridReducer from "../features/grid/gridSlice";
import inputReducer from "../features/input/inputSlice";

export const store = configureStore({
  reducer: {
    grid: gridReducer,
    input: inputReducer,
    detailsModal: detailsModalReducer,
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
