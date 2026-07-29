interface PriceTagProps {
  price: number;
  discountPrice?: number;
  size?: "sm" | "md" | "lg";
}

export default function PriceTag({ price, discountPrice, size = "md" }: PriceTagProps) {
  const hasDiscount = discountPrice != null && discountPrice < price;
  const displayPrice = hasDiscount ? discountPrice : price;
  const percentOff = hasDiscount ? Math.round((1 - discountPrice! / price) * 100) : 0;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`font-bold ${sizeClasses[size]}`} style={{ color: "var(--color-price)" }}>
        ৳{displayPrice.toLocaleString()}
      </span>
      {hasDiscount && (
        <>
          <span className="text-gray-400 line-through text-sm">৳{price.toLocaleString()}</span>
          <span
            className="text-white text-xs font-semibold px-1.5 py-0.5 rounded"
            style={{ backgroundColor: "var(--color-discount-badge)" }}
          >
            -{percentOff}%
          </span>
        </>
      )}
    </div>
  );
}