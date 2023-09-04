import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export function DateRange({ handleChange, dateRange }) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Created Date</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="today"
          control={<Radio />}
          label="Today"
          onChange={handleChange}
          checked={dateRange === "today"}
        />
        <FormControlLabel
          value="this week"
          control={<Radio />}
          label="This Week"
          onChange={handleChange}
          checked={dateRange === "this week"}
        />
        <FormControlLabel
          value="this month"
          control={<Radio />}
          label="This Month"
          onChange={handleChange}
          checked={dateRange === "this month"}
        />
      </RadioGroup>
    </FormControl>
  );
}
