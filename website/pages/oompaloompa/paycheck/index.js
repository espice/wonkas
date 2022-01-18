import Layout from "../../../components/Layout";
import UserContext from "../../../components/userContext";
import { useContext, useState, useRef, useEffect } from "react";
import axios from "../../../config/axios";
import { formatLong } from "../../../config/dates";
import SideNav from "../../../components/SideNav";
import Loading from "../../../components/Loading";
import styles from "./index.module.scss";
import BeanIcon from "../../../public/icons/bean.svg";
const PayCheck = () => {
  const [paycheckData, setpaycheckData] = useState(null);

  useEffect(async () => {
    const response = await axios.get("/api/paycheck");
    const data = response.data.paycheck;

    data.nextPaycheck = formatLong(response.data.paycheck.nextPaycheck);

    setpaycheckData(data);
  }, []);
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
        </div>
      </div>
    </Layout>
  );
};
export default PayCheck;
