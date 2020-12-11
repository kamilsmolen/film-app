import { createAsyncThunk } from "@reduxjs/toolkit";

import { buildSearchUrl, fetchData } from "../../api/client";

export const fetchMovies = createAsyncThunk(
  "grid/fetchMovies",
  async ({ query, page }: { query: string; page?: number }) => {
    const url = buildSearchUrl(query, page);
    const response = await fetchData(url);
    return response;
  }
);
