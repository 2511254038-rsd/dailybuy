"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as wishlistService from "@/services/wishlistService";
import { useAuth } from "@/hooks/useAuth";

interface WishlistContextValue {
  productIds: Set<string>;
  toggle: (productId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [productIds, setProductIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) {
      setProductIds(new Set());
      return;
    }
    wishlistService.getWishlist().then((res) => {
      setProductIds(new Set(res.data.data.products.map((p) => p._id)));
    });
  }, [user]);

  const toggle = async (productId: string) => {
    const isIn = productIds.has(productId);
    if (isIn) {
      await wishlistService.removeFromWishlist(productId);
      setProductIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    } else {
      await wishlistService.addToWishlist(productId);
      setProductIds((prev) => new Set(prev).add(productId));
    }
  };

  return <WishlistContext.Provider value={{ productIds, toggle }}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};