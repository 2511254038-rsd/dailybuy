"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Heart, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import Avatar from "@/components/common/Avatar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount, openDrawer } = useCart();
  const { productIds } = useWishlist();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  };

  return (
    <nav className="sticky top-0 z-30 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
        <Link href="/" className="font-bold text-xl shrink-0" style={{ color: "var(--color-brand)" }}>
          DailyBuy
        </Link>

        <form onSubmit={handleSearch} className="flex-1 hidden sm:flex items-center border rounded-full px-4 py-2 bg-gray-50">
          <Search size={18} className="text-gray-400 mr-2 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 outline-none bg-transparent text-sm"
          />
        </form>

        <div className="flex items-center gap-1 md:gap-3 ml-auto">
          <Link href="/wishlist" className="relative p-2 hover:bg-gray-50 rounded-full" aria-label="Wishlist">
            <Heart size={20} />
            {productIds.size > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {productIds.size}
              </span>
            )}
          </Link>

          <button onClick={openDrawer} className="relative p-2 hover:bg-gray-50 rounded-full" aria-label="Cart">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
              <button className="p-1 rounded-full hover:bg-gray-50" aria-label="Account">
                <Avatar name={user.name} avatar={user.avatar} size={32} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full w-48 bg-white border rounded-lg shadow-lg z-20 py-1">
                  <div className="px-3 py-2 border-b">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link href="/dashboard" className="block px-3 py-2 text-sm hover:bg-gray-50">
                    My Profile
                  </Link>
                  {user.role === "admin" && (
                    <Link href="/admin/products" className="block px-3 py-2 text-sm hover:bg-gray-50">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="p-2 hover:bg-gray-50 rounded-full" aria-label="Sign in">
              <UserIcon size={20} />
            </Link>
          )}
        </div>
      </div>

      <form onSubmit={handleSearch} className="sm:hidden flex items-center border-t px-4 py-2">
        <Search size={18} className="text-gray-400 mr-2 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 outline-none text-sm"
        />
      </form>
    </nav>
  );
}