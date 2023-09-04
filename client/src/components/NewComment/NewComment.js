import React, { useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";

import ButtonWrapper from "../../UI/ButtonWrapper";

import { sendNewComment } from "../../features/comments/commentsApi";
import { selectUserInfo } from "../../features/user/userSlice";
import { openModal } from "../../features/loginModal/loginModalSlice";

import styles from "./NewComment.module.scss";

function NewComment({ postId, updateComments }) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector(selectUserInfo);

  const handleTextChange = (e) => {
    setMessage(e.target.value);
  };

  const sendComment = (postId) => {
    if (user) {
      if (message.trim()) {
        const newComment = {
          message,
          author: user._id,
          postId,
        };
        setSending(true);
        sendNewComment(newComment)
          .then((resp) => {
            setSending(false);
            updateComments(
              {
                comment: {
                  ...resp.comment,
                  author: {
                    _id: user._id,
                    name: user.name,
                    surname: user.surname,
                  },
                },
              },
              "add"
            );
          })
          .finally(() => setMessage(""));
      }
    } else {
      dispatch(openModal());
    }
  };

  return (
    <div className={styles.commentCont}>
      <div className={styles.commentMessage}>
        <textarea
          className={styles.textarea}
          placeholder="Add a new comment..."
          value={message}
          onChange={handleTextChange}
        />

        {sending ? (
          <CircularProgress
            color="warning"
            sx={{ position: "absolute", top: "50%", right: "4%" }}
          />
        ) : (
          <ButtonWrapper onClick={() => sendComment(postId)}>
            <span className={styles.sendIcon}>
              <SendIcon />
            </span>
          </ButtonWrapper>
        )}
      </div>
    </div>
  );
}

export default NewComment;
