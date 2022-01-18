import styles from "./index.module.scss";
import Loading from "../../Loading";
import { useState, useEffect } from "react";
import axios from "../../../config/axios";
export default function TasksPopup({ setOpen, oompaLoompa }) {
  const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    const response = await axios.get("/tasks/");
    console.log(response.data.tasks);
    setTasks(response.data.tasks);
  }, []);
  if (oompaLoompa) {
    return (
      <div className={styles.popup}>
        <div className={styles.popup__header}>
          <div className={styles.popup__header__close} />
          <h1 className={styles.popup__header__heading}>Tasks</h1>
          <p>
            Manage tasks for <b>{oompaLoompa.name}</b>
          </p>
        </div>

        <div className={styles.popup__content}>
          <div className={styles.popup__content__tasks}>
            {tasks.length == 0 ? (
              <div className={styles.popup__content__tasks__empty}>
                <p>Nishit Jha hasn't been assigned any tasks yet.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}
