"use client";

import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}) {
  return (
    <span
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "inline-block bg-clip-text text-transparent bg-gradient-to-r from-bone/60 via-bone via-50% to-bone/60 animate-shimmer bg-[length:200%_100%]",
        className,
      )}
    >
      {children}
    </span>
  );
}
