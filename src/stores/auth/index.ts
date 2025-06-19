import { defineStore } from "pinia";
import type { APIResponse, ErrorResponse } from "../../network/types";
import { API } from "../../network/controllers";
import { AxiosError } from "axios";
import type { LoginRequest, LoginResponse, RefreshTokenRequest } from "../../network/auth/models";

export const authStore = defineStore("authStore", {

  state: () => ({
    auth: <LoginResponse>{},
    loading: false,
    error: <APIResponse>{},

  }),

  getters: {
    getAuth(state) {
      return state.auth
    }
  },

  persist: {
    storage: localStorage,
    paths: ["auth"],
  } as {
    storage: Storage;
    paths: string[];
  },

  actions: {
    async login(input: LoginRequest) {
      try {
        this.loading = true;
        this.auth = (await API.auth.postLogin(input).then((response) => response)).data;
      } catch (error) {
        const _error = error as AxiosError<ErrorResponse>;

        this.auth = <LoginResponse>{};
        this.error = {
          status: _error.status,
          message: _error.message,
          code: _error.response?.data.code,
          reason: _error.response?.data.reason,
        };
      } finally {
        this.loading = false;
      }
    },

    async refreshToken(request: RefreshTokenRequest) {
      try {
        this.loading = true;
        this.auth = (await API.auth.postRefreshToken(request).then((response) => response)).data;
      } catch (error) {
        const _error = error as AxiosError<ErrorResponse>;

        this.error = {
          status: _error.status,
          message: _error.message,
          code: _error.response?.data.code,
          reason: _error.response?.data.reason,
        };
      } finally {
        this.loading = false;
      }
    }
  }
});
