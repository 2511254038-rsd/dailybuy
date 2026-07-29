"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as authService from "@/services/authService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";

type Step = 1 | 2 | 3;

function StepIndicator({ current }: { current: Step }) {
  const labels = ["Email", "Verify", "New Password"];
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {labels.map((label, i) => {
        const step = (i + 1) as Step;
        const active = step <= current;
        return (
          <div key={label} className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${active ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-500"}`}>
              {step}
            </div>
            {i < labels.length - 1 && <div className={`w-8 h-0.5 mx-1 ${step < current ? "bg-gray-900" : "bg-gray-200"}`} />}
          </div>
        );
      })}
    </div>
  );
}

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenFromUrl = searchParams.get("token");

  const [step, setStep] = useState<Step>(tokenFromUrl ? 3 : 1);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const { register: registerReset, handleSubmit: handleResetSubmit, watch, formState: { errors: resetErrors, isSubmitting: resetting } } = useForm<{ password: string; confirmPassword: string }>();
  const newPassword = watch("password");

  const handleSendCode = async () => {
    setSending(true);
    try {
      await authService.forgotPassword(email);
      toast.success("Reset link sent — check your email");
      setStep(2);
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not send reset email"));
    } finally {
      setSending(false);
    }
  };

  const handleReset = async (data: { password: string; confirmPassword: string }) => {
    if (!tokenFromUrl) {
      toast.error("Missing or invalid reset link");
      return;
    }
    try {
      await authService.resetPassword(tokenFromUrl, data.password, data.confirmPassword);
      toast.success("Password reset successfully");
      router.push("/login");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not reset password"));
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6"><Logo size="lg" /></div>
        <div className="border rounded-xl p-6 shadow-sm text-center">
          <h1 className="text-lg font-semibold">Reset Your Password</h1>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            We'll guide you through it step by step
          </p>

          <StepIndicator current={step} />

          {step === 1 && (
            <div className="text-left space-y-3">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-3 py-2.5 text-sm"
              />
              <Button onClick={handleSendCode} loading={sending} disabled={!email}>
                Send Verification Code
              </Button>
            </div>
          )}

          {step === 2 && (
            <p className="text-sm text-gray-600">
              Check your inbox for the reset link. Once you click it, you'll land back here to set a new password.
            </p>
          )}

          {step === 3 && (
            <form onSubmit={handleResetSubmit(handleReset)} className="text-left space-y-3">
              <div>
                <input
                  {...registerReset("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
                  type="password"
                  placeholder="New Password"
                  className="w-full border rounded-lg px-3 py-2.5 text-sm"
                />
                {resetErrors.password && <p className="text-red-500 text-xs mt-1">{resetErrors.password.message}</p>}
              </div>
              <div>
                <input
                  {...registerReset("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (v) => v === newPassword || "Passwords do not match",
                  })}
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full border rounded-lg px-3 py-2.5 text-sm"
                />
                {resetErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{resetErrors.confirmPassword.message}</p>}
              </div>
              <Button type="submit" loading={resetting}>Reset Password</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}