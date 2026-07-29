interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "success" | "neutral";
}

const variants = {
  brand: "text-white",
  success: "bg-green-100 text-green-700",
  neutral: "bg-gray-100 text-gray-600",
};

export default function Badge({ children, variant = "neutral" }: BadgeProps) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${variants[variant]}`}
      style={variant === "brand" ? { backgroundColor: "var(--color-brand)" } : undefined}
    >
      {children}
    </span>
  );
}