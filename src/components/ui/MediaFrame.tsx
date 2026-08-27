import Image from "next/image";
import type { Media } from "@/content/types";
import { cn } from "@/lib/utils";
import { VideoLoop } from "./VideoLoop";

/**
 * One media slot: image, looping video, or - when `src` is empty - a labelled
 * placeholder telling you exactly what to drop in and where.
 *
 * Square corners and a hairline border, matching every other surface. No
 * hover scale: nudging an image on hover says nothing about the work.
 */
export function MediaFrame({
  media,
  className,
  sizes = "(max-width: 768px) 100vw, 60vw",
  priority = false,
  dropPath,
}: {
  media: Media;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Suggested file path, shown on the placeholder. */
  dropPath?: string;
}) {
  const ratio = media.ratio ?? "16/9";
  const empty = !media.src;

  return (
    <figure className={cn("m-0", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden border bg-ink-2",
          empty ? "border-dashed border-rule" : "border-rule",
        )}
        style={{ aspectRatio: ratio }}
      >
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
            className="object-contain p-2 sm:p-4 transition-transform duration-300 group-hover:scale-[1.02]"
          />
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
