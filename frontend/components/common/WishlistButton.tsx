"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function WishlistButton({ productId, size = 18 }: { productId: string; size?: number }) {
  const { user } = useAuth();
  const { productIds, toggle } = useWishlist();
  const isSaved = productIds.has(productId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigating if nested inside a <Link>
    e.stopPropagation();
    if (!user) {
      toast.error("Log in to save items to your wishlist");
      return;
    }
    await toggle(productId);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white/90 rounded-full p-1.5 hover:bg-white transition"
      aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart size={size} className={isSaved ? "fill-red-500 text-red-500" : "text-gray-500"} />
    </button>
  );
}