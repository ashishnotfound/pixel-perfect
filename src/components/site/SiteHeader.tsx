import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const nav = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/studio", label: "Studio" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-background/80 border-b border-border backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link to="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-lg font-semibold tracking-tight">REYO</span>
          <span className="label text-[0.6rem]">Studio</span>
          <span className="bg-ember ml-1 inline-block h-1.5 w-1.5 rounded-full transition-transform duration-500 group-hover:scale-150" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-underline font-mono text-xs tracking-[0.18em] uppercase transition-colors hover:text-foreground text-muted-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="border-ember text-ember hover:bg-ember hover:text-primary-foreground rounded-full border px-5 py-2 font-mono text-xs tracking-[0.18em] uppercase transition-colors duration-300"
          >
            Start a project
          </Link>
        </nav>

        <button
          className="label text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="bg-background border-t border-border md:hidden">
          <div className="flex flex-col px-5 py-4">
            {[...nav].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-display border-b border-border py-4 text-3xl tracking-tight last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
