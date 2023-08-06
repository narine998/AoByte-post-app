import React from "react";
import { useSelector } from "react-redux";
import { json, redirect } from "react-router-dom";

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

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
    name: data.get("name"),
    surname: data.get("surname"),
  };

  const response = await fetch(process.env.REACT_APP_BASE_URL + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
