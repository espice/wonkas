import styles from "./index.module.scss";
import Loading from "../../Loading";
import { useState, useEffect, useRef } from "react";
import axios from "../../../config/axios";
export default function TasksPopup({ setOpen, oompaLoompa }) {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(async () => {
    if (oompaLoompa) {
      const response = await axios.get(`/tasks/${oompaLoompa._id}`);
      setTasks(response.data.tasks);

      recount(response.data.tasks);
    }
  }, [oompaLoompa]);

  const recount = (taskArr) => {
    const pending = taskArr.filter((task) => !task.completed).length;
    const completed = taskArr.filter((task) => task.completed).length;
    setPendingCount(pending);
    setCompletedCount(completed);
  };

  const inputRef = useRef(null);

  const newTask = async () => {
    if (taskText == "" || taskText.trim() == "")
      return inputRef.current.focus();
    const task = {
      description: taskText,
      completed: false,
    };

    const response = await axios.post(`/tasks/${oompaLoompa._id}`, {
      task: task,
    });

    setTasks(response.data.tasks);
    recount(response.data.tasks);
    setTaskText("");
  };

  const deleteTask = async (id) => {
    const response = await axios.delete(`/tasks/${oompaLoompa._id}/${id}`);
    setTasks(response.data.tasks);
    recount(response.data.tasks);
  };

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
          {tasks.length == 0 ? (
            <div className={styles.popup__content__empty}>
              <div className={styles.popup__content__empty__icon} />
              <p>{oompaLoompa.name} hasn't been assigned any tasks yet.</p>
            </div>
          ) : (
            <div className={styles.popup__content__tasks}>
              {pendingCount != 0 ? (
                <>
                  <div className={styles.popup__content__tasks__header}>
                    Pending - {pendingCount}
                  </div>
                  {tasks.map((task) => {
                    if (!task.completed) {
                      return (
                        <div className={styles.popup__content__tasks__task}>
                          <p
                            className={
                              styles.popup__content__tasks__task__description
                            }
                          >
                            {task.description}
                          </p>
                          <div
                            className={
                              styles.popup__content__tasks__task__delete
                            }
                            onClick={() => deleteTask(task._id)}
                          ></div>
                        </div>
                      );
                    }
                  })}
                </>
              ) : null}

              {completedCount != 0 ? (
                <>
                  <div className={styles.popup__content__tasks__header}>
                    Completed - {completedCount}
                  </div>
                  {tasks.map((task) => {
                    if (task.completed) {
                      return (
                        <div className={styles.popup__content__tasks__task}>
                          <p
                            className={
                              styles.popup__content__tasks__task__description
                            }
                          >
                            {task.description}
                          </p>
                        </div>
                      );
                    }
                  })}
                </>
              ) : null}
            </div>
          )}
        </div>

        <div className={styles.popup__footer}>
          <input
            className={styles.popup__footer__input}
            placeholder={"New Task"}
            ref={inputRef}
            value={taskText}
            onChange={(e) => {
              setTaskText(e.target.value);
            }}
          />
          <div
            className={styles.popup__footer__new}
            onClick={(e) => {
              newTask();
            }}
          ></div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

/***
 * {pendingCount != 0 ? (
              <div className={styles.popup__content__tasks__header}>
                Pending - {pendingCount}
              </div>
            ) : null}
            {tasks.length == 0 ? (
              <div className={styles.popup__content__tasks__empty}>
                <div className={styles.popup__content__tasks__empty__icon} />
                <p>Nishit Jha hasn't been assigned any tasks yet.</p>
              </div>
            ) : (
              tasks.map((task) => {
                if (!task.completed) {
                  return (
                    <div className={styles.popup__content__tasks__task}>
                      <p
                        className={
                          styles.popup__content__tasks__task__description
                        }
                      >
                        {task.description}
                      </p>
                      <div
                        className={styles.popup__content__tasks__task__delete}
                        onClick={() => deleteTask(task._id)}
                      ></div>
                    </div>
                  );
                }
              })
            )}***/
