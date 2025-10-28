import { useState } from "react";
import { loginUser } from "../api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

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
      setMessage("Login failed");
    }
  };

  return (
    <div className="p-4 border rounded max-w-sm mx-auto mt-10">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="block w-full border p-2 my-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="block w-full border p-2 my-2"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
