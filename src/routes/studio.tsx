import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, RevealLines } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — How Reyo Studio works" },
      {
        name: "description",
        content:
          "Reyo Studio is a multidisciplinary creative technology studio: one team for strategy, design, engineering and launch — with no handover gaps.",
      },
      { property: "og:title", content: "Studio — Reyo Studio" },
      {
        property: "og:description",
        content: "One team, four disciplines, no handover gaps. How Reyo Studio builds digital products.",
      },
    ],
  }),
  component: Studio,
});

const beliefs = [
  {
    t: "Design and engineering are one conversation",
    b: "A layout that can't be built is a drawing. A build that ignores the design intent is a regression. The same team holds both, so neither gets negotiated away in a handover.",
  },
  {
    t: "Production standards from the first commit",
    b: "Auth, permissions, row-level security and audit trails are structural decisions, not a phase two. We build them in while they're still cheap.",
  },
  {
    t: "Restraint is a feature",
    b: "Motion, effects and density earn their place or they get removed. Every element on screen is either doing work or getting in the way.",
  },
  {
    t: "The work is the argument",
    b: "We don't publish invented statistics or borrowed logos. Every project we show is live, linked, and usable by anyone reading this.",
  },
];

function Studio() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-5 pt-36 pb-20 md:px-10 md:pt-52 md:pb-28">
        <p className="label">The studio</p>
        <h1 className="font-display mt-6 text-[13vw] leading-[0.84] font-semibold tracking-tighter md:text-[7.5vw]">
          <RevealLines lines={["One team.", "Four disciplines."]} />
          <span className="text-ember block">
            <RevealLines lines={["Zero handover gaps."]} />
          </span>
        </h1>
        <p className="mt-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Reyo Studio is a multidisciplinary creative technology studio. Strategy, design, engineering
          and launch live under one roof — which means the person who decided the interaction is in the
          same room as the person shipping it. Websites, web and mobile applications, SaaS platforms,
          AI products, dashboards, internal software, commerce, branding and the marketing that carries
          it all.
        </p>
      </section>

      <section className="edge overflow-hidden">
        <Marquee
          reverse
          items={["Design", "Engineer", "Launch", "Evolve", "Measure", "Sharpen"]}
        />
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <p className="label">What we hold to</p>
        <div className="mt-14 grid divide-y divide-border border-y border-border md:grid-cols-2 md:divide-x">
          {beliefs.map((x, i) => (
            <Reveal key={x.t} delay={i * 0.05}>
              <div className="bg-background h-full p-8 md:p-12">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-display mt-5 text-2xl font-semibold tracking-tight md:text-3xl">
                  {x.t}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{x.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="edge">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <div className="md:col-span-4">
            <p className="label">Engagement</p>
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-2xl leading-[1.15] tracking-tight md:text-4xl">
              We take on a small number of projects at a time — typically a full product build, a
              platform rebuild, or a long-term partnership where we own the roadmap alongside you.
            </p>
            <Link
              to="/contact"
              className="bg-ember text-primary-foreground hover:bg-ember-soft mt-10 inline-flex rounded-full px-7 py-3.5 font-mono text-xs tracking-[0.18em] uppercase transition-colors"
            >
              Tell us what you&apos;re building
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
