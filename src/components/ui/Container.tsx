import { cn } from "@/lib/utils";

/** Standard page gutter and max width. Every section should sit inside one. */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "article" | "nav";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[78rem] px-5 sm:px-8", className)}>
      {children}
    </Tag>
  );
}
