"use client";

import { useState } from "react";

export default function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const displayImages = images.length > 0 ? images : ["https://placehold.co/600x600?text=No+Image"];

  return (
    <div>
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displayImages[active]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      {displayImages.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {displayImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-16 h-16 shrink-0 rounded border-2 overflow-hidden ${
                i === active ? "border-gray-900" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}