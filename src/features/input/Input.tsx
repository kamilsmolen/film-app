import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { cacheQuery } from "./inputSlice";
import { fetchMovies } from "../common/fetchMovies";

export function Input() {
  const input = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const dispatchTitle = () => {
    if (input && input.current) {
      dispatch(fetchMovies({ query: input.current.value }));
      dispatch(cacheQuery(input.current.value));
    }
  };

  const handleClick = () => {
    dispatchTitle();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatchTitle();
    }
  };

  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField
          inputRef={input}
          id="standard-basic"
          label="Title"
          onKeyPress={handleKeyPress}
        />
        <Button variant="contained" onClick={handleClick}>
          Search
        </Button>
      </form>
    </div>
  );
}
