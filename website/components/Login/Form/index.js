import styles from "./index.module.scss";
import { useState } from "react";
import axios from "../../../config/axios";
import Router from "next/router";

import TextField from "../../Form";
import { signIn } from "next-auth/client";
export default function LoginForm({ method, setOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (e) => {
    e.preventDefault();

    const response = await axios.post("/auth/login", {
      email: email,
      password: password,
      role: "oompaloompa",
    });
    if (response.data.success) {
      setOpen(false);
      Router.reload();
    }
  };
  return (
    <div className={styles.popup}>
      <div
        className={styles.popup__close}
        onClick={() => {
          setOpen(false);
        }}
      />

      <div className={styles.popup__heading}>
        <h2>Login</h2>
        <p>as {method == 0 ? "Oompa Loompa" : "Customer"}</p>
      </div>
      {method === 0 ? (
        <div className={styles.popup__form}>
          <form onSubmit={submit} className={styles.popup__form__main}>
            <TextField
              label="Oompa Loompa ID"
              type="email"
              borderColor="rgba(92, 0, 153, 0.7)"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              label="Password"
              type="password"
              borderColor="rgba(92, 0, 153, 0.7)"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              type="submit"
              value="Login"
              className={styles.popup__form__main__submit}
            />
          </form>
        </div>
      ) : (
        <div className={styles.popup__form}>
          <div className={styles.popup__form__providers}>
            <div
              className={styles.popup__form__providers__provider}
              onClick={async (e) => {
                await signIn("google", {
                  callbackUrl: "http://localhost:3000/auth",
                });
              }}
            >
              <p>Sign in with Google</p>

              <div
                className={
                  styles.popup__form__providers__provider__icon__google
                }
              />
            </div>

            <div
              className={styles.popup__form__providers__provider}
              onClick={(e) => {
                signIn("discord", {
                  callbackUrl: "http://localhost:3000/auth",
                });
              }}
            >
              <p>Sign in with Discord</p>

              <div
                className={
                  styles.popup__form__providers__provider__icon__discord
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
