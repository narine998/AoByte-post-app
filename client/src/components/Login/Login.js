import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";

import { closeModal } from "../../features/loginModal/loginModalSlice";

import ButtonWrapper from "../../UI/ButtonWrapper";
import BackDrop from "../../UI/BackDrop";
import { SIGNUP_PATH } from "../../constants";

import useDisableBodyScroll from "../../hooks/UseDisableBodyScroll";

import { loginUser } from "../../features/user/userSlice";
import { loginValidationSchema } from "../../validation";

import styles from "./Login.module.scss";

const LoginModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const initialFormData = {
    email: "",
    password: "",
  };

  const loginForm = useFormik({
    initialValues: initialFormData,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values)).then((resp) => {
        if (resp.payload && resp.payload.errors) {
          setServerErrors(resp.payload.errors);
        } else {
          onClose();
        }
      });
    },
  });

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.loginContent}>
        <h1>Log Into Post It Up</h1>
        <form onSubmit={loginForm.handleSubmit}>
          <div className={styles.inputContainer}>
            <TextField
              id="outlined-basic"
              required
              label="Email"
              variant="outlined"
              name="email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />

            <div className={styles.errors}>
              {loginForm.touched.email &&
                (loginForm.errors.email || serverErrors.email)}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <TextField
              id="outlined-password-input"
              label="Password"
              required
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              name="password"
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />

            <div className={styles.errors}>
              {loginForm.touched.password &&
                (loginForm.errors.password || serverErrors.password)}
            </div>

            <ButtonWrapper onClick={showPasswordHandler}>
              {showPassword ? (
                <VisibilityIcon className={styles.eye} />
              ) : (
                <VisibilityOffIcon className={styles.eye} />
              )}
            </ButtonWrapper>
          </div>
          <div className={styles.buttonContainer}>
            <Button type="submit">Log In</Button>
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
