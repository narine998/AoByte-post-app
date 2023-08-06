import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import { closeModal } from "../../features/loginModal/loginModalSlice";

import ButtonWrapper from "../../UI/ButtonWrapper";
import BackDrop from "../../UI/BackDrop";
import { SIGNUP_PATH } from "../../constants";

import useDisableBodyScroll from "../../hooks/UseDisableBodyScroll";

import hiddenEye from "../../assets/hidden.png";
import openEye from "../../assets/eye.png";

import styles from "./Login.module.scss";

const LoginModal = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.loginContent}>
        <h1>Log Into Post It Up</h1>
        <form>
          <div className={styles.inputContainer}>
            <TextField
              id="outlined-basic"
              label="Email or phone"
              variant="outlined"
            />
          </div>
          <div className={styles.inputContainer}>
            <TextField
              id="outlined-password-input"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
            />
            <ButtonWrapper onClick={showPasswordHandler}>
              <img
                className={styles.eye}
                src={showPassword ? openEye : hiddenEye}
                alt="eye"
              />
            </ButtonWrapper>
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={onClose} type="submit">
              Log In
            </Button>
          </div>
          <div className={styles.signup}>
            <span>
              Don't have an account?
              <Link to={SIGNUP_PATH} onClick={onClose}>
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

function Login(props) {
  useDisableBodyScroll(true);
  const dispatch = useDispatch();

  const handleLoginModalClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={handleLoginModalClose} />,
        document.getElementById("backdrop-container")
      )}
      {ReactDOM.createPortal(
        <LoginModal onClose={handleLoginModalClose} />,
        document.getElementById("modal-container")
      )}
    </>
  );
}

export default Login;
