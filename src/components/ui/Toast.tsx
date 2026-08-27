"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = (msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-[999] flex items-center gap-3 border border-rule-strong bg-ink-2/95 px-4 py-3 shadow-2xl backdrop-blur-md transition-all duration-300 ${
            visible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-4 opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono tracking-wide text-bone">
            {message}
          </span>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
