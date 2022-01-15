import styles from "./index.module.scss";
export default function Message({ message }) {
  return (
    <div className={styles.message}>
      <img src={message.author.photoUrl} alt="" />

      <div className={styles.message__column}>
        <p>{message.author.name}</p>
        <h1>{message.message}</h1>
      </div>
    </div>
  );
}
