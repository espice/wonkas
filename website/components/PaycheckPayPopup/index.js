import { useState, useEffect } from "react";
import axios from "../../config/axios";
import styles from "./index.module.scss";
import BeanIcon from "../../public/icons/bean.svg";
const PayCheckPopup = ({ userId }) => {
  const [payment, setPayment] = useState(150);
  const [total, setTotal] = useState(0);
  const [bonusSelected, setBonusSelected] = useState(false);

  useEffect(async () => {
    const response = await axios.get("/api/total/");

    console.log(response.data.total.amount);
    setTotal(response.data.total.amount);
  }, []);

  function submitHandler() {
    /*axios.post("/api/total/update", {
            amount: total - payment
        }).then((value) => {
            console.log(value)
        })
        */
  }
  return (
    <div className={styles.popup}>
      <div className={styles.popup__header}>
        <div className={styles.popup__header__close} />
        <h1 className={styles.popup__header__heading}>Pay {userId.name}</h1>
        <p>Pay {userId.email}. You can add a bonus if you wish to.</p>
      </div>

      <div className={styles.popup__content}>
        <form
          onSubmit={submitHandler()}
          className={styles.popup__content__salary}
        >
          <input
            type="number"
            value={payment}
            onChange={(e) => {
              setPayment(e.target.value);
            }}
            className={styles.popup__content__salary__input}
          ></input>
          <BeanIcon className={styles.popup__content__salary__bean} />
        </form>

        <div className={styles.popup__content__bonus}>
          <div
            className={
              bonusSelected == 10
                ? styles.popup__content__bonus__card__selected
                : styles.popup__content__bonus__card
            }
            onClick={(e) => {
              setBonusSelected(10);
            }}
          >
            <BeanIcon className={styles.popup__content__bonus__card__icon} />
            <p className={styles.popup__content__bonus__card__label}>+10</p>
          </div>

          <div className={styles.popup__content__bonus__card}>
            <BeanIcon className={styles.popup__content__bonus__card__icon} />
            <p className={styles.popup__content__bonus__card__label}>+50</p>
          </div>

          <div className={styles.popup__content__bonus__card}>
            <BeanIcon className={styles.popup__content__bonus__card__icon} />
            <p className={styles.popup__content__bonus__card__label}>+100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayCheckPopup;
