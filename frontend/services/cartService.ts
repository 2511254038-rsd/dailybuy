
import { Cart } from "@/types";
import { api } from "./api";

type CartResponse = { success: boolean; data: Cart };

export const getCart = () => api.get<CartResponse>("/cart");

export const addToCart = (productId: string, quantity: number) =>
  api.post<CartResponse>("/cart", { productId, quantity });

export const updateQuantity = (productId: string, quantity: number) =>
  api.patch<CartResponse>(`/cart/${productId}`, { quantity });

export const removeFromCart = (productId: string) =>
  api.delete<CartResponse>(`/cart/${productId}`);