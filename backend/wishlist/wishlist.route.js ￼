import express from "express";
import * as wishlistController from "./wishlist.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", wishlistController.getMyWishlist);
router.post("/:productId", wishlistController.addItem);
router.delete("/:productId", wishlistController.removeItem);

export default router;