import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { authStore } from "../stores/auth";
import type { ErrorResponse } from './types';

const instance = axios.create({
  // baseURL: import.meta.env.VITE_API_ENDPOINT,
  baseURL: 'http://localhost:1111/api/v1/',
});

export async function request<T = any>(api: Promise<any>): Promise<{ data?: T; error?: any }> {
  try {
    const response = await api;
    return { data: response.data };
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    return {
      error: {
        status: err.response?.status,
        message: err.message,
        code: err.response?.data?.code,
        reason: err.response?.data?.reason,
      }
    };
  }
}

instance.interceptors.request.use((config) => {
  const token = authStore().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (
    config.method === 'get' &&
    config.url &&
    config.url.includes('/products')
  ) {
    delete config.headers.Authorization;
  }

  if (config.url?.includes('/login')) {
    delete config.headers.Authorization;
  }

  return config;
});

export default instance