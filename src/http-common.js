import axios from "axios";
import path from "@/services/path";

const instance = axios.create({
    baseURL: path.path,
    withCredentials: true,
});

// Добавляем перехватчик
instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default instance;


