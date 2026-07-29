"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as authService from "@/services/authService";

type Status = "verifying" | "success" | "error";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("verifying");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }
    authService
      .verifyEmail(token)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <div className="max-w-sm mx-auto mt-24 text-center">
      {status === "verifying" && <p>Verifying your email...</p>}
      {status === "success" && (
        <>
          <p className="text-green-600 font-medium">Email verified!</p>
          <a href="/login" className="text-blue-600 underline">Go to login</a>
        </>
      )}
      {status === "error" && <p className="text-red-500">Invalid or expired link.</p>}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p className="text-center mt-24">Loading...</p>}>
      <VerifyEmailContent />
    </Suspense>
  );
}