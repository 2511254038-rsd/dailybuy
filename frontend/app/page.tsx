import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryStrip from "@/components/home/CategoryStrip";
import ProductRail from "@/components/home/ProductRail";
import { Product } from "@/types";
import { Banner } from "@/services/bannerService";

async function fetchProducts(params: string = ""): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products${params}`, { cache: "no-store" });
  const json = await res.json();
  return json.items || [];
}

async function fetchBanners(): Promise<Banner[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, { cache: "no-store" });
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [allProducts, banners] = await Promise.all([
    fetchProducts("?limit=24"),
    fetchBanners(),
  ]);

  // simple client-side split for demo rails — real "deals"/"new" logic
  // would eventually be separate backend queries (discountPrice set, sorted by createdAt, etc.)
  const dealsProducts = allProducts.filter((p) => p.discountPrice != null && p.discountPrice < p.price);
  const newProducts = [...allProducts].reverse();

  return (
    <div className="px-4 md:px-6 py-4 space-y-8 max-w-7xl mx-auto">
      <HeroCarousel banners={banners} />
      <CategoryStrip />

      <ProductRail title="🔥 Flash Deals" products={dealsProducts} viewAllHref="/products" />
      <ProductRail title="🆕 Just In" products={newProducts.slice(0, 12)} viewAllHref="/products" />
      <ProductRail title="All Products" products={allProducts} viewAllHref="/products" />
    </div>
  );
}