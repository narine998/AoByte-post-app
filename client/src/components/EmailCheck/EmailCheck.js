import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  openModal,
  selectLoginModalStatus,
} from "../../features/loginModal/loginModalSlice";
import Login from "../Login/Login";

import {
  selectUserInfo,
  sendEmail,
  verifyUserEmail,
} from "../../features/user/userSlice";
import { HOME_PATH } from "../../constants";

import logo from "../../assets/logo.png";

import styles from "./EmailCheck.module.scss";

function EmailCheck({ token }) {
  const [message, setMessage] = useState("");

  const isModalOpen = useSelector(selectLoginModalStatus);
  const userInfo = useSelector(selectUserInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isVerified,
    resendEmail: resend,
    isEmailResent,
    verifyError,
  } = userInfo;

  const handleLogin = () => {
    navigate(HOME_PATH);
    dispatch(openModal());
  };

  useEffect(() => {
    if (token) {
      dispatch(verifyUserEmail(token));
    }
  }, [token]);

  const resendEmail = () => {
    dispatch(sendEmail(token)).then((response) => {
      if (!isEmailResent) {
        setMessage(response.message);
      }
    });
  };

  if (verifyError) {
    return (
      <>
        <header className={styles.header}>
          <Link to={HOME_PATH}>
            <img src={logo} alt="logo" />
          </Link>
        </header>
        <div className={styles.verifyInfo}>Invalid Token</div>
      </>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <Link to={HOME_PATH}>
          <img src={logo} alt="logo" />
        </Link>
      </header>
      {isVerified ? (
        <div className={styles.verifyInfo}>
          {isModalOpen && <Login />}
          <h1>You are successfully verified</h1>
          <span>
            <Link to={HOME_PATH}>
              <Button onClick={handleLogin} variant="contained" size="large">
                Sign In
              </Button>
            </Link>
          </span>
        </div>
      ) : (
        <div className={styles.verifyInfo}>
          <h1>
            {resend
              ? message || "Link Expired"
              : "We have sent you a link. Please check your email!"}
          </h1>
          {(resend || isEmailResent) && (
            <Button
              className={isEmailResent && styles.resend}
              variant="contained"
              size="large"
              onClick={resendEmail}
              disabled={isEmailResent}
            >
              {isEmailResent ? "Email sent" : "Resend email"}
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default EmailCheck;
