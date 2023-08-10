import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";

import BackDrop from "../../UI/BackDrop";
import ButtonWrapper from "../../UI/ButtonWrapper";

import useDisableBodyScroll from "../../hooks/UseDisableBodyScroll";
import { replyPostComment } from "../../features/posts/postsSlice";

import styles from "./ReplyModal.module.scss";

const ReplyComment = ({
  onClose,
  postId,
  commentId,
  replies,
  text,
  avatar,
}) => {
  const [replyData, setReplyData] = useState("");
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();

  const handleReplyDataChange = (e) => {
    setReplyData(e.target.value);
  };

  const deleteReply = () => {};
  const sendReply = () => {
    if (replyData.trim()) {
      setSending(true);
      dispatch(replyPostComment({ postId, commentId, replyText: replyData }))
        .then(() => setSending(false))
        .finally(() => setReplyData(""));
    }
  };

  const renderReplies = () => {
    if (replies) {
      return replies.map((reply) => (
        <li key={reply.id}>
          <span className={styles.replyCont}>
            <img className={styles.avatar} src={avatar} alt="avatar" />
            {reply.text}
          </span>
          <ButtonWrapper onClick={deleteReply}>
            <span className={styles.deleteIcon}>
              <DeleteIcon />
            </span>
          </ButtonWrapper>
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
        <h1>
          <span>
            <img src={avatar} />
          </span>
          {text}
        </h1>
        <ul className={styles.replies}>{renderReplies()}</ul>
        <div className={styles.textBox}>
          <textarea
            value={replyData}
            onChange={(e) => handleReplyDataChange(e)}
            placeholder="Reply..."
          />
          {sending ? (
            <CircularProgress
              color="warning"
              sx={{
                width: "2.4rem",
                position: "absolute",
                top: "14%",
                right: "8%",
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
