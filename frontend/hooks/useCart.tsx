"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as cartService from "@/services/cartService";
import { Cart } from "@/types";
import { useAuth } from "@/hooks/useAuth";

interface CartContextValue {
  cart: Cart | null;
  itemCount: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  refetch: () => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const refetch = async () => {
    if (!user) {
      setCart(null);
      return;
    }
    try {
      const res = await cartService.getCart();
      setCart(res.data.data);
    } catch {
      setCart(null);
    }
  };

  useEffect(() => {
    refetch();
  }, [user]);

  const updateQuantity = async (productId: string, quantity: number) => {
    const res = await cartService.updateQuantity(productId, quantity);
    setCart(res.data.data);
  };

  const removeItem = async (productId: string) => {
    const res = await cartService.removeFromCart(productId);
    setCart(res.data.data);
  };

  const itemCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        refetch,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};