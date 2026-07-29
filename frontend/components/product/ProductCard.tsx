import Link from "next/link";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const price = product.discountPrice ?? product.price;
  const hasDiscount = product.discountPrice != null && product.discountPrice < product.price;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="border rounded-lg p-3 hover:shadow-md transition block"
    >
      <div className="aspect-square bg-gray-100 rounded mb-2 overflow-hidden">
        {product.images[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
        )}
      </div>
      <h3 className="font-medium text-sm truncate">{product.title}</h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="font-semibold">৳{price}</span>
        {hasDiscount && (
          <span className="text-xs text-gray-400 line-through">৳{product.price}</span>
        )}
      </div>
      {product.stock === 0 && <p className="text-xs text-red-500 mt-1">Out of stock</p>}
    </Link>
  );
}