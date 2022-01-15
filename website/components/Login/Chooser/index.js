import { useState } from "react";
import styles from "./index.module.scss";

export default function LoginChooser({
  setPopupState,
  method,
  setMethod,
  setStep,
}) {
  return (
    <div className={styles["popup__login"]}>
      <div
        className={styles["popup__login__close"]}
        onClick={(e) => {
          setPopupState(false);
          setMethod("");
          setStep(0);
        }}
      />
      <div style={{ height: "30px" }}></div>
      <h1 className={styles["popup__login__heading"]}>I am a...</h1>

      <div className={styles["popup__login__container"]}>
        <button
          className={
            method == 0
              ? styles["popup__login__container__button__selected"]
              : styles["popup__login__container__button"]
          }
          onClick={(e) => {
            setMethod(0);
          }}
        >
          Worker
        </button>
        <button
          className={
            method == 1
              ? styles["popup__login__container__button__selected"]
              : styles["popup__login__container__button"]
          }
          onClick={(e) => {
            setMethod(1);
          }}
        >
          Customer
        </button>
      </div>

      {method === null ? (
        <div className={styles["popup__continue__disabled"]}>
          <p>Continue</p>
        </div>
      ) : (
        <div
          className={styles["popup__continue__enabled"]}
          onClick={(e) => {
            setStep(1);
          }}
        >
          <p>Continue</p>
          <div className={styles["popup__continue__enabled__icon"]} />
        </div>
      )}
    </div>
  );
}
