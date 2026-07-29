"use client";

import { useState } from "react";
import { Tag } from "lucide-react";

const DEMO_CODE = "WELCOME10";

export default function CouponInput({ onApply }: { onApply: (discountPercent: number) => void }) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  const handleApply = () => {
    if (code.trim().toUpperCase() === DEMO_CODE) {
      setApplied(true);
      setError("");
      onApply(10);
    } else {
      setError("Invalid or expired code");
      setApplied(false);
    }
  };

  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center gap-2 text-sm font-medium mb-2">
        <Tag size={16} /> Promo code
      </div>
      {applied ? (
        <p className="text-sm text-green-600">Code "{DEMO_CODE}" applied — 10% off</p>
      ) : (
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            className="flex-1 border rounded px-2 py-1.5 text-sm"
          />
          <button onClick={handleApply} className="text-sm bg-gray-900 text-white rounded px-3">
            Apply
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}