"use client";

import Image from "next/image";
import type { Media } from "@/content/types";
import { cn } from "@/lib/utils";
import { VideoLoop } from "./VideoLoop";
import { useLightbox } from "./Lightbox";

/**
 * One media slot: image, looping video, or - when `src` is empty - a labelled
 * placeholder telling you exactly what to drop in and where.
 */
export function MediaFrame({
  media,
  className,
  sizes = "(max-width: 768px) 100vw, 60vw",
  priority = false,
  dropPath,
  allowLightbox = true,
}: {
  media: Media;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Suggested file path, shown on the placeholder. */
  dropPath?: string;
  allowLightbox?: boolean;
}) {
  const ratio = media.ratio ?? "16/9";
  const empty = !media.src;
  const { openLightbox } = useLightbox();

  const handleClick = (e: React.MouseEvent) => {
    if (allowLightbox && !empty && media.kind !== "video") {
      e.preventDefault();
      e.stopPropagation();
      openLightbox(media.src, media.alt);
    }
  };

  return (
    <figure className={cn("m-0", className)}>
      <div
        onClick={handleClick}
        className={cn(
          "relative w-full overflow-hidden bg-transparent group/frame",
          empty && "border border-dashed border-rule bg-ink-2",
          !empty && allowLightbox && "cursor-zoom-in",
        )}
        style={{ aspectRatio: ratio }}
      >
        {empty ? (
          <Placeholder media={media} ratio={ratio} dropPath={dropPath} />
        ) : media.kind === "video" ? (
          <VideoLoop media={media} />
        ) : (
          <>
            <Image
              src={media.src}
              alt={media.alt}
              fill
              unoptimized
              sizes={sizes}
              priority={priority}
              className="object-contain transition-transform duration-300 group-hover/frame:scale-[1.03] drop-shadow-2xl"
            />
            {allowLightbox && (
              <div
                title="Click to view full resolution"
                className="absolute top-2 right-2 opacity-0 transition-opacity duration-200 group-hover/frame:opacity-100 bg-ink/80 border border-rule p-1.5 backdrop-blur-sm text-bone-dim hover:text-accent rounded-xs"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </div>
            )}
          </>
        )}
      </div>

      {media.caption ? (
        <figcaption className="mt-3 max-w-[64ch] text-[13px] leading-relaxed text-bone-faint">
          {media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Placeholder({
  media,
  ratio,
  dropPath,
}: {
  media: Media;
  ratio: string;
  dropPath?: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4">
      <p className="t-label">
        {media.kind === "video" ? "Video" : "Image"}
        <span aria-hidden className="mx-2 text-bone-faint">
          /
        </span>
        {ratio}
      </p>

      <div>
        <p className="max-w-[46ch] text-xs leading-relaxed text-bone-dim">
          {media.alt}
        </p>
        {dropPath ? (
          <p className="mt-2 font-mono text-[10px] break-all text-bone-faint">
            {dropPath}
          </p>
        ) : null}
      </div>
    </div>
  );
}
