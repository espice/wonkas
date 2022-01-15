import styles from "./index.module.scss";
export default function Message({ message }) {
  return (
    <div className={styles.message}>
      <img src={message.author.photoUrl} alt="" />

      <p>{message.author.name}</p>
      <h1>{message.message}</h1>
    </div>
  );
}
