import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    line1: { type: String, default: "" },
    city: { type: String, default: "" },
    district: { type: String, default: "" },
    zip: { type: String, default: "" },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    address: { type: addressSchema, default: () => ({}) },
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    isVerified: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyTokenExpires: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);