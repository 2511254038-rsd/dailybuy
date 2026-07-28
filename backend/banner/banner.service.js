import Banner from "./banner.model.js";
import { AppError } from "../middlewares/errorHandler.js";

export const createBanner = (data) => Banner.create(data);

export const listActiveBanners = () =>
  Banner.find({ isActive: true }).sort({ order: 1 });

export const listAllBanners = () => Banner.find().sort({ order: 1 });

export const updateBanner = async (id, updates) => {
  const banner = await Banner.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!banner) throw new AppError("Banner not found", 404);
  return banner;
};

export const deleteBanner = async (id) => {
  const banner = await Banner.findByIdAndDelete(id);
  if (!banner) throw new AppError("Banner not found", 404);
};