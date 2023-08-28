import React from "react";
import { useSelector } from "react-redux";

import { Login, SignUp } from "../components";
import { selectLoginModalStatus } from "../features/loginModal/loginModalSlice";

function SignUpPage(props) {
  const isModalOpen = useSelector(selectLoginModalStatus);

  return (
    <>
      {isModalOpen && <Login />}
      <SignUp />
    </>
  );
}

export default SignUpPage;
