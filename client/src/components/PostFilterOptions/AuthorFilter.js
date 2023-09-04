import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";

import { searchUsers } from "../../features/user/userApi";

import styles from "./PostFilter.module.scss";

export function AuthorFilter({ author, handleChange }) {
  const [openSearch, setOpenSearch] = useState(false);
  const [matchingResults, setMatchingResults] = useState([]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (author.trim()) {
        searchUsers(author).then((resp) => {
          setOpenSearch(true);
          setMatchingResults(resp.authors);
        });
      } else {
        setOpenSearch(false);
      }
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [author]);

  return (
    <div className={styles.authorBox}>
      <TextField
        id="outlined-basic"
        label="Author"
        variant="outlined"
        value={author}
        onChange={(e) => handleChange(e.target.value)}
      />
      {openSearch && !!matchingResults.length && (
        <ul className={styles.authorList}>
          {matchingResults.map((author) => (
            <li
              onClick={() => handleChange(`${author.name} ${author.surname}`)}
              key={author._id}
            >{`${author.name} ${author.surname}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
