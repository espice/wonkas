import Layout from "../../../components/Layout";
import UserContext from "../../../components/userContext";
import { useContext, useState, useRef, useEffect } from "react";
import axios from "../../../config/axios";
import { formatLong, formatMonthShort } from "../../../config/dates";
import SideNav from "../../../components/SideNav";
import Loading from "../../../components/Loading";
import styles from "./index.module.scss";
import BeanIcon from "../../../public/icons/bean.svg";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const PayCheck = () => {
  const [paycheckData, setpaycheckData] = useState(null);
  const [collectedCount, setCollectedCount] = useState(0);
  const [notCollectedCount, setNotCollectedCount] = useState(0);

  useEffect(async () => {
    const response = await axios.get("/api/paycheck");
    const data = response.data.paycheck;

    data.nextPaycheck = formatLong(response.data.paycheck.nextPaycheck);

    data.paycheckHistory.forEach((paycheck) => {
      if (paycheck.collected) {
        setCollectedCount(collectedCount + 1);
      } else {
        setNotCollectedCount(notCollectedCount + 1);
      }
    });
    setpaycheckData(data);
  }, []);

  const markAsCollected = async (id) => {
    const response = await axios.post("/api/paycheck/collect", {
      paycheckId: id,
    });
    if (response.data.success) {
      window.location.reload();
    }
  };
  return (
    <Layout title="Paycheck">
      <SideNav />
      <div className={styles.main}>
        <div className={styles.main__header}>
          <div className={styles.main__header__title}>
            <h1 className={styles.main__header__title__heading}>Paycheck</h1>
            <p className={styles.main__header__title__description}>
              View your income history, bonuses and more.
            </p>
          </div>
        </div>

        <div className={styles.main__content}>
          <div className={styles.main__content__category}>
            <p className={styles.main__content__category__heading}>Due</p>
            <div className={styles.main__content__category__content}>
              {paycheckData ? (
                <div className={styles.main__content__category__content__row}>
                  <div
                    className={
                      styles.main__content__category__content__row__label
                    }
                  >
                    <p>{paycheckData.salary}</p>
                    <BeanIcon />
                  </div>

                  <div
                    className={
                      styles.main__content__category__content__row__action
                    }
                  >
                    {paycheckData ? (
                      <p
                        className={
                          styles.main__content__category__content__row__action__gray
                        }
                      >
                        To be paid on {paycheckData.nextPaycheck}
                      </p>
                    ) : (
                      <Loading />
                    )}
                  </div>
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>

          {notCollectedCount !== 0 ? (
            <div className={styles.main__content__category}>
              <p className={styles.main__content__category__heading}>
                Not Collected
              </p>

              <div className={styles.main__content__category__content}>
                {paycheckData ? (
                  paycheckData.paycheckHistory.map((paycheck, index) => {
                    if (!paycheck.collected) {
                      return (
                        <div
                          key={paycheck.id}
                          className={
                            styles.main__content__category__content__row
                          }
                        >
                          <div
                            className={
                              styles.main__content__category__content__row__label
                            }
                          >
                            <p>{paycheck.amount}</p>
                            <BeanIcon />

                            <h4
                              className={
                                styles.main__content__category__content__row__label__secondary
                              }
                            >
                              Given on {formatMonthShort(paycheck.date)}
                            </h4>
                          </div>

                          <div
                            className={
                              styles.main__content__category__content__row__middle
                            }
                          >
                            <p>Collectible from Reception</p>
                          </div>

                          <div
                            className={
                              styles.main__content__category__content__row__action
                            }
                          >
                            <button
                              className={cx({
                                "button-primary": true,
                                main__content__category__content__row__action__action: true,
                              })}
                              onClick={(e) => {
                                markAsCollected(paycheck.id);
                              }}
                            >
                              Mark as collected
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          ) : null}

          {collectedCount !== 0 ? (
            <div className={styles.main__content__category}>
              <p className={styles.main__content__category__heading}>
                Collected
              </p>
              <div className={styles.main__content__category__content}>
                {paycheckData ? (
                  paycheckData.paycheckHistory.map((paycheck, index) => {
                    if (paycheck.collected) {
                      return (
                        <div
                          key={paycheck.id}
                          className={
                            styles.main__content__category__content__row
                          }
                        >
                          <div
                            className={
                              styles.main__content__category__content__row__label
                            }
                          >
                            <p>{paycheck.amount}</p>
                            <BeanIcon />

                            <h4
                              className={
                                styles.main__content__category__content__row__label__secondary
                              }
                            >
                              Given on {formatMonthShort(paycheck.date)}
                            </h4>
                          </div>

                          <div
                            className={
                              styles.main__content__category__content__row__action
                            }
                          >
                            <p
                              className={
                                styles.main__content__category__content__row__action__gray
                              }
                            >
                              Collected
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};
export default PayCheck;
