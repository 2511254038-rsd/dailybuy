import { Check, Package, Truck, Home, X } from "lucide-react";

const STEPS = [
  { key: "pending", label: "Order placed", icon: Package },
  { key: "confirmed", label: "Confirmed", icon: Check },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Home },
];

export default function OrderTimeline({ status }: { status: string }) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-2 text-red-500 border rounded-lg p-4">
        <X size={18} />
        <span className="text-sm font-medium">This order was cancelled</span>
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="flex items-center">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = i <= currentIndex;
        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  done ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                <Icon size={16} />
              </div>
              <span className={`text-xs mt-1.5 text-center w-16 ${done ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 ${i < currentIndex ? "bg-green-600" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}