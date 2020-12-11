import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { selectIsModalOpened, toggleModal } from "./formModalSlice";

export function FormModal() {
  const isOpened = useSelector(selectIsModalOpened);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(toggleModal(true));
  };

  const handleClose = () => {
    dispatch(toggleModal(false));
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new
      </Button>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="year"
            label="Year"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="director"
            label="Director"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="type"
            label="Type"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
