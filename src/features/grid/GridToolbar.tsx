import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { selectSelectedItems } from "./gridSlice";
import { FormModal } from "./FormModal";
import { cacheErrorMessage } from "../errorModal/errorModalSlice";

export function GridToolbar() {
  const selectedItems = useSelector(selectSelectedItems);
  const selectedItemsNum = selectedItems.length;

  const dispatch = useDispatch();

  const handleClickDelete = () => {
    dispatch(
      cacheErrorMessage("You can not remove items. Functionality to be added.")
    );
  };

  return (
    <Toolbar>
      <Typography color="inherit" variant="subtitle1" component="div">
        {selectedItemsNum} selected
      </Typography>

      <Tooltip title="Delete" onClick={handleClickDelete}>
        <IconButton aria-label="delete" disabled={selectedItemsNum === 0}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <FormModal />
    </Toolbar>
  );
}
