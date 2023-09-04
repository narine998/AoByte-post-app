import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Footer, Header, Profile } from "../components";
import { selectUserInfo } from "../features/user/userSlice";
import { HOME_PATH } from "../constants";

function ProfilePage(props) {
  const { user, userLoading } = useSelector(selectUserInfo);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && !user) {
      navigate(HOME_PATH);
    }
  }, [user]);

  return (
    user &&
    user._id === userId && (
      <div className="container">
        <Header showCreatePostBtn={true} />
        <Profile />
        <Footer />
      </div>
    )
  );
}

export default ProfilePage;
