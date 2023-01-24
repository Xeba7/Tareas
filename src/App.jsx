import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Deleteicon from "./components/deleted";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Recuperar la lista de tareas del LocalStorage en el montaje inicial del componente
  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");

    if (todosFromLocalStorage) {
      setTodos(JSON.parse(todosFromLocalStorage));
    }
  }, []);

  // Guardar la lista de tareas en el LocalStorage cada vez que se actualiza el estado de "todos"
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
    });
  };

  const cantidad = todos.length;
  const completas = todos.filter((todo) => todo.completed).length;

  return (
    <div className="p-2 bg-slate-900">
      <Navbar />

      <div className="container  2xl:w-[800px]  xl:w-3/5 lg:w-2/3 text-center   mt-20 sm:rounded-lg  sm:p-5 sm:pb-10 sm:rounded-b-3xl">
        <h1 className="text-6xl font-bold  text-gray-100">Tareas</h1>

        <form
          onSubmit={handleAddTodo}
          className="md:mt-10 md:flex  md:gap-10 justify-between md:p-2 "
        >
          <input
            className="p-3 px-5 rounded-full text-gray-100 bg-slate-700 w-full border-gray-300 border-2 hover:border-gray-100 md:text-xl mt-3"
            type="text"
            value={newTodo}
            onChange={handleNewTodoChange}
            maxLength="50"
            placeholder="Escribe una nueva tarea"
          />
          <button
            className="bg-slate-700 border-2 border-gray-300 rounded-full p-3 hover:border-gray-100 font-semibold hover:scale-y-105 transform-origin-center text-gray-100 md:w-40 mt-3 w-full"
            type="submit"
            disabled={newTodo === ""}
          >
            Agregar
          </button>
        </form>
        <div className="text-white flex justify-center gap-3 font-semibold mt-5">
          <p>Tareas completas</p>
          <span>
            {completas} de {cantidad}
          </span>
        </div>
        <ul className="mt-5 border-t-[1px]   border-cyan-100   text-slate-100">
          {todos.map((todo, index) => {
            return (
              <li key={index} className="mt-3 p-2  rounded-xl bg-slate-700">
                <section className="flex justify-between  pt-2 border-b-[1px] border-gray-300">
                  <span className="flex self-center md:mr-3 mr-1">
                    <button
                      onClick={() => handleToggleComplete(index)}
                      className="border-2 border-green-600 rounded-full hover:scale-105"
                    >
                      {todo.completed ? "✔️" : "🕐"}
                    </button>
                  </span>
                  <p
                    className="text-2xl pb-1 w-full text-start break-all mr-1"
                    style={{
                      textDecoration: todo.completed
                        ? "line-through solid red 4px"
                        : "none",
                    }}
                  >
                    {todo.text}
                  </p>
                  <span className="flex self-center ">
                    <button
                      onClick={() => handleDeleteTodo(index)}
                      className="border-2 border-red-600 rounded-full hover:scale-105"
                    >
                      <Deleteicon />
                    </button>
                  </span>
                </section>
                <span className="flex text-inherit text-xs self-start opacity-60 ">
                  Creada {getFormattedDate(todo.created)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
