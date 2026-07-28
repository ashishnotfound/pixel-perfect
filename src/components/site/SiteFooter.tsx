import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="edge grain relative overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label">Next</p>
            <Link to="/contact" className="group mt-5 block">
              <h2 className="font-display text-[13vw] leading-[0.85] font-semibold tracking-tighter md:text-[7vw]">
                Let&apos;s build
                <span className="text-ember group-hover:text-ember-soft transition-colors duration-500">
                  {" "}
                  something
                </span>
                <br />
                worth remembering.
              </h2>
            </Link>
          </div>
          <div className="grid gap-10 md:col-span-5 md:grid-cols-2">
            <div>
              <p className="label">Navigate</p>
              <ul className="mt-5 space-y-2.5">
                {[
                  { to: "/", label: "Index" },
                  { to: "/work", label: "Work" },
                  { to: "/services", label: "Services" },
                  { to: "/studio", label: "Studio" },
                  { to: "/contact", label: "Contact" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="link-underline text-sm text-muted-foreground hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label">Direct</p>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li>
                  <p className="mb-1 text-xs text-muted-foreground/60 uppercase tracking-wider">Email</p>
                  <a href="mailto:reyostudio.dev@gmail.com" className="link-underline hover:text-foreground">
                    reyostudio.dev@gmail.com
                  </a>
                </li>
                <li>
                  <p className="mb-1 text-xs text-muted-foreground/60 uppercase tracking-wider">WhatsApp</p>
                  <a href="https://wa.me/918796244100" target="_blank" rel="noreferrer" className="link-underline hover:text-foreground">
                    +91 87962 44100
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="edge mt-20 flex flex-col gap-3 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="label">© {year} Reyo Studio — Creative technology</p>
          <p className="label">Design · Engineering · Launch · Evolve</p>
        </div>
      </div>
    </footer>
  );
}
