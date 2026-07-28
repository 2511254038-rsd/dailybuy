import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(60),
  phone: Joi.string().allow(""),
  avatar: Joi.string().uri().allow(""),
  address: Joi.object({
    line1: Joi.string().allow(""),
    city: Joi.string().allow(""),
    district: Joi.string().allow(""),
    zip: Joi.string().allow(""),
  }),
});