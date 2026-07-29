import Link from "next/link";

const categories = [
  { name: "Electronics", emoji: "📱" },
  { name: "Fashion", emoji: "👕" },
  { name: "Home", emoji: "🏠" },
  { name: "Beauty", emoji: "💄" },
  { name: "Sports", emoji: "⚽" },
  { name: "Toys", emoji: "🧸" },
  { name: "Groceries", emoji: "🛒" },
  { name: "Books", emoji: "📚" },
];

export default function CategoryStrip() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={`/products?category=${encodeURIComponent(cat.name)}`}
          className="flex flex-col items-center gap-1 shrink-0 w-16"
        >
          <div className="w-12 h-12 rounded-full bg-white border flex items-center justify-center text-xl">
            {cat.emoji}
          </div>
          <span className="text-xs text-center">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}