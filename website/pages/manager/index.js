import Layout from "../../components/Layout";
import Sidebar from "../../components/SideNav";
import { FAB } from "../../components/Button";
import PlusIcon from "../../public/icons/plus.svg";

import styles from "../../styles/pages/manager/home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useContext } from "react";
import UserContext from "../../components/userContext";

const Manager = () => {
  const { user } = useContext(UserContext);

  return (
    <Layout>
      <Sidebar />
      <FAB>
        <PlusIcon />
      </FAB>
      <div className={styles.main}>
        <h1 className={styles.main__heading}>
          Welcome, <span>{user.name}</span>
        </h1>
        <h4 className={styles["main__sub-heading"]}>Manage Oompa Loompas</h4>
      </div>
    </Layout>
  );
};

export default Manager;
