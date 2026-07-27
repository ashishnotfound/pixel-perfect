import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Project } from "@/lib/projects";

export function ProjectIndex({ items }: { items: Project[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="relative border-t border-border"
      onMouseLeave={() => setActive(null)}
    >
      {items.map((p) => {
        const isActive = active === p.slug;
        return (
          <Link
            key={p.slug}
            to="/work/$slug"
            params={{ slug: p.slug }}
            onMouseEnter={() => setActive(p.slug)}
            onFocus={() => setActive(p.slug)}
            className="group relative block border-b border-border"
          >
            <AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId="index-wash"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `linear-gradient(90deg, color-mix(in oklab, ${p.tint} 14%, transparent), transparent 65%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                />
              )}
            </AnimatePresence>

            <div className="relative mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-8 md:flex-row md:items-baseline md:gap-8 md:px-10 md:py-10">
              <span className="label w-10 shrink-0">{p.index}</span>

              <div className="flex-1">
                <h3 className="font-display text-3xl leading-none font-semibold tracking-tighter transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                  {p.name}
                </h3>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground md:mt-4">{p.oneLiner}</p>
              </div>

              <div className="flex items-baseline gap-6 md:w-[34%] md:justify-end">
                <span className="font-mono text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {p.discipline}
                </span>
                <span
                  className={`font-mono text-[0.7rem] tracking-[0.16em] uppercase ${
                    p.status === "Live" ? "text-ember" : "text-muted-foreground"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <span className="text-ember hidden text-xl opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 md:block">
                ↗
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
