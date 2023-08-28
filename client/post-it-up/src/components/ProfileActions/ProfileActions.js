import React from "react";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { stringAvatar } from "../../helpers";

import styles from "./ProfileActions.module.scss";

export default function ProfileActions({
  handleClose,
  handleOpen,
  open,
  logOut,
  user,
}) {
  const avatar = stringAvatar(`${user.name} ${user.surname}`);

  return (
    <div className={styles.drowpdown}>
      <Stack
        direction="row"
        spacing={2}
        onClick={handleOpen}
        className={styles.avatar}
      >
        <Avatar {...avatar} />
      </Stack>
      {open && (
        <div className={styles.dropdownContent}>
          <div className={styles.avatarHeader}>
            <Stack direction="row" spacing={2}>
              <Avatar {...avatar} />
            </Stack>
            <CloseIcon fontSize="large" onClick={handleClose} />
          </div>
          <ul>
            <li>
              <PersonOutlineIcon fontSize="large" />
              <Link to={`/profile/${user._id}`}>Your Profile</Link>
            </li>
            <li onClick={logOut}>
              <LogoutIcon /> Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
