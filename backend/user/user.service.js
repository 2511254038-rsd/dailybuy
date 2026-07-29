import bcrypt from "bcryptjs";
import User from "./user.model.js";
import { AppError } from "../middlewares/errorHandler.js";
import { generateAuthToken, generateVerifyToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { verifyEmailTemplate } from "../utils/verifyEmail.js";

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new AppError("Email already registered", 409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const { token, expires } = generateVerifyToken();

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    verifyToken: token,
    verifyTokenExpires: expires,
  });

  // Email failure should NEVER crash a successful registration —
  // the account already exists and the user can hit /resend-verification later.
  try {
    const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
    await sendEmail({
      to: user.email,
      subject: "Verify your KenaKata account",
      html: verifyEmailTemplate(user.name, verifyUrl),
    });
  } catch (emailErr) {
    console.error("Registration email failed to send:", emailErr.message);
  }

  return { id: user._id, email: user.email };
};

export const verifyUserEmail = async (token) => {
  const user = await User.findOne({
    verifyToken: token,
    verifyTokenExpires: { $gt: Date.now() },
  });
  if (!user) throw new AppError("Invalid or expired verification link", 400);

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpires = undefined;
  await user.save();

  return { email: user.email };
};

export const resendVerification = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("No account with that email", 404);
  if (user.isVerified) throw new AppError("Account already verified", 400);

  const { token, expires } = generateVerifyToken();
  user.verifyToken = token;
  user.verifyTokenExpires = expires;
  await user.save();

  try {
    const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
    await sendEmail({
      to: user.email,
      subject: "Verify your KenaKata account",
      html: verifyEmailTemplate(user.name, verifyUrl),
    });
  } catch (emailErr) {
    console.error("Resend verification email failed:", emailErr.message);
    throw new AppError("Could not send email right now — check SMTP settings and try again", 502);
  }
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("Invalid email or password", 401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new AppError("Invalid email or password", 401);

  if (!user.isVerified) {
    throw new AppError("Please verify your email before logging in", 403);
  }

  if (user.isDisabled) {
    throw new AppError("This account has been disabled", 403);
  }

  const token = generateAuthToken({
    id: user._id,
    role: user.role,
    email: user.email,
    name: user.name,
  });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

export const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password -verifyToken -verifyTokenExpires");
  if (!user) throw new AppError("User not found", 404);
  return user;
};

export const updateProfile = async (userId, updates) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  // Merge address instead of replacing, so a partial update
  // (e.g. just city) doesn't wipe the other address fields.
  if (updates.address) {
    user.address = { ...user.address.toObject(), ...updates.address };
    delete updates.address;
  }

  Object.assign(user, updates);
  await user.save();

  const { password, verifyToken, verifyTokenExpires, ...safeUser } = user.toObject();
  return safeUser;
};

// --- admin ---

export const listCustomers = async () => {
  return User.find({ role: "customer" }).select("-password -verifyToken -verifyTokenExpires");
};

export const setUserDisabled = async (userId, disabled) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isDisabled: disabled },
    { new: true }
  ).select("-password -verifyToken -verifyTokenExpires");
  if (!user) throw new AppError("User not found", 404);
  return user;
};