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
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({ success: true, message: "Logged out" });
};

export const forgotPassword = async (req, res, next) => {
  try {
    await userService.requestPasswordReset(req.body.email);
    // Always respond success-shaped, regardless of whether the email exists —
    // prevents leaking which emails are registered.
    res.status(200).json({ success: true, message: "If that email exists, a reset link has been sent" });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    await userService.resetPassword(req.body.token, req.body.password);
    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
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

export const listCustomers = async (req, res, next) => {
  try {
    const customers = await userService.listCustomers();
    res.status(200).json({ success: true, data: customers });
  } catch (err) {
    next(err);
  }
};

export const disableCustomer = async (req, res, next) => {
  try {
    const user = await userService.setUserDisabled(req.params.id, req.body.disabled);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};