import { cn } from "@/lib/utils";

/** Square metadata tag. Used for tools on a case study. */
export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "t-label inline-flex items-center border border-rule px-2.5 py-1.5 text-bone-dim",
        className,
      )}
    >
      {children}
    </span>
  );
}
