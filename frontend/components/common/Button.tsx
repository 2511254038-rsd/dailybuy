import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({ children, loading, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full bg-green-600 text-white rounded py-2 disabled:opacity-50 ${className}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}