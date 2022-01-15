import { useEffect, useContext } from "react";

import axios from "../config/axios";
import Router from "next/router";

import UserContext from "./userContext";

const Auth = ({ children }) => {
  const { setUser, setLoading } = useContext(UserContext);

  useEffect(async () => {
    const res = await axios.get("/auth/me");
    const path = Router.pathname;
    const success = res.data.success;
    const user = res.data.user;
    setLoading(true);

    console.log(path);

    if (res.data.success == false && (path != "/" || path != "/auth")) {
      console.log("here2");
      Router.replace("/");
      setLoading(false);
    } else if (success && user.role == "customer" && !path.includes("store")) {
      Router.replace("/store");
      //   setUser(user);
      //   setLoading(false);
    } else if (
      success &&
      user.role == "oompaloompa" &&
      !user.isManager &&
      !path.includes("oompaloompa")
    ) {
      Router.replace("/oompaloompa");
      //   setUser(user);
      //   setLoading(false);
    } else if (
      success &&
      user.role == "oompaloompa" &&
      user.isManager &&
      !path.includes("manager")
    ) {
      Router.replace("/manager");
      //   setUser(user);
      //   setLoading(false);
    } else {
      console.log("here");
      setUser(user);
      setLoading(false);
    }
  }, []);

  return <div>{children}</div>;
};

export default Auth;
