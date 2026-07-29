"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as orderService from "@/services/orderService";
import { Order } from "@/services/orderService";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import Loading from "@/components/common/Loading";
import { getErrorMessage } from "@/utils/getErrorMessage";

const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const res = await orderService.getAllOrders();
    setOrders(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleVerify = async (id: string) => {
    try {
      await orderService.verifyOrderPayment(id);
      toast.success("Payment verified");
      fetchOrders();
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not verify payment"));
    }
  };

  const handleStatusChange = async (id: string, orderStatus: string) => {
    try {
      await orderService.updateOrderStatus(id, orderStatus);
      fetchOrders();
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update status"));
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">Orders</h1>
      <table className="w-full text-sm border rounded overflow-hidden">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-3 py-2">Order</th>
            <th className="px-3 py-2">Total</th>
            <th className="px-3 py-2">Payment</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-t">
              <td className="px-3 py-2">#{o._id.slice(-8)}</td>
              <td className="px-3 py-2">৳{o.total}</td>
              <td className="px-3 py-2"><OrderStatusBadge status={o.paymentStatus} /></td>
              <td className="px-3 py-2">
                <select
                  value={o.orderStatus}
                  onChange={(e) => handleStatusChange(o._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-2 text-right">
                {o.paymentStatus === "pending_verification" && (
                  <button onClick={() => handleVerify(o._id)} className="text-blue-600">
                    Verify payment
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}