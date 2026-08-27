"use client";

import { cn } from "@/lib/utils";
import { site } from "@/content/site";

export function Marquee({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex w-full overflow-hidden border-y border-rule/60 bg-ink-2/40 py-4 select-none backdrop-blur-xs",
        className,
      )}
    >
      {/* Gradient masks on sides for smooth fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-ink to-transparent" />

      <div className="flex shrink-0 animate-marquee items-center gap-10 whitespace-nowrap">
        {site.marquee.concat(site.marquee).map((item, i) => (
          <div key={`m1-${i}`} className="flex items-center gap-10">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-bone-dim transition-colors hover:text-accent">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className="flex shrink-0 animate-marquee items-center gap-10 whitespace-nowrap"
      >
        {site.marquee.concat(site.marquee).map((item, i) => (
          <div key={`m2-${i}`} className="flex items-center gap-10">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-bone-dim transition-colors hover:text-accent">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
