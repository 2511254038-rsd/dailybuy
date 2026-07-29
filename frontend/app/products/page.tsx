"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import * as productService from "@/services/productService";
import { Product } from "@/types";
import FilterSidebar from "@/components/product/FilterSidebar";
import SortDropdown from "@/components/product/SortDropdown";
import SearchBar from "@/components/product/SearchBar";
import ProductGrid from "@/components/product/ProductGrid";
import Loading from "@/components/common/Loading";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const minPrice = searchParams.get("minPrice") || undefined;
  const maxPrice = searchParams.get("maxPrice") || undefined;
  const sort = (searchParams.get("sort") as "newest" | "priceAsc" | "priceDesc") || "newest";

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      router.push(`/products?${params.toString()}`);
    },
    [searchParams, router]
  );

  useEffect(() => {
    setLoading(true);
    productService
      .getProducts({ category, search, minPrice: minPrice ? Number(minPrice) : undefined, maxPrice: maxPrice ? Number(maxPrice) : undefined, sort, limit: 24 })
      .then((res) => setProducts(res.data.items))
      .finally(() => setLoading(false));
  }, [category, search, minPrice, maxPrice, sort]);

  return (
    <div className="px-4 md:px-6 py-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <SearchBar initialValue={search} onSearch={(q) => updateParams({ search: q || undefined })} />
        <SortDropdown value={sort} onChange={(v) => updateParams({ sort: v })} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar
          category={category}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onApply={(f) => updateParams({ category: f.category, minPrice: f.minPrice, maxPrice: f.maxPrice })}
        />

        <div className="flex-1">
          {loading ? <Loading text="Loading products..." /> : <ProductGrid products={products} />}
        </div>
      </div>
    </div>
  );
}