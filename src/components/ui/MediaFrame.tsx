"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Media } from "@/content/types";
import { viewport, wipe } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { VideoLoop } from "./VideoLoop";
import { useLightbox } from "./Lightbox";

/**
 * One media slot: image, looping video, or — when `src` is empty — a labelled
 * placeholder telling you exactly what to drop in and where.
 *
 * The work is uncovered by a wipe on first view and then left alone. It does
 * not scale under the cursor: these are screenshots of interfaces, and an
 * interface that drifts when you point at it is the opposite of the argument
 * this site is making. `cursor-zoom-in` is the whole affordance.
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

  const zoomable = allowLightbox && !empty && media.kind !== "video";

  const handleClick = (e: React.MouseEvent) => {
    if (!zoomable) return;
    e.preventDefault();
    e.stopPropagation();
    openLightbox(media.src, media.alt);
  };

  const inner = (
    <>
      {empty ? (
        <Placeholder media={media} ratio={ratio} dropPath={dropPath} />
      ) : media.kind === "video" ? (
        <VideoLoop media={media} />
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          unoptimized
          sizes={sizes}
          priority={priority}
          className="object-contain"
        />
      )}
    </>
  );

  return (
    <figure className={cn("m-0", className)}>
      <motion.div
        data-motion
        onClick={handleClick}
        className={cn(
          "relative w-full overflow-hidden",
          empty && "border border-dashed border-rule bg-ink-2",
          zoomable && "cursor-zoom-in",
        )}
        style={{ aspectRatio: ratio }}
        {...(empty
          ? {}
          : {
              variants: wipe,
              initial: "hidden",
              whileInView: "shown",
              viewport,
            })}
      >
        {inner}
      </motion.div>

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
