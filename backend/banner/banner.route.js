import express from "express";
import * as bannerController from "./banner.controller.js";
import { verifyToken, requireAdmin } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import { createBannerSchema, updateBannerSchema } from "./banner.validation.js";

const router = express.Router();

router.get("/", bannerController.listPublic); // public — homepage

router.use(verifyToken, requireAdmin);
router.get("/all", bannerController.listAdmin);
router.post("/", validate(createBannerSchema), bannerController.create);
router.patch("/:id", validate(updateBannerSchema), bannerController.update);
router.delete("/:id", bannerController.remove);

export default router;