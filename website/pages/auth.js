import { getSession } from "next-auth/client";
import { useEffect } from "react";

import Loading from "../components/Loading";

import axios from "../config/axios";

import Router from "next/router";

const Auth = () => {
  useEffect(() => {
    getSession().then(async (session) => {
      console.log(session);
      const res = await axios.post("/auth/login", {
        email: session.user.email,
        name: session.user.name,
        photoUrl: session.user.image,
        role: "customer",
      });
      console.log(res.data);
      Router.replace("/store");
    });
  });

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
