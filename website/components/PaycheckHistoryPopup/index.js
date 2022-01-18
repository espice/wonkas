import styles from "./index.module.scss";
import { formatMonthShort } from "../../config/dates";

import BeanIcon from "../../public/icons/bean.svg";
export default function PopupHistory({ user, history }) {
  return (
    <div className={styles.popup}>
      <div className={styles.popup__header}>
        <div className={styles.popup__header__close} />
        <h1 className={styles.popup__header__heading}>View payment history</h1>
        <p>Payment history of {user.name}</p>
      </div>

      <div className={styles.popup__content}>
        {history.length != 0 ? (
          history.map((paycheck, index) => {
            return (
              <div className={styles.popup__content__row} index={index}>
                <div className={styles.popup__content__row__label}>
                  <p>{paycheck.amount}</p>
                  <BeanIcon />
                </div>

                <div className={styles.popup__content__row__middle}>
                  <p>{formatMonthShort(paycheck.date)}</p>
                </div>

                <div className={styles.popup__content__row__action}>
                  {paycheck.collected ? (
                    <p
                      className={
                        styles.popup__content__row__action__label__success
                      }
                    >
                      Collected
                    </p>
                  ) : (
                    <p
                      className={
                        styles.popup__content__row__action__label__danger
                      }
                    >
                      Not Collected
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No payment history</p>
        )}
      </div>

      <div className={styles.popup__footer}></div>
    </div>
  );
}
