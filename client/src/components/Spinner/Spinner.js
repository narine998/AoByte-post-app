import React from "react";
import CircularProgress from "@mui/joy/CircularProgress";

import styles from "./Spinner.module.scss";

function Spinner(props) {
  return (
    <div className={styles.loading}>
      <CircularProgress color="warning" />
    </div>
  );
}

export default Spinner;
