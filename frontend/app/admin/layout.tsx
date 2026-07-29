import AdminSidebar from "@/components/admin/AdminSidebar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 px-6 py-6">{children}</div>
    </div>
  );
}