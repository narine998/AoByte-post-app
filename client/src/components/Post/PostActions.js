import React, { useState } from "react";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../features/user/userSlice";
import { getLikedUsers, likePost } from "../../features/posts/postsApi";
import { openModal } from "../../features/loginModal/loginModalSlice";

import styles from "./Post.module.scss";

export function PostActions({ showAllComments, comments, post }) {
  const [likes, setLikes] = useState(post.likes);
  const { user } = useSelector(selectUserInfo);
  const [hasLiked, setHasLiked] = useState(likes.includes(user?._id));
  const [usersWhoLiked, setUsersWhoLiked] = useState([]);
  const [showLikedUsers, setShowLikedUsers] = useState(false);

  const dispatch = useDispatch();

  const handleLikeClick = () => {
    if (user) {
      setHasLiked((prev) => !prev);
      likePost(post._id).then((resp) => {
        setLikes(resp.likes);
      });
    } else {
      dispatch(openModal());
    }
  };

  const getUsersWhoLiked = () => {
    getLikedUsers(post._id).then((resp) => {
      setUsersWhoLiked(resp.users);
      setShowLikedUsers(true);
    });
  };

  const closeLikedUsers = () => {
    setShowLikedUsers(false);
  };

  return (
    <>
      <div className={styles.actions}>
        <span>
          <Button>
            <span onClick={getUsersWhoLiked}>{likes.length || ""}</span>
            <FavoriteIcon
              onClick={handleLikeClick}
              className={
                user
                  ? hasLiked
                    ? styles.liked
                    : styles.disliked
                  : styles.disliked
              }
            />
          </Button>
        </span>
        <span>
          <Button onClick={showAllComments}>
            <span>{comments.length || ""}</span>
            <ModeCommentIcon />
          </Button>
        </span>
        <Modal
          open={showLikedUsers}
          onClose={closeLikedUsers}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ul className={styles.modal}>
            {usersWhoLiked.map((user) => (
              <li key={user._id}>{`${user.name} ${user.surname}`}</li>
            ))}
          </ul>
        </Modal>
      </div>
      <div>
        <hr />
      </div>
      <div className={styles.commentLikeCont}>
        <Button onClick={handleLikeClick}>
          <FavoriteIcon />
          Like
        </Button>
        <Button onClick={showAllComments}>
          <ModeCommentIcon />
          Comment
        </Button>
      </div>
    </>
  );
}
