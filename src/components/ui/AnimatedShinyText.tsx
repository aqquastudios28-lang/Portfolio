"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedShinyText({
  children,
  className,
}: AnimatedShinyTextProps) {
  return (
    <span className={cn("shiny-text-badge font-medium", className)}>
      {children}
    </span>
  );
}
