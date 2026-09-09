"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { DUR, EASE } from "@/lib/motion";

type Shot = { src: string; alt: string };

type LightboxContextType = {
  openLightbox: (src: string, alt: string) => void;
  closeLightbox: () => void;
};

const LightboxContext = createContext<LightboxContextType>({
  openLightbox: () => {},
  closeLightbox: () => {},
});

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Shot | null>(null);

  const openLightbox = useCallback((src: string, alt: string) => {
    setCurrent({ src, alt });
  }, []);

  const closeLightbox = useCallback(() => setCurrent(null), []);

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
  }, [current, closeLightbox]);

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.fast, ease: EASE }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md sm:p-8"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-rule bg-surface text-paper transition-colors hover:border-accent hover:text-accent"
              aria-label="Close"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: DUR.base, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[85vw] rounded-[20px] object-contain select-none"
            />

            <p className="pill absolute bottom-6 left-1/2 max-w-[80vw] -translate-x-1/2 overflow-hidden text-ellipsis">
              {current.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  return useContext(LightboxContext);
}
