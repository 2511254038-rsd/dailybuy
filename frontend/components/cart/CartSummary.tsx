import Link from "next/link";
import { CartItem } from "@/types";

const SHIPPING_FEE = 60; // mirrors backend order.service.js flat rate

export default function CartSummary({ items }: { items: CartItem[] }) {
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const total = items.length > 0 ? subtotal + SHIPPING_FEE : 0;

  return (
    <div className="border rounded-lg p-4 space-y-2 h-fit">
      <h2 className="font-semibold mb-2">Order summary</h2>
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>৳{subtotal}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Shipping</span>
        <span>৳{items.length > 0 ? SHIPPING_FEE : 0}</span>
      </div>
      <div className="flex justify-between font-semibold border-t pt-2 mt-2">
        <span>Total</span>
        <span>৳{total}</span>
      </div>

      <Link
        href="/checkout"
        className={`block text-center mt-4 rounded py-2 ${
          items.length === 0
            ? "bg-gray-200 text-gray-400 pointer-events-none"
            : "bg-green-600 text-white"
        }`}
      >
        Checkout
      </Link>
    </div>
  );
}