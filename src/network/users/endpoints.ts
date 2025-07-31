import http from "../api";
import type { CreateRequest, CreateResponse, MeResponse } from "./models";

async function postCreate(request: CreateRequest) {
  return await http.post<CreateResponse>("users/create", request);
}

async function getMe() {
  return await http.post<MeResponse>("users/me");
}

export default {
  postCreate,
  getMe
};