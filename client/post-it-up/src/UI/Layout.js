import React from "react";

import styles from "./Layout.module.scss";

function Layout(props) {
  return (
    <div className={`${styles.board} ${styles[props.disabled]}`}>
      {props.children}
    </div>
  );
}

export default Layout;
