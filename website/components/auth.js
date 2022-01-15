import { useEffect } from "react";

import axios from "../config/axios";
import Router from "next/router";

const Auth = ({ children }) => {
  useEffect(async () => {
    const res = await axios.get("/auth/me");
    console.log(Router.pathname);
  }, []);

  return <div>{children}</div>;
};

export default Auth;
