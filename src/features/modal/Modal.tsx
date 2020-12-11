import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import { selectDetails, selectIsModalOpened, toggleModal } from './modalSlice';

export const ModalFieldsConfig = [
  "Title",
  "Year",
  "Country",
  "Director",
  "imdbRating",
  "imdbVotes",
  "Plot",
  "Actors",
  "Writer",
  "Awards",
  "BoxOffice",
  "Genre",
  "Language",
  "Production",
  "Runtime",
] as const;

export const ModalFieldLabels = [
  "Title",
  "Year",
  "Country",
  "Director",
  "Imdb Rating",
  "Imdb Votes",
  "Plot",
  "Actors",
  "Writer",
  "Awards",
  "Box Office",
  "Genre",
  "Language",
  "Production",
  "Runtime",
];

export function Modal() {
  const details = useSelector(selectDetails);
  const isOpened = useSelector(selectIsModalOpened);

  const dispatch = useDispatch();

  const onModalClose = () => {
    dispatch(toggleModal(false));
  };

  const renderModalBody = () => (
    <div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {ModalFieldsConfig.map((field, key) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {ModalFieldLabels[key]}
                </TableCell>
                <TableCell component="th" scope="row">
                  {details ? details[field] : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <img
          className="modal-body-image-size"
          src={details ? details.Poster : ""}
          alt={details ? details.Title : ""}
        />
      </div>
    </div>
  );

  return (
    <div>
      <Dialog
        onClose={onModalClose}
        aria-labelledby="simple-dialog-title"
        open={isOpened}
      >
        <DialogTitle>
          {details ? `${details.Title}, ${details.Year}` : ""}{" "}
        </DialogTitle>
        {renderModalBody()}
      </Dialog>
    </div>
  );
}
