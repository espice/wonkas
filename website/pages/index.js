import { useSession, signIn } from "next-auth/client";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import Login from "../components/Login";
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
        <Popup popupState={popupState} ref={popupRef} center id={styles["login-popup"]}>
          <Login setPopupState={setPopupState}/>
        </Popup>
      </Layout>
    );
  }
}
