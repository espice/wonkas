// Import
import "../styles/globals.scss";

import { Provider } from "next-auth/client";

// Export Root
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
