import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import PublicIcon from "@mui/icons-material/Public";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HideImageIcon from "@mui/icons-material/HideImage";

import EditPost from "../EditPost/EditPost";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { deletePostInfo } from "../../features/posts/postsSlice";
import { fetchPostsByUser } from "../../features/user/userSlice";

import { createFormattedDate } from "../../helpers";
import PostSettings from "../PostSettings/PostSettings";

import styles from "./BriefPost.module.scss";

function BriefPost({ post, userId }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const dispatch = useDispatch();

  const { _id: author } = post.authorId;

  const handleModalClose = () => {
    setOpenEditModal(false);
  };

  const handleModalOpen = () => {
    setOpenEditModal(true);
  };

  const deletePost = () => {
    dispatch(deletePostInfo({ postId: post._id, authorId: author })).then(
      (resp) => {
        if (resp.payload && resp.payload.message) {
          dispatch(fetchPostsByUser(userId));
          alert("Post successfully deleted!");
        }
        handleModalClose();
      }
    );
  };

  const handleConfirmOpen = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmClose = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <div className={styles.post}>
      <div className={styles.postImg}>
        <Link to={`/posts/${post._id}`}>
          {post.imageUrl ? (
            <img src={post.imageUrl} alt={post.title} />
          ) : (
            <HideImageIcon />
          )}
        </Link>
      </div>
      <div className={styles.postInfo}>
        <Link to={`/posts/${post._id}`}>
          <span>{post.title}</span>
        </Link>
        <span className={styles.date}>
          {createFormattedDate(post.createdDate)}
          {post.public ? <PublicIcon /> : <LockOpenIcon />}
        </span>
        <span className={styles.category}>
          <CategoryTwoToneIcon /> {post.category}
        </span>
      </div>
      <div className={styles.setting}>
        <PostSettings
          authorId={author}
          post={post}
          onClose={handleModalClose}
          handleConfirmOpen={handleConfirmOpen}
          editModalOpen={handleModalOpen}
        />
        {openEditModal && (
          <EditPost
            authorId={author}
            post={post}
            handleModalClose={handleModalClose}
          />
        )}
        <ConfirmDialog
          open={openConfirmDialog}
          handleClose={handleConfirmClose}
          handleAction={deletePost}
          actionName="delete"
        />
      </div>
    </div>
  );
}

export default BriefPost;
