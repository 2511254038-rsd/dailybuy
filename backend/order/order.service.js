import Order from "./order.model.js";
import { getCart, clearCart } from "../cart/cart.service.js";
import { getProductById } from "../product/product.service.js";
import { AppError } from "../middlewares/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import {
  orderReceivedTemplate,
  newOrderAdminTemplate,
  orderConfirmedTemplate,
} from "../utils/orderEmails.js";

const SHIPPING_FEE = 60; // flat rate, adjust as needed

export const placeOrder = async (userId, userEmail, userName, { shippingAddress, paymentMethod }) => {
  const cart = await getCart(userId);
  if (!cart.items || cart.items.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  // re-validate stock & re-read live prices — never trust cart.priceAtAdd blindly
  const orderItems = [];
  let subtotal = 0;

  for (const item of cart.items) {
    const product = await getProductById(item.product._id);
    if (!product.isActive) throw new AppError(`${product.title} is no longer available`, 400);
    if (product.stock < item.quantity) throw new AppError(`Not enough stock for ${product.title}`, 400);

    const price = product.discountPrice ?? product.price;
    orderItems.push({
      product: product._id,
      title: product.title,
      price,
      quantity: item.quantity,
    });
    subtotal += price * item.quantity;

    // decrement stock
    product.stock -= item.quantity;
    await product.save();
  }

  const total = subtotal + SHIPPING_FEE;

  const order = await Order.create({
    user: userId,
    items: orderItems,
    shippingAddress,
    subtotal,
    shippingFee: SHIPPING_FEE,
    total,
    paymentMethod,
    paymentStatus: paymentMethod === "cod" ? "unpaid" : "pending_verification",
  });

  await clearCart(userId);

  await sendEmail({
    to: userEmail,
    subject: `Order received — #${order._id}`,
    html: orderReceivedTemplate(userName, order),
  });

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New order #${order._id}`,
    html: newOrderAdminTemplate(order),
  });

  return order;
};

export const getMyOrders = async (userId) => {
  return Order.find({ user: userId }).sort({ createdAt: -1 });
};

export const getOrderById = async (userId, orderId, isAdmin = false) => {
  const order = await Order.findById(orderId).populate("user", "name email");
  if (!order) throw new AppError("Order not found", 404);
  if (!isAdmin && order.user._id.toString() !== userId) {
    throw new AppError("Not authorized to view this order", 403);
  }
  return order;
};

export const submitPayment = async (userId, orderId, transactionId) => {
  const order = await getOrderById(userId, orderId);
  if (order.paymentStatus === "paid") throw new AppError("Order already paid", 400);

  order.transactionId = transactionId;
  order.paymentStatus = "pending_verification";
  await order.save();
  return order;
};

// --- admin ---

export const listAllOrders = async () => {
  return Order.find().populate("user", "name email").sort({ createdAt: -1 });
};

export const verifyPayment = async (orderId) => {
  const order = await Order.findById(orderId).populate("user", "name email");
  if (!order) throw new AppError("Order not found", 404);

  order.paymentStatus = "paid";
  order.orderStatus = "confirmed";
  await order.save();

  await sendEmail({
    to: order.user.email,
    subject: `Order confirmed — #${order._id}`,
    html: orderConfirmedTemplate(order.user.name, order),
  });

  return order;
};

export const updateOrderStatus = async (orderId, orderStatus) => {
  const order = await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true });
  if (!order) throw new AppError("Order not found", 404);
  return order;
};

export const getOrderStats = async (userId) => {
  const orders = await Order.find({ user: userId });

  const totalOrders = orders.length;
  const activeOrders = orders.filter((o) => !["delivered", "cancelled"].includes(o.orderStatus)).length;
  const delivered = orders.filter((o) => o.orderStatus === "delivered").length;
  const totalSpent = orders
    .filter((o) => o.paymentStatus === "paid" || o.paymentMethod === "cod")
    .reduce((sum, o) => sum + o.total, 0);

  return { totalOrders, activeOrders, delivered, totalSpent };
};