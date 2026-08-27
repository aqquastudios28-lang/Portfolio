import { Reveal } from "@/components/ui/Reveal";

/** One labelled block of a case study, set against the shared left rail. */
export function CaseSection({
  label,
  title,
  children,
}: {
  label: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="border-t border-rule py-12 sm:py-16">
      <div className="rail">
        <p className="t-label lg:pt-2">{label}</p>
        <div className="max-w-[64ch]">
          {title ? <h2 className="t-h2 mb-5">{title}</h2> : null}
          {children}
        </div>
      </div>
    </Reveal>
  );
}
