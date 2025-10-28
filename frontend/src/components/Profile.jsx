import { useState } from "react";
import { getProfile } from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("No token found, please login.");
      return;
    }
    try {
      const res = await getProfile(token);
      if (res.data.username) {
        setUser(res.data);
      } else {
        setMessage(res.data.error);
      }
    } catch {
      setMessage("Failed to fetch user.");
    }
  };

  return (
    <div className="p-4 border rounded max-w-sm mx-auto mt-10 text-center">
      <h2>Profile</h2>
      <button
        onClick={fetchProfile}
        className="bg-purple-500 text-white px-4 py-2 rounded mt-2"
      >
        Fetch My Profile
      </button>

      {user && (
        <div className="mt-4">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
        </div>
      )}
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
