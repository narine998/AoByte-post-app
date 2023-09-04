import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import { POST_CATEGORIES } from "../../constants";

import styles from "./PostFilter.module.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function CategoryCheckBox({ handleChange, categories }) {
  if (categories[0] === ",") {
    categories = categories.slice(1);
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={categories}
          onChange={handleChange}
          input={<OutlinedInput label="Category" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {POST_CATEGORIES.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={categories.indexOf(category) > -1} />
              <ListItemText primary={category} className={styles.listItem} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
