import type { ProductResponse } from "../products/models";

export type OrderCreateRequest = {
    userId: number | undefined;
    products: CreateOrderProduct[];
  };

export type CreateOrderProduct = {
    id: number;
};

export type OrderResponse = {
    id: number;
    userId: number | undefined;
    orderStatus: string;
    products: ProductResponse[];
    totalAmount: number;
    createdAt: number;
    updatedAt: number;
};