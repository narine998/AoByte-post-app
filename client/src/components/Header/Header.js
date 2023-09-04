import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

import { HOME_PATH, NEWPOST_PATH } from "../../constants";

import { openModal } from "../../features/loginModal/loginModalSlice";

import { logOutUser, selectUserInfo } from "../../features/user/userSlice";
import ProfileActions from "../ProfileActions/ProfileActions";
import { Auth } from "./Auth";
import Search from "./Search";
import { ResponsiveNav } from "./ResponsiveNav";

import favicon from "../../assets/logo.png";

import styles from "./Header.module.scss";

function Header({ showCreatePostBtn }) {
  const [scrolledHeader, setScrolledHeader] = useState(false);
  const [openDropDown, setOpenDropdown] = useState(false);
  const location = useLocation();

  const queries = new URLSearchParams(location.search);
  if (!queries.has("page")) {
    queries.set("page", "1");
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, userLoading } = useSelector(selectUserInfo);

  useEffect(() => {
    const handleScroll = () => {
      const shouldHaveScrollStyle = window.scrollY > 60;
      setScrolledHeader(shouldHaveScrollStyle);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = () => {
    dispatch(openModal());
  };

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  const showDropDown = () => {
    setOpenDropdown(true);
  };

  const hideDropDown = () => {
    setOpenDropdown(false);
  };

  const handleCreatePost = () => {
    if (!userLoading) {
      user ? navigate(NEWPOST_PATH) : dispatch(openModal());
    }
  };

  const handleLogoClick = () => {
    navigate(HOME_PATH);
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <header
        className={
          scrolledHeader
            ? `${styles.header} ${styles.scrolledHeader}`
            : styles.header
        }
      >
        <div className={styles.container}>
          <span onClick={handleLogoClick} className={styles.favicon}>
            <img src={favicon} alt="favicon" />
          </span>
          <Search queries={queries} />
          {showCreatePostBtn ? (
            <div className={styles.newPost}>
              <Button onClick={handleCreatePost}>Create Post</Button>
            </div>
          ) : (
            <div></div>
          )}
          <div className={styles.authContainer}>
            {!userLoading && user && (
              <ProfileActions
                user={user}
                handleOpen={showDropDown}
                handleClose={hideDropDown}
                open={openDropDown}
                logOut={handleLogOut}
              />
            )}
            {!userLoading && !user && <Auth handleLogin={handleLogin} />}
          </div>
          <ResponsiveNav
            handleLogin={handleLogin}
            handleCreate={handleCreatePost}
            show={showCreatePostBtn}
            logOut={handleLogOut}
            logoClick={handleLogoClick}
          />
        </div>
      </header>
    </div>
  );
}

export default Header;
