import Head from "next/head";
import Auth from "../auth";

const Layout = ({ children, title }) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/icon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="theme-color" content="#0a6cff" />
        <title>{title}</title>
      </Head>
      <Auth>
        <div>{children}</div>
      </Auth>
      <div id="popupContainer"></div>
    </div>
  );
};
export default Layout;
