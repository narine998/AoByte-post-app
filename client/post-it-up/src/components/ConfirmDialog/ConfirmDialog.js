import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

function ConfirmDialog({ open, handleClose, handleDelete }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this comment?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button
          onClick={() => {
            handleClose();
            handleDelete();
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
