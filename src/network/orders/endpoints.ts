import http from "../api";
import type { OrderCreateRequest, OrderResponse } from "./models";

async function postOrderCreate(request: OrderCreateRequest) {
  return await http.post<OrderResponse>("orders/create", request);
}

async function getOrderById(orderId: number) {
  return await http.get<OrderResponse>(`orders/${orderId}`);
}

export default {
  postOrderCreate,
  getOrderById
};