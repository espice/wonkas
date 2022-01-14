import styles from "./index.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faQrcode, faLink, faStream, faCalendarWeek, faQuestionCircle , faSlidersH, faEnvelope} from '@fortawesome/free-solid-svg-icons'
export default function SideNav() {
  const [isOpen, setOpen] = useState(true);

  return <>{isOpen ? 
    <>
    <div className={styles.sidebar}>
  <header>  Wonka's</header>
  <ul className={styles.ul}>
    <li>
      <a href="#"><FontAwesomeIcon icon={faQrcode}></FontAwesomeIcon>Home</a>
    </li>
    <li>
      <a href="#"><FontAwesomeIcon icon={faLink}></FontAwesomeIcon>Chat</a>
    </li>
    <li>
      <a href="#"><FontAwesomeIcon icon={faStream}></FontAwesomeIcon>Paycheck</a>
    </li>
    <li>
      <a href="#"><FontAwesomeIcon icon={faCalendarWeek}></FontAwesomeIcon>Profile</a>
    </li>
    <li>
      <a href="#"><FontAwesomeIcon icon={faQuestionCircle} ></FontAwesomeIcon>About</a>
    </li>
  </ul>
  </div>
  </>
  : console.log("")}</>;
}
