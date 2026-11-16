import type { Plate as PlateSpec } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * A typographic cover for a project that has no honest screenshot. It uses
 * the same rules as the rest of the site: a hairline frame, the three-colour
 * ribbon, condensed italic caps and a mono sample. The last headline line is
 * the accent, exactly like the homepage statement.
 */
export function Plate({
  plate,
  compact = false,
  className,
}: {
  plate: PlateSpec;
  compact?: boolean;
  className?: string;
}) {
  const last = plate.headline.length - 1;

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden border border-rule bg-surface",
        compact ? "min-h-[22rem]" : "min-h-[26rem] sm:min-h-[32rem]",
        className,
      )}
    >
      <div aria-hidden className="ribbon" />

      <div
        className={cn(
          "flex flex-1 flex-col",
          compact ? "gap-8 p-5 sm:p-6" : "gap-12 p-7 sm:p-10",
        )}
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="annot annot-bright">{plate.kicker}</span>
          <span aria-hidden className="annot">
            &#8599;
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <p
            className={cn(
              "font-display font-extrabold italic uppercase leading-[0.88] tracking-tight",
              compact
                ? "text-[clamp(1.9rem,4vw,3rem)]"
                : "text-[clamp(2.7rem,6vw,5rem)]",
            )}
          >
            {plate.headline.map((line, i) => (
              <span
                key={line}
                className={cn("block", i === last ? "text-accent" : "text-paper")}
              >
                {line}
              </span>
            ))}
          </p>
        </div>

        <div
          className={cn(
            "border-t border-rule-soft pt-4 font-mono text-paper-3",
            compact ? "text-[11px] leading-6" : "text-xs leading-6",
          )}
        >
          {plate.code.map((line, i) => (
            <p key={`${line}-${i}`} className={i === 0 ? "text-paper-2" : undefined}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
