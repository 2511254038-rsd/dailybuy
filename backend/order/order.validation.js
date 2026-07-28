import Joi from "joi";

const addressSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  line1: Joi.string().required(),
  city: Joi.string().required(),
  district: Joi.string().required(),
  zip: Joi.string().required(),
});

export const placeOrderSchema = Joi.object({
  shippingAddress: addressSchema.required(),
  paymentMethod: Joi.string().valid("cod", "bkash", "nagad").required(),
});

export const submitPaymentSchema = Joi.object({
  transactionId: Joi.string().min(3).required(),
});

export const updateOrderStatusSchema = Joi.object({
  orderStatus: Joi.string().valid("pending", "confirmed", "shipped", "delivered", "cancelled").required(),
});