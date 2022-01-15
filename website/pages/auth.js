import { getSession } from "next-auth/client";
import { useEffect, useContext } from "react";

import Head from "next/head";
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
        console.log(session);
        const res = await axios.post("/auth/login", {
          email: session.user.email,
          name: session.user.name,
          photoUrl: session.user.image,
          role: "customer",
        });
        console.log(res.data);
        Router.push("/store");
      });
    }
  });

  return (
    <Layout title="Authenticating...">
      {" "}
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
    </Layout>
  );
};

export default Auth;
