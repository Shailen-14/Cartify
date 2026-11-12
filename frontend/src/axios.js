import axios from "axios";

const api = axios.create({
  baseURL: import.meta.VITE_SERVER_BASE_URL || "http://localhost:5001",
  withCredentials: true,
});

export default api;
