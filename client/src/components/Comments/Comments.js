import React from "react";

import CircularProgress from "@mui/joy/CircularProgress";

import { Comment, NewComment } from "../";

import styles from "./Comments.module.scss";

function Comments({ commentData, postId, updateComments, fetching }) {
  const renderComments = () => {
    if (commentData) {
      return commentData.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          updateComments={updateComments}
        />
      ));
    }
  };

  return (
    <div className={styles.commentsContainer}>
      {fetching ? (
        <div className={styles.progress}>
          <CircularProgress />
        </div>
      ) : (
        renderComments(commentData)
      )}
      <NewComment postId={postId} updateComments={updateComments} />
    </div>
  );
}

export default Comments;
