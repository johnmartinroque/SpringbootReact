import { useState } from "react";
import { registerUser } from "../api";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      setMessage(res.data.message || "Registration successful ✅");
    } catch (err) {
      setMessage("Registration failed ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Register
      </h2>

      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Choose a username"
          value={form.username}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                     focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                     dark:focus:border-blue-500"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter a secure password"
          value={form.password}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                     focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                     dark:focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none 
                   focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 
                   text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Register
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          {message}
        </p>
      )}
    </form>
  );
}
