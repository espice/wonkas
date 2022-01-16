import styles from "./index.module.scss";
import { useContext } from "react";
import UserContext from "../../userContext";
export default function Message({ message }) {
  const { user } = useContext(UserContext);
  return (
    <div className={styles.message}>
      <img src={message.author.photoUrl} alt="" />

      <div className={styles.message__column}>
        <p className={styles.message__column__name}>
          {message.author._id == user._id ? "You" : message.author.name}
        </p>
        <p className={styles.message__column__message}>{message.message}</p>
      </div>
    </div>
  );
}
