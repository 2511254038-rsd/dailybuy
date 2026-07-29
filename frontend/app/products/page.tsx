import ProductGrid from "@/components/product/ProductGrid";
import { Product } from "@/types";

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.items;
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="px-6 py-8">
      <h1 className="text-xl font-semibold mb-6">All products</h1>
      <ProductGrid products={products} />
    </div>
  );
}