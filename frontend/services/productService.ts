import { Product } from "@/types";
import { api } from "./api";

export interface ProductListResponse {
  success: boolean;
  items: Product[];
  page: number;
  totalPages: number;
  totalItems: number;
}

export interface ProductQuery {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const getProducts = (query: ProductQuery = {}) =>
  api.get<ProductListResponse>("/products", { params: query });

export const getProductBySlug = (slug: string) =>
  api.get<{ success: boolean; data: Product }>(`/products/${slug}`);

export const createProduct = (data: Partial<Product>) => 
    api.post("/products", data);

export const updateProduct = (id: string, data: Partial<Product>) => 
    api.patch(`/products/${id}`, data);

export const deleteProduct = (id: string) => 
    api.delete(`/products/${id}`);