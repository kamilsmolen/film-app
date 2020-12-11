import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import gridReducer from '../features/grid/gridSlice';
import inputReducer from '../features/input/inputSlice';
import modalReducer from '../features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    grid: gridReducer,
    input: inputReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
