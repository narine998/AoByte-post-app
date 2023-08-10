import React from "react";
import { Button } from "@mui/material";

import styles from "./DropDownMenu.module.scss";
import { useDispatch } from "react-redux";
import { deleteThisPost } from "../../features/posts/postsSlice";

function DropDownMenu({ postId }) {
  const dispatch = useDispatch();
  const deletePost = () => {
    dispatch(deleteThisPost(postId));
  };

  const editPost = () => {};

  return (
    <div className={styles.dropdown}>
      <ul className={styles.dropdownMenu}>
        <li>
          <Button onClick={editPost}>Edit</Button>
        </li>
        <li>
          <Button onClick={deletePost}>Delete</Button>
        </li>
      </ul>
    </div>
  );
}

export default DropDownMenu;
