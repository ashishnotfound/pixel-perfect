import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

import heroField from "@/assets/hero-field.jpg";
import { projects, capabilities } from "@/lib/projects";
import { ProjectIndex } from "@/components/site/ProjectIndex";
import { Reveal, RevealLines } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { QRLanding } from "@/components/site/QRLanding";

type HomeSearch = {
  from?: string;
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    return {
      from: (search.from as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Reyo Studio — We create digital products, not websites" },
      {
        name: "description",
        content:
          "Reyo Studio is a multidisciplinary creative technology studio building web apps, SaaS platforms, AI products, commerce and brand systems — designed, engineered and launched end to end.",
      },
      { property: "og:title", content: "Reyo Studio — Creative technology studio" },
      {
        property: "og:description",
        content:
          "If an idea exists digitally, Reyo Studio can design it, engineer it, launch it and help it evolve.",
      },
    ],
  }),
  component: Home,
});

const phases = [
  {
    n: "I",
    title: "Interrogate",
    body: "We start by attacking the brief. What is actually being sold, to whom, and what is the one behaviour that defines success. Everything that doesn't serve it is cut before a pixel exists.",
  },
  {
    n: "II",
    title: "Compose",
    body: "Design as a system, not a screen. Type scale, motion register, interaction grammar and component logic are decided once, then hold across every surface the product will ever grow into.",
  },
  {
    n: "III",
    title: "Engineer",
    body: "Real databases, real auth, real security boundaries. We build production software — row-level security, audit trails, performance budgets — not prototypes wearing a launch date.",
  },
  {
    n: "IV",
    title: "Evolve",
    body: "Launch is the midpoint. We instrument what shipped, read the behaviour, and keep sharpening the product against what users actually do.",
  },
];

function Home() {
  const search = Route.useSearch();
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  if (search.from === "qr") {
    return <QRLanding />;
  }

  return (
    <>
      {/* SCENE 01 — ARRIVAL */}
      <section ref={heroRef} className="grain relative flex min-h-[100svh] items-end overflow-hidden">
        <motion.img
          src={heroField}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1088}
          style={{ y, opacity: fade }}
          className="drift pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="rule-grid pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 20% 40%, transparent 0%, var(--background) 78%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-16 md:px-10 md:pb-20">
          <motion.p
            className="label"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Reyo Studio — Creative technology
          </motion.p>

          <h1 className="font-display mt-6 text-[15vw] leading-[0.82] font-semibold tracking-tighter md:text-[9.5vw]">
            <RevealLines lines={["We don't build", "websites."]} />
            <span className="text-ember block">
              <RevealLines lines={["We build the thing", "the website is for."]} />
            </span>
          </h1>

          <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-end">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5">
              A multidisciplinary studio for products that have to survive contact with real users —
              web apps, SaaS platforms, AI systems, commerce and the brands wrapped around them.
            </p>
            <div className="flex flex-wrap items-center gap-4 md:col-span-7 md:justify-end">
              <Link
                to="/work"
                className="bg-ember text-primary-foreground hover:bg-ember-soft rounded-full px-7 py-3.5 font-mono text-xs tracking-[0.18em] uppercase transition-colors duration-300"
              >
                Enter the work
              </Link>
              <Link
                to="/contact"
                className="link-underline font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 02 — RANGE */}
      <section className="edge overflow-hidden">
        <Marquee
          items={[
            "Web Applications",
            "SaaS Platforms",
            "AI Products",
            "Mobile Apps",
            "Dashboards",
            "E-Commerce",
            "Branding",
            "Automation",
            "UI/UX Systems",
          ]}
        />
      </section>

      {/* SCENE 03 — THESIS */}
      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label">01 — Position</p>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <p className="font-display text-3xl leading-[1.08] tracking-tight md:text-[3.4rem]">
                If an idea exists digitally, we can design it, engineer it, launch it, and help it
                evolve. <span className="text-muted-foreground">Most studios stop at the surface. We are accountable for what happens after the site loads —
                the database, the logic, the security model, the second release.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SCENE 04 — WORK INDEX */}
      <section id="work">
        <div className="mx-auto flex max-w-[1600px] items-end justify-between px-5 pb-8 md:px-10">
          <div>
            <p className="label">02 — Evidence</p>
            <h2 className="font-display mt-4 text-5xl font-semibold tracking-tighter md:text-7xl">
              Shipped, live,
              <br />
              and running.
            </h2>
          </div>
          <Link
            to="/work"
            className="link-underline hidden font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground md:block"
          >
            Full index ↗
          </Link>
        </div>
        <ProjectIndex items={projects} />
      </section>

      {/* SCENE 05 — CAPABILITIES */}
      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <p className="label">03 — Range</p>
        <div className="mt-14 grid divide-y divide-border border-y border-border md:grid-cols-2 md:divide-x">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="bg-background group h-full p-8 transition-colors duration-500 hover:bg-secondary md:p-12">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {c.title}
                  </h3>
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[0.65rem] tracking-[0.12em] uppercase text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SCENE 06 — METHOD */}
      <section className="edge">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <p className="label">04 — Method</p>
          <div className="mt-14 divide-y divide-border">
            {phases.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.04}>
                <div className="bg-background grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                  <div className="text-ember font-display text-2xl md:col-span-1">{p.n}</div>
                  <h3 className="font-display text-3xl font-semibold tracking-tight md:col-span-4 md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:col-span-7">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
