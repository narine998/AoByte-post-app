import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Comment, NewComment } from "../";
import ButtonWrapper from "../../UI/ButtonWrapper";

import { sortComments } from "../../features/posts/postsSlice";
import { selectSearch } from "../../features/search/searchSlice";

import sortUpPng from "../../assets/sort-up.png";
import sortDownPng from "../../assets/sort-down.png";

import styles from "./Comments.module.scss";

function Comments({ commentData, postId }) {
  const [sortUp, setSortUp] = useState(null);
  const searchValue = useSelector(selectSearch);

  const dispatch = useDispatch();

  const sortComs = (direction) => {
    if (direction !== sortUp) {
      setSortUp(direction);
      dispatch(sortComments({ direction, postId }));
    }
  };

  const renderComments = () => {
    if (commentData) {
      return commentData.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          postId={postId}
          sortDir={sortUp}
        />
      ));
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.commentBox}>
        <ButtonWrapper
          onClick={() => {
            sortComs(true);
          }}
        >
          <img src={sortUpPng} alt="sort-up" />
        </ButtonWrapper>
        <ButtonWrapper
          onClick={() => {
            sortComs(false);
          }}
        >
          <img src={sortDownPng} alt="sort-down" />
        </ButtonWrapper>
      </div>
      {renderComments(commentData)}
      <NewComment id={postId} sortDir={sortUp} />
    </div>
  );
}

export default Comments;
