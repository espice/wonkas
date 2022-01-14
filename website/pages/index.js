import { useSession, signIn } from "next-auth/client";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { Popup, useOnClickOutside } from "../components/Popup";
import styles from "../styles/pages/index.module.scss";

export default function App() {
  const [session, loading] = useSession();
  const [popupState, setPopupState] = useState(false);
  const popupRef = useState();
  useOnClickOutside(popupRef, () => setPopupState(false));

  if (!session) {
    return (
      <Layout>
        <button onClick={() => setPopupState(true)}>Get Started</button>
        <Popup popupState={popupState} ref={popupRef} center>
          <h1 className={styles["popup__login__heading"]}>I am a...</h1>

          <div className={styles["popup__login__container"]}>
            <button className={styles["popup__login__container__button"]}>
              Oompa Loompa
            </button>
            <button className={styles["popup__login__container__button"]}>
              Customer
            </button>
          </div>
        </Popup>
      </Layout>
    );
  }
}
