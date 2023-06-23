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
  useEffect(() => {
    if (storedToken) {
      getTasks();
    } else {
      router.push("http://localhost:3001/login");
    }
  }, []);

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
      if (response.ok) {
        getTasks(); // Refresh tasks after successful deletion
      } else {
        console.log("Add task failed");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteTask(taskId) {
    try {
      const response = await fetch(`http://localhost:3000/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: storedToken,
        },
      });

      if (response.ok) {
        getTasks(); // Refresh tasks after successful deletion
      } else {
        console.log("Delete task failed");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function editTask(taskId, editedTask) {
    try {
      const response = await fetch(`http://localhost:3000/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify(editedTask),
        headers: {
          "Content-Type": "application/json",
          Authorization: storedToken,
        },
      });
      if (response.ok) {
        getTasks(); // Refresh tasks after successful deletion
      } else {
        const errorResponse = await response.json();
        console.log("Edit task failed:", errorResponse);
      }
    } catch (err) {
      console.log(err);
    }
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
              editTask={(editedTask) => editTask(task._id, editedTask)}
              deleteTask={() => deleteTask(task._id)}
            />
          );
        })}
      </section>
    </main>
  );
}
