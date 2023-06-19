"use client";
import { useState, useEffect } from "react";

import styles from "./page.module.css";
import Task from "./components/task/Task";
import AddTask from "./components/task/AddTask";

export default function Home() {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    const response = await fetch("http://localhost:3000/");
    const data = await response.json();
    setData(data);
  }
  const handleTaskChange = () => {
    getTasks();
  };
  return (
    <main className={styles.main}>
      <AddTask onTaskChange={handleTaskChange} />
      <section className={styles.container}>
        {data.map((task) => {
          return (
            <Task
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              onTaskChange={handleTaskChange}
            />
          );
        })}
      </section>
    </main>
  );
}
