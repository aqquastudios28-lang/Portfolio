import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * A specification list, not a card grid. Numbered rows separated by rules,
 * with the index in the same left rail every other section uses.
 */
export function Capabilities() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex items-baseline justify-between border-b border-rule pb-4">
          <h2 className="t-label">Capabilities</h2>
          <p className="t-label hidden sm:block">
            {String(site.capabilities.length).padStart(2, "0")}
          </p>
        </div>

        <ul>
          {site.capabilities.map((cap, i) => (
            <Reveal
              as="li"
              key={cap.title}
              delay={i * 50}
              className="border-b border-rule py-9 rail"
            >
              <span className="t-label lg:pt-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="grid gap-3 md:grid-cols-[16rem_1fr] md:gap-10">
                <h3 className="t-h3">{cap.title}</h3>
                <p className="t-body max-w-[58ch]">{cap.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
