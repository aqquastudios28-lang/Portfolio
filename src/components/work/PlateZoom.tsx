"use client";

import Image from "next/image";
import { useLightbox } from "@/components/ui/Lightbox";

/**
 * The case-study screenshot. Clicking opens it full size — on a UI portfolio
 * people want to read the actual labels, and a fixed-height crop hides them.
 */
export function PlateZoom({
  src,
  alt,
  tag,
}: {
  src: string;
  alt: string;
  tag: string;
}) {
  const { openLightbox } = useLightbox();

  return (
    <button
      type="button"
      onClick={() => openLightbox(src, alt)}
      aria-label={`View ${alt} at full size`}
      className="group block w-full cursor-zoom-in text-left"
    >
      <div className="relative">
        <span className="slot-tag">{tag}</span>

        <div className="frame aspect-[16/9]">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            unoptimized
            sizes="(max-width: 1280px) 100vw, 1248px"
            className="object-cover object-center"
          />
          <span className="pill pointer-events-none absolute right-4 bottom-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Full size
          </span>
        </div>
      </div>
    </button>
  );
}
