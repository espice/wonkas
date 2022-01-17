import { useSession, signOut } from "next-auth/client";
import { useEffect, useState } from "react";
import axios from "../config/axios";

import Layout from "../components/Layout";
import LoginChooser from "../components/Login/Chooser";
import LoginForm from "../components/Login/Form";
import { Popup, useOnClickOutside } from "../components/Popup";
import styles from "../styles/pages/index.module.scss";
import SideNav from "../components/SideNav";

export default function App() {
  const [session, loading] = useSession();
  const [loginPopupState, setLoginPopupState] = useState(false);
  const [loginPopupMethod, setLoginPopupMethod] = useState(null);
  const [loginPopupStep, setLoginPopupStep] = useState(0);
  const popupRef = useState();

  useOnClickOutside(popupRef, () => {
    setLoginPopupState(false);
    setLoginPopupMethod(null);
    setLoginPopupStep(0);
  });

  if (!session) {
    return (
      <Layout>
        <div className={styles["landing"]}>
          <div>
            <h1>
              We make Chocolates
              <br />
              that make your mind go <br />
              <i>whoosh</i>
            </h1>
            <button onClick={() => setLoginPopupState(true)}>
              Get Started
            </button>
          </div>

          <img src="/wonka_bar.png" />
        </div>

        <Popup
          popupState={loginPopupState}
          ref={popupRef}
          center
          className={styles["login-popup"]}>
          {loginPopupStep == 0 ? (
            <LoginChooser
              setPopupState={setLoginPopupState}
              setStep={setLoginPopupStep}
              method={loginPopupMethod}
              setMethod={setLoginPopupMethod}
            />
          ) : (
            <LoginForm method={loginPopupMethod} setOpen={setLoginPopupState} />
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
