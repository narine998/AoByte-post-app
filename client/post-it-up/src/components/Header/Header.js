import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";

import { HOME_PATH, NEWPOST_PATH, SIGNUP_PATH } from "../../constants";

import { openModal } from "../../features/loginModal/loginModalSlice";

import {
  selectSearch,
  setSearchValue,
} from "../../features/search/searchSlice";

import favicon from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";

import styles from "./Header.module.scss";

function Header() {
  const [scrolledHeader, setScrolledHeader] = useState(false);

  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearch);
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

  const handleLoginClick = () => {
    dispatch(openModal());
  };

  const handleInputChange = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  return (
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
        <div className={styles.newPost}>
          <Link to={NEWPOST_PATH}>
            <Button>Create Post</Button>
          </Link>
        </div>
        <div className={styles.authContainer}>
          <Button onClick={handleLoginClick} variant="contained" size="large">
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
        </div>
      </div>
    </header>
  );
}

export default Header;
