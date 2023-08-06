import React from "react";

import styles from "./Error.module.scss";

function Error(props) {
  return <div className={styles.error}>{props.children}</div>;
}

export default Error;
