import React from "react";
import { useSelector } from "react-redux";

import { Header, PoolSection, Login, Footer } from "../components/";

import { selectLoginModalStatus } from "../features/loginModal/loginModalSlice";

function Home(props) {
  const isModalOpen = useSelector(selectLoginModalStatus);

  return (
    <div className="container">
      {isModalOpen && <Login />}
      <Header showCreatePostBtn={true} />
      <PoolSection />
      <Footer />
    </div>
  );
}

export default Home;
