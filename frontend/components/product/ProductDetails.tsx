"use client";

import { useState } from "react";
import { Product } from "@/types";
import Button from "@/components/common/Button";

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => Promise<void>;
}

export default function ProductDetails({ product, onAddToCart }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const price = product.discountPrice ?? product.price;

  const handleAdd = async () => {
    setAdding(true);
    try {
      await onAddToCart(product._id, quantity);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        {product.images[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
        )}
      </div>

      <div>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="text-gray-500 mt-1">{product.category}</p>

        <div className="flex items-center gap-2 mt-4">
          <span className="text-2xl font-bold">৳{price}</span>
          {product.discountPrice != null && product.discountPrice < product.price && (
            <span className="text-gray-400 line-through">৳{product.price}</span>
          )}
        </div>

        <p className="mt-4 text-gray-700">{product.description}</p>

        {product.stock === 0 ? (
          <p className="text-red-500 mt-6 font-medium">Out of stock</p>
        ) : (
          <div className="flex items-center gap-3 mt-6">
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 border rounded px-2 py-2"
            />
            <Button onClick={handleAdd} loading={adding} className="w-auto px-6">
              Add to cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}