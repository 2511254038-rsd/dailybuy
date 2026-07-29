import * as orderService from "./order.service.js";

export const placeOrder = async (req, res, next) => {
  try {
    const order = await orderService.placeOrder(req.user.id, req.user.email, req.user.name, req.body);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.user.id, req.params.id);
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const submitPayment = async (req, res, next) => {
  try {
    const order = await orderService.submitPayment(req.user.id, req.params.id, req.body.transactionId);
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

// admin

export const listAll = async (req, res, next) => {
  try {
    const orders = await orderService.listAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const verify = async (req, res, next) => {
  try {
    const order = await orderService.verifyPayment(req.params.id);
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.orderStatus);
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = await orderService.getOrderStats(req.user.id);
    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};