import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useDispatch, useSelector } from "react-redux";

import { selectUserInfo } from "../../features/user/userSlice";
import { openModal } from "../../features/loginModal/loginModalSlice";

import {
  deleteComment,
  likeComment,
} from "../../features/comments/commentsApi";
import { getReplies } from "../../features/replies/replyApi";

import { ConfirmDialog, ReplyModal } from "../";
import { EditCommentDialog } from "./EditCommentDialog";

import styles from "./Comment.module.scss";

function Comment({ comment, updateComments }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { user } = useSelector(selectUserInfo);
  const [likes, setLikes] = useState(comment.likes);
  const [hasLiked, setHasLiked] = useState(comment.likes.includes(user?._id));
  const [replies, setReplies] = useState([]);

  const dispatch = useDispatch();

  const { message, rating, _id, author, postId } = comment;

  useEffect(() => {
    getReplies({ postId, commentId: _id }).then((resp) => {
      setReplies(resp.replies);
    });
  }, []);

  const openEditModal = () => {
    setOpenEdit(true);
  };
  const closeEditModal = () => {
    setOpenEdit(false);
  };

  const closeDeleteModal = () => {
    setOpenDelete(false);
  };

  const openDeleteModal = () => {
    setOpenDelete(true);
  };

  const handleDeleteComment = () => {
    deleteComment({ postId, commentId: _id, authorId: author._id }).then(() => {
      updateComments({ commentId: _id }, "delete");
    });
  };

  const handleReplyClick = () => {
    getReplies({ postId, commentId: _id }).then((resp) => {
      setReplies(resp.replies);
      setOpenReply((prevReply) => !prevReply);
    });
  };

  const handleLikeClick = () => {
    if (user) {
      setHasLiked((prev) => !prev);
      likeComment({ postId, commentId: comment._id }).then((resp) => {
        setLikes(resp.likes);
      });
    } else {
      dispatch(openModal());
    }
  };

  const updateReplies = (mode, info) => {
    switch (mode) {
      case "add":
        setReplies((prevReplies) => [...prevReplies, info.reply]);
        break;
      case "delete":
        setReplies((prevReplies) =>
          prevReplies.filter((reply) => reply._id !== info.replyId)
        );
    }
  };

  return (
    <div>
      <div className={styles.commentBox}>
        <span>
          <Avatar sx={{ color: "#334063" }} />
        </span>
        <div className={styles.comment}>
          <div className={styles.creator}>
            <span>{`${author.name} ${author.surname}`}</span>
            <span className={styles.rate}>
              <span className={styles.starIcon}>
                <StarIcon />
              </span>
              {rating}
            </span>
          </div>
          <p>{message}</p>
        </div>
      </div>
      <div className={styles.replyComment}>
        <div className={styles.actionBox}>
          <span>{likes.length || ""}</span>
          <ThumbUpIcon
            onClick={handleLikeClick}
            className={
              user
                ? hasLiked
                  ? styles.liked
                  : styles.disliked
                : styles.disliked
            }
          />
          <span onClick={handleReplyClick}>
            <span>{replies.length || ""}</span>
            <ReplyIcon />
          </span>
          {user && author._id === user._id && (
            <>
              <span onClick={openDeleteModal}>
                <DeleteIcon />
              </span>
              <span onClick={openEditModal}>
                <EditIcon />
              </span>
            </>
          )}
        </div>
        {openReply && (
          <ReplyModal
            onClose={handleReplyClick}
            comment={comment}
            replies={replies}
            user={user}
            updateReplies={updateReplies}
          />
        )}
        <ConfirmDialog
          open={openDelete}
          handleClose={closeDeleteModal}
          handleAction={handleDeleteComment}
          actionName="delete"
        />
        <EditCommentDialog
          open={openEdit}
          author={author}
          handleClose={closeEditModal}
          updateComments={updateComments}
          oldComment={comment}
        />
      </div>
    </div>
  );
}

export default Comment;
