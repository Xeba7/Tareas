import React, { useState } from "react";
import "./App.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  function handleNewTodoChange(e) {
    setNewTodo(e.target.value);
  }

  function handleAddTodo(e) {
    e.preventDefault();
    if (newTodo === "") return;
    setTodos([
      ...todos,
      { text: newTodo, completed: false, timestamp: Date.now() },
    ]);
    setNewTodo("");
  }

  function handleToggleTodo(index) {
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return {
            text: todo.text,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  }

  function handleDeleteTodo(index) {
    setTodos(todos.filter((todo, i) => i !== index));
  }

  function handleToggleFavorite(index) {
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return {
            text: todo.text,
            completed: todo.completed,
            favorite: !todo.favorite,
          };
        }
        return todo;
      })
    );
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={handleNewTodoChange}
          placeholder="Add a new todo"
        />
        <button type="submit" disabled={newTodo === ""}>
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo, index) => {
          const date = new Date(todo.timestamp).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <li key={index}>
              <span>{date}</span>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => handleToggleTodo(index)}
              >
                {todo.text}
              </span>
              <button onClick={() => handleToggleFavorite(index)}>
                {todo.favorite ? "★" : "☆"}
              </button>
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
