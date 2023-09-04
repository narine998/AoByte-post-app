import React, { useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import StarRateIcon from "@mui/icons-material/StarRate";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import { Avatar } from "@mui/material";

import { createFormattedDate } from "../../helpers";

import styles from "./Post.module.scss";

export function PostInfo({ post }) {
  const { name, surname } = post.authorData || post.authorId;
  const [briefText, setBriefText] = useState(true);

  const getMore = () => {
    setBriefText((prev) => !prev);
  };

  return (
    <>
      <div className={styles.creator}>
        <h2>
          <span>
            <Avatar sx={{ color: "#334063", width: 55, height: 55 }} />
          </span>
          <span className={styles.userInfo}>
            <span>{`${name} ${surname}`}</span>
            <span>
              <span>{createFormattedDate(post.createdDate)}</span>
              {post.public ? <PublicIcon /> : <LockOpenIcon />}
            </span>
          </span>
        </h2>
        <div className={styles.category}>
          <span>
            <CategoryTwoToneIcon />
            {post.category}
          </span>
          <span className={styles.rating}>
            <StarRateIcon />
            {post.averageRating}
          </span>
        </div>
      </div>

      <span className={styles.title}>{post.title}</span>
      <p className={styles.description}>
        {briefText ? post.description.split(".")[0] + "..." : post.description}
        <span onClick={getMore}>{briefText ? "more" : "less"} </span>
      </p>
      {post.imageUrl && (
        <div>
          <img
            className={styles.postImg}
            src={post.imageUrl}
            alt={post.title}
          />
        </div>
      )}
    </>
  );
}
