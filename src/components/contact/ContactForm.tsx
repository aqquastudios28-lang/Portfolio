"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const SCOPES = [
  "Desktop app",
  "Developer tool",
  "Web interface",
  "Game systems",
  "Something else",
];

export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [selectedScope, setSelectedScope] = useState("Desktop app");
  const [message, setMessage] = useState("");
  const [hpWebsite, setHpWebsite] = useState(""); // Honeypot spam trap

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  const formattedBrief = [
    `Project enquiry: ${selectedScope}`,
    `From: ${name || "Anonymous"}`,
    project ? `Project: ${project}` : "",
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      await navigator.clipboard.writeText(formattedBrief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard access can be denied; the message is still in the form.
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          /* The API keeps its original field names; this is the project link. */
          game: project,
          scope: selectedScope,
          message,
          email,
          hp_website: hpWebsite,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error || `That did not send. Email me at ${email} instead.`
        );
      }

      startTransition(() => {
        setStatus("success");
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setName("");
    setProject("");
    setMessage("");
    setSelectedScope("Desktop app");
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col items-start space-y-6 py-2"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-accent text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-paper">
                  Message sent
                </h3>
                <p className="font-mono text-xs text-paper-2 mt-0.5">
                  Thanks — I usually reply within a couple of days.
                </p>
              </div>
            </div>

            <div className="w-full border border-rule p-4 text-xs font-mono space-y-2 text-paper-2">
              <div className="flex justify-between border-b border-rule-soft pb-2">
                <span className="text-paper-3">Scope</span>
                <span className="text-paper font-medium">{selectedScope}</span>
              </div>
              <div className="flex justify-between border-b border-rule-soft pb-2">
                <span className="text-paper-3">From</span>
                <span className="text-paper font-medium">{name}</span>
              </div>
              {project && (
                <div className="flex justify-between border-b border-rule-soft pb-2">
                  <span className="text-paper-3">Project</span>
                  <span className="text-paper font-medium truncate max-w-[220px]">{project}</span>
                </div>
              )}
              <div className="pt-1 text-paper-3 text-[11px] leading-relaxed line-clamp-3">
                &ldquo;{message}&rdquo;
              </div>
            </div>

            <div className="w-full space-y-3">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn-ghost text-xs gap-2 py-2 px-3.5 cursor-pointer text-paper"
                >
                  <svg className="h-3.5 w-3.5 text-paper-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>{copied ? "Copied" : "Copy message"}</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono text-paper-3 hover:text-paper underline underline-offset-4 transition-colors cursor-pointer"
              >
                &larr; Send another message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="hidden" aria-hidden="true" tabIndex={-1}>
              <label htmlFor="hp_website">Website</label>
              <input
                id="hp_website"
                type="text"
                value={hpWebsite}
                onChange={(e) => setHpWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="annot mb-3 block">What is it</label>
              <div className="flex flex-wrap gap-2">
                {SCOPES.map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => setSelectedScope(scope)}
                    aria-pressed={selectedScope === scope}
                    className={cn(
                      "pill cursor-pointer transition-colors",
                      selectedScope === scope
                        ? "pill-accent"
                        : "hover:border-paper-3 hover:text-paper"
                    )}
                  >
                    {scope}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="cf-name" className="annot mb-2 block">
                Name or email
              </label>
              <input
                id="cf-name"
                type="text"
                value={name}
                maxLength={100}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name, handle, or email address"
                autoComplete="name"
                className="field"
                required
              />
            </div>

            <div>
              <label htmlFor="cf-project" className="annot mb-2 block">
                Project link or platform
              </label>
              <input
                id="cf-project"
                type="text"
                value={project}
                maxLength={200}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Repository, live site, or the OS it has to run on"
                className="field"
              />
            </div>

            <div>
              <label htmlFor="cf-msg" className="annot mb-2 block">
                What are you building
              </label>
              <textarea
                id="cf-msg"
                rows={6}
                value={message}
                maxLength={3000}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What it is, what is slow or missing, and any deadline that is real. A paragraph is enough to start."
                className="field"
                required
              />
            </div>

            {errorMessage && (
              <div className="border border-[#e5484d] bg-[#e5484d]/10 p-3 font-mono text-xs text-[#ff8085]">
                {errorMessage}
              </div>
            )}

            <div className="pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span>Send message &rarr;</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn-ghost text-xs gap-1.5 py-2.5 px-3.5 cursor-pointer"
                  title="Copy the message to your clipboard"
                >
                  <svg className="h-3.5 w-3.5 text-paper-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>{copied ? "Copied" : "Copy message"}</span>
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
