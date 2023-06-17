"use client";
import { useState } from "react";
import styles from "./addTask.module.css";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const titleChangeHandler = (event) => {
    const value = event.target.value;
    setTitle(value);
    console.log(title);
  };
  const descriptionChangeHandler = (event) => {
    const value = event.target.value;
    setDescription(value);
    console.log(description);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const data = { title, description, completed };
    console.log(data);
    try {
      await fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log(err);
    }
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
