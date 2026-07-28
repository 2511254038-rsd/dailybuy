export const verifyEmailTemplate = (name, verifyUrl) => `
  <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
    <h2>Welcome to KenaKata, ${name}!</h2>
    <p>Please verify your email to activate your account.</p>
    <a href="${verifyUrl}" style="display:inline-block; padding:10px 20px; background:#16a34a; color:#fff; text-decoration:none; border-radius:6px;">
      Verify Email
    </a>
    <p>This link expires in 1 hour.</p>
  </div>
`;