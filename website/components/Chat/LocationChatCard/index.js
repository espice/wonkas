import styles from "./index.module.scss";

export default function LocationChatCard({ location }) {
  return (
    <div className={styles.card}>
      <h2>{location}</h2>
    </div>
  );
}
