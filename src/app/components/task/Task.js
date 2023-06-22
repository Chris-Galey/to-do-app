import { useState } from "react";

import styles from "./task.module.css";

export default function Task(props) {
  const { title, description, id, deleteTask, editTask } = props;

  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(props.title);
  const [editDescription, setEditDescription] = useState(props.description);

  const deleteHandler = async (event) => {
    event.preventDefault();
    const data = { title, description };
    try {
      await fetch(`http://localhost:3000/${props.id}`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log(err);
    }
    deleteTask();
  };
  const editTitleHandler = (event) => {
    const value = event.target.value;
    setEditTitle(value);
  };
  const editDescriptionHandler = (event) => {
    const value = event.target.value;
    setEditDescription(value);
  };
  const editHandler = (event) => {
    setEditing(true);
  };

  const saveHandler = async (event) => {
    event.preventDefault();
    const edited = {
      title: editTitle,
      description: editDescription,
    };
    console.log(edited);
    try {
      await fetch(`http://localhost:3000/${props.id}`, {
        method: "PATCH",
        body: JSON.stringify(edited),
        headers: {
          "Content-Type": "application/json",
          Authorization: storedToken,
        },
      });
    } catch (err) {
      console.log(err);
    }
    setEditing(false);
    editTask();
  };
  return (
    <div className={styles.item}>
      {editing ? (
        <div className={styles.content}>
          <input
            type="text"
            onChange={editTitleHandler}
            value={editTitle}
            className={`${styles.h3} ${styles.ready}`}
          />
          <input
            type="text"
            onChange={editDescriptionHandler}
            value={editDescription}
            className={`${styles.p} ${styles.ready}`}
          />
        </div>
      ) : (
        <div className={styles.content}>
          <h3 className={styles.h3}>{props.title}</h3>
          <p className={styles.p}>{props.description}</p>
        </div>
      )}

      <div className={styles.actions}>
        <button className={styles.delete} onClick={deleteHandler}>
          delete
        </button>

        {editing ? (
          <button className={styles.save} onClick={saveHandler}>
            Save
          </button>
        ) : (
          <button className={styles.edit} onClick={editHandler}>
            edit
          </button>
        )}
      </div>
    </div>
  );
}
