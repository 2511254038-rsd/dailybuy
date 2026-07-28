import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAuthToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const generateVerifyToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 60 * 60 * 1000; // 1 hour
  return { token, expires };
};