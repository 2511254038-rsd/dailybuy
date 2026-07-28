import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) throw new AppError("Not authenticated", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    next(new AppError("Invalid or expired session", 401));
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return next(new AppError("Admin access required", 403));
  }
  next();
};