import styles from "./BackDrop.module.scss";

const BackDrop = ({ onClick }) => {
  return <div className={styles.backDrop} onClick={onClick}></div>;
};

export default BackDrop;
