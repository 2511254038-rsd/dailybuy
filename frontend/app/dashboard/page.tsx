"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OrderHistoryTab from "@/components/dashboard/OrderHistoryTab";
import ProfileSettingsTab from "@/components/dashboard/ProfileSettingsTab";
import Loading from "@/components/common/Loading";
import * as authService from "@/services/authService";

type Tab = "orders" | "settings";

export default function DashboardPage() {
  const { user, loading, logout, refetch } = useAuth();
  const [tab, setTab] = useState<Tab>("orders");

  if (loading) return <Loading text="Loading dashboard..." />;
  if (!user) return <p className="text-center py-16 text-gray-500">Please log in to view your dashboard.</p>;

  const handleUpdateAvatar = async (url: string) => {
    await authService.updateProfile({ avatar: url });
    await refetch();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
      <DashboardHeader user={user} onUpdateAvatar={handleUpdateAvatar} />

      <div className="border-b flex gap-6 mb-6 justify-center">
        <button
          onClick={() => setTab("orders")}
          className={`pb-3 text-sm font-medium border-b-2 ${tab === "orders" ? "border-gray-900" : "border-transparent text-gray-500"}`}
        >
          Order History
        </button>
        <button
          onClick={() => setTab("settings")}
          className={`pb-3 text-sm font-medium border-b-2 ${tab === "settings" ? "border-gray-900" : "border-transparent text-gray-500"}`}
        >
          Profile Settings
        </button>
        <button onClick={() => logout()} className="pb-3 text-sm font-medium text-red-500">
          Sign Out
        </button>
      </div>

      {tab === "orders" ? (
        <OrderHistoryTab />
      ) : (
        <ProfileSettingsTab user={user} onUpdated={() => refetch()} />
      )}
    </div>
  );
}