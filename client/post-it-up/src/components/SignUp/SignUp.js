import React from "react";
import { useDispatch } from "react-redux";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

import { Button } from "@mui/material";

import { openModal } from "../../features/loginModal/loginModalSlice";
import { HOME_PATH } from "../../constants";

import logo from "../../assets/logo.png";

import styles from "./SignUp.module.scss";

function SignUp(props) {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(openModal());
  };

  return (
    <>
      <p className={styles.logo}>
        <Link to={HOME_PATH}>
          <img src={logo} alt="logo" />
        </Link>
      </p>
      <div className={styles.signUpContainer}>
        <div>
          <div>
            <h1>Sign Up</h1>
            <p>It's quick and easy.</p>
            <hr />
          </div>
          <div className={styles.formContainer}>
            <Form method="post">
              {data && data.errors && (
                <ul>
                  {Object.values(data.errors).map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              )}
              {data && data.message && <p>{data.message}</p>}

              <div className={styles.nameContainer}>
                <input name="name" type="text" placeholder="First Name" />
                <input name="surname" type="text" placeholder="Last Name" />
              </div>
              <div className={styles.emailContainer}>
                <input
                  name="email"
                  type="text"
                  placeholder="Mobile number or email"
                />
              </div>
              <div className={styles.newPasswordContainer}>
                <input
                  name="password"
                  type="password"
                  placeholder="New password"
                />
              </div>
              <div className={styles.signUpButtonCont}>
                <Button disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Sign Up"}
                </Button>
              </div>
              <div>
                <span>
                  If you already have an account
                  <Link onClick={handleLoginClick}> Login</Link>
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
