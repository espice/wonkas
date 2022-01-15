import styles from "./index.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faUser,
  faCreditCard,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
export default function SideNav() {
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      {isOpen ? (
        <>
          <div className={styles.sidebar}>
            <header> Wonka's</header>
            <ul className={styles.ul}>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>Home
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>Chat
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon>
                  Paycheck
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>Profile
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </>
  );
}
