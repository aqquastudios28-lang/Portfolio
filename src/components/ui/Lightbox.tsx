"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Image from "next/image";

type LightboxContextType = {
  openLightbox: (src: string, alt: string) => void;
  closeLightbox: () => void;
};

const LightboxContext = createContext<LightboxContextType>({
  openLightbox: () => {},
  closeLightbox: () => {},
});

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (src: string, alt: string) => {
    setCurrent({ src, alt });
  };

  const closeLightbox = () => {
    setCurrent(null);
  };

  useEffect(() => {
    if (!current) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [current]);

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 sm:p-8 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center border border-rule bg-ink-2/80 text-bone transition-colors hover:border-accent hover:text-accent"
            aria-label="Close fullscreen preview"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[85vh] max-w-[85vw] flex items-center justify-center">
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[85vh] max-w-[85vw] object-contain drop-shadow-2xl select-none"
              />
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-rule bg-ink-2/90 px-4 py-1.5 backdrop-blur-sm">
            <p className="font-mono text-[11px] uppercase tracking-wider text-bone-dim">
              {current.alt} • Click anywhere to close
            </p>
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  return useContext(LightboxContext);
}
