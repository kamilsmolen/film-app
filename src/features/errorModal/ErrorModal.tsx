import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  cacheErrorMessage,
  selectErrorMessage,
  selectIsModalOpened,
  toggleModal,
} from "./errorModalSlice";

export function ErrorModal() {
  const isOpened = useSelector(selectIsModalOpened);
  const errorMessage = useSelector(selectErrorMessage);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleModal(false));
    dispatch(cacheErrorMessage(""));
  };

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Error occured!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
