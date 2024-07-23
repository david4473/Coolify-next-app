"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://vow8owk.209.97.189.179.sslip.io/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    const res = await axios.post(
      "http://vow8owk.209.97.189.179.sslip.io/tasks",
      {
        title,
        description,
      }
    );
    setTasks([...tasks, res.data]);
    setTitle("");
    setDescription("");
  };

  const updateTask = async (id, completed, title, description) => {
    const res = await axios.put(
      `http://vow8owk.209.97.189.179.sslip.io/tasks/${id}`,
      {
        title,
        description,
        completed,
      }
    );
    setTasks(tasks.map((task) => (task.id === id ? res.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://vow8owk.209.97.189.179.sslip.io/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <main className="app-container">
      <div className="task-form-section">
        <h1>Add a task...</h1>
        <div className="task-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows="8"
            cols="45"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className="add-task-button" onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>
      <div
        style={tasks.length == 0 ? { width: "450px" } : {}}
        className="task-list-section"
      >
        <h2 className="task-list-header">Tasks</h2>
        <div className={tasks.length == 0 ? "show-text" : "hide-text"}>
          <p>It&apos;s quiet in here</p>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              className={`${task.completed ? "task-completed" : ""} task-card`}
              key={task.id}
            >
              <div className="task-title">
                <h2>{task.title}</h2>
                <div className="task-actions">
                  <span>{!task.completed ? "complete" : "completed"}</span>
                  <svg
                    width="50"
                    height="51"
                    viewBox="0 0 77 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow-icon"
                  >
                    <path
                      d="M68.2929 50.3375C68.6834 50.728 69.3166 50.728 69.7071 50.3375L76.0711 43.9736C76.4616 43.583 76.4616 42.9499 76.0711 42.5593C75.6805 42.1688 75.0474 42.1688 74.6569 42.5593L69 48.2162L63.3431 42.5593C62.9526 42.1688 62.3195 42.1688 61.9289 42.5593C61.5384 42.9499 61.5384 43.583 61.9289 43.9736L68.2929 50.3375ZM0.999985 0.130307C0.447701 0.130306 -1.52346e-05 0.57802 -1.52588e-05 1.1303C-1.52829e-05 1.68259 0.4477 2.13031 0.999985 2.13031L0.999985 0.130307ZM70 49.6304C70 27.8695 63.8028 15.3233 51.8157 8.34235C39.9864 1.45322 22.7154 0.130353 0.999985 0.130307L0.999985 2.13031C22.7846 2.13035 39.5136 3.49234 50.8092 10.0706C61.9472 16.5571 68 28.261 68 49.6304L70 49.6304Z"
                      fill="#A2A2A2"
                    ></path>
                  </svg>
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    style={{ display: "inline-block" }}
                    onChange={() =>
                      updateTask(
                        task.id,
                        !task.completed,
                        task.title,
                        task.description
                      )
                    }
                  />
                </div>
              </div>
              <p className="task-description">{task.description}</p>
              {task.completed && (
                <button
                  className="delete-task-button"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
