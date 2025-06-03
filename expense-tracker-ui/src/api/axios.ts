import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Laravel API
  withCredentials: true, // Needed for Sanctum cookies
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
