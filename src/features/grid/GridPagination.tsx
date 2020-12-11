import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "@material-ui/lab/Pagination";

import { selectQuery } from "../input/inputSlice";
import {
  cacheCurrentPage,
  fetchMovies,
  selectCurrentPage,
  selectTotalPages,
} from "./gridSlice";

export function GridPagination() {
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);
  const query = useSelector(selectQuery);

  const dispatch = useDispatch();

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    page: number
  ) => {
    if (page === currentPage) return;

    dispatch(fetchMovies({ query: query, page: page }));
    dispatch(cacheCurrentPage(page));
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handlePaginationChange}
    />
  );
}
