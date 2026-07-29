"use client";

import { useEffect, useState } from "react";
import * as orderService from "@/services/orderService";
import { Order, OrderStats } from "@/services/orderService";
import OrdersList from "@/components/profile/OrdersList";
import Loading from "@/components/common/Loading";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border rounded-lg p-3 text-center">
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

export default function OrderHistoryTab() {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([orderService.getOrderStats(), orderService.getMyOrders()])
      .then(([statsRes, ordersRes]) => {
        setStats(statsRes.data.data);
        setOrders(ordersRes.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading text="Loading order history..." />;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Orders" value={stats?.totalOrders ?? 0} />
        <StatCard label="Active" value={stats?.activeOrders ?? 0} />
        <StatCard label="Delivered" value={stats?.delivered ?? 0} />
        <StatCard label="Total Spent" value={`৳${(stats?.totalSpent ?? 0).toLocaleString()}`} />
      </div>

      <h2 className="font-semibold mb-3">All Orders</h2>
      <OrdersList orders={orders} />
    </div>
  );
}