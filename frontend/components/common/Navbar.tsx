"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <Link href="/" className="font-bold text-lg">DailyBuy</Link>
      <div className="flex gap-4 items-center">
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart</Link>
        
{user ? (
  <>
    <Link href="/profile">{user.name}</Link>
    <button onClick={logout} className="text-red-500">Logout</button>
  </>
) : (
  <>
    <Link href="/login">Login</Link>
    <Link href="/register">Sign up</Link>
  </>
)}
      </div>
    </nav>
  );
}