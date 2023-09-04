import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { openModal } from "../../features/loginModal/loginModalSlice";
import { HOME_PATH, VERIFY_EMAIL_PATH } from "../../constants";
import { registerUser } from "../../features/user/userSlice";
import { signUpValidationSchema } from "../../validation";

import logo from "../../assets/logo.png";

import styles from "./SignUp.module.scss";

function SignUp(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serverErrors, setServerErrors] = useState({});
  const [signUp, setSignUp] = useState(false);

  const initialFormData = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
  };

  const signUpform = useFormik({
    initialValues: initialFormData,
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      setSignUp(true);
      dispatch(registerUser(values)).then((resp) => {
        if (resp.payload && resp.payload.errors) {
          setServerErrors(resp.payload.errors);
        } else {
          navigate(VERIFY_EMAIL_PATH, { state: { fromSignUp: true } });
        }
        setSignUp(false);
      });
    },
  });

  const handleLoginClick = () => {
    dispatch(openModal());
  };

  return (
    <>
      <header className={styles.header}>
        <Link to={HOME_PATH}>
          <img src={logo} alt="logo" />
        </Link>
      </header>
      <div className={styles.signUpContainer}>
        <div>
          <div>
            <h1>Sign Up</h1>
            <p>It's quick and easy.</p>
            <hr />
          </div>
          <div className={styles.formContainer}>
            <form onSubmit={signUpform.handleSubmit}>
              <div className={styles.nameContainer}>
                <input
                  name="name"
                  type="text"
                  placeholder="First Name"
                  value={signUpform.values.name}
                  onChange={signUpform.handleChange}
                  onBlur={signUpform.handleBlur}
                  required
                />
                <div className={styles.errors}>
                  {signUpform.touched.name &&
                    (signUpform.errors.name || serverErrors.name)}
                </div>
              </div>
              <div className={styles.nameContainer}>
                <input
                  name="surname"
                  type="text"
                  placeholder="Last Name"
                  value={signUpform.values.surname}
                  onChange={signUpform.handleChange}
                  onBlur={signUpform.handleBlur}
                  required
                />
                <div className={styles.errors}>
                  {signUpform.touched.surname &&
                    (signUpform.errors.surname || serverErrors.surname)}
                </div>
              </div>
              <div className={styles.emailContainer}>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={signUpform.values.email}
                  onChange={signUpform.handleChange}
                  onBlur={signUpform.handleBlur}
                  required
                />
                <div className={styles.errors}>
                  {signUpform.touched.email &&
                    (signUpform.errors.email || serverErrors.email)}
                </div>
              </div>
              <div className={styles.newPasswordContainer}>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="true"
                  value={signUpform.values.password}
                  onChange={signUpform.handleChange}
                  onBlur={signUpform.handleBlur}
                  required
                />
                <div className={styles.errors}>
                  {signUpform.touched.password &&
                    (signUpform.errors.password || serverErrors.password)}
                </div>
              </div>
              <div className={styles.newPasswordContainer}>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  autoComplete="true"
                  value={signUpform.values.confirmPassword}
                  onChange={signUpform.handleChange}
                  onBlur={signUpform.handleBlur}
                  required
                />
                <div className={styles.errors}>
                  {signUpform.touched.confirmPassword &&
                    (signUpform.errors.confirmPassword ||
                      serverErrors.confirmPassword)}
                </div>
              </div>
              <div className={styles.birthDateContainer}>
                <label>Birthday</label>
                <input
                  name="birthDate"
                  type="date"
                  value={signUpform.values.birthDate}
                  onChange={signUpform.handleChange}
                  onBlur={signUpform.handleBlur}
                  required
                />
                <div className={styles.errors}>
                  {signUpform.touched.birthDate &&
                    (signUpform.errors.birthDate || serverErrors.birthDate)}
                </div>
              </div>
              <div className={styles.genderContainer}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-label
                    edby="demo-radio-buttons-group-label"
                    name="gender"
                    value={signUpform.values.gender}
                  >
                    <div className={styles.gender}>
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                        onChange={signUpform.handleChange}
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                        onChange={signUpform.handleChange}
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
                <div className={styles.errors}>
                  {signUpform.touched.gender &&
                    (signUpform.errors.gender || serverErrors.gender)}
                </div>
              </div>
              <div className={signUp ? styles.signUpButtonCont : ""}>
                <Button type="submit">
                  {signUp ? "Signing Up" : "Sign Up"}
                </Button>
              </div>
              <div>
                <span>
                  Already have an account?
                  <Link onClick={handleLoginClick}> Login</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
