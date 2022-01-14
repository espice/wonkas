import { useSession, signOut } from "next-auth/client";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import LoginChooser from "../components/Login/Chooser";
import LoginForm from "../components/Login/Form";
import { Popup, useOnClickOutside } from "../components/Popup";
import styles from "../styles/pages/index.module.scss";

export default function App() {
  const [session, loading] = useSession();
  const [popupState, setPopupState] = useState(false);
  const [loginPopupMethod, setLoginPopupMethod] = useState(null);
  const [loginPopupStep, setLoginPopupStep] = useState(0);
  const popupRef = useState();

  useOnClickOutside(popupRef, () => {
    setPopupState(false);
    setLoginPopupMethod(null);
    setLoginPopupStep(0);
  });
  if (!session) {
    return (
      <Layout>
        <button onClick={() => setPopupState(true)}>Get Started</button>
        <Popup
          popupState={popupState}
          ref={popupRef}
          center
          id={styles["login-popup"]}
        >
          {loginPopupStep == 0 ? (
            <LoginChooser
              setPopupState={setPopupState}
              setStep={setLoginPopupStep}
              method={loginPopupMethod}
              setMethod={setLoginPopupMethod}
            />
          ) : (
            <LoginForm method={loginPopupMethod} setOpen={setPopupState} />
          )}
        </Popup>
      </Layout>
    );
  } else {
    return (
      <>
        <img src={session.user.image} />
        <h2>{session.user.name}</h2>
        <p>{session.user.email}</p>
        <button onClick={signOut}>Logout</button>
      </>
    );
  }
}
