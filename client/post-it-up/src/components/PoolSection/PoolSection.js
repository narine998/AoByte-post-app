import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Post, Pagination, Error } from "../";

import { loadPosts, selectPostsData } from "../../features/posts/postsSlice";

import error404 from "../../assets/error.png";

import styles from "./PoolSection.module.scss";

function PoolSection(props) {
  const dispatch = useDispatch();

  const { posts } = useSelector(selectPostsData);
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    dispatch(loadPosts({ page: value }));
  };

  const renderPosts = () => {
    return posts.map((post) => {
      return <Post key={post._id} post={post} />;
    });
  };

  // if (searchValue) {
  //   return (
  //     <section className={styles.poolSection}>
  //       <div className={styles.postsList}>
  //         {filteredPosts.length ? (
  //           renderPosts(filteredPosts)
  //         ) : (
  //           <Error>
  //             <img src={error404} alt="error" />
  //           </Error>
  //         )}
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section className={styles.poolSection}>
      <div className={styles.postsList}>{renderPosts()}</div>
      <Pagination page={page} handleChange={handleChange} />
    </section>
  );
}

export default PoolSection;
