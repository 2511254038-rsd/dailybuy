import * as productService from "./product.service.js";

export const create = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const list = async (req, res, next) => {
  try {
    const result = await productService.listProducts(req.query);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const getBySlug = async (req, res, next) => {
  try {
    const product = await productService.getProductBySlug(req.params.slug);
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};