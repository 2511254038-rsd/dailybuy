import Link from "next/link";
import { Product } from "@/types";
import PriceTag from "@/components/common/PriceTag";
import Badge from "@/components/common/Badge";

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.discountPrice != null && product.discountPrice < product.price;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="border rounded-lg bg-white hover:shadow-md transition block overflow-hidden shrink-0 w-40 md:w-auto"
    >
      <div className="aspect-square bg-gray-100 relative">
        {product.images[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
        )}
        {hasDiscount && (
          <div className="absolute top-1.5 left-1.5">
            <Badge variant="brand">SALE</Badge>
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="font-medium text-sm truncate">{product.title}</h3>
        <PriceTag price={product.price} discountPrice={product.discountPrice} size="sm" />
        {product.stock === 0 && <p className="text-xs text-red-500 mt-1">Out of stock</p>}
      </div>
    </Link>
  );
}