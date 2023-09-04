import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import EmailCheck from "../components/EmailCheck/EmailCheck";
import { HOME_PATH } from "../constants";

function VerifyEmailPage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const isFromSignUp = location.state && location.state.fromSignUp;

  useEffect(() => {
    if (!isFromSignUp && !token) navigate(HOME_PATH);
  }, [isFromSignUp, token]);

  return (isFromSignUp || token) && <EmailCheck token={token} />;
}

export default VerifyEmailPage;
