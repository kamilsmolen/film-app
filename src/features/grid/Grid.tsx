import React, { ChangeEvent, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";

import { selectQuery } from "../input/inputSlice";
import { fetchMovieDetails } from "../modal/modalSlice";
import styles from "./Grid.module.css";
import {
  cacheCurrentPage,
  fetchMovies,
  SearchResult,
  selectCurrentPage,
  selectResults,
  selectTotalPages,
  selectShowGrid,
  selectSelectedItems,
  toggleSelectedItem,
} from "./gridSlice";
import { FormModal } from "../formModal/FormModal";

export function Grid() {
  const results = useSelector(selectResults);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);
  const query = useSelector(selectQuery);
  const showGrid = useSelector(selectShowGrid);
  const selectedItems = useSelector(selectSelectedItems);

  const dispatch = useDispatch();

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    page: number
  ) => {
    if (page === currentPage) return;

    dispatch(fetchMovies({ query: query, page: page }));
    dispatch(cacheCurrentPage(page));
  };

  const handleRowClick = (id: string) => {
    dispatch(fetchMovieDetails(id));
  };

  const handleCheckboxChange = (id: string) => {
    dispatch(toggleSelectedItem(id));
  };

  const handleDelete = () => {
    console.log("error");
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

  const renderToolbar = () => {
    const selectedItemsNum = selectedItems.length;

    return (
      <Toolbar>
        <Typography color="inherit" variant="subtitle1" component="div">
          {selectedItemsNum} selected
        </Typography>

        <Tooltip title="Delete" onClick={handleDelete}>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <FormModal />
      </Toolbar>
    );
  };

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
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePaginationChange}
      />
    </div>
  );

  return (
    <div>
      {showGrid ? (
        <div>
          {renderToolbar()}
          {renderGrid()}{" "}
        </div>
      ) : null}
    </div>
  );
}
