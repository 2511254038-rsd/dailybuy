"use client";

import { useState } from "react";

interface FilterSidebarProps {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  onApply: (filters: { category?: string; minPrice?: string; maxPrice?: string }) => void;
}

const CATEGORIES = ["Electronics", "Fashion", "Home", "Beauty", "Sports", "Toys", "Groceries", "Books"];

export default function FilterSidebar({ category, minPrice, maxPrice, onApply }: FilterSidebarProps) {
  const [localMin, setLocalMin] = useState(minPrice || "");
  const [localMax, setLocalMax] = useState(maxPrice || "");

  return (
    <aside className="w-full md:w-56 shrink-0 space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-2">Category</h3>
        <div className="space-y-1">
          <button
            onClick={() => onApply({ category: undefined, minPrice, maxPrice })}
            className={`block text-sm w-full text-left px-2 py-1 rounded ${!category ? "bg-gray-100 font-medium" : "text-gray-600"}`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onApply({ category: cat, minPrice, maxPrice })}
              className={`block text-sm w-full text-left px-2 py-1 rounded ${category === cat ? "bg-gray-100 font-medium" : "text-gray-600"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2">Price range (৳)</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
          />
        </div>
        <button
          onClick={() => onApply({ category, minPrice: localMin, maxPrice: localMax })}
          className="mt-2 w-full text-sm bg-gray-900 text-white rounded py-1.5"
        >
          Apply
        </button>
      </div>
    </aside>
  );
}