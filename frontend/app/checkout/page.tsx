"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as cartService from "@/services/cartService";
import * as orderService from "@/services/orderService";
import { Cart } from "@/types";
import { PlaceOrderPayload } from "@/services/orderService";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CartSummary from "@/components/cart/CartSummary";
import Loading from "@/components/common/Loading";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function CheckoutPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    cartService
      .getCart()
      .then((res) => setCart(res.data.data))
      .catch(() => setCart(null))
      .finally(() => setLoading(false));
  }, []);

  const handlePlaceOrder = async (payload: PlaceOrderPayload) => {
    setSubmitting(true);
    try {
      const res = await orderService.placeOrder(payload);
      toast.success("Order placed!");
      router.push(`/orders/${res.data.data._id}`);
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not place order"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading text="Loading checkout..." />;

  const items = cart?.items ?? [];
  if (items.length === 0) {
    return <p className="text-center py-12 text-gray-500">Your cart is empty — nothing to check out.</p>;
  }

  return (
    <div className="px-6 py-8 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-xl font-semibold mb-4">Checkout</h1>
        <CheckoutForm onSubmit={handlePlaceOrder} submitting={submitting} />
      </div>
      <CartSummary items={items} />
    </div>
  );
}