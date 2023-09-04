import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import styles from "./PostFilter.module.scss";

export function SortPosts({ handleChange, value }) {
  return (
    <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth size="small">
        <InputLabel
          sx={{ fontSize: "1.6rem", color: "#4767BA", fontWeight: "bold" }}
          id="demo-simple-select-label"
        >
          Sort
        </InputLabel>
        <Select
          sx={{
            fontSize: "1.6rem",
            color: "#4767BA",
            fontWeight: "bold",
          }}
          className={styles.select}
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem
            sx={{ fontSize: "1.7rem", color: "#163ea8" }}
            value="rate-desc"
          >
            Highest rating
          </MenuItem>
          <MenuItem
            sx={{ fontSize: "1.7rem", color: "#163ea8" }}
            value="rate-asc"
          >
            Lowest rating
          </MenuItem>
          <MenuItem
            sx={{ fontSize: "1.7rem", color: "#163ea8" }}
            value="date-desc"
          >
            Last posts
          </MenuItem>
          <MenuItem
            sx={{ fontSize: "1.7rem", color: "#163ea8" }}
            value="date-asc"
          >
            Oldest posts
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
