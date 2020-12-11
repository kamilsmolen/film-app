import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { fetchMovieDetails } from "../common/fetchMovieDetails";
import styles from "./Grid.module.css";
import { GridPagination } from "./GridPagination";
import {
  SearchResult,
  selectResults,
  selectSelectedItems,
  selectShowGrid,
  toggleSelectedItem,
} from "./gridSlice";
import { GridToolbar } from "./GridToolbar";

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
              <TableCell>Title</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Type</TableCell>
              <TableCell></TableCell>
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
                    className={styles.gridRow}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleCheckboxChange(result.imdbID)}
                        color="primary"
                      />
                    </TableCell>

                    <TableCell>{result.Title}</TableCell>
                    <TableCell>{result.Year}</TableCell>
                    <TableCell>{result.Type}</TableCell>
                    <TableCell>{renderPoster(result)}</TableCell>
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
