import express from "express";
import * as cartController from "./cart.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import { addToCartSchema, updateQuantitySchema } from "./cart.validation.js";

const router = express.Router();

// every cart route requires login
router.use(verifyToken);

router.get("/", cartController.getMyCart);
router.post("/", validate(addToCartSchema), cartController.addToCart);
router.patch("/:productId", validate(updateQuantitySchema), cartController.updateQuantity);
router.delete("/:productId", cartController.removeFromCart);

export default router;