import * as cartService from "./cart.service.js";

export const getMyCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const cart = await cartService.addItem(req.user.id, req.body);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
};

export const updateQuantity = async (req, res, next) => {
  try {
    const cart = await cartService.updateItemQuantity(req.user.id, req.params.productId, req.body.quantity);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const cart = await cartService.removeItem(req.user.id, req.params.productId);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
};