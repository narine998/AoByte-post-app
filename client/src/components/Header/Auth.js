import React from "react";
import { SIGNUP_PATH } from "../../constants";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

export function Auth({ handleLogin }) {
  return (
    <>
      <Button onClick={handleLogin} variant="contained" size="large">
        Sign In
      </Button>
      <Link to={SIGNUP_PATH}>
        <Button variant="contained" size="large" className={styles.signupBtn}>
          Sign Up
        </Button>
      </Link>
    </>
  );
}
