import React, { useState, useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Recuperar la lista de tareas del LocalStorage en el montaje inicial del componente
  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");
    console.log(todosFromLocalStorage);
    if (todosFromLocalStorage) {
      setTodos(JSON.parse(todosFromLocalStorage));
    }
  }, []);

  // Guardar la lista de tareas en el LocalStorage cada vez que se actualiza el estado de "todos"
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(localStorage);
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
    });
  };

  const cantidad = todos.length;
  const completas = todos.filter((todo) => todo.completed).length;

  return (
    <div className="p-2">
      <nav className="flex p-5 justify-end gap-5 ">
        <a
          href="https://github.com/Xeba7"
          target="_black"
          className="cursor-pointer hover:scale-105 transform-origin-center"
          alt="icono de github"
        >
          <svg
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="60px"
            height="60px"
          >
            {" "}
            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
          </svg>
        </a>
        <a
          href="https://cl.linkedin.com/in/sebasti%C3%A1n-cisterna-reyes-111a67256"
          target="_black"
          className="cursor-pointer hover:scale-[103%]  transform-origin-center"
          alt="icono de linkedin"
        >
          <svg
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="56px"
            height="56px"
          >
            {" "}
            <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M18,35h-4V20h4V35z M16,17 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C18,16.105,17.105,17,16,17z M37,35h-4v-5v-2.5c0-1.925-1.575-3.5-3.5-3.5 S26,25.575,26,27.5V35h-4V20h4v1.816C27.168,20.694,28.752,20,30.5,20c3.59,0,6.5,2.91,6.5,6.5V35z" />
          </svg>
        </a>
      </nav>
      <div className="container    xl:w-1/2 lg:w-2/3 text-center   mt-20 sm:rounded-lg sm:border-4 sm:border-cyan-200 sm:p-5 sm:pb-10 sm:rounded-b-3xl">
        <h1 className="text-6xl font-bold text-sky-200">Tareas</h1>

        <form
          onSubmit={handleAddTodo}
          className="md:mt-10 md:flex  md:gap-10 justify-between md:p-2 "
        >
          <input
            className="p-3 px-5 rounded-full text-white bg-slate-800 w-full border-white border-2 hover:border-cyan-200 md:text-xl mt-3"
            type="text"
            value={newTodo}
            onChange={handleNewTodoChange}
            maxLength="60"
            placeholder="Escribe una nueva tarea"
          />
          <button
            className="border-2 border-white rounded-full p-3 hover:border-cyan-300  font-semibold hover:scale-y-105 transform-origin-center text-cyan-100 md:w-40 mt-3 w-full"
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
        <ul className="mt-5 border-t-[1px]  p-2 border-cyan-100   text-slate-300">
          {todos.map((todo, index) => {
            return (
              <li key={index} className=" pt-5">
                <section className="flex justify-between  pt-3 border-b-2 border-cyan-300">
                  <span className="flex self-center md:mr-3 mr-1">
                    <button
                      onClick={() => handleToggleComplete(index)}
                      className="border-2 border-cyan-200 rounded-full hover:scale-105"
                    >
                      {todo.completed ? "✔️" : "🕐"}
                    </button>
                  </span>
                  <p
                    className="text-2xl pb-1 w-full text-start break-all mr-1"
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                    onClick={() => handleToggleTodo(index)}
                  >
                    {todo.text}
                  </p>
                  <span className="flex self-center ">
                    <button
                      onClick={() => handleDeleteTodo(index)}
                      className="border-2 border-cyan-200 rounded-full hover:scale-105"
                    >
                      🗑
                    </button>
                  </span>
                </section>
                <span className="flex text-inherit text-xs self-start opacity-80">
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
