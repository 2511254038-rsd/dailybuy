import express from "express";
import * as userController from "./user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema, updateProfileSchema } from "./user.validation.js";
import { requireAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", validate(registerSchema), userController.register);
router.get("/verify-email", userController.verifyEmail);
router.post("/resend-verification", userController.resend);
router.post("/login", validate(loginSchema), userController.login);
router.post("/logout", userController.logout);

router.get("/profile", verifyToken, userController.getMe);
router.patch("/profile", verifyToken, validate(updateProfileSchema), userController.updateMe);

router.get("/admin/customers", verifyToken, requireAdmin, userController.listCustomers);
router.patch("/admin/customers/:id/disable", verifyToken, requireAdmin, userController.disableCustomer);

export default router;