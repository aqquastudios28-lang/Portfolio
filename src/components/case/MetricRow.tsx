import type { Metric } from "@/content/types";

/**
 * Spec row, not an achievement row. These are facts you could check against
 * the screenshot above — tier counts, states, caps — rather than conversion
 * figures nobody can verify.
 *
 * DOM order stays term-then-definition for assistive tech; flex-col-reverse
 * lifts the value above its label visually. The value clamps rather than
 * sitting at a fixed size, because "7" and "24 / 100 / 10" both have to live
 * in the same column.
 */
export function MetricRow({ metrics }: { metrics: Metric[] }) {
  if (metrics.length === 0) return null;

  return (
    <dl className="mt-10 grid border-t border-rule sm:grid-cols-3">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="flex flex-col-reverse gap-2 border-b border-rule py-6 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
        >
          <dt className="t-label">{m.label}</dt>
          <dd className="font-display text-[2.5rem] leading-none font-semibold tracking-[-0.04em] tabular-nums">
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
