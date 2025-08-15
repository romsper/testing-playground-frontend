import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { authStore } from "../stores/auth";
import type { APIResponse, ErrorResponse } from './types';

const instance = axios.create({
  // baseURL: import.meta.env.VITE_API_ENDPOINT,
  baseURL: 'http://localhost:1111/api/v1/',
});

export async function request<T = any>(api: Promise<any>): Promise<{ data?: T; error?: APIResponse }> {
  try {
    const response = await api;
    return { data: response.data };
  } catch (error) {
    const _error = error as AxiosError<ErrorResponse>;
    return {
      error: {
        status: _error.response?.status,
        message: _error.message,
        code: _error.response?.data?.code,
        reason: _error.response?.data?.reason,
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