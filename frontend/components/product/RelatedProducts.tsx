"use client";

import { useEffect, useState } from "react";
import * as productService from "@/services/productService";
import { Product } from "@/types";
import ProductRail from "@/components/home/ProductRail";

export default function RelatedProducts({ category, excludeId }: { category: string; excludeId: string }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.getProducts({ category, limit: 8 }).then((res) => {
      setProducts(res.data.items.filter((p) => p._id !== excludeId));
    });
  }, [category, excludeId]);

  if (products.length === 0) return null;

  return <ProductRail title="Related products" products={products} />;
}