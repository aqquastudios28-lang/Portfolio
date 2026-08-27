import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Plain text link. The hover is a rule turning accent — no sliding
 * underline, no travelling arrow. One interaction language site-wide.
 */
export function ArrowLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "inline-block border-b border-rule-strong pb-0.5 text-sm",
    "text-bone transition-colors hover:border-accent hover:text-accent",
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
