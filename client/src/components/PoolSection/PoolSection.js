import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Post, Pagination, PostFilter, Spinner } from "../";

import { loadPosts, selectPostsData } from "../../features/posts/postsSlice";
import {
  selectFilterSearch,
  updateFilters,
} from "../../features/filters/filterSearchSlice";

import error404 from "../../assets/error.png";

import styles from "./PoolSection.module.scss";

function PoolSection(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queries = new URLSearchParams(location.search);
  if (!queries.has("page")) {
    queries.set("page", "1");
  }

  const { loading, posts } = useSelector(selectPostsData);
  const filters = useSelector(selectFilterSearch);

  useEffect(() => {
    dispatch(loadPosts(Object.fromEntries(queries)));
  }, [filters]);

  const handleChange = (event, value) => {
    if (value !== filters.page) {
      queries.set("page", value);
      navigate({ search: queries.toString() });
      dispatch(updateFilters({ ...filters, page: value }));
    }
  };

  const renderPosts = () => {
    return posts.map((post) => {
      return <Post key={post._id} post={post} />;
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className={styles.poolSection}>
      {!!posts.length && (
        <div className={styles.filterBar}>
          <PostFilter />
        </div>
      )}
      <div className={styles.postsList}>
        {posts.length ? (
          renderPosts()
        ) : (
          <img src={error404} alt="No matching posts" />
        )}
      </div>
      {!!posts.length && (
        <Pagination
          page={parseInt(queries.get("page"))}
          handleChange={handleChange}
        />
      )}
    </section>
  );
}

export default PoolSection;
