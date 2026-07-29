import Product from "./product.model.js";
import { AppError } from "../middlewares/errorHandler.js";

const slugify = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const createProduct = async (data) => {
  const baseSlug = slugify(data.title);
  let slug = baseSlug;
  let count = 1;

  // handle duplicate titles by appending -2, -3, etc.
  while (await Product.findOne({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }

  return Product.create({ ...data, slug });
};

export const listProducts = async ({ category, search, minPrice, maxPrice, sort, page = 1, limit = 12 }) => {
  const query = { isActive: true };
  if (category) query.category = category;
  if (search) query.$text = { $search: search };
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sortMap = {
    newest: { createdAt: -1 },
    priceAsc: { price: 1 },
    priceDesc: { price: -1 },
  };
  const sortOption = sortMap[sort] || sortMap.newest;

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Product.find(query).sort(sortOption).skip(skip).limit(Number(limit)),
    Product.countDocuments(query),
  ]);

  return {
    items,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    totalItems: total,
  };
};

export const getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug, isActive: true });
  if (!product) throw new AppError("Product not found", 404);
  return product;
};

export const updateProduct = async (id, updates) => {
  const product = await Product.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new AppError("Product not found", 404);
  return product;
};

export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new AppError("Product not found", 404);
};

// Used internally by cart/order services to re-check stock & live price
export const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError("Product not found", 404);
  return product;
};