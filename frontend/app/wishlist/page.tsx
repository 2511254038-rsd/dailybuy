"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as wishlistService from "@/services/wishlistService";
import { Product } from "@/types";
import ProductGrid from "@/components/product/ProductGrid";
import Loading from "@/components/common/Loading";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    wishlistService
      .getWishlist()
      .then((res) => setProducts(res.data.data.products))
      .catch((err) => toast.error(getErrorMessage(err, "Could not load wishlist")))
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading || loading) return <Loading text="Loading wishlist..." />;

  if (!user) {
    return <p className="text-center py-16 text-gray-500">Please log in to view your wishlist.</p>;
  }

  return (
    <div className="px-4 md:px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Your Wishlist</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">Nothing saved yet — tap the heart icon on any product to add it here.</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}