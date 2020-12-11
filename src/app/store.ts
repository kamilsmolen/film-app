import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import gridReducer from '../features/grid/gridSlice';
import inputReducer from '../features/input/inputSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    grid: gridReducer,
    input: inputReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
