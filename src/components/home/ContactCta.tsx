import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

/**
 * The closing block. No centred card, no glow, no pill — a rule, a
 * statement, and the address set large enough to be the affordance itself.
 */
export function ContactCta() {
  return (
    <section className="border-t border-rule py-20 sm:py-28">
      <Container>
        <div className="rail">
          <p className="t-label lg:pt-2">Contact</p>

          <div>
            <h2 className="t-h1 max-w-[16ch]">
              Got an interface that needs work?
            </h2>

            <p className="t-lead mt-6 max-w-[46ch]">
              Tell me about the experience, the problem, and roughly when you
              need it. I reply to everything.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-10 inline-block border-b border-rule-strong pb-1 font-display text-xl font-medium tracking-[-0.02em] transition-colors hover:border-accent hover:text-accent sm:text-2xl"
            >
              {site.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
