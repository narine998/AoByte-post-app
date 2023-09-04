import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchIcon from "@mui/icons-material/Search";
import { searchPosts } from "../../features/posts/postsApi";
import {
  selectFilterSearch,
  updateFilters,
} from "../../features/filters/filterSearchSlice";

import { HOME_PATH } from "../../constants";

import styles from "./Header.module.scss";

export function Search({ queries }) {
  const [openSearch, setOpenSearch] = useState(false);
  const [matchingPosts, setMatchingPosts] = useState([]);
  const filters = useSelector(selectFilterSearch);
  const [searchValue, setSearchValue] = useState(filters.title || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => {
      if (searchValue.trim()) {
        searchPosts(searchValue).then((resp) => {
          setMatchingPosts(resp.posts);
        });
      } else {
        setOpenSearch(false);
      }
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [searchValue]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setOpenSearch(false);
      dispatch(updateFilters({ ...filters, title: searchValue }));
      queries.set("page", 1);
      if (searchValue.trim()) {
        queries.set("title", searchValue);
      } else {
        queries.delete("title");
      }
      navigate(`${HOME_PATH}?${queries.toString()}`);
    }
  };

  const handleFocus = () => {
    setOpenSearch(true);
  };

  const clearSearch = () => {
    setOpenSearch(false);
    setSearchValue("");
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchDiv}>
        <input
          type="text"
          placeholder="Search by title..."
          onChange={handleChange}
          value={searchValue}
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
        />
        <SearchIcon className={styles.search} fontSize="large" />
      </div>
      {openSearch && !!matchingPosts.length && (
        <ul className={styles.searchResults}>
          {matchingPosts.map((post) => (
            <li key={post._id} onClick={clearSearch}>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
