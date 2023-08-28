import React, { useMemo, useState } from "react";
import { Avatar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useDispatch } from "react-redux";

import { ConfirmDialog, ReplyModal } from "../";
import ButtonWrapper from "../../UI/ButtonWrapper";

import { deletePostComment } from "../../features/posts/postsSlice";

import styles from "./Comment.module.scss";

function Comment({ postId, comment, sortDir }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openReplyModal, setOpenReplyModal] = useState(false);

  const dispatch = useDispatch();
  const { text, rating, id } = comment;

  const handleDeleteComment = (postId, commentId) => {
    dispatch(deletePostComment({ postId, commentId, direction: sortDir }));
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleReplyClick = () => {
    setOpenReplyModal((prevReply) => !prevReply);
  };

  return (
    <>
      <div className={styles.comment}>
        <Avatar sx={{ color: "#334063" }} />
        {text}
        <span className={styles.rate}>
          <span className={styles.starIcon}>
            <StarIcon />
          </span>
          {rating}
        </span>
        <ConfirmDialog
          open={openDialog}
          handleClose={handleDialogClose}
          handleDelete={() => handleDeleteComment(postId, id)}
        />
        <ButtonWrapper onClick={() => setOpenDialog(true)}>
          <span className={styles.deleteIcon}>
            <DeleteIcon />
          </span>
        </ButtonWrapper>
      </div>
      <div className={styles.replyComment}>
        <div className={styles.actionBox}>
          <span>
            <ThumbUpIcon />
            {/* {likes ? likes : ""} */}
          </span>
          <Button onClick={handleReplyClick}>
            <span>{comment.replies.length || ""}</span>
            <ReplyIcon />
          </Button>
        </div>
        {openReplyModal && (
          <ReplyModal
            onClose={handleReplyClick}
            replies={comment.replies}
            postId={postId}
            commentId={id}
            text={text}
          />
        )}
      </div>
    </>
  );
}

export default Comment;
