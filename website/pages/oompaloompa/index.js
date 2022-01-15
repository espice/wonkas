import Layout from "../../components/Layout";
import SideNav from "../../components/SideNav";

import styles from "../../styles/pages/oompaloompa/home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useContext } from "react";
import UserContext from "../../components/userContext";

const OompaLoompa = () => {
  const { user } = useContext(UserContext);

  const TaskCard = ({ completed = false }) => {
    return (
      <div className={styles["task-card"]}>
        <p>Swim in the chocolate river :D</p>
        <div style={{ flexGrow: 1 }}></div>
        <button
          className={cx(styles["task-card__button"], {
            [styles["task-card__button--completed"]]: completed,
            [styles["task-card__button--not-completed"]]: !completed,
          })}
        >
          {completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
      </div>
    );
  };

  return (
    <Layout>
      <SideNav></SideNav>
      <div className={styles.main}>
        <h1 className={styles.main__heading}>
          Welcome, <span>{user.name}</span>
        </h1>
        <h4 className={styles.main__assigned}>
          You have been assigned to <span>{user.location}</span> today
        </h4>
        <h2 className={styles["main__sub-heading"]}>Your Tasks</h2>
        <p className={styles["main__sub-sub-heading"]}>Pending</p>
        <div className={styles["main__tasks-container"]}>
          <TaskCard />
          <TaskCard />
        </div>
        <p className={styles["main__sub-sub-heading"]} style={{marginTop: "40px"}}>Completed</p>
        <div className={styles["main__tasks-container"]}>
          <TaskCard completed />
          <TaskCard completed />
        </div>
      </div>
    </Layout>
  );
};

export default OompaLoompa;
