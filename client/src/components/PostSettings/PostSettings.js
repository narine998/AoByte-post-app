import React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import PublicOffTwoToneIcon from "@mui/icons-material/PublicOffTwoTone";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";

import { useDispatch } from "react-redux";
import { fetchPostsByUser } from "../../features/user/userSlice";
import { updatePostPrivacy } from "../../features/posts/postsSlice";

import styles from "./PostSettings.module.scss";

export default function PostSettings({
  authorId,
  post,
  onClose,
  handleConfirmOpen,
  editModalOpen,
}) {
  const changePostPrivacy = (isPublic) => {
    dispatch(
      updatePostPrivacy({ postId: post._id, public: !isPublic, authorId })
    ).then((resp) => {
      if (resp.payload && resp.payload.message) {
        dispatch(fetchPostsByUser(authorId));
        alert(`Post successfully ${isPublic ? "unpublished!" : "published!"}`);
      }
      onClose();
    });
  };

  const actions = [
    {
      icon: <DeleteTwoToneIcon />,
      name: "Delete",
      actionHandler: handleConfirmOpen,
    },
    {
      icon: post.public ? <PublicOffTwoToneIcon /> : <PublicTwoToneIcon />,
      name: post.public ? "UnPublish" : "Publish",
      actionHandler: () => changePostPrivacy(post.public),
    },
    {
      icon: <EditNoteTwoToneIcon />,
      name: "Edit",
      actionHandler: editModalOpen,
    },
  ];

  const dispatch = useDispatch();

  return (
    <Box
      className={styles.settings}
      sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 10, right: 10 }}
        icon={<MoreVertTwoToneIcon />}
        className={styles.dial}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.actionHandler}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
