"use client";

import { useState } from "react";
import { Product } from "@/types";
import PriceTag from "@/components/common/PriceTag";
import Badge from "@/components/common/Badge";
import QuantityStepper from "@/components/common/QuantityStepper";
import Button from "@/components/common/Button";
import ImageGallery from "@/components/product/ImageGallery";
import RelatedProducts from "@/components/product/RelatedProducts";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import RecentlyViewed from "./RecentlyViewed";

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => Promise<void>;
}

export default function ProductDetails({ product, onAddToCart }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    try {
      await onAddToCart(product._id, quantity);
    } finally {
      setAdding(false);
    }
  };

  const hasDiscount = product.discountPrice != null && product.discountPrice < product.price;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        <ImageGallery images={product.images} title={product.title} />

        <div>
          {hasDiscount && <Badge variant="brand">SALE</Badge>}
          <h1 className="text-2xl font-semibold mt-2">{product.title}</h1>
          <p className="text-gray-500 mt-1">{product.category}</p>

          <div className="mt-4">
            <PriceTag price={product.price} discountPrice={product.discountPrice} size="lg" />
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>

          {product.stock === 0 ? (
            <p className="text-red-500 mt-6 font-medium">Out of stock</p>
          ) : (
            <div className="flex items-center gap-3 mt-6">
              <QuantityStepper value={quantity} onChange={setQuantity} max={product.stock} />
              <Button onClick={handleAdd} loading={adding} className="w-auto px-8">
                Add to cart
              </Button>
            </div>
          )}

          {product.stock > 0 && product.stock <= 5 && (
            <p className="text-sm text-orange-600 mt-2">Only {product.stock} left in stock</p>
          )}
        </div>
      </div>

      <div className="mt-12">
        <RelatedProducts category={product.category} excludeId={product._id} />
        </div>
        
      <div className="mt-12">
        <RecentlyViewed excludeId={product._id} />
      </div>


      <StickyAddToCart product={product} onAddToCart={handleAdd} adding={adding} />
    </>
  );
}