import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { BlurFade } from "@/components/ui/BlurFade";
import { AnimatedShinyText } from "@/components/ui/AnimatedShinyText";
import { Magnetic } from "@/components/ui/Magnetic";
import { publishedProjects } from "@/content/projects";
import { site } from "@/content/site";

export function Hero() {
  const heroProjects = publishedProjects.slice(0, 3);

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      <Container className="relative">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] lg:gap-12">
          <div className="relative z-10 flex flex-col items-start">
            <BlurFade delay={0.05}>
              <div className="eyebrow-pill">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent-secondary)] shadow-[0_0_18px_var(--accent-secondary-glow)]" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/88">
                  <AnimatedShinyText>Roblox UI designer • Studio build ready</AnimatedShinyText>
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={0.12}>
              <div className="mt-6 inline-flex flex-wrap items-center gap-3">
                <span className="micro-chip">
                  {site.availability.open ? site.availability.label : site.availability.closedLabel}
                </span>
                <span className="micro-chip border-[rgba(112,225,255,0.22)] bg-[rgba(112,225,255,0.08)] text-[var(--accent-secondary)]">
                  Mobile-first touch targets
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={0.2}>
              <h1 className="mt-8 max-w-4xl">
                {site.headline.map((line, index) => (
                  <span
                    key={line}
                    className={[
                      "t-display block text-white",
                      index === 1 ? "sm:pl-10" : "",
                      index === 2 ? "text-white/78 sm:pl-24" : "",
                    ].join(" ")}
                  >
                    {line}
                  </span>
                ))}
              </h1>
            </BlurFade>

            <BlurFade delay={0.32}>
              <p className="t-lead mt-7 max-w-2xl text-text-muted">
                {site.intro}
              </p>
            </BlurFade>

            <BlurFade delay={0.42}>
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Magnetic intensity={0.25}>
                  <Link href="/work" className="uiverse-btn-shimmer min-h-11">
                    <span>Explore Work</span>
                    <span className="ml-2">&rarr;</span>
                  </Link>
                </Magnetic>
                <CopyButton text={site.email} label="Copy Email" />
              </div>
            </BlurFade>

            <BlurFade delay={0.5} className="w-full">
              <div className="mt-10 grid gap-4 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                <div className="section-frame overflow-hidden p-5 sm:p-6">
                  <div className="section-kicker">Design approach</div>
                  <p className="mt-4 max-w-xl text-base leading-7 text-white/88 sm:text-lg">
                    Screens that sell, orient and stay readable when they are opened
                    fifty times a session, usually on a phone.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Shops", "Upgrade menus", "Daily rewards", "HUD systems"].map((item) => (
                      <span key={item} className="micro-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-1">
                  {site.facts.map((fact) => (
                    <div key={fact.label} className="hero-stat">
                      <div className="section-kicker">{fact.label}</div>
                      <p className="mt-3 text-lg font-semibold tracking-tight text-white">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>

          <BlurFade delay={0.18} className="w-full">
            <div className="hero-stage p-4 sm:p-5 lg:min-h-[42rem]">
              <div className="hero-grid absolute inset-0" />
              <div className="pointer-events-none absolute -right-20 top-10 h-52 w-52 rounded-full bg-[var(--accent-secondary-glow)] blur-3xl" />
              <div className="pointer-events-none absolute -left-8 bottom-12 h-44 w-44 rounded-full bg-[var(--accent-glow)] blur-3xl" />

              <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:h-full lg:grid-rows-[minmax(0,1.18fr)_minmax(0,0.82fr)]">
                {heroProjects[0] ? (
                  <Link
                    href={`/work/${heroProjects[0].slug}`}
                    className="hero-card group p-3 sm:p-4 lg:row-span-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="section-kicker text-white/72">Featured interface</span>
                      <span className="micro-chip bg-white/[0.06] text-white/78">
                        {heroProjects[0].category}
                      </span>
                    </div>

                    <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.03)]">
                      <Image
                        src={heroProjects[0].cover.src}
                        alt={heroProjects[0].title}
                        fill
                        unoptimized
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-white">
                          {heroProjects[0].title}
                        </h2>
                        <p className="mt-2 max-w-md text-sm leading-6 text-text-muted">
                          {heroProjects[0].summary}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-text-dim">{heroProjects[0].year}</span>
                    </div>
                  </Link>
                ) : null}

                {heroProjects.slice(1).map((project, index) => (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className="hero-card group flex flex-col justify-between p-3 sm:p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="section-kicker">0{index + 2}</span>
                      <span className="micro-chip bg-white/[0.05] text-white/76">
                        {project.category}
                      </span>
                    </div>

                    <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-[20px] border border-white/8 bg-[rgba(255,255,255,0.03)]">
                      <Image
                        src={project.cover.src}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="text-lg font-semibold tracking-tight text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-text-muted">
                        {project.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </Container>
    </section>
  );
}
