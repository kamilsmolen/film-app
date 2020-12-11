import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from './Grid.module.css';
import { SearchResult, selectResults } from './gridSlice';

export function Grid() {
  const results = useSelector(selectResults);
  const currentPage = 1;
  const dispatch = useDispatch();

  const getRowNumber = (resultRow: number, currentPage: number) =>
    resultRow + 1 + (currentPage - 1) * 10;

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

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, key) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {getRowNumber(key, currentPage)}
                </TableCell>
                <TableCell align="right">{renderPoster(result)}</TableCell>
                <TableCell align="right">{result.Title}</TableCell>
                <TableCell align="right">{result.Year}</TableCell>
                <TableCell align="right">{result.Type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
