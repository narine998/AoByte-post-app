import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import BriefPost from "../BriefPost/BriefPost";
import Layout from "../../UI/Layout";

import {
  fetchPostsByUser,
  selectUserInfo,
} from "../../features/user/userSlice";

import styles from "./Profile.module.scss";

function Profile(props) {
  const { user, userLoading } = useSelector(selectUserInfo);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showUserPosts, setShowUserPosts] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLoading) {
      dispatch(fetchPostsByUser(user._id)).then(() => setPostsLoading(false));
    }
  }, [userLoading]);

  const renderPosts = () => {
    if (Array.isArray(user.posts))
      return user.posts.map((post) => (
        <div key={post._id}>
          <BriefPost post={post} userId={user._id} />
        </div>
      ));
  };

  const showInfo = () => {
    setShowUserInfo(true);
    setShowUserPosts(false);
  };

  const showPosts = () => {
    setPostsLoading(false);
    dispatch(fetchPostsByUser(user._id)).then(() => setPostsLoading(false));
    setShowUserInfo(false);
    setShowUserPosts(true);
  };

  return (
    <>
      {user && (
        <div className={styles.container}>
          <section className={styles.profile}>
            <div>
              <div className={styles.avatar}>
                <Avatar
                  alt="avatar"
                  sx={{ width: 150, height: 150, color: "#334063" }}
                />
                <h1>
                  {user.name} {user.surname}
                </h1>
              </div>
              <hr />
              <ul className={styles.info}>
                <li className={showUserInfo ? styles.active : styles.inActive}>
                  <span onClick={showInfo}>Information</span>
                </li>
                <li className={showUserPosts ? styles.active : styles.inActive}>
                  <span onClick={showPosts}>Posts</span>
                </li>
              </ul>
              {showUserInfo && (
                <Layout>
                  <ul className={styles.userInfo}>
                    <li>
                      <strong>Name:</strong> {user.name}
                    </li>
                    <li>
                      <strong>Surname:</strong> {user.surname}
                    </li>
                    <li>
                      <strong>Email:</strong> {user.email}
                    </li>
                    <li>
                      <strong>BirthDay:</strong> {user.birthDate}
                    </li>
                    <li>
                      <strong>Gender:</strong> {user.gender}
                    </li>
                  </ul>
                </Layout>
              )}
            </div>
            {showUserPosts && (
              <div className={styles.posts}>
                {postsLoading ? <CircularProgress /> : renderPosts()}
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default Profile;
