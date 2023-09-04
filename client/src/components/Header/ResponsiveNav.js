import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { SIGNUP_PATH } from "../../constants";
import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { stringAvatar } from "../../helpers";
import { selectUserInfo } from "../../features/user/userSlice";

import favicon from "../../assets/logo.png";

import styles from "./Responsive.module.scss";

export function ResponsiveNav({
  handleLogin,
  show,
  handleCreate,
  logOut,
  logoClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userLoading } = useSelector(selectUserInfo);
  const avatar = stringAvatar(`${user?.name} ${user?.surname}`);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goProfile = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className={styles.responsiveNav}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleMenu}
      >
        <MenuIcon sx={{ fontSize: "4rem" }} />
      </IconButton>
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={toggleMenu}
        sx={{ width: "30rem" }}
      >
        <div className={styles.authCont}>
          {!userLoading && user && (
            <>
              <div className={styles.avatarHeader}>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    {...avatar}
                    sx={{ fontSize: "2rem", backgroundColor: "#334063" }}
                  />
                </Stack>
                <CloseIcon
                  onClick={toggleMenu}
                  sx={{ fontSize: "3rem", color: "#334063" }}
                />
              </div>
              <div>
                <span className={styles.profile} onClick={goProfile}>
                  <PersonOutlineIcon /> My Profile
                </span>
                <hr />
              </div>

              <div>
                <span className={styles.logout} onClick={logOut}>
                  <LogoutIcon /> Sign Out
                </span>
                <hr />
              </div>
            </>
          )}
          {!userLoading && !user && (
            <>
              <div className={styles.avatarHeader}>
                <Stack direction="row" spacing={2}>
                  <span onClick={logoClick} className={styles.favicon}>
                    <img src={favicon} alt="favicon" />
                  </span>
                </Stack>
                <CloseIcon
                  onClick={toggleMenu}
                  sx={{ fontSize: "3rem", color: "#334063" }}
                />
              </div>
              <Button onClick={handleLogin} variant="contained" size="large">
                Sign In
              </Button>
              <Link to={SIGNUP_PATH}>
                <Button
                  variant="contained"
                  size="large"
                  className={styles.authBtn}
                  sx={{ padding: "0.5rem" }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          {show && (
            <Button
              sx={{ padding: "0.7rem" }}
              onClick={handleCreate}
              className={styles.blueBtn}
            >
              Create Post
            </Button>
          )}
        </div>
      </Drawer>
    </div>
  );
}
