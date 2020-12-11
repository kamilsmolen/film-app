import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchData, buildIdUrl } from "../../api/client";

export const fetchMovieDetails = createAsyncThunk(
  "grid/fetchMovieDetails",
  async (id: string) => {
    const url = buildIdUrl(id);
    const response = await fetchData(url);
    return response;
  }
);
