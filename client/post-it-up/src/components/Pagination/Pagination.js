import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

import { selectPostsData } from "../../features/posts/postsSlice";

import styles from "./Pagination.module.scss";

function CustomPagination({ page, handleChange }) {
  const { totalPages } = useSelector(selectPostsData);

  return (
    <Stack spacing={2} className={styles.pagination}>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </Stack>
  );
}

export default CustomPagination;
