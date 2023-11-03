import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const loginUser = (data) => api.post("/api/auth/login", data);
export const vehicleRegister = (data) =>
  api.post("/api/vehicle/register", data);
