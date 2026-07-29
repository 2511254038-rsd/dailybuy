const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  unpaid: "bg-gray-100 text-gray-600",
  pending_verification: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
};

export default function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[status] || "bg-gray-100"}`}>
      {status.replace("_", " ")}
    </span>
  );
}