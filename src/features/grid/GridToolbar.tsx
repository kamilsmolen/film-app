import React from "react";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

import { cacheErrorMessage } from "../errorModal/errorModalSlice";
import { FormModal } from "./FormModal";
import { selectSelectedItems } from "./gridSlice";
import styles from "./GridToolbar.module.css";

export function GridToolbar() {
  const selectedItems = useSelector(selectSelectedItems);
  const selectedItemsNum = selectedItems.length;
  const isDeleteSectionVisible = selectedItemsNum !== 0;

  const dispatch = useDispatch();

  const handleClickDelete = () => {
    dispatch(
      cacheErrorMessage("You can not remove items. Functionality to be added.")
    );
  };

  const renderDeleteSection = () => (
    <div className={styles.deleteSection}>
      <Typography color="primary" component="div">
        {selectedItemsNum} selected
      </Typography>
      <Tooltip title="Delete" onClick={handleClickDelete} color="primary">
        <IconButton aria-label="delete" disabled={selectedItemsNum === 0}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>{" "}
    </div>
  );

  return (
    <Toolbar>
      <FormModal />
      {isDeleteSectionVisible && renderDeleteSection()}
    </Toolbar>
  );
}
