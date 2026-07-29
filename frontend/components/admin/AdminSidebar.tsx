"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/banners", label: "Banners" },
  { href: "/admin/customers", label: "Customers" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-48 border-r px-4 py-6 shrink-0">
      <p className="font-semibold mb-4">Admin</p>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 rounded text-sm ${
              pathname.startsWith(link.href) ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}