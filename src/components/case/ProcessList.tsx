import type { ProcessStep } from "@/content/types";

/**
 * Numbered process. The index is mono and quiet — it orders the list, it is
 * not a highlight, so it does not get the accent.
 */
export function ProcessList({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol>
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="grid gap-2 border-b border-rule py-6 first:pt-0 last:border-0 sm:grid-cols-[2.5rem_1fr] sm:gap-6"
        >
          <span className="t-label sm:pt-1">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="t-h3">{step.title}</h3>
            <p className="t-body mt-2">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
