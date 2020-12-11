import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { fetchMovies } from "../common/fetchMovies";

export interface SearchResult {
  Title?: string;
  Year?: string;
  Poster?: string;
  imdbID: string;
  Type?: string;
}

interface GridState {
  results: SearchResult[];
  totalPages: number;
  currentPage: number;
  showGrid: boolean;
  selectedItems: SearchResult[];
  isFormModalOpened: boolean;
}

const initialState: GridState = {
  results: [],
  totalPages: 0,
  currentPage: 1,
  showGrid: false,
  selectedItems: [],
  isFormModalOpened: false,
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    cacheCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      state.selectedItems = [];
    },
    toggleSelectedItem: (state, action: PayloadAction<string>) => {
      const selectedItemsIndex = state.selectedItems
        .map((item) => item.imdbID)
        .indexOf(action.payload);
      if (selectedItemsIndex !== -1) {
        state.selectedItems = state.selectedItems.splice(selectedItemsIndex, 1);
      } else {
        const newItemIndex = state.results
          .map((item) => item.imdbID)
          .indexOf(action.payload);
        state.selectedItems = [
          ...state.selectedItems,
          state.results[newItemIndex],
        ];
      }
    },
    toggleFormModal: (state, action: PayloadAction<boolean>) => {
      state.isFormModalOpened = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.results = action.payload.Search;
      state.totalPages = Math.ceil(Number(action.payload.totalResults) / 10);
      state.showGrid = true;
    });
    builder.addCase(fetchMovies.pending, (state) => {
      state.showGrid = false;
    });
  },
});

export const {
  cacheCurrentPage,
  toggleSelectedItem,
  toggleFormModal,
} = gridSlice.actions;

export const selectResults = (state: RootState) => state.grid.results;
export const selectTotalPages = (state: RootState) => state.grid.totalPages;
export const selectCurrentPage = (state: RootState) => state.grid.currentPage;
export const selectShowGrid = (state: RootState) => state.grid.showGrid;
export const selectSelectedItems = (state: RootState) =>
  state.grid.selectedItems;
export const selectIsFormModalOpened = (state: RootState) =>
  state.grid.isFormModalOpened;

export default gridSlice.reducer;
