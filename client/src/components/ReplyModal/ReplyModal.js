import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Avatar, Button, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";
import { openModal } from "../../features/loginModal/loginModalSlice";
import { deleteReply, replyComment } from "../../features/replies/replyApi";

import BackDrop from "../../UI/BackDrop";
import ButtonWrapper from "../../UI/ButtonWrapper";

import useDisableBodyScroll from "../../hooks/UseDisableBodyScroll";

import styles from "./ReplyModal.module.scss";

const ReplyComment = ({ onClose, comment, replies, user, updateReplies }) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

  const { message, _id: commentId, postId, author: commentAuthor } = comment;
  const dispatch = useDispatch();

  const handleReplyMessageChange = (e) => {
    setReplyMessage(e.target.value);
  };

  const deleteComReply = ({ commentId, postId, replyId, authorId }) => {
    deleteReply({ commentId, postId, replyId, authorId }).then(() => {
      updateReplies("delete", { replyId });
    });
  };

  const sendReply = () => {
    if (user) {
      if (replyMessage.trim()) {
        const replyData = {
          message: replyMessage,
          commentId,
          author: user._id,
        };
        setSending(true);
        replyComment({ postId, commentId, replyData })
          .then((resp) => {
            setSending(false);
            updateReplies("add", {
              reply: {
                ...resp.reply,
                author: {
                  _id: user._id,
                  name: user.name,
                  surname: user.surname,
                },
              },
            });
          })
          .finally(() => setReplyMessage(""));
      }
    } else {
      dispatch(openModal());
    }
  };

  const renderReplies = () => {
    if (replies) {
      return replies.map((reply) => (
        <li key={reply._id}>
          <span className={styles.replyCont}>
            <Avatar sx={{ color: "#334063" }} />
            {`${reply.author.name} ${reply.author.surname}`}
          </span>
          <div className={styles.replyMessage}>{reply.message}</div>
          {user && reply.author._id === user._id && (
            <ButtonWrapper
              onClick={() =>
                deleteComReply({
                  postId,
                  commentId,
                  replyId: reply._id,
                  authorId: reply.author._id,
                })
              }
            >
              <span className={styles.deleteIcon}>
                <DeleteIcon />
              </span>
            </ButtonWrapper>
          )}
        </li>
      ));
    }
  };

  return (
    <div className={styles.modal}>
      <Button onClick={onClose}>
        <span className={styles.closeIcon}>
          <CloseIcon />
        </span>
      </Button>
      <div className={styles.repliesCont}>
        <div className={styles.comAuthor}>
          <span>
            <span>
              <Avatar sx={{ color: "#334063" }} />
            </span>
            <span>{`${commentAuthor.name} ${commentAuthor.surname}`}</span>
          </span>
          <div className={styles.comment}> {message}</div>
        </div>
        <ul className={styles.replies}>{renderReplies()}</ul>
        <div className={styles.textBox}>
          <textarea
            value={replyMessage}
            onChange={(e) => handleReplyMessageChange(e)}
            placeholder="Reply..."
          />
          {sending ? (
            <CircularProgress
              sx={{
                width: "1.5rem",
                color: "#334063",
              }}
            />
          ) : (
            <ButtonWrapper onClick={sendReply}>
              <span className={styles.sendIcon}>
                <SendIcon />
              </span>
            </ButtonWrapper>
          )}
        </div>
      </div>
    </div>
  );
};

function ReplyModal(props) {
  useDisableBodyScroll(true);

  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={props.onClose} />,
        document.getElementById("backdrop-container")
      )}
      {ReactDOM.createPortal(
        <ReplyComment {...props} />,
        document.getElementById("modal-container")
      )}
    </>
  );
}

export default ReplyModal;
