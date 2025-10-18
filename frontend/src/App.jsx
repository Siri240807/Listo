import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "./components/TaskCard";
import AddTaskButton from "./components/AddTaskButton";
import ProgressBar from "./components/ProgressBar";
import QuoteBanner from "./components/QuoteBanner";
import ThemeToggle from "./components/ThemeToggle";
import confetti from "canvas-confetti";
import './index.css';



function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://localhost:3000/get-items")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // Add task
  const addTodo = () => {
    if (!newTask) return;

    fetch("http://localhost:3000/add-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemDescription: newTask }),
    }).then(() => {
      setTodos([...todos, { text: newTask, completed: false }]);
      setNewTask("");
    });
  };

  // Delete task
  const deleteTodo = (index) => {
    const todo = todos[index];
    fetch(`http://localhost:3000/delete-item/${todo.id}`, { method: "DELETE" })
      .then(() => {
        const updated = [...todos];
        updated.splice(index, 1);
        setTodos(updated);
      });
  };

  // Toggle complete + confetti
  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);

    if (updated[index].completed) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6C63FF", "#FF6B6B", "#FFB74D", "#FFE4E1"],
      });
    }
  };

  // Edit task
  const editTodo = (index) => {
    const updated = [...todos];
    updated[index].editing = true;
    setTodos(updated);
  };

  const saveTodo = (index, newText) => {
    const updated = [...todos];
    updated[index].text = newText;
    updated[index].editing = false;
    setTodos(updated);
  };

  return (
    <>
      <div className="todo-container">
        <h3 className="text-center mb-4">To-Do List</h3>

        <div className="input-group mb-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task"
          />
          <button className="save" onClick={addTodo}>
            Add
          </button>
        </div>

        <ul className="list-unstyled">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              {todo.editing ? (
                <>
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => {
                      const updated = [...todos];
                      updated[index].text = e.target.value;
                      setTodos(updated);
                    }}
                  />
                  <button
                    className="save"
                    onClick={() => saveTodo(index, todos[index].text)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{todo.text}</span>
                  <div>
                    <button className="edit" onClick={() => editTodo(index)}>
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteTodo(index)}
                    >
                      Delete
                    </button>
                    <button onClick={() => toggleComplete(index)}>✔</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Floating Add Button */}
      <div className="add-btn" onClick={addTodo}>
        +
      </div>
    </>
  );
}

export default App;
