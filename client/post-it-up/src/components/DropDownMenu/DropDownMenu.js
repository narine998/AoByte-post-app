import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { fetchPostsByUser } from "../../features/user/userSlice";

import { updatePostPrivacy } from "../../features/posts/postsSlice";

import styles from "./DropDownMenu.module.scss";

function DropDownMenu({ userId, postId, onClose, editBtnHandler }) {
  const dispatch = useDispatch();

  const deletePost = () => {
    dispatch(updatePostPrivacy({ postId, public: false })).then((resp) => {
      if (resp.payload && resp.payload.message) {
        dispatch(fetchPostsByUser(userId));
        alert("Post successfully deleted!");
      }
      onClose();
    });
  };
  const publishPost = () => {
    dispatch(updatePostPrivacy({ postId, public: true })).then((resp) => {
      if (resp.payload && resp.payload.message) {
        dispatch(fetchPostsByUser(userId));
        alert("Post successfully published!");
      }
      onClose();
    });
  };

  return (
    <div className={styles.dropdown}>
      <div>
        <CloseIcon fontSize="large" onClick={onClose} />
      </div>
      <ul className={styles.dropdownMenu}>
        <li>
          <Button onClick={editBtnHandler}>Edit</Button>
        </li>
        <li>
          <Button onClick={deletePost}>Delete</Button>
        </li>
        <li>
          <Button onClick={publishPost}>Publish</Button>
        </li>
      </ul>
    </div>
  );
}

export default DropDownMenu;
