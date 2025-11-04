import React, { useState } from "react";

function TodoComponent() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };
  return (
    <div className="max-w-2xl">
      TodoComponent
      <div class="mb-6">
        <label
          for="default-input"
          class="block mb-2 text-sm font-medium text-gray-900 "
        >
          Default input
        </label>
        <input
          value={newTodo}
          type="text"
          id="default-input"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <button
        type="button"
        onClick={handleAddTodo}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Default
      </button>
      {todos
        ? todos.map((todo, index) => {
            <h1 key={index}>{todo}</h1>;
          })
        : null}
    </div>
  );
}

export default TodoComponent;
