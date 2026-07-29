"use client";

import { useState } from "react";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => Promise<void>;
  onRemove: (productId: string) => Promise<void>;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [busy, setBusy] = useState(false);
  const { product, quantity } = item;
  const price = product.discountPrice ?? product.price;

  const handleQuantityChange = async (newQty: number) => {
    if (newQty < 1 || newQty > product.stock) return;
    setBusy(true);
    try {
      await onUpdateQuantity(product._id, newQty);
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async () => {
    setBusy(true);
    try {
      await onRemove(product._id);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
        {product.images[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{product.title}</p>
        <p className="text-sm text-gray-500">৳{price} each</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={busy}
          onClick={() => handleQuantityChange(quantity - 1)}
          className="w-7 h-7 border rounded disabled:opacity-50"
        >
          −
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button
          disabled={busy}
          onClick={() => handleQuantityChange(quantity + 1)}
          className="w-7 h-7 border rounded disabled:opacity-50"
        >
          +
        </button>
      </div>

      <p className="w-16 text-right font-medium">৳{price * quantity}</p>

      <button
        disabled={busy}
        onClick={handleRemove}
        className="text-red-500 text-sm disabled:opacity-50"
      >
        Remove
      </button>
    </div>
  );
}