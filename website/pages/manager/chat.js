import Layout from "../../components/Layout";
import UserContext from "../../components/userContext";
import { useContext, useState, useRef, useEffect } from "react";
import axios from "../../config/axios";
import SideNav from "../../components/SideNav";

import LocationChatCard from "../../components/Chat/LocationChatCard";

import styles from "../../styles/pages/manager/chat.module.scss";
export default function ManagerChat() {
  const [locations, setLocations] = useState([]);

  useEffect(async () => {
    const locations = await axios.get("/api/locations/all");
    setLocations(locations.data.locations);
  }, []);

  return (
    <Layout title="Manager Chat">
      <SideNav />

      <div className={styles.main}>
        <div className={styles.main__header}>
          <div className={styles.main__header__title}>
            <h1>Manager Chat</h1>
            <p>
              Choose a location to chat with Oompa Loompas assigned to that
              location.
            </p>
          </div>
        </div>

        <div className={styles.main__content}>
          {locations.map((location, index) => {
            return <LocationChatCard location={location} key={index} />;
          })}
        </div>
      </div>
    </Layout>
  );
}
