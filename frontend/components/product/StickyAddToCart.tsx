"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import PriceTag from "@/components/common/PriceTag";
import Button from "@/components/common/Button";

interface StickyAddToCartProps {
  product: Product;
  onAddToCart: () => void;
  adding: boolean;
}

export default function StickyAddToCart({ product, onAddToCart, adding }: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || product.stock === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg px-4 py-3 flex items-center gap-4 z-40">
      <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden shrink-0">
        {product.images[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{product.title}</p>
        <PriceTag price={product.price} discountPrice={product.discountPrice} size="sm" />
      </div>
      <Button onClick={onAddToCart} loading={adding} className="w-auto px-6 shrink-0">
        Add to cart
      </Button>
    </div>
  );
}