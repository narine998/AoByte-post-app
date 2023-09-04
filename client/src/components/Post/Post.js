import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";

import Layout from "../../UI/Layout";
import Comments from "../Comments/Comments";

import { PostInfo } from "./PostInfo";
import { PostActions } from "./PostActions";

import { ratePost } from "../../features/posts/postsApi";
import { selectUserInfo } from "../../features/user/userSlice";
import { getComments } from "../../features/comments/commentsApi";
import { openModal } from "../../features/loginModal/loginModalSlice";

import styles from "./Post.module.scss";

function Post({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [comments, setComments] = useState([]);

  const { user } = useSelector(selectUserInfo);

  const userRate = post.ratings.find((rate) => rate.userId === user?._id);

  const [hasRated, setHasRated] = useState(userRate?.rate ? true : false);
  const [rate, setRate] = useState(userRate?.rate || 0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showComments) {
      setFetching(true);
      getComments(post._id).then((response) => {
        setComments(response.comments);
        setFetching(false);
      });
    }
  }, [showComments]);

  const showAllComments = () => {
    setShowComments((prevComments) => !prevComments);
  };

  const handleRatePost = () => {
    if (user) {
      ratePost(post._id, rate).then(() => {
        setHasRated(true);
      });
    } else {
      dispatch(openModal());
    }
  };

  const updateComments = (info, mode) => {
    switch (mode) {
      case "add":
        setComments((prevComs) => [...prevComs, info.comment]);
        break;
      case "delete":
        setComments((prevComs) =>
          prevComs.filter((com) => com._id !== info.commentId)
        );
      case "edit":
        setComments((prevComs) => {
          const comments = [...prevComs];
          const idx = comments.findIndex((com) => com._id === info.commentId);
          comments[idx] = info.comment;
          return comments;
        });
    }
  };

  return (
    <Layout>
      <PostInfo post={post} />
      <PostActions
        showAllComments={showAllComments}
        comments={comments}
        post={post}
      />
      <div className={styles.ratePart}>
        <Button onClick={handleRatePost}>
          {hasRated ? "Rated" : "Rate this post"}
        </Button>
        <Rating
          sx={{ fontSize: "3rem" }}
          name="simple-controlled"
          value={rate}
          onChange={(event, newValue) => {
            setRate((prev) => {
              if (prev === newValue) {
                setHasRated(true);
              }
              return newValue;
            });
          }}
        />
      </div>
      {showComments && (
        <Comments
          commentData={comments}
          postId={post._id}
          updateComments={updateComments}
          fetching={fetching}
        />
      )}
    </Layout>
  );
}

export default Post;
