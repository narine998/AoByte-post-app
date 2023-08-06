import React from "react";

import styles from "./Pagination.module.scss";

function Pagination({ pageCount, handlePageChange, currentPageIndex }) {
  const pageArr = " ".repeat(pageCount - 1).split(" ");

  return (
    <ul className={styles.pagination}>
      {pageArr.map((item, index) => (
        <li
          className={currentPageIndex === index + 1 ? styles.currentPage : ""}
          key={index}
        >
          <span
            className={styles.white}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
