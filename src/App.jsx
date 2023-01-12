import React, { useState } from "react";

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
      { text: newTodo, completed: false, created: Date.now() },
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
            created: todo.created,
          };
        }
        return todo;
      })
    );
  }

  function handleDeleteTodo(index) {
    setTodos(todos.filter((todo, i) => i !== index));
  }

  function handleToggleComplete(index) {
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return {
            text: todo.text,
            completed: !todo.completed,
            created: todo.created,
          };
        }
        return todo;
      })
    );
  }

  const getFormattedDate = (created) => {
    return new Date(created).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container  w-1/2  text-center text-white py-6 mt-40">
      <h1 className="text-6xl">Tareas</h1>
      <form onSubmit={handleAddTodo}>
        <input
          className="p-1 px-3 rounded-2xl text-black"
          type="text"
          value={newTodo}
          onChange={handleNewTodoChange}
          placeholder="Add a new todo"
        />
        <button
          className="border-4 border-white rounded-full p-2"
          type="submit"
          disabled={newTodo === ""}
        >
          Agregar
        </button>
      </form>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              <span>{getFormattedDate(todo.created)}</span>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => handleToggleTodo(index)}
              >
                {todo.text}
              </span>
              <button onClick={() => handleToggleComplete(index)}>
                {todo.completed ? "✔️" : "🕐"}
              </button>
              <button onClick={() => handleDeleteTodo(index)}>🗑</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
