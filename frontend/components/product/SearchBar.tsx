"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ initialValue, onSearch }: { initialValue?: string; onSearch: (q: string) => void }) {
  const [value, setValue] = useState(initialValue || "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value);
      }}
      className="flex-1 flex items-center border rounded-lg px-3 py-2 bg-white"
    >
      <Search size={18} className="text-gray-400 mr-2" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        className="flex-1 outline-none text-sm"
      />
    </form>
  );
}