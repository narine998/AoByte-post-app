import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TuneIcon from "@mui/icons-material/Tune";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { CategoryCheckBox } from "./CategoryFilter";
import { DateRange } from "./DateFilter";
import { SortPosts } from "./SortPosts";
import { AuthorFilter } from "./AuthorFilter";
import { updateFilters } from "../../features/filters/filterSearchSlice";

import styles from "./PostFilter.module.scss";

function PostFilter() {
  const location = useLocation();
  const queries = new URLSearchParams(location.search);

  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: queries.get("categories")?.split(","),
    date: queries.get("date"),
    order: queries.get("order"),
    author: queries.get("author"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDateChange = (e) => {
    setFilters((prevfilters) => {
      return { ...prevfilters, date: e.target.value };
    });
  };

  const handleSortChange = (e) => {
    setFilters((prevfilters) => {
      return { ...prevfilters, order: e.target.value };
    });
  };

  const handleAuthorChange = (value) => {
    setFilters((prevfilters) => {
      return { ...prevfilters, author: value };
    });
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    const categoryValue = typeof value === "string" ? value.split(",") : value;
    setFilters((prevfilters) => {
      return { ...prevfilters, categories: categoryValue };
    });
  };

  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };

  const handleApplyFilters = () => {
    queries.set("page", 1);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === "categories" && !value.length) {
          queries.delete("categories");
        } else {
          queries.set(key, value);
        }
      }
    });

    navigate({ search: queries.toString() });
    dispatch(updateFilters({ page: 1, ...filters }));
    setOpen(true);
  };

  const list = () => (
    <Box
      className={styles.box}
      sx={{ width: "auto", padding: "2rem" }}
      role="presentation"
    >
      <h2>Filter Posts</h2>
      <div className={styles.category}>
        <CategoryCheckBox
          categories={filters.categories || []}
          handleChange={handleCategoryChange}
        />
        <AuthorFilter
          author={filters.author || ""}
          handleChange={handleAuthorChange}
        />
      </div>
      <Divider />
      <div className={styles.sortBar}>
        <SortPosts
          handleChange={handleSortChange}
          value={filters.order || ""}
        />
      </div>
      <Divider />
      <div className={styles.dateRange}>
        <DateRange
          dateRange={filters.date || ""}
          handleChange={handleDateChange}
        />
      </div>

      <div className={styles.apply}>
        <Button onClick={handleApplyFilters}>Apply Changes</Button>
      </div>
    </Box>
  );

  return (
    <div className={styles.filter}>
      <Button onClick={toggleDrawer(true)}>
        Apply Filters <TuneIcon />
      </Button>
      <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}

export default PostFilter;
