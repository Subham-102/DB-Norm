import axios from "axios";

const api = axios.create({
  baseURL: "https://dbnorm-api.onrender.com", // backend base URL
  headers: { "Content-Type": "application/json" }
});

export default api;





