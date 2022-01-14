import { useState } from "react";
import styles from './index.module.scss';

export default function Login({setPopupState}){
    const [type,setType] = useState("");


    return(
        <div className={styles["popup__login"]}>
            <div className={styles["popup__login__close"]} onClick={(e)=>{setPopupState(false)}}/>
            <h1 className={styles["popup__login__heading"]}>I am a...</h1>

            <div className={styles["popup__login__container"]}>
                <button className={type=="oompa"?styles["popup__login__container__button__selected"]:styles["popup__login__container__button"]} onClick={(e)=>{setType("oompa")}}>
                    Oompa Loompa
                </button>
                <button className={type=="customer"?styles["popup__login__container__button__selected"]:styles["popup__login__container__button"]} onClick={(e)=>{setType("customer")}}>
                    Customer
                </button>
            </div>

            {type===""?(
            <div className={styles["popup__continue__disabled"]}>
                <p>Continue</p>
            </div>):(
                <div className={styles["popup__continue__enabled"]}>
                <p>Continue</p>
                <div className={styles["popup__continue__enabled__icon"]}/>
                </div>
            )}

            </div>
    )
}