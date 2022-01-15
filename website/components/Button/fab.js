import styles from "./index.module.scss";

const FAB = ({ children, onClick }) => {
  return (
    <button className={styles.fab} onClick={onClick}>
      {children}
    </button>
  );
};

export default FAB;
