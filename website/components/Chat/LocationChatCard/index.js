import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import axios from "../../../config/axios";
export default function LocationChatCard({ location }) {
  const [peopleData, setpeopleData] = useState([]);

  useEffect(async () => {
    const response = await axios.get(`/api/messages/${location}`);
    if (response.data.messages.length === 0) {
      return setpeopleData([]);
    }
    response.data.messages.forEach((message) => {
      setpeopleData((peopleData) => [...peopleData, message.author.photoUrl]);
    });

    setpeopleData([...new Set(peopleData)]);
  }, []);
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h2>{location}</h2>
      </div>

      <div className={styles.card__footer}>
        <div className={styles.card__footer__people}>
          {peopleData.map((photoUrl, index) => {
            return (
              <img
                src={photoUrl}
                alt="oompa loompa"
                className={styles.card__footer__people__img}
                key={index}
              />
            );
          })}
        </div>
        <button className={styles.card__footer__button}>Chat</button>
      </div>
    </div>
  );
}
