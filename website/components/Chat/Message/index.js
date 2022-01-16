import styles from "./index.module.scss";
import { useContext } from "react";
import UserContext from "../../userContext";
export default function Message({ message, author }) {
  const { user } = useContext(UserContext);
  return (
    <div className={styles.message}>
      <img src={author.photoUrl} alt="" />

      <div className={styles.message__column}>
        <p className={styles.message__column__name}>
          {author._id == user._id ? "You" : author.name}
        </p>
        <p className={styles.message__column__message}>{message}</p>
      </div>
    </div>
  );
}
