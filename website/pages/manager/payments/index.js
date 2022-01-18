import Layout from "../../../components/Layout";
import axios from "../../../config/axios";
import SideNav from "../../../components/SideNav";
import PayCheckPopup from "../../../components/PaycheckPayPopup";
import PopupHistory from "../../../components/PaycheckHistoryPopup";
import { Popup, useOnClickOutside } from "../../../components/Popup";
import styles from "./index.module.scss";
import { useState, useEffect, useRef } from "react";
import BeanIcon from "../../../public/icons/bean.svg";
import classNames from "classnames/bind";
import { formatLong } from "../../../config/dates";
const cx = classNames.bind(styles);
const Paychecks = () => {
  const [paychecks, setPaychecks] = useState([]);
  const [editPayCheck, setEditPayCheck] = useState({});
  const [total, setTotal] = useState(0);
  const [popupUser, setPopupUser] = useState({});
  const [old, setOld] = useState({});
  const [isPayPopupOpen, setIsPayPopupOpen] = useState(false);
  const [isHistoryPopupOpen, setIsHistoryPopupOpen] = useState(false);
  const [historyPopupData, setHistoryPopupData] = useState(null);

  const paypopupRef = useRef(null);
  const historypopupRef = useRef(null);

  useOnClickOutside(paypopupRef, () => {
    setIsPayPopupOpen(false);
  });
  useOnClickOutside(historypopupRef, () => {
    setIsHistoryPopupOpen(false);
  });

  useEffect(async () => {
    const response = await axios.get("/api/paycheck/all");
    const data = response.data.allPaychecks;

    setPaychecks(data);

    const totalReq = await axios.get("/api/total");
    const totalData = totalReq.data.total;
    setTotal(totalData.amount);
  }, []);

  function handlePayCheckAdd(e, amount, id) {
    e.preventDefault();
    console.log(amount);
  }
  return (
    <Layout>
      <SideNav />
      <div className={styles.main}>
        <div className={styles.main__header}>
          <div className={styles.main__header__title}>
            <h1 className={styles.main__header__title__heading}>Paychecks</h1>
            <p className={styles.main__header__title__description}>
              Pay Oompa Loompas
            </p>
          </div>
        </div>

        <div className={styles.main__content}>
          <div className={styles.main__content__headrow}>
            <p className={styles.main__content__headrow__label}>Budget:</p>

            <div className={styles.main__content__headrow__actionlabel}>
              <p className={styles.main__content__headrow__actionlabel__label}>
                {total}
              </p>
              <BeanIcon />
            </div>
          </div>

          <div className={styles.main__content__category}>
            {paychecks.map((value, i) => {
              return (
                <div className={styles.main__content__category__row}>
                  <div className={styles.main__content__category__row__info}>
                    <p
                      className={
                        styles.main__content__category__row__info__label
                      }
                    >
                      {value.user.name}
                    </p>

                    <p
                      className={
                        styles.main__content__category__row__info__info
                      }
                    >
                      {new Date(value.nextPaycheck).getTime() <=
                      new Date().getTime()
                        ? "Salary Due!"
                        : `Salary Due on ${formatLong(value.nextPaycheck)}`}
                    </p>
                  </div>

                  <div className={styles.main__content__category__row__actions}>
                    <button
                      className={cx({
                        main__content__category__row__actions__button: true,
                        "button-primary": true,
                      })}
                      onClick={(e) => {
                        setHistoryPopupData(value);
                        setIsHistoryPopupOpen(true);
                      }}
                    >
                      View History
                    </button>
                    <button
                      className={cx({
                        main__content__category__row__actions__button: true,
                        "button-primary": true,
                      })}
                      onClick={(e) => {
                        setIsPayPopupOpen(true), setPopupUser(value.user);
                      }}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Popup popupState={isPayPopupOpen} ref={paypopupRef} center>
          <PayCheckPopup userId={popupUser} setOpen={setIsPayPopupOpen} />
        </Popup>

        <Popup
          popupState={isHistoryPopupOpen}
          ref={historypopupRef}
          className={styles["stuff"]}
          center
        >
          {historyPopupData ? (
            <PopupHistory
              user={historyPopupData.user}
              history={historyPopupData.paycheckHistory}
            />
          ) : null}
        </Popup>
      </div>
    </Layout>
  );
};
export default Paychecks;

/*
{paychecks.map((value, i) => {
          return (
            <div>
              <h1> Name: {value.user.name}</h1>
              <h3>Salary: {value.salary}</h3>
              {new Date(value.nextPaycheck).getTime() <=
              new Date().getTime() ? (
                <h4>payment due</h4>
              ) : (
                <h4>payment not due</h4>
              )}
              {console.log(
                new Date(value.nextPaycheck).getTime() > new Date().getTime()
              )}
              <button
                onClick={(e) => {
                  setIsPayPopupOpen(true),
                    setButtonUser(value.user),
                    setOld(value.paycheckHistory);
                }}
              >
                pay this gareeban aadmi pls bro pls
              </button>
              <button>
                iski history dekho search waali nahi warna momy scold
              </button>
            </div>
          );
        })}
        */
