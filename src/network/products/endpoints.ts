import http from "../api";
import type { AllProductsResponse, CreateProductRequest, CreateProductResponse, ProductResponse } from "./models";

async function postCreateProduct(request: CreateProductRequest) {
  return await http.post<CreateProductResponse>("products/create", request);
}

async function getAllProducts(offset: number, limit: number) {
  return await http.get<AllProductsResponse>(`products/?offset=${offset}&limit=${limit}`);
}

async function getProductById(id: number) {
  return await http.get<ProductResponse>(`products/${id}`);
}

export default {
  postCreateProduct,
  getAllProducts,
  getProductById
};