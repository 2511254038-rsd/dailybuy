import * as wishlistService from "./wishlist.service.js";

export const getMyWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.user.id);
    res.status(200).json({ success: true, data: wishlist });
  } catch (err) {
    next(err);
  }
};

export const addItem = async (req, res, next) => {
  try {
    const wishlist = await wishlistService.addToWishlist(req.user.id, req.params.productId);
    res.status(200).json({ success: true, data: wishlist });
  } catch (err) {
    next(err);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const wishlist = await wishlistService.removeFromWishlist(req.user.id, req.params.productId);
    res.status(200).json({ success: true, data: wishlist });
  } catch (err) {
    next(err);
  }
};