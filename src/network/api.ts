import axios from 'axios';
import { authStore } from "../stores/auth";

const instance = axios.create({
  // baseURL: import.meta.env.VITE_API_ENDPOINT,
  baseURL: 'http://localhost:1111/api/v1/',
});

instance.interceptors.request.use((config) => {
  const token = authStore().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.url?.includes('/login') && delete config.headers.Authorization;
  return config;
});

export default instance