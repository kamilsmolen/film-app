import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormInput from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import { fetchMovies } from "../common/fetchMovies";
import styles from "./Input.module.css";
import { cacheQuery } from "./inputSlice";

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
    <div className={styles.inputContainer}>
      <FormControl fullWidth>
        <InputLabel htmlFor="standard-adornment-amount" color="primary">
          Title
        </InputLabel>
        <FormInput
          id="standard-adornment-amount"
          onKeyPress={handleKeyPress}
          inputRef={input}
          color="primary"
        />
      </FormControl>
      <div className={styles.searchButton}>
        <Button variant="outlined" color="primary" onClick={handleClick}>
          Search
        </Button>
      </div>
    </div>
  );
}
