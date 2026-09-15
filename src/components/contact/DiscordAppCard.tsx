"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";

const DEFAULT_INSTALL_URL =
  "https://discord.com/oauth2/authorize?client_id=1549424708292837438&integration_type=1&scope=identify+applications.commands";

interface DiscordAppCardProps {
  directInstallUrl?: string;
  initialConnectedUser?: string;
}

export function DiscordAppCard({
  directInstallUrl,
  initialConnectedUser,
}: DiscordAppCardProps) {
  const connectedUser = initialConnectedUser;
  const authUrl = directInstallUrl || DEFAULT_INSTALL_URL;
  const discordLink =
    site.links.find((l) => l.label.toLowerCase() === "discord")?.href || "https://discord.com";

  return (
    <div className="relative overflow-hidden rounded-xl border border-rule bg-ink-2/60 p-6 backdrop-blur-md sm:p-8">
      {/* Ambient subtle glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#5865f2]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        {/* Profile Info */}
        <div className="flex items-start gap-4 sm:items-center">
          <div className="relative flex-shrink-0">
            {/* Avatar */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#5865f2]/15 text-xl font-bold text-paper shadow-inner">
              <span className="font-display">C</span>
            </div>
            {/* Live Indicator */}
            <span
              className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-ink-1 bg-[#30d158]"
              title="Cerbis Discord Bot Online"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white opacity-80" />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold text-paper">
                {site.name}
              </h3>
              <span className="inline-flex items-center gap-1 rounded bg-[#5865f2]/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#7983f5]">
                APP
              </span>
              <span className="rounded border border-rule-soft px-1.5 py-0.5 font-mono text-[10px] text-paper-3">
                Roblox UI
              </span>
            </div>
            <p className="mt-1 text-xs text-paper-2">
              Send your game link and menus in DM. Bot logs the specs, I answer directly from Studio.
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 rounded-lg border border-rule bg-ink-1/80 px-3.5 py-2 font-mono text-xs">
          <span className="h-2 w-2 rounded-full bg-[#30d158]" />
          <span className="text-paper-2">Status:</span>
          <span className="font-medium text-paper">
            {connectedUser ? `@${connectedUser} linked` : "Ready to add"}
          </span>
        </div>
      </div>

      {/* Feature Row */}
      <div className="mt-6 grid grid-cols-1 gap-3 border-y border-rule/60 py-4 sm:grid-cols-3">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 font-mono text-xs text-[#7983f5]">[01]</span>
          <div>
            <span className="block font-mono text-xs font-semibold text-paper">
              Instant receipt
            </span>
            <span className="text-[11px] text-paper-3">
              Confirms handoff specs the second you send the brief.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 font-mono text-xs text-[#30d158]">[02]</span>
          <div>
            <span className="block font-mono text-xs font-semibold text-paper">
              Human replies
            </span>
            <span className="text-[11px] text-paper-3">
              Green badge when I answer from Studio so you know it is me.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 font-mono text-xs text-accent">[03]</span>
          <div>
            <span className="block font-mono text-xs font-semibold text-paper">
              Account install
            </span>
            <span className="text-[11px] text-paper-3">
              Adds to your Discord user account. No server permissions needed.
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            href={authUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-[#5865f2] px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#4752c4]"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" />
            </svg>
            <span>{connectedUser ? "Re-authorize Discord bot" : "Add bot to Discord"}</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </motion.a>

          <a
            href="https://discord.com/users/1549424708292837438"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost py-2 text-xs text-paper-2 hover:text-paper"
          >
            Direct message (@Cerbi)
          </a>
        </div>

        <p className="font-mono text-[11px] text-paper-3">
          User-app install • Safe and permissionless
        </p>
      </div>

      {/* Usage steps after install */}
      <div className="mt-4 rounded-lg border border-rule/50 bg-ink-1/50 px-4 py-3 text-xs text-paper-2">
        <span className="font-semibold text-paper">Once added to your account:</span> Type{" "}
        <code className="rounded bg-ink-3 px-1.5 py-0.5 font-mono text-[11px] text-[#7983f5]">
          /brief
        </code>{" "}
        in any Discord chat or DM, or click{" "}
        <a
          href="https://discord.com/users/1549424708292837438"
          target="_blank"
          rel="noreferrer noopener"
          className="text-paper underline underline-offset-2 hover:text-accent"
        >
          Direct message
        </a>{" "}
        to hand off your game link and screens.
      </div>
    </div>
  );
}
