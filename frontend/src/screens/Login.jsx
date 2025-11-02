import { useState } from "react";
import { loginUser } from "../api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [remember, setRemember] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("Login successful ✅");
      } else {
        setMessage(res.data.error || "Login failed");
      }
    } catch (err) {
      setMessage("Login failed ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Login
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
          placeholder="Enter your username"
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
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                     focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                     dark:focus:border-blue-500"
        />
      </div>

      <div className="flex items-center mb-5">
        <input
          id="remember"
          type="checkbox"
          checked={remember}
          onChange={() => setRemember(!remember)}
          className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 
                     dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
        />
        <label
          htmlFor="remember"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                   focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 
                   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          {message}
        </p>
      )}
    </form>
  );
}
