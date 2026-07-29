import { Check } from "lucide-react";

const steps = ["Cart", "Shipping", "Payment", "Confirmation"];

export default function CheckoutSteps({ current }: { current: number }) {
  return (
    <div className="flex items-center mb-8">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                i < current ? "bg-green-600 text-white" : i === current ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {i < current ? <Check size={14} /> : i + 1}
            </div>
            <span className="text-xs mt-1 text-gray-600">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 ${i < current ? "bg-green-600" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}