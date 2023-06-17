"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Task from "./Task";
import AddTask from "./AddTask";

export default function Home() {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    async function getTasks() {
      const response = await fetch("http://localhost:3000/");
      const data = await response.json();
      setData(data);
    }
    getTasks();
  }, []);

  return (
    <main className={styles.main}>
      <h1>Secret Todo List</h1>
      <AddTask />
      <section className={styles.container}>
        {data.map((task) => {
          return (
            <Task
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              completed={task.completed}
            />
          );
        })}
      </section>
    </main>
  );
}
