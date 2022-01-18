import Layout from "../../components/Layout";
import SideNav from "../../components/SideNav";
import Loading from "../../components/Loading";

import styles from "../../styles/pages/oompaloompa/home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useContext, useState, useEffect } from "react";
import UserContext from "../../components/userContext";
import axios from "../../config/axios";

const OompaLoompa = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incomTasks, setIncomTasks] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(async () => {
    if (!userLoading) {
      setLoading(true);
      const res = await axios.get("/tasks");
      console.log(res.data);
      setTasks(res.data);
      const cTasks = [];
      const iTasks = [];
      res.data.tasks.forEach((task) => {
        if (task.completed) {
          cTasks.push(task);
        } else {
          iTasks.push(task);
        }
      });
      setCompletedTasks(cTasks);
      setIncomTasks(iTasks);
      setLoading(false);
    }
  }, [reload, userLoading]);

  const TaskCard = ({ id, description, completed = false }) => {
    async function markComplete() {
      const res = await axios.post(`/tasks/complete/${id}`);
      console.log(res.data);
      setReload(!reload);
    }

    async function markIncomplete() {
      const res = await axios.post(`/tasks/incomplete/${id}`);
      console.log(res.data);
      setReload(!reload);
    }

    return (
      <div className={styles["task-card"]}>
        <p>{description}</p>
        <div style={{ flexGrow: 1 }}></div>
        <button
          className={cx(styles["task-card__button"], {
            [styles["task-card__button--completed"]]: completed,
            [styles["task-card__button--not-completed"]]: !completed,
          })}
          onClick={completed ? markIncomplete : markComplete}
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
        {loading ? (
          <div
            style={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </div>
        ) : (
          <>
            <h2 className={styles["main__sub-heading"]}>Your Tasks</h2>
            <p className={styles["main__sub-sub-heading"]}>Pending</p>
            <div className={styles["main__tasks-container"]}>
              {!incomTasks.length && (
                <div className={styles["info-box"]}>
                  You don't have any pending tasks
                </div>
              )}
              {incomTasks.map((task) => {
                return (
                  <TaskCard description={task.description} id={task._id} />
                );
              })}
            </div>
            <p
              className={styles["main__sub-sub-heading"]}
              style={{ marginTop: "40px" }}
            >
              Completed
            </p>
            <div className={styles["main__tasks-container"]}>
              {!completedTasks.length && (
                <div className={styles["info-box"]}>
                  You don't have any completed tasks
                </div>
              )}
              {completedTasks.map((task) => {
                return (
                  <TaskCard
                    description={task.description}
                    completed
                    id={task._id}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default OompaLoompa;
