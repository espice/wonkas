import { useSession, signIn } from "next-auth/client";
import { useEffect, useState } from "react";

import { Popup, useOnClickOutside } from "../components/Popup";
import Layout from "../components/Layout";

export default function App() {
  const [session, loading] = useSession();
  const [popupState, setPopupState] = useState(false);
  const popupRef = useState();
  useOnClickOutside(popupRef, () => setPopupState(false));

  if (!session) {
    return (
      <Layout>
        <button onClick={(e) => signIn("google")}>Google</button>
        <button onClick={(e) => signIn("github")}>Github</button>
        <button onClick={() => setPopupState(true)}>Get Started</button>
        <Popup popupState={popupState} ref={popupRef} center>
          <h1>Hello Hello</h1>
        </Popup>
      </Layout>
    );
  }
}
