import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { fetchMovieDetails } from "../common/fetchMovieDetails";

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

interface DetailsModalState {
  details?: FilmDetails;
  isOpened: boolean;
}

const initialState: DetailsModalState = {
  details: undefined,
  isOpened: false,
};

export const detailsModalSlice = createSlice({
  name: "detailsModal",
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

export const { toggleModal } = detailsModalSlice.actions;

export const selectDetails = (state: RootState) => state.detailsModal.details;
export const selectIsModalOpened = (state: RootState) =>
  state.detailsModal.isOpened;

export default detailsModalSlice.reducer;
