// Import
import "../styles/globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { Provider } from "next-auth/client";

import UserContext from "../components/userContext";
import { useState } from "react";

// Export Root
export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </UserContext.Provider>
  );
}
