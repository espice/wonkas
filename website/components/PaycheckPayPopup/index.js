import { useState, useEffect } from "react";
import axios from "../../config/axios";
import styles from "./index.module.scss";
import BeanIcon from "../../public/icons/bean.svg";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const PayCheckPopup = ({ userId, setOpen }) => {
  const [payment, setPayment] = useState(150);
  const [total, setTotal] = useState(0);
  const [bonusSelected, setBonusSelected] = useState(0);
  const [paying, setPaying] = useState(false);
  useEffect(async () => {
    const response = await axios.get("/api/total/");

    console.log(response.data.total.amount);
    setTotal(response.data.total.amount);
  }, []);

  const submitHandler = async () => {
    setPaying(true);
    const response = await axios.post("/api/paycheck/pay", {
      userId: userId._id,
      amount: parseInt(payment) + parseInt(bonusSelected),
    });
    if (response.data.success) {
      setOpen(false);
      setPaying(false);
      window.location.reload();
    } else {
      setPaying(false);
    }
  };
  return (
    <div className={styles.popup}>
      <div className={styles.popup__header}>
        <div className={styles.popup__header__close} />
        <h1 className={styles.popup__header__heading}>Pay {userId.name}</h1>
        <p>Pay {userId.email}. You can add a bonus if you wish to.</p>
      </div>

      <div className={styles.popup__content}>
        <form className={styles.popup__content__salary}>
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
              if (bonusSelected == 10) {
                return setBonusSelected(0);
              }
              setBonusSelected(10);
            }}
          >
            <BeanIcon className={styles.popup__content__bonus__card__icon} />
            <p className={styles.popup__content__bonus__card__label}>+10</p>
          </div>

          <div
            className={
              bonusSelected == 50
                ? styles.popup__content__bonus__card__selected
                : styles.popup__content__bonus__card
            }
            onClick={(e) => {
              if (bonusSelected == 50) {
                return setBonusSelected(0);
              }
              setBonusSelected(50);
            }}
          >
            <BeanIcon className={styles.popup__content__bonus__card__icon} />
            <p className={styles.popup__content__bonus__card__label}>+50</p>
          </div>

          <div
            className={
              bonusSelected == 100
                ? styles.popup__content__bonus__card__selected
                : styles.popup__content__bonus__card
            }
            onClick={(e) => {
              if (bonusSelected == 100) {
                return setBonusSelected(0);
              }
              setBonusSelected(100);
            }}
          >
            <BeanIcon className={styles.popup__content__bonus__card__icon} />
            <p className={styles.popup__content__bonus__card__label}>+100</p>
          </div>

          <div
            className={
              bonusSelected == 500
                ? styles.popup__content__bonus__card__selected
                : styles.popup__content__bonus__card
            }
            onClick={(e) => {
              if (bonusSelected == 500) {
                setBonusSelected(0);
              } else {
                setBonusSelected(500);
              }
            }}
          >
            <BeanIcon className={styles.popup__content__bonus__card__icon} />
            <p className={styles.popup__content__bonus__card__label}>+500</p>
          </div>
        </div>
      </div>

      <div className={styles.popup__footer}>
        <button
          className={cx("button-primary", styles.popup__footer__button)}
          onClick={(e) => {
            submitHandler();
          }}
          disabled={paying}
        >
          {!paying ? `Pay ${userId.name}` : `Paying...`}
        </button>
      </div>
    </div>
  );
};

export default PayCheckPopup;
