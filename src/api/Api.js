import axios from "axios";

export const api = axios.create({
  baseURL: "https://nako.navisdevs.ru/", 
});

// 🟡 Request Interceptor: добавление access токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

// 🔴 Response Interceptor: обработка ошибки 401 и обновление access токена
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          const { data } = await axios.post("https://gov.navisdevs.ru/api/access/refresh/", {
            refresh: refreshToken,
          });

          localStorage.setItem("access", data.access);

          api.defaults.headers["Authorization"] = `Bearer ${data.access}`;
          originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

          return api(originalRequest);
        } catch (refreshError) {
          console.error("Ошибка обновления токена:", refreshError);
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.detail || error.message,
    });
  }
);
