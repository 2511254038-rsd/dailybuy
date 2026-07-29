import { api } from "./api";


export interface ShippingAddress {
  name: string;
  phone: string;
  line1: string;
  city: string;
  district: string;
  zip: string;
}
export interface PlaceOrderPayload {
  shippingAddress: ShippingAddress;
  paymentMethod: "cod" | "bkash" | "nagad";
}
export interface Order {
  _id: string;
  items: { title: string; price: number; quantity: number }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  transactionId?: string;
}

export interface OrderStats {
  totalOrders: number;
  activeOrders: number;
  delivered: number;
  totalSpent: number;
}

type OrderResponse = { success: boolean; data: Order };

export const placeOrder = (payload: PlaceOrderPayload) =>
  api.post<OrderResponse>("/orders", payload);

export const getMyOrders = () => api.get<{ success: boolean; data: Order[] }>("/orders");

export const getOrder = (id: string) => api.get<OrderResponse>(`/orders/${id}`);

export const submitPayment = (id: string, transactionId: string) =>
  api.patch<OrderResponse>(`/orders/${id}/payment`, { transactionId });

export const getAllOrders = () => 
    api.get<{ success: boolean; data: Order[] }>("/orders/admin/all");

export const verifyOrderPayment = (id: string) => 
    api.patch<OrderResponse>(`/orders/admin/${id}/verify`);

export const updateOrderStatus = (id: string, orderStatus: string) =>
  api.patch<OrderResponse>(`/orders/admin/${id}/status`, { orderStatus });

export const getOrderStats = () =>
   api.get<{ success: boolean; data: OrderStats }>("/orders/stats/me");
