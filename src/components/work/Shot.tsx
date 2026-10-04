import Image from "next/image";
import type { Media } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * A screenshot exactly as it was exported: its own proportions, no crop, no
 * frame around it. It is shown at its real pixel size and only shrinks when
 * the column is narrower than the image. It is never scaled up.
 */
export function Shot({
  media,
  sizes,
  priority,
  className,
}: {
  media: Media;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width ?? 1600}
      height={media.height ?? 900}
      sizes={sizes}
      priority={priority}
      unoptimized
      className={cn("block h-auto max-w-full", className)}
    />
  );
}
