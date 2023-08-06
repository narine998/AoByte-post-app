import React from "react";

import styles from "./DropDown.module.scss";

function DropDown({ option1, option2, role, onChange }) {
  return (
    <select
      className={styles.select}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value={option1}>
        {role} {option1}
      </option>
      <option value={option2}>
        {role} {option2}
      </option>
    </select>
  );
}

export default DropDown;
