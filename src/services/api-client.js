import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://algo-fit-backend.vercel.app/api/v1",
});

export default apiClient;
