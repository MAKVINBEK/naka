import axios from "axios";

export const api = axios.create({
  baseURL: "https://nako.navisdevs.ru/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.detail || error.message,
    });
  }
);
