import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, RevealLines } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — SaaS, Websites & Digital Marketing | Reyo Studio" },
      {
        name: "description",
        content:
          "Reyo Studio builds SaaS platforms, websites and e-commerce — and runs the digital marketing that fills them: SEO, paid media, social, content and lifecycle.",
      },
      { property: "og:title", content: "Services — Reyo Studio" },
      {
        property: "og:description",
        content:
          "Product engineering, websites, commerce and digital marketing under one roof. Any SaaS category, any industry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const tracks = [
  {
    k: "01",
    t: "SaaS & Product Engineering",
    b: "Full platforms — auth, roles, billing, dashboards, admin and the data model underneath. Built for the day the user count multiplies, in any category: commerce, health, fintech, logistics, education, internal tools, AI.",
    items: [
      "SaaS platforms & MVPs",
      "Dashboards & analytics",
      "Admin & internal tools",
      "AI features and agents",
      "Integrations & automation",
    ],
  },
  {
    k: "02",
    t: "Websites & Commerce",
    b: "Marketing sites, landing pages, storefronts and catalogs where every pixel is accountable to a conversion — fast on mid-range phones, editable by your team without touching code.",
    items: [
      "Marketing & business websites",
      "Landing pages & funnels",
      "E-commerce storefronts",
      "CMS-driven catalogs",
      "Migrations & rebuilds",
    ],
  },
  {
    k: "03",
    t: "Digital Marketing & Growth",
    b: "The half most studios hand off. We run acquisition on the same systems we build, so the tracking, the copy and the landing page are one decision instead of three arguments.",
    items: [
      "SEO & technical SEO",
      "Google & Meta paid media",
      "Social media management",
      "Content & creative production",
      "Email & lifecycle marketing",
      "Analytics, tracking & CRO",
    ],
  },
  {
    k: "04",
    t: "Brand & Interface Systems",
    b: "Identity, UI and motion delivered as a living design system — components and tokens your product and your ads both draw from, so the brand survives contact with scale.",
    items: [
      "Brand identity systems",
      "UI/UX & product design",
      "Design systems",
      "Interactive experiences",
    ],
  },
];

const marketing = [
  {
    t: "Get found",
    b: "Technical SEO, site architecture, page speed and content built around what people actually search for — not keyword theatre.",
  },
  {
    t: "Get traffic",
    b: "Search and social campaigns with creative made for the platform, budgets reviewed weekly, and spend that follows evidence.",
  },
  {
    t: "Get conversions",
    b: "Landing pages, offers and funnel fixes tested against real behaviour, with event tracking wired correctly from day one.",
  },
  {
    t: "Keep them",
    b: "Email, lifecycle flows and retention content, so the customer you paid for isn't a one-time transaction.",
  },
];

const engagements = [
  { t: "Build", b: "Fixed-scope product, website or storefront delivered end to end.", m: "4–12 weeks" },
  { t: "Build + Launch", b: "The build plus the campaign, tracking and content that opens it.", m: "Project + 90 days" },
  { t: "Growth retainer", b: "Ongoing marketing, iteration and roadmap ownership together.", m: "Monthly" },
];

function Services() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-5 pt-36 pb-20 md:px-10 md:pt-52 md:pb-28">
        <p className="label">Services</p>
        <h1 className="font-display mt-6 text-[13vw] leading-[0.84] font-semibold tracking-tighter md:text-[7.5vw]">
          <RevealLines lines={["We build it.", "Then we"]} />
          <span className="text-ember block">
            <RevealLines lines={["fill it."]} />
          </span>
        </h1>
        <p className="mt-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Most studios stop at launch and hand you a login. We do the engineering and the digital
          marketing — SaaS platforms and websites in any category, plus the SEO, paid media, social and
          content that put people in front of them.
        </p>
      </section>

      <section className="edge overflow-hidden">
        <Marquee
          items={["SaaS", "Websites", "E-Commerce", "SEO", "Paid Media", "Social", "Content", "Branding"]}
        />
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <p className="label">Four tracks</p>
        <div className="mt-14 grid divide-y divide-border border-y border-border md:grid-cols-2 md:divide-x">
          {tracks.map((x, i) => (
            <Reveal key={x.t} delay={i * 0.05}>
              <div className="bg-background h-full p-8 md:p-12">
                <span className="label">{x.k}</span>
                <h2 className="font-display mt-5 text-2xl font-semibold tracking-tight md:text-3xl">
                  {x.t}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{x.b}</p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {x.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full border border-border px-3.5 py-1.5 font-mono text-[0.65rem] tracking-[0.12em] uppercase text-muted-foreground"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="edge">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label">Digital marketing</p>
              <h2 className="font-display mt-6 text-4xl leading-[0.95] font-semibold tracking-tighter md:text-6xl">
                A launch is not
                <span className="text-ember"> an audience.</span>
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="grid gap-px bg-border sm:grid-cols-2">
                {marketing.map((m, i) => (
                  <Reveal key={m.t} delay={i * 0.05}>
                    <div className="bg-background h-full p-8">
                      <h3 className="font-display text-xl font-semibold tracking-tight">{m.t}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.b}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <p className="label">How we work together</p>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {engagements.map((e, i) => (
            <Reveal key={e.t} delay={i * 0.05}>
              <div className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline">
                <h3 className="font-display text-2xl font-semibold tracking-tight md:col-span-4 md:text-3xl">
                  {e.t}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6">{e.b}</p>
                <p className="label md:col-span-2 md:text-right">{e.m}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Link
          to="/contact"
          className="bg-ember text-primary-foreground hover:bg-ember-soft mt-12 inline-flex rounded-full px-7 py-3.5 font-mono text-xs tracking-[0.18em] uppercase transition-colors"
        >
          Tell us what you&apos;re building
        </Link>
      </section>
    </>
  );
}
