import styles from "./index.module.scss";

import TextField from "../../Form";
import { signIn } from "next-auth/client";
export default function LoginForm({ method, setOpen }) {
  const submit = (e) => {
    e.preventDefault();
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
            />
            <TextField
              label="Password"
              type="password"
              borderColor="rgba(92, 0, 153, 0.7)"
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
                console.log("hello world");
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
