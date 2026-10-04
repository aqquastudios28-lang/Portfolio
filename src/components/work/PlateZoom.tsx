"use client";

import { useLightbox } from "@/components/ui/Lightbox";
import { Shot } from "@/components/work/Shot";
import type { Media } from "@/content/types";

/**
 * The case-study screenshot, uncropped. Clicking opens it in the lightbox —
 * on a UI portfolio people want to read the actual labels.
 */
export function PlateZoom({ media }: { media: Media }) {
  const { openLightbox } = useLightbox();

  return (
    <button
      type="button"
      onClick={() => openLightbox(media.src, media.alt)}
      aria-label={`View ${media.alt} at full size`}
      className="block max-w-full cursor-zoom-in"
    >
      <Shot
        media={media}
        priority
        sizes="(max-width: 1280px) 100vw, 1248px"
      />
    </button>
  );
}
