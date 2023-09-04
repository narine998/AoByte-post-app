import React from "react";
import ReactDOM from "react-dom";

import BackDrop from "../../UI/BackDrop";

import useDisableBodyScroll from "../../hooks/UseDisableBodyScroll";
import { EditPostModal } from "./EditPostModal";

function EditPost({ authorId, post, handleModalClose }) {
  useDisableBodyScroll(true);
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={handleModalClose} />,
        document.getElementById("backdrop-container")
      )}
      {ReactDOM.createPortal(
        <EditPostModal
          authorId={authorId}
          post={post}
          onClose={handleModalClose}
        />,
        document.getElementById("modal-container")
      )}
    </>
  );
}

export default EditPost;
