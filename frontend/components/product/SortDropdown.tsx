interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-1.5 text-sm"
    >
      <option value="newest">Newest</option>
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
    </select>
  );
}