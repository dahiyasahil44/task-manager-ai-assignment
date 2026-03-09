import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-ai-assignment-2yge.onrender.com/api"
});

export default api;