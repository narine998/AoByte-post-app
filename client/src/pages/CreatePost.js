import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Footer, Header, NewPost } from "../components";
import { selectUserInfo } from "../features/user/userSlice";
import { HOME_PATH } from "../constants";

function CreatePost(props) {
  const { user, userLoading } = useSelector(selectUserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && !user) {
      navigate(HOME_PATH);
      return null;
    }
  }, [userLoading, user]);

  return (
    <div className="container">
      <Header />
      <NewPost />
      <Footer />
    </div>
  );
}

export default CreatePost;
