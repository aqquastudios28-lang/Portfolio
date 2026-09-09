import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

/** Scope, written out. Name on the left, what it means on the right. */
export function Capabilities() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="sec-head">
          <h2 className="annot annot-bright">What I take on</h2>
          <span className="sec-head__fill" />
        </div>

        <dl className="mt-6">
          {site.capabilities.map((cap) => (
            <div
              key={cap.title}
              className="grid gap-3 border-b border-rule-soft py-8 last:border-0 sm:grid-cols-12 sm:gap-8"
            >
              <dt className="t-h2 text-paper sm:col-span-4">{cap.title}</dt>
              <dd className="t-body sm:col-span-8 sm:max-w-2xl">{cap.body}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
