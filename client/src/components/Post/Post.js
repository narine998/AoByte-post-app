import React, { useEffect, useState } from "react";

import { getComments } from "../../features/comments/commentsApi";

import Layout from "../../UI/Layout";
import Comments from "../Comments/Comments";

import { PostInfo } from "./PostInfo";
import { PostActions } from "./PostActions";

function Post({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [comments, setComments] = useState([]);

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
