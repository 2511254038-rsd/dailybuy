"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import * as orderService from "@/services/orderService";
import { Order } from "@/services/orderService";
import ProfileCard from "@/components/profile/ProfileCard";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import OrdersList from "@/components/profile/OrdersList";
import Loading from "@/components/common/Loading";

export default function ProfilePage() {
  const { user, loading, refetch } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    orderService
      .getMyOrders()
      .then((res) => setOrders(res.data.data))
      .finally(() => setOrdersLoading(false));
  }, []);

  if (loading) return <Loading text="Loading profile..." />;
  if (!user) return <p className="text-center py-12 text-gray-500">Please log in to view your profile.</p>;

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto space-y-8">
      <ProfileCard user={user} />

      <div>
        <h2 className="font-semibold mb-3">Edit profile</h2>
        <UpdateProfileForm user={user} onUpdated={() => refetch()} />
      </div>

      <div>
        <h2 className="font-semibold mb-3">Order history</h2>
        {ordersLoading ? <Loading text="Loading orders..." /> : <OrdersList orders={orders} />}
      </div>
    </div>
  );
}