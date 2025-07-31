import { api } from "./Api";

export const requester = async (url = "") => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const poster = async (url, data, config = {}) => {
  try {
    const isFormData = data instanceof FormData;

    const headers = {
      ...config.headers,
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
      headers["Accept"] = "application/json";
    }

    const response = await api.post(url, data, {
      headers,
      ...config,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
