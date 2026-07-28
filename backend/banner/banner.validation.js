import Joi from "joi";

export const createBannerSchema = Joi.object({
  image: Joi.string().uri().required(),
  title: Joi.string().allow(""),
  link: Joi.string().allow(""),
  isActive: Joi.boolean(),
  order: Joi.number().integer(),
});

export const updateBannerSchema = Joi.object({
  image: Joi.string().uri(),
  title: Joi.string().allow(""),
  link: Joi.string().allow(""),
  isActive: Joi.boolean(),
  order: Joi.number().integer(),
});