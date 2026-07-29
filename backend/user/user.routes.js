import express from "express";
import * as userController from "./user.controller.js";
import { verifyToken, requireAdmin } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./user.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), userController.register);
router.get("/verify-email", userController.verifyEmail);
router.post("/resend-verification", userController.resend);
router.post("/login", validate(loginSchema), userController.login);
router.post("/logout", userController.logout);
router.post("/forgot-password", validate(forgotPasswordSchema), userController.forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), userController.resetPassword);

router.get("/profile", verifyToken, userController.getMe);
router.patch("/profile", verifyToken, validate(updateProfileSchema), userController.updateMe);

router.get("/admin/customers", verifyToken, requireAdmin, userController.listCustomers);
router.patch("/admin/customers/:id/disable", verifyToken, requireAdmin, userController.disableCustomer);

export default router;