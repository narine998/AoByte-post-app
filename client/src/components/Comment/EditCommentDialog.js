import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Rating } from "@mui/material";

import { editComment } from "../../features/comments/commentsApi";

import styles from "./Comment.module.scss";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export function EditCommentDialog({
  oldComment,
  open,
  handleClose,
  author,
  updateComments,
}) {
  const [message, setMessage] = useState(oldComment.message);
  const [rate, setRate] = useState(oldComment.rating);

  const { postId, _id } = oldComment;

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const editCommentInfo = () => {
    const comment = {
      message,
      rating: rate,
    };
    editComment({
      postId,
      commentId: _id,
      authorId: author._id,
      comment,
    }).then((resp) => {
      updateComments(
        {
          commentId: _id,
          comment: {
            ...resp.comment,
            author: {
              _id: author._id,
              name: author.name,
              surname: author.surname,
            },
          },
        },
        "edit"
      );
    });
    handleClose();
  };

  return (
    <div className={styles.modal}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            fontWeight: "bold",
            fontSize: "1.8rem",
            color: "#334063",
          }}
          id="customized-dialog-title"
          className={styles.title}
        >
          Edit Comment
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon sx={{ fontSize: "2rem", color: "#334063" }} />
        </IconButton>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          dividers
        >
          <textarea
            value={message}
            onChange={handleChange}
            className={styles.message}
          />
          <Rating
            sx={{ fontSize: "3rem" }}
            name="simple-controlled"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={editCommentInfo}
            sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#334063" }}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
