"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const SCOPES = [
  "Full UI Set",
  "Shop & Economy",
  "HUD Overhaul",
  "Luau Tweening",
  "UI Review",
];

export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedScope, setSelectedScope] = useState("Full UI Set");
  const [message, setMessage] = useState("");

  const subject = experience
    ? `Roblox UI Commission [${selectedScope}] — ${experience}`
    : `Roblox UI Commission [${selectedScope}]`;

  const body = [
    name ? `Hi, my name is ${name}.` : "Hi,",
    "",
    `Scope: ${selectedScope}`,
    experience ? `Experience: ${experience}` : "",
    "",
    "Project Requirements:",
    message,
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n");

  const href = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href;
      }}
    >
      {/* Scope Chips */}
      <div>
        <label className="font-mono text-xs uppercase tracking-wider text-text-dim mb-2.5 block">
          Project Scope
        </label>
        <div className="flex flex-wrap gap-2">
          {SCOPES.map((scope) => (
            <button
              key={scope}
              type="button"
              onClick={() => setSelectedScope(scope)}
              className={cn(
                "rounded-lg px-3 py-1.5 font-mono text-xs transition-all",
                selectedScope === scope
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "border border-white/10 bg-white/[0.03] text-text-muted hover:border-white/20 hover:text-white"
              )}
            >
              {scope}
            </button>
          ))}
        </div>
      </div>

      {/* Name Input */}
      <div>
        <label htmlFor="cf-name" className="font-mono text-xs uppercase tracking-wider text-text-dim mb-2 block">
          Your Name / Handle
        </label>
        <input
          id="cf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex / @Studio"
          autoComplete="name"
          className="uiverse-input"
          required
        />
      </div>

      {/* Game Link */}
      <div>
        <label htmlFor="cf-exp" className="font-mono text-xs uppercase tracking-wider text-text-dim mb-2 block">
          Game Name / Link
        </label>
        <input
          id="cf-exp"
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Game title or Roblox experience URL"
          className="uiverse-input"
          required
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-msg" className="font-mono text-xs uppercase tracking-wider text-text-dim mb-2 block">
          Details & Scope
        </label>
        <textarea
          id="cf-msg"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe what screens you need, target timeline, and any specific mechanics."
          className="uiverse-input resize-y"
          required
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="uiverse-btn-shimmer w-full sm:w-auto">
        <span>Send Commission Request &rarr;</span>
      </button>

      <p className="font-mono text-[11px] text-text-dim">
        Opens your default email client with formatted message details.
      </p>
    </form>
  );
}
