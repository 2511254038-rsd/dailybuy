import { Resend } from "resend";

export const sendEmail = async ({ to, subject, html }) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "DailyBuy <onboarding@resend.dev>",
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message || "Failed to send email via Resend");
  }
};