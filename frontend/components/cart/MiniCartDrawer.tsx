"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import PriceTag from "@/components/common/PriceTag";
import QuantityStepper from "@/components/common/QuantityStepper";

export default function MiniCartDrawer() {
  const { cart, drawerOpen, closeDrawer, updateQuantity, removeItem } = useCart();
  const items = cart?.items || [];

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={closeDrawer} />

      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-semibold">Your cart ({items.length})</h2>
          <button onClick={closeDrawer}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-12">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.product._id} className="flex gap-3">
                <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden shrink-0">
                  {item.product.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{item.product.title}</p>
                  <PriceTag price={item.product.price} discountPrice={item.product.discountPrice} size="sm" />
                  <div className="flex items-center justify-between mt-1">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.product._id, q)}
                      max={item.product.stock}
                    />
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-xs text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t px-4 py-3 space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span>Subtotal</span>
              <span>৳{subtotal.toLocaleString()}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="block text-center bg-green-600 text-white rounded py-2 text-sm"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="block text-center text-sm text-gray-600"
            >
              View full cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}