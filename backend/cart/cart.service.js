import Cart from "./cart.model.js";
import { getProductById } from "../product/product.service.js";
import { AppError } from "../middlewares/errorHandler.js";

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

export const getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate(
    "items.product",
    "title price discountPrice images stock isActive"
  );
  return cart || { user: userId, items: [] };
};

export const addItem = async (userId, { productId, quantity = 1 }) => {
  const product = await getProductById(productId);
  if (!product.isActive) throw new AppError("Product is not available", 400);
  if (product.stock < quantity) throw new AppError("Not enough stock", 400);

  const cart = await getOrCreateCart(userId);
  const existing = cart.items.find((item) => item.product.toString() === productId);

  const effectivePrice = product.discountPrice ?? product.price;

  if (existing) {
    const newQty = existing.quantity + quantity;
    if (product.stock < newQty) throw new AppError("Not enough stock", 400);
    existing.quantity = newQty;
    existing.priceAtAdd = effectivePrice; // refresh to current price
  } else {
    cart.items.push({ product: productId, quantity, priceAtAdd: effectivePrice });
  }

  await cart.save();
  return getCart(userId);
};

export const updateItemQuantity = async (userId, productId, quantity) => {
  const product = await getProductById(productId);
  if (product.stock < quantity) throw new AppError("Not enough stock", 400);

  const cart = await getOrCreateCart(userId);
  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) throw new AppError("Item not in cart", 404);

  item.quantity = quantity;
  await cart.save();
  return getCart(userId);
};

export const removeItem = async (userId, productId) => {
  const cart = await getOrCreateCart(userId);
  cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  await cart.save();
  return getCart(userId);
};

export const clearCart = async (userId) => {
  await Cart.findOneAndUpdate({ user: userId }, { items: [] }, { upsert: true });
};