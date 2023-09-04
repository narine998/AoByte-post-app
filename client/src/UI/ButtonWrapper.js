import React from "react";

import styles from "./ButtonWrapper.module.scss";

function ButtonWrapper(props) {
  return (
    <button onClick={props.onClick} className={styles.wrapper}>
      {props.children}
    </button>
  );
}

export default ButtonWrapper;
