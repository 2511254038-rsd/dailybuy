import Link from "next/link";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-3xl" };
  return (
    <Link href="/" className={`font-bold ${sizes[size]}`} style={{ color: "var(--color-brand)" }}>
      DailyBuy
    </Link>
  );
}