"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import * as authService from "@/services/authService";
import Logo from "@/components/common/Logo";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function VerifySentPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    setResending(true);
    try {
      await authService.resendVerification(email);
      toast.success("Verification email resent");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not resend email"));
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center mb-6"><Logo size="lg" /></div>
        <div className="border rounded-xl p-8 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
            <Mail size={24} style={{ color: "var(--color-brand)" }} />
          </div>
          <h1 className="text-lg font-semibold mb-2">Verification email sent</h1>
          <p className="text-sm text-gray-500">
            We've sent a confirmation link to <span className="font-medium text-gray-900">{email}</span>.
            Please check your inbox and verify to sign in.
          </p>
          <button
            onClick={handleResend}
            disabled={resending}
            className="mt-5 text-sm text-gray-600 underline disabled:opacity-50"
          >
            {resending ? "Resending..." : "Didn't get it? Resend email"}
          </button>
        </div>
      </div>
    </div>
  );
}