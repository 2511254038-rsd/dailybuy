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
    phone: { type: String, required: true, trim: true },
    address: { type: addressSchema, default: () => ({}) },
    avatar: { type: String, default: "" }, // drive/image link — no file upload yet
    gender: { type: String, enum: ["male", "female", "other", ""], default: "" },
    dateOfBirth: { type: Date },
    rewardPoints: { type: Number, default: 0 },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    isVerified: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyTokenExpires: { type: Date },
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
    isDisabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);