import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { site } from "@/content/site";

export function ContactCta() {
  return (
    <section className="relative overflow-hidden border-t border-rule py-20 sm:py-28">
      {/* Subtle ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-72 w-96 rounded-full bg-accent/5 blur-3xl"
      />

      <Container>
        <div className="rail">
          <div className="flex items-center gap-2 lg:pt-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="t-label">Contact</p>
          </div>

          <div>
            <h2 className="t-h1 max-w-[18ch]">
              Got an interface that needs work?
            </h2>

            <p className="t-lead mt-6 max-w-[48ch]">
              Tell me about your Roblox experience, what interface systems you need, and roughly your timeline. I reply to every commission inquiry.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${site.email}`}
                className="inline-block border-b border-rule-strong pb-1 font-display text-xl font-medium tracking-[-0.02em] transition-colors hover:border-accent hover:text-accent sm:text-2xl"
              >
                {site.email}
              </a>
              <CopyButton text={site.email} label="Copy Email" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
