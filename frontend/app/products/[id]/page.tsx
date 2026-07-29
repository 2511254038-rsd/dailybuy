"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import * as productService from "@/services/productService";
import * as cartService from "@/services/cartService";
import { Product } from "@/types";
import ProductDetails from "@/components/product/ProductDetails";
import Loading from "@/components/common/Loading";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService
      .getProductBySlug(params.id)
      .then((res) => setProduct(res.data.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      await cartService.addToCart(productId, quantity);
      toast.success("Added to cart");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not add to cart"));
    }
  };

  if (loading) return <Loading text="Loading product..." />;
  if (!product) return <p className="text-center py-12 text-gray-500">Product not found.</p>;

  return (
    <div className="px-6 py-8">
      <ProductDetails product={product} onAddToCart={handleAddToCart} />
    </div>
  );
}