import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  phone: Joi.string().min(6).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(60),
  phone: Joi.string().min(6).max(20),
  avatar: Joi.string().uri().allow(""),
  gender: Joi.string().valid("male", "female", "other", ""),
  dateOfBirth: Joi.date().allow(null, ""),
  address: Joi.object({
    line1: Joi.string().allow(""),
    city: Joi.string().allow(""),
    district: Joi.string().allow(""),
    zip: Joi.string().allow(""),
  }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});