import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Registration failed");
      }

      setMessage("Registration successful! You can now log in.");
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

      {message && (
        <div
          className={`p-4 mb-4 text-sm rounded-lg ${
            isError
              ? "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400"
              : "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400"
          }`}
          role="alert"
        >
          <span className="font-medium">{isError ? "Error:" : "Success!"}</span>{" "}
          {message}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
