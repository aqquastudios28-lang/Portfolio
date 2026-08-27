"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function ShineBorder({
  children,
  className,
  borderClassName,
}: {
  children: ReactNode;
  className?: string;
  borderClassName?: string;
}) {
  return (
    <div className={cn("relative rounded-none p-[1px] overflow-hidden group", className)}>
      {/* Animated glowing border gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-border-beam pointer-events-none",
          borderClassName,
        )}
      />
      <div className="relative z-10 w-full h-full bg-ink">
        {children}
      </div>
    </div>
  );
}
