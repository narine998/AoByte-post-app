import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

import { HOME_PATH, NEWPOST_PATH, SIGNUP_PATH } from "../../constants";

import { openModal } from "../../features/loginModal/loginModalSlice";

import {
  selectSearch,
  setSearchValue,
} from "../../features/search/searchSlice";
import { logOutUser, selectUserInfo } from "../../features/user/userSlice";
import ProfileActions from "../ProfileActions/ProfileActions";

import favicon from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";

import styles from "./Header.module.scss";

function Header({ showCreatePostBtn }) {
  const [scrolledHeader, setScrolledHeader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchValue = useSelector(selectSearch);
  const [openDropDown, setOpenDropdown] = useState(false);
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

  const handleInputChange = (e) => {
    dispatch(setSearchValue(e.target.value));
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
          <Link to={HOME_PATH} className={styles.favicon}>
            <img src={favicon} alt="favicon" />
          </Link>
          <div className={styles.searchContainer}>
            <div className={styles.searchDiv}>
              <input
                type="text"
                placeholder="Search by title..."
                onDragOver={(e) => e.preventDefault()}
                onChange={(e) => handleInputChange(e)}
                value={searchValue}
              />
              <img className={styles.search} src={searchIcon} alt="search" />
            </div>
          </div>
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
            {!userLoading && !user && (
              <>
                <Button onClick={handleLogin} variant="contained" size="large">
                  Sign In
                </Button>
                <Link to={SIGNUP_PATH}>
                  <Button
                    variant="contained"
                    size="large"
                    className={styles.signupBtn}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
