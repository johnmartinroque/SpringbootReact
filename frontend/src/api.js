import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/auth",
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const getProfile = (token) =>
  API.get("/me", { headers: { Authorization: `Bearer ${token}` } });
