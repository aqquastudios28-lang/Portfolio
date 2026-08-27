import type { Metric } from "@/content/types";

/**
 * Outcome stats. DOM order stays term-then-definition for assistive tech;
 * flex-col-reverse lifts the value above its label visually.
 *
 * The number/label ratio is deliberate: the figure is the content, the
 * label is the caption.
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
