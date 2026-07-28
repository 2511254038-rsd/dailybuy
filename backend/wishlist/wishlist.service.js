import Wishlist from "./wishlist.model.js";
import { getProductById } from "../product/product.service.js";

const getOrCreateWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) wishlist = await Wishlist.create({ user: userId, products: [] });
  return wishlist;
};

export const getWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId }).populate(
    "products",
    "title price discountPrice images stock isActive"
  );
  return wishlist || { user: userId, products: [] };
};

export const addToWishlist = async (userId, productId) => {
  await getProductById(productId); // throws 404 if invalid
  const wishlist = await getOrCreateWishlist(userId);

  const alreadyIn = wishlist.products.some((p) => p.toString() === productId);
  if (!alreadyIn) {
    wishlist.products.push(productId);
    await wishlist.save();
  }
  return getWishlist(userId);
};

export const removeFromWishlist = async (userId, productId) => {
  const wishlist = await getOrCreateWishlist(userId);
  wishlist.products = wishlist.products.filter((p) => p.toString() !== productId);
  await wishlist.save();
  return getWishlist(userId);
};