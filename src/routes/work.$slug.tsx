import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, projects, type Project } from "@/lib/projects";
import { Reveal, RevealLines } from "@/components/site/Reveal";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — Reyo Studio" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.name} — Reyo Studio case study`;
    return {
      meta: [
        { title },
        { name: "description", content: project.oneLiner },
        { property: "og:title", content: title },
        { property: "og:description", content: project.oneLiner },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project: p } = Route.useLoaderData() as { project: Project };
  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -top-40"
          style={{
            background: `radial-gradient(70% 55% at 15% 0%, color-mix(in oklab, ${p.tint} 22%, transparent), transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-[1600px] px-5 pt-36 pb-14 md:px-10 md:pt-52 md:pb-20">
          <Link
            to="/work"
            className="link-underline font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
          >
            ← Index
          </Link>

          <h1 className="font-display mt-8 text-[13vw] leading-[0.84] font-semibold tracking-tighter md:text-[7.5vw]">
            <RevealLines lines={[p.name]} />
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-snug md:text-3xl">{p.oneLiner}</p>

          <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-8 md:grid-cols-4">
            {[
              { k: "Client", v: p.client },
              { k: "Discipline", v: p.discipline },
              { k: "Year", v: p.year },
              { k: "Status", v: p.status },
            ].map((m) => (
              <div key={m.k}>
                <dt className="label">{m.k}</dt>
                <dd className="mt-2 text-sm">{m.v}</dd>
              </div>
            ))}
          </dl>

          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="border-ember text-ember hover:bg-ember hover:text-primary-foreground mt-10 inline-flex rounded-full border px-7 py-3.5 font-mono text-xs tracking-[0.18em] uppercase transition-colors duration-300"
          >
            Visit live project ↗
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label">The brief</p>
          </div>
          <Reveal className="md:col-span-8">
            <p className="font-display text-2xl leading-[1.15] tracking-tight md:text-4xl">{p.brief}</p>
          </Reveal>
        </div>
      </section>

      <section className="edge">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-4">
            <p className="label">Approach</p>
          </div>
          <div className="divide-y divide-border md:col-span-8">
            {p.approach.map((a, idx) => (
              <Reveal key={a} delay={idx * 0.05}>
                <div className="bg-background flex gap-6 py-7">
                  <span className="label pt-1">{String(idx + 1).padStart(2, "0")}</span>
                  <p className="text-base leading-relaxed text-muted-foreground">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="edge">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-4">
            <p className="label">What we built</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border px-3 py-1.5 font-mono text-[0.65rem] tracking-[0.12em] uppercase text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-8">
            <ul className="space-y-6">
              {p.build.map((b) => (
                <li key={b} className="flex gap-4 text-base leading-relaxed text-muted-foreground">
                  <span className="text-ember mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {p.signals.map((s) => (
                <div key={s.k}>
                  <p className="label">{s.k}</p>
                  <p className="font-display mt-2 text-xl tracking-tight md:text-2xl">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="edge">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-4">
            <p className="label">Outcome</p>
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-2xl leading-[1.15] tracking-tight md:text-4xl">{p.outcome}</p>
          </div>
        </div>
      </section>

      <section className="edge">
        <Link to="/work/$slug" params={{ slug: next.slug }} className="group block">
          <div className="mx-auto flex max-w-[1600px] items-baseline justify-between px-5 py-16 md:px-10 md:py-24">
            <div>
              <p className="label">Next project</p>
              <h2 className="font-display mt-4 text-5xl font-semibold tracking-tighter transition-transform duration-500 group-hover:translate-x-3 md:text-8xl">
                {next.name}
              </h2>
            </div>
            <span className="text-ember text-3xl transition-transform duration-500 group-hover:translate-x-2">
              ↗
            </span>
          </div>
        </Link>
      </section>
    </>
  );
}
