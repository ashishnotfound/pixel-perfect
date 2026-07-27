import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { ProjectIndex } from "@/components/site/ProjectIndex";
import { RevealLines } from "@/components/site/Reveal";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Reyo Studio case studies" },
      {
        name: "description",
        content:
          "Six shipped products: Seller+, SmileCare Dental Studio, ChatterBox, an apparel storefront, Total Print Solutions and Reyo Studio v1.",
      },
      { property: "og:title", content: "Work — Reyo Studio" },
      {
        property: "og:description",
        content: "Real products, live in the world. Read the case studies behind them.",
      },
    ],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-5 pt-36 pb-16 md:px-10 md:pt-52 md:pb-24">
        <p className="label">Index — {projects.length} projects</p>
        <h1 className="font-display mt-6 text-[14vw] leading-[0.84] font-semibold tracking-tighter md:text-[8vw]">
          <RevealLines lines={["Proof,"]} />
          <span className="text-ember block">
            <RevealLines lines={["not advertising."]} />
          </span>
        </h1>
        <p className="mt-10 max-w-lg text-base leading-relaxed text-muted-foreground">
          Every project below is a real product with a real URL. No concepts, no invented metrics — the
          work is live and you can go use it.
        </p>
      </section>

      <ProjectIndex items={projects} />
    </>
  );
}
