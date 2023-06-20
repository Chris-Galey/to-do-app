"use client";
import { useState, useEffect } from "react";

import styles from "./page.module.css";
import Task from "./components/task/Task";
import AddTask from "./components/task/AddTask";
import { setToken } from "./context/AuthContext";
import { useRouter } from "next/navigation";
export default function Home() {
  const [data, setData] = useState([]);
  console.log(data);
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("jwtToken");

    if (storedToken) {
      getTasks(storedToken);
    } else {
      router.push("http://localhost:3001/login");
    }
  }, []);

  async function getTasks(token) {
    try {
      const response = await fetch("http://localhost:3000/", {
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        // Handle unauthorized or other error responses
        if (response.status === 401) {
          // Redirect to login if unauthorized
          router.push("/login");
        } else {
          // Handle other error responses
          console.log("Error: ", response.status);
        }
      }
    } catch (err) {
      // Handle network or other errors
      console.log("Error: ", err);
    }
  }
  return (
    <main className={styles.main}>
      <AddTask onTaskChange={getTasks} />
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
