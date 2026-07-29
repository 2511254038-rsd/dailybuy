"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Banner } from "@/services/bannerService";

export default function HeroCarousel({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % banners.length), 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + banners.length) % banners.length);
  const next = () => setIndex((i) => (i + 1) % banners.length);

  return (
    <div className="relative rounded-lg overflow-hidden h-40 md:h-64 group">
      {banners.map((banner, i) => (
        <a
          key={banner._id}
          href={banner.link || "#"}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
        </a>
      ))}

      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-1.5 h-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}