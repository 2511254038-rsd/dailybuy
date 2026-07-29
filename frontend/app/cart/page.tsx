"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as cartService from "@/services/cartService";
import { Cart } from "@/types";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import Loading from "@/components/common/Loading";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await cartService.getCart();
      setCart(res.data.data);
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not load cart"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      const res = await cartService.updateQuantity(productId, quantity);
      setCart(res.data.data);
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update quantity"));
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      const res = await cartService.removeFromCart(productId);
      setCart(res.data.data);
      toast.success("Item removed");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not remove item"));
    }
  };

  if (loading) return <Loading text="Loading cart..." />;

  const items = cart?.items ?? [];

  return (
    <div className="px-6 py-8 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-xl font-semibold mb-4">Your cart</h1>
        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.product._id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))
        )}
      </div>
      <CartSummary items={items} />
    </div>
  );
}