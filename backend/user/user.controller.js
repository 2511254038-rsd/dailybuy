import * as userService from "./user.service.js";

export const register = async (req, res, next) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(201).json({ success: true, message: "Check your email to verify your account", data: result });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const result = await userService.verifyUserEmail(req.query.token);
    res.status(200).json({ success: true, message: "Email verified", data: result });
  } catch (err) {
    next(err);
  }
};

export const resend = async (req, res, next) => {
  try {
    await userService.resendVerification(req.body.email);
    res.status(200).json({ success: true, message: "Verification email resent" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token, user } = await userService.loginUser(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Logged in", data: user });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out" });
};

export const getMe = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};