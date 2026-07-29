import { Star } from "lucide-react";

export default function RatingStars({ rating = 0, count }: { rating?: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      ))}
      {count != null && <span className="text-xs text-gray-500 ml-1">({count})</span>}
    </div>
  );
}