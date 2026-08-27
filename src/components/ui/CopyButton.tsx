"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import { cn } from "@/lib/utils";

export function CopyButton({
  text,
  label,
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast(`Copied "${text}" to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copy ${text}`}
      className={cn(
        "group inline-flex items-center gap-2 border border-rule px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-bone-dim transition-all hover:border-accent hover:text-bone active:scale-95",
        copied && "border-emerald-500 text-emerald-400",
        className,
      )}
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="transition-transform group-hover:scale-110"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>{label ?? text}</span>
        </>
      )}
    </button>
  );
}
