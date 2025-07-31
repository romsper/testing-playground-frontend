export type CreateProductRequest = {
    name: string;
    description: string;
    price: number;
  };

export type CreateProductResponse = {
    id: number;
    name: string;
    description: string;
    price: number;
};

export type AllProductsResponse = {
    id: number;
    name: string;
    description: string;
    price: number;
}[];


export type ProductResponse = {
    id: number;
    name: string;
    description: string;
    price: number;
};
