import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { buildSearchUrl, fetchData } from '../../api/client';
import { RootState } from '../../app/store';

export interface SearchResult {
  Title?: string;
  Year?: string;
  Poster?: string;
  imdbID: string;
  Type?: string;
}

interface GridState {
  results: SearchResult[];
}

const initialState: GridState = {
  results: [],
};

export const fetchMovies = createAsyncThunk(
  "grid/fetchMovies",
  async (query: string) => {
    const url = buildSearchUrl(query);
    const response = await fetchData(url);
    return response.Search;
  }
);

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.results = action.payload;
    });
  },
});

export const selectResults = (state: RootState) => state.grid.results;

export default gridSlice.reducer;
