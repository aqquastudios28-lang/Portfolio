"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/* Published numbers from the Yappuccino README, measured on the same Windows PC
   against Vesktop (Discord's web app in the same Electron shell). CPU counts the
   whole processor as 100%. Screen sharing is a 1920×1080 monitor at 30 fps. */
const STATES = [
  { id: "idle", label: "Idle", yap: 30, vesktop: 724, yapCpu: "0.015%", vesktopCpu: "0.11%" },
  {
    id: "images",
    label: "Image-heavy",
    yap: 41,
    vesktop: 706,
    yapCpu: "0.008%",
    vesktopCpu: "0.17%",
  },
  { id: "call", label: "In a call", yap: 44, vesktop: 888, yapCpu: "0.33%", vesktopCpu: "0.46%" },
  {
    id: "share",
    label: "Screen share",
    yap: 113,
    vesktop: 1013,
    yapCpu: "1.1%",
    vesktopCpu: "2.15%",
  },
] as const;

/** Every bar is drawn on the same 0–1013 MB scale, so the four states compare. */
const SCALE = 1013;

export function MemoryFootprint() {
  const [activeId, setActiveId] = useState<(typeof STATES)[number]["id"]>("idle");
  const active = STATES.find((state) => state.id === activeId) ?? STATES[0];

  return (
    <section className="border-t border-rule py-16 sm:py-24">
      <Container>
        <div className="sec-head">
          <h2 className="annot annot-bright">Memory footprint</h2>
          <span className="sec-head__fill" />
          <a
            href="https://github.com/cerbiss/Yappuccinov2/tree/main/docs/measurements"
            target="_blank"
            rel="noreferrer noopener"
            className="annot transition-colors hover:text-paper"
          >
            Measurements &#8599;
          </a>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h3 className="t-h2 max-w-2xl text-paper">
              One client, two bills.
            </h3>
            <p className="t-body mt-4 max-w-2xl">
              Yappuccino was measured against Vesktop — Discord&rsquo;s own web
              app, in the same Electron shell, with Vencord on top — in four
              states on the same Windows PC. These are the published numbers,
              not estimates.
            </p>

            <div
              role="group"
              aria-label="Choose a measured state"
              className="mt-8 flex flex-wrap gap-2"
            >
              {STATES.map((state) => (
                <button
                  key={state.id}
                  type="button"
                  onClick={() => setActiveId(state.id)}
                  aria-pressed={state.id === activeId}
                  className={cn(
                    "pill cursor-pointer transition-colors",
                    state.id === activeId
                      ? "pill-accent"
                      : "hover:border-paper-3 hover:text-paper",
                  )}
                >
                  {state.label}
                </button>
              ))}
            </div>

            <p className="sr-only" aria-live="polite">
              {active.label}: Yappuccino {active.yap} megabytes, Vesktop{" "}
              {active.vesktop} megabytes.
            </p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
              <div className="border-t-2 border-accent pt-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="annot annot-bright">Yappuccino</span>
                  <span className="font-mono text-[11px] text-paper-3">
                    CPU {active.yapCpu}
                  </span>
                </div>
                <p className="mt-3 font-display text-[clamp(2.6rem,5vw,4.2rem)] font-extrabold italic leading-none tracking-tight text-accent tabular-nums">
                  {active.yap}
                  <span className="ml-2 font-display text-base font-semibold not-italic tracking-normal text-paper-2">
                    MB
                  </span>
                </p>
                <div className="mt-5 h-2.5 w-full border border-rule-soft bg-surface-2">
                  <div
                    className="h-full bg-accent transition-[width] duration-500 ease-out"
                    style={{ width: `${(active.yap / SCALE) * 100}%` }}
                  />
                </div>
              </div>

              <div className="border-t-2 border-rule pt-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="annot">Vesktop / Electron</span>
                  <span className="font-mono text-[11px] text-paper-3">
                    CPU {active.vesktopCpu}
                  </span>
                </div>
                <p className="mt-3 font-display text-[clamp(2.6rem,5vw,4.2rem)] font-extrabold italic leading-none tracking-tight text-paper-3 tabular-nums">
                  {active.vesktop.toLocaleString("en-US")}
                  <span className="ml-2 font-display text-base font-semibold not-italic tracking-normal text-paper-2">
                    MB
                  </span>
                </p>
                <div className="mt-5 h-2.5 w-full border border-rule-soft bg-surface-2">
                  <div
                    className="h-full bg-paper-3 transition-[width] duration-500 ease-out"
                    style={{ width: `${(active.vesktop / SCALE) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:border-l lg:border-rule lg:pl-10">
            <span className="annot">Launch to a readable window</span>
            <p className="mt-3 font-display text-[clamp(2.6rem,5vw,4.2rem)] font-extrabold italic leading-none tracking-tight text-paper tabular-nums">
              0.22<span className="ml-2 text-2xl">s</span>
            </p>
            <p className="mt-3 font-mono text-xs text-paper-2">
              Discord: 8 s &nbsp;·&nbsp; 36&times; faster
            </p>
            <p className="t-body mt-5 max-w-sm text-sm">
              From clicking the icon to reading messages. The saved cache is
              restored from disk first, then reconciled while you read.
            </p>
            <div className="div-soft my-6" />
            <p className="font-mono text-[11px] leading-5 text-paper-3">
              Memory and CPU measured 25 October 2026; screen sharing on 27
              October, all on the same PC. Vesktop stands in for Discord&rsquo;s
              own app. CPU counts the whole processor as 100%.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
