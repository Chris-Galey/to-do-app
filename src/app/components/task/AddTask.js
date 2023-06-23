"use client";
import { useState } from "react";
import styles from "./addTask.module.css";

export default function AddTask({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleChangeHandler = (event) => {
    const value = event.target.value;
    setTitle(value);
  };
  const descriptionChangeHandler = (event) => {
    const value = event.target.value;
    setDescription(value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const data = { title, description };
    addTask(data);
    setDescription("");
    setTitle("");
  };
  return (
    <form className={styles.item} onSubmit={submitHandler}>
      <div className={styles.content}>
        <label>
          Title:
          <input type="text" onChange={titleChangeHandler} value={title} />
        </label>
        <label>
          Description:
          <input
            type="text"
            onChange={descriptionChangeHandler}
            value={description}
          />
        </label>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}
