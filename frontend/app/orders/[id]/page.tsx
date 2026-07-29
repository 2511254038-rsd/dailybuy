"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import * as orderService from "@/services/orderService";
import { Order } from "@/services/orderService";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import PaymentSubmitForm from "@/components/order/PaymentSubmitForm";
import Loading from "@/components/common/Loading";
import { getErrorMessage } from "@/utils/getErrorMessage";
import OrderTimeline from "@/components/order/OrderTimeline";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchOrder = async () => {
    try {
      const res = await orderService.getOrder(params.id);
      setOrder(res.data.data);
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not load order"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const handleSubmitPayment = async (transactionId: string) => {
    setSubmitting(true);
    try {
      const res = await orderService.submitPayment(params.id, transactionId);
      setOrder(res.data.data);
      toast.success("Payment submitted — awaiting verification");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not submit payment"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading text="Loading order..." />;
  if (!order) return <p className="text-center py-12 text-gray-500">Order not found.</p>;

  const needsPayment = order.paymentMethod !== "cod" && order.paymentStatus === "pending_verification" && !("transactionId" in order && order.transactionId);

  return (
    <div className="px-6 py-8 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-1">Order #{order._id.slice(-8)}</h1>
      <div className="flex gap-2 mb-6">
        <OrderTimeline status={order.orderStatus} />
        <OrderStatusBadge status={order.paymentStatus} />
      </div>

      <div className="border rounded-lg divide-y">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between px-4 py-3 text-sm">
            <span>{item.title} × {item.quantity}</span>
            <span>৳{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4 font-semibold px-1">
        <span>Total</span>
        <span>৳{order.total}</span>
      </div>

      {needsPayment && (
        <PaymentSubmitForm onSubmit={handleSubmitPayment} submitting={submitting} />
      )}
    </div>
  );
}