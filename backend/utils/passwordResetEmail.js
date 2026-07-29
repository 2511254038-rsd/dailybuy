export const resetPasswordTemplate = (name, resetUrl) => `
  <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
    <h2>Reset your DailyBuy password</h2>
    <p>Hi ${name}, we received a request to reset your password.</p>
    <a href="${resetUrl}" style="display:inline-block; padding:10px 20px; background:#ff5722; color:#fff; text-decoration:none; border-radius:6px;">
      Reset Password
    </a>
    <p>This link expires in 30 minutes. If you didn't request this, you can ignore this email.</p>
  </div>
`;