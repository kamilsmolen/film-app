import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

import { fetchMovieDetails } from "../modal/modalSlice";
import styles from "./Grid.module.css";
import {
  SearchResult,
  selectResults,
  selectShowGrid,
  selectSelectedItems,
  toggleSelectedItem,
} from "./gridSlice";
import { GridToolbar } from "./GridToolbar";
import { GridPagination } from "./GridPagination";

export function Grid() {
  const results = useSelector(selectResults);

  const showGrid = useSelector(selectShowGrid);
  const selectedItems = useSelector(selectSelectedItems);

  const dispatch = useDispatch();

  const handleRowClick = (id: string) => {
    dispatch(fetchMovieDetails(id));
  };

  const handleCheckboxChange = (id: string) => {
    dispatch(toggleSelectedItem(id));
  };

  const isItemSelected = (id: string) =>
    selectedItems.map((item) => item.imdbID).indexOf(id) !== -1;

  const renderPoster = (result: SearchResult) =>
    result.Poster === "N/A" ? (
      <span>N/A</span>
    ) : (
      <img
        className={styles.imageSize}
        src={result.Poster}
        alt={result.Title}
      />
    );
  const renderGrid = () => (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results &&
              results.map((result, key) => {
                const isSelected = isItemSelected(result.imdbID);
                return (
                  <TableRow
                    key={key}
                    onClick={(e: SyntheticEvent<HTMLTableRowElement>) => {
                      const target = e.target as HTMLInputElement;
                      return (
                        target.tagName.toUpperCase() !== "INPUT" &&
                        handleRowClick(result.imdbID)
                      );
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleCheckboxChange(result.imdbID)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {renderPoster(result)}
                    </TableCell>
                    <TableCell align="right">{result.Title}</TableCell>
                    <TableCell align="right">{result.Year}</TableCell>
                    <TableCell align="right">{result.Type}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  return (
    <div>
      {showGrid ? (
        <div>
          <GridToolbar />
          {renderGrid()}
          <GridPagination />
        </div>
      ) : null}
    </div>
  );
}
