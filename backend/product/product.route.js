import express from "express";
import * as productController from "./product.controller.js";
import { verifyToken, requireAdmin } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import { createProductSchema, updateProductSchema } from "./product.validation.js";

const router = express.Router();

// public
router.get("/", productController.list);
router.get("/:slug", productController.getBySlug);

// admin only
router.post("/", verifyToken, requireAdmin, validate(createProductSchema), productController.create);
router.patch("/:id", verifyToken, requireAdmin, validate(updateProductSchema), productController.update);
router.delete("/:id", verifyToken, requireAdmin, productController.remove);

export default router;