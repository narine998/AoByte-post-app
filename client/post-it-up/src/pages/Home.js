import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Header, PoolSection, Login, Spinner, Error } from "../components/";

import { selectLoginModalStatus } from "../features/loginModal/loginModalSlice";
import { loadPosts, selectPostsData } from "../features/posts/postsSlice";

function Home(props) {
  const isModalOpen = useSelector(selectLoginModalStatus);
  const { loading, error } = useSelector(selectPostsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {isModalOpen && <Login />}
      <Header />
      {!error ? (
        <>
          <PoolSection />
        </>
      ) : (
        <Error>{error}</Error>
      )}
    </>
  );
}

export default Home;
