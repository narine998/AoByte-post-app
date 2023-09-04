import React from "react";
import { Footer, Header, Post } from "..";

import styles from "./SinglePost.module.scss";

function SinglePost({ post }) {
  return (
    <div className="container">
      <Header showCreatePostBtn={true} />
      <div className={styles.post}>
        <Post post={post} />
      </div>
      <Footer />
    </div>
  );
}

export default SinglePost;
