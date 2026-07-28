import * as bannerService from "./banner.service.js";

export const create = async (req, res, next) => {
  try {
    const banner = await bannerService.createBanner(req.body);
    res.status(201).json({ success: true, data: banner });
  } catch (err) {
    next(err);
  }
};

export const listPublic = async (req, res, next) => {
  try {
    const banners = await bannerService.listActiveBanners();
    res.status(200).json({ success: true, data: banners });
  } catch (err) {
    next(err);
  }
};

export const listAdmin = async (req, res, next) => {
  try {
    const banners = await bannerService.listAllBanners();
    res.status(200).json({ success: true, data: banners });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const banner = await bannerService.updateBanner(req.params.id, req.body);
    res.status(200).json({ success: true, data: banner });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await bannerService.deleteBanner(req.params.id);
    res.status(200).json({ success: true, message: "Banner deleted" });
  } catch (err) {
    next(err);
  }
};