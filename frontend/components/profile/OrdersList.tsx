import Link from "next/link";
import { Order } from "@/services/orderService";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";

export default function OrdersList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return <p className="text-gray-500 text-sm">You haven't placed any orders yet.</p>;
  }

  return (
    <div className="border rounded-lg divide-y">
      {orders.map((order) => (
        <Link
          key={order._id}
          href={`/orders/${order._id}`}
          className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
        >
          <div>
            <p className="text-sm font-medium">Order #{order._id.slice(-8)}</p>
            <p className="text-xs text-gray-500">৳{order.total}</p>
          </div>
          <div className="flex gap-2">
            <OrderStatusBadge status={order.orderStatus} />
          </div>
        </Link>
      ))}
    </div>
  );
}