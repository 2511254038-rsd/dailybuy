import express from "express";
import * as orderController from "./order.controller.js";
import { verifyToken, requireAdmin } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import { placeOrderSchema, submitPaymentSchema, updateOrderStatusSchema } from "./order.validation.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", validate(placeOrderSchema), orderController.placeOrder);
router.get("/", orderController.getMyOrders);
router.get("/:id", orderController.getOrder);
router.patch("/:id/payment", validate(submitPaymentSchema), orderController.submitPayment);

// admin
router.get("/stats/me", orderController.getStats);
router.get("/admin/all", requireAdmin, orderController.listAll);
router.patch("/admin/:id/verify", requireAdmin, orderController.verify);
router.patch("/admin/:id/status", requireAdmin, validate(updateOrderStatusSchema), orderController.updateStatus);

export default router;