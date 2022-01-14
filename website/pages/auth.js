import { getSession } from "next-auth/client";
import { useEffect } from "react";

import Loading from "../components/Loading";

const Auth = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Loading />
    </div>
  );
};

export default Auth;
