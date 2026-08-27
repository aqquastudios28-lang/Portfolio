"use client";

import { useEffect, useRef } from "react";
import type { Media } from "@/content/types";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Autoplaying muted loop for interaction demos.
 *
 * If the visitor has asked for reduced motion we do not autoplay at all -
 * we show the poster with native controls so they can start it themselves.
 * Playback is also paused while the element is off-screen, which keeps a page
 * full of loops from cooking a phone battery.
 */
export function VideoLoop({ media }: { media: Media }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      el.pause();
      return;
    }

    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void el.play().catch(() => {
            /* autoplay refused - the poster stays, which is fine */
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.2 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      src={media.src}
      poster={media.poster}
      muted
      loop
      playsInline
      preload="metadata"
      autoPlay={!reduced}
      controls={reduced}
      aria-label={media.alt}
    />
  );
}
