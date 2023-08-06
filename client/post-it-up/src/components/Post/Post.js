import React, { useState } from "react";
import { Button } from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Layout from "../../UI/Layout";
import Comments from "../Comments/Comments";

import styles from "./Post.module.scss";

function Post({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [briefText, setBriefText] = useState(true);

  const showAllComments = () => {
    setShowComments((prevComments) => !prevComments);
  };

  const getFullDescription = () => {
    setBriefText((prev) => !prev);
  };

  return (
    <Layout disabled={post.disabled ? "disabled" : ""}>
      <span className={styles.title}>{post.title}</span>
      <p className={styles.description}>
        {briefText ? post.description.split(".")[0] + "..." : post.description}
        <span onClick={getFullDescription}>{briefText ? "more" : "less"} </span>
      </p>
      <div className={styles.actions}>
        <span>
          <Button>
            <span></span>
            <FavoriteIcon />
          </Button>
        </span>
        <span>
          <Button onClick={showAllComments}>
            <span>{post.comments.length || ""}</span>
            <ModeCommentIcon />
          </Button>
        </span>
      </div>
      <div>
        <hr />
      </div>
      <div className={styles.commentLikeCont}>
        <Button>
          <FavoriteIcon />
          Like
        </Button>
        <Button onClick={showAllComments}>
          <ModeCommentIcon />
          Comment
        </Button>
      </div>

      {showComments && (
        <Comments commentData={post.comments} postId={post.id} />
      )}
    </Layout>
  );
}

export default Post;
