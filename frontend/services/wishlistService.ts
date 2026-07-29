
import { Product } from "@/types";
import { api } from "./api";

interface WishlistResponse {
  success: boolean;
  data: { user: string; products: Product[] };
}

export const getWishlist = () => api.get<WishlistResponse>("/wishlist");
export const addToWishlist = (productId: string) => api.post<WishlistResponse>(`/wishlist/${productId}`);
export const removeFromWishlist = (productId: string) => api.delete<WishlistResponse>(`/wishlist/${productId}`);