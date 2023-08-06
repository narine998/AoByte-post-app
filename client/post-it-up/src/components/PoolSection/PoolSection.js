import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Post, Pagination, Error } from "../";

import { POSTSPERPAGE } from "../../constants/";

import { selectPostsData } from "../../features/posts/postsSlice";
import { selectSearch } from "../../features/search/searchSlice";

import error404 from "../../assets/error.png";

import styles from "./PoolSection.module.scss";

function PoolSection(props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const { posts } = useSelector(selectPostsData);
  const searchValue = useSelector(selectSearch);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(searchValue.trim().toLowerCase())
      )
    );
  }, [searchValue, posts]);

  const handlePageChange = (pageIndex) => {
    if (currentPageIndex !== pageIndex) {
      setCurrentPageIndex(pageIndex);
    }
  };

  const renderPosts = (posts) => {
    return posts.map((post) => <Post key={post.id} post={post} />);
  };

  const getCurrentPagePosts = () => {
    const lastIndex = currentPageIndex * POSTSPERPAGE;
    const firstIndex = lastIndex - POSTSPERPAGE;
    return posts.slice(firstIndex, lastIndex);
  };

  if (searchValue) {
    return (
      <section className={styles.poolSection}>
        <div className={styles.postsList}>
          {filteredPosts.length ? (
            renderPosts(filteredPosts)
          ) : (
            <Error>
              <img src={error404} alt="error" />
            </Error>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.poolSection}>
      <div className={styles.postsList}>
        {renderPosts(getCurrentPagePosts())}
      </div>
      <Pagination
        pageCount={Math.ceil(posts.length / POSTSPERPAGE)}
        handlePageChange={handlePageChange}
        currentPageIndex={currentPageIndex}
      />
    </section>
  );
}

export default PoolSection;
