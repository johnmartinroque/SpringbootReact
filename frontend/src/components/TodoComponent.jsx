import React, { useEffect, useState } from "react";

function TodoComponent() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch("http://localhost:8080/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });

      if (response.ok) {
        setTitle("");
        fetchTodos(); // refresh list
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (id, completed, title) => {
    try {
      await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: !completed }),
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="flex mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
          className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {/* Todo List */}
      <ul>
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No todos yet</p>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div
                className={`flex items-center cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
                onClick={() => toggleTodo(todo.id, todo.completed, todo.title)}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="mr-2"
                />
                {todo.title}
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoComponent;
