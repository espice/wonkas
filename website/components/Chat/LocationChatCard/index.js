import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import axios from "../../../config/axios";

import Overlay from "../../Overlay";
export default function LocationChatCard({ location }) {
  const [peopleData, setpeopleData] = useState([]);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const clearMessages = async () => {
    const response = await axios.get(`/api/messages/clear/${location}`);
    window.location.reload();
  };
  const overlayOptions = {
    type: "card",
    options: [
      {
        text: "View all Oompa Loompas",
        iconURL: "view.svg",
      },
      {
        text: "Clear this chat",
        iconURL: "clear.svg",
        action: clearMessages,
      },
    ],
  };
  useEffect(async () => {
    const response = await axios.get(`/api/messages/${location}`);
    if (response.data.messages.length === 0) {
      return setpeopleData([]);
    }

    const photoUrls = [];
    response.data.messages.forEach((messageData) => {
      photoUrls.push(messageData.author.photoUrl);
    });
    setpeopleData([...new Set(photoUrls)]);
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h2>{location}</h2>
        <div
          className={styles.card__header__details}
          onClick={(e) => {
            setOverlayOpen(true);
          }}
        />
      </div>

      {overlayOpen ? (
        <Overlay
          options={overlayOptions}
          open={overlayOpen}
          setOpen={setOverlayOpen}
        />
      ) : null}
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
        <button
          className={styles.card__footer__button}
          onClick={(e) => {
            window.location.href = `chats/${location}`;
          }}
        >
          Chat
        </button>
      </div>
    </div>
  );
}
