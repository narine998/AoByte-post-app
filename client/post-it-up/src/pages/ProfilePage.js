import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Header, Profile } from "../components";
import { selectUserInfo } from "../features/user/userSlice";
import { HOME_PATH } from "../constants";

function ProfilePage(props) {
  const { user } = useSelector(selectUserInfo);
  const { userId } = useParams();
  const navigate = useNavigate();

  if (!user || user._id !== userId) {
    navigate(HOME_PATH);
    return null;
  }
  return (
    <>
      <Header showCreatePostBtn={true} />
      <Profile />
    </>
  );
}

export default ProfilePage;
