"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Task from "./components/task/Task";
import AddTask from "./components/task/AddTask";

export default function Home() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const storedToken = sessionStorage.getItem("jwtToken");
  console.log(data);

  useEffect(() => {
    if (storedToken) {
      getTasks();
    } else {
      router.push("http://localhost:3001/login");
    }
  }, [storedToken]);

  async function getTasks() {
    try {
      const response = await fetch("http://localhost:3000/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: storedToken,
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
      } else {
        router.push("/login");
      }
    } catch (err) {
      // Handle network or other errors
      console.log("Error: ", err);
    }
  }

  async function addTask(task) {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
          Authorization: storedToken,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  function deleteTask() {
    getTasks();
  }
  function editTask() {
    getTasks();
  }
  return (
    <main className={styles.main}>
      <AddTask addTask={addTask} />
      <section className={styles.container}>
        {data.map((task) => {
          return (
            <Task
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          );
        })}
      </section>
    </main>
  );
}
