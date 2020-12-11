import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { buildSearchUrl, fetchData } from "../../api/client";
import { RootState } from "../../app/store";

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
}

const initialState: GridState = {
  results: [],
  totalPages: 0,
  currentPage: 1,
  showGrid: false,
};

export const fetchMovies = createAsyncThunk(
  "grid/fetchMovies",
  async ({ query, page }: { query: string; page?: number }) => {
    const url = buildSearchUrl(query, page);
    const response = await fetchData(url);
    return response;
  }
);

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    cacheCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.results = action.payload.Search;
      state.totalPages = Math.ceil(Number(action.payload.totalResults) / 10);
      state.showGrid = true;
    });
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.showGrid = false;
    });
  },
});

export const { cacheCurrentPage } = gridSlice.actions;

export const selectResults = (state: RootState) => state.grid.results;
export const selectTotalPages = (state: RootState) => state.grid.totalPages;
export const selectCurrentPage = (state: RootState) => state.grid.currentPage;
export const selectShowGrid = (state: RootState) => state.grid.showGrid;

export default gridSlice.reducer;
