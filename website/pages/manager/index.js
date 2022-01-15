import Layout from "../../components/Layout";
import Sidebar from "../../components/SideNav";
import { FAB } from "../../components/Button";
import PlusIcon from "../../public/icons/plus.svg";
import { Popup, useOnClickOutside } from "../../components/Popup";

import styles from "../../styles/pages/manager/home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useContext, useState, useRef } from "react";
import UserContext from "../../components/userContext";

const Manager = () => {
  const { user } = useContext(UserContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef();

  useOnClickOutside(popupRef, () => setPopupOpen(false));

  const NewOompaPopup = () => {
    return (
      <div className={styles["new-loompa-popup"]}>
        <PlusIcon />
      </div>
    );
  };

  return (
    <Layout>
      <Sidebar />
      <FAB onClick={() => setPopupOpen(true)}>
        <PlusIcon />
      </FAB>
      <div className={styles.main}>
        <h1 className={styles.main__heading}>
          Welcome, <span>{user.name}</span>
        </h1>
        <h4 className={styles["main__sub-heading"]}>Manage Oompa Loompas</h4>
      </div>
      <Popup ref={popupRef} popupState={popupOpen}>
        <NewOompaPopup />
      </Popup>
    </Layout>
  );
};

export default Manager;
