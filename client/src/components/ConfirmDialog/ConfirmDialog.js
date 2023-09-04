import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import styles from "./ConfirmDialog.module.scss";

function ConfirmDialog({ open, handleClose, handleAction, actionName }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={styles.dialog}
    >
      <DialogTitle
        id="alert-dialog-title"
        className={styles.dialogTitle}
        sx={{ fontSize: "1.7rem", color: "#334063" }}
      >
        {`Are you sure you want to ${actionName} this post`}
      </DialogTitle>
      <DialogActions className={styles.dialogButtons}>
        <Button onClick={handleClose}>No</Button>
        <Button
          onClick={() => {
            handleAction();
            handleClose();
          }}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
