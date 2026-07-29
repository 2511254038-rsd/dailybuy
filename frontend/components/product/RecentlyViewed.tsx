"use client";

import { useEffect, useState } from "react";
import * as productService from "@/services/productService";
import { Product } from "@/types";
import { getRecentlyViewed } from "@/utils/recentlyViewed";
import ProductRail from "@/components/home/ProductRail";

export default function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const ids = getRecentlyViewed().filter((id) => id !== excludeId);
    if (ids.length === 0) return;

    // no bulk-by-ids endpoint exists yet, so fetch a page and filter client-side —
    // fine at this scale, would need a real GET /products?ids=... endpoint at larger scale
    productService.getProducts({ limit: 50 }).then((res) => {
      const matched = ids
        .map((id) => res.data.items.find((p) => p._id === id))
        .filter((p): p is Product => Boolean(p));
      setProducts(matched);
    });
  }, [excludeId]);

  if (products.length === 0) return null;

  return <ProductRail title="Recently viewed" products={products} />;
}