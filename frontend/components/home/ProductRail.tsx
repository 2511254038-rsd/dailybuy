import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/common/ProductCard";

interface ProductRailProps {
  title: string;
  products: Product[];
  viewAllHref?: string;
}

export default function ProductRail({ title, products, viewAllHref }: ProductRailProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-lg">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-sm text-gray-500 flex items-center hover:text-black">
            View all <ChevronRight size={16} />
          </Link>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-6 md:overflow-visible">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}