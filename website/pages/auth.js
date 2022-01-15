import { getSession } from "next-auth/client";
import { useEffect, useContext } from "react";

import Loading from "../components/Loading";
import UserContext from "../components/userContext";
import Layout from "../components/Layout";

import axios from "../config/axios";

import Router from "next/router";

const Auth = () => {
  const { loading } = useContext(UserContext);

  useEffect(() => {
    if (!loading) {
      getSession().then(async (session) => {
        const res = await axios.post("/auth/login", {
          email: session.user.email,
          name: session.user.name,
          photoUrl: session.user.image,
          role: "customer",
        });
        Router.push("/store");
      });
    }
  });

  return (
    <Layout title="Authenticating...">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Loading />
      </div>
    </Layout>
  );
};

export default Auth;
