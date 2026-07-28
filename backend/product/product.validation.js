import Joi from "joi";

export const createProductSchema = Joi.object({
  title: Joi.string().min(2).max(120).required(),
  description: Joi.string().allow(""),
  price: Joi.number().min(0).required(),
  discountPrice: Joi.number().min(0),
  stock: Joi.number().min(0).required(),
  category: Joi.string().required(),
  images: Joi.array().items(Joi.string().uri()),
  isActive: Joi.boolean(),
});

export const updateProductSchema = Joi.object({
  title: Joi.string().min(2).max(120),
  description: Joi.string().allow(""),
  price: Joi.number().min(0),
  discountPrice: Joi.number().min(0),
  stock: Joi.number().min(0),
  category: Joi.string(),
  images: Joi.array().items(Joi.string().uri()),
  isActive: Joi.boolean(),
});