import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { buildIdUrl, fetchData } from '../../api/client';
import { RootState } from '../../app/store';

export interface Ratings {
  source: string;
  value: string;
}

export interface FilmDetails {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Ratings[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

interface ModalState {
  details?: FilmDetails;
  isOpened: boolean;
}

const initialState: ModalState = {
  details: undefined,
  isOpened: false,
};

export const fetchMovieDetails = createAsyncThunk(
  "grid/fetchMovieDetails",
  async (id: string) => {
    const url = buildIdUrl(id);
    const response = await fetchData(url);
    return response;
  }
);

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isOpened = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.details = action.payload;
      state.isOpened = true;
    });
  },
});

export const { toggleModal } = modalSlice.actions;

export const selectDetails = (state: RootState) => state.modal.details;
export const selectIsModalOpened = (state: RootState) => state.modal.isOpened;

export default modalSlice.reducer;
