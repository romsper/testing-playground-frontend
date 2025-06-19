import http from "../api";
import { LoginRequest, LoginResponse, RefreshTokenRequest } from "./models";

async function postLogin(request: LoginRequest) {
  return await http.post<LoginResponse>("auth/login", request);
}

async function postRefreshToken(request: RefreshTokenRequest) {
  return await http.post<LoginResponse>("auth/refresh", request);
}

export default {
  postLogin,
  postRefreshToken
};