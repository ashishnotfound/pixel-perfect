import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RevealLines } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Start a project with Reyo Studio" },
      {
        name: "description",
        content:
          "Tell Reyo Studio what you're building. Product builds, platform rebuilds and long-term partnerships across web, mobile, SaaS and AI.",
      },
      { property: "og:title", content: "Contact — Reyo Studio" },
      {
        property: "og:description",
        content: "Tell us what you're building. We'll tell you honestly whether we're the right studio.",
      },
    ],
  }),
  component: Contact,
});

const scopes = [
  "Website",
  "Web Application",
  "Mobile App",
  "SaaS Platform",
  "AI Product",
  "E-Commerce",
  "Branding / UI System",
  "Internal Software",
  "Not sure yet",
];

function Contact() {
  const [scope, setScope] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", company: "", brief: "" });

  const toggle = (s: string) =>
    setScope((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const mailto = `mailto:reyostudio.dev@gmail.com?subject=${encodeURIComponent(
    `New project — ${form.company || form.name || "Enquiry"}`,
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nScope: ${
      scope.join(", ") || "—"
    }\n\nBrief:\n${form.brief}`,
  )}`;

  return (
    <section className="mx-auto max-w-[1600px] px-5 pt-36 pb-24 md:px-10 md:pt-52 md:pb-32">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label">Contact</p>
          <h1 className="font-display mt-6 text-[13vw] leading-[0.84] font-semibold tracking-tighter md:text-[5.5vw]">
            <RevealLines lines={["Tell us what"]} />
            <span className="text-ember block">
              <RevealLines lines={["you're building."]} />
            </span>
          </h1>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Send the real brief — the messy version is fine. We reply within two working days, and we
            will say so plainly if we&apos;re not the right studio for it.
          </p>
          <div className="mt-12 space-y-8">
            <div className="space-y-3">
              <p className="label">Email</p>
              <a
                href="mailto:reyostudio.dev@gmail.com"
                className="link-underline font-display block text-2xl tracking-tight md:text-3xl"
              >
                reyostudio.dev@gmail.com
              </a>
            </div>
            <div className="space-y-3">
              <p className="label">WhatsApp</p>
              <a
                href="https://wa.me/918796244100"
                target="_blank"
                rel="noreferrer"
                className="link-underline font-display block text-2xl tracking-tight md:text-3xl"
              >
                +91 87962 44100
              </a>
            </div>
          </div>
        </div>

        <form
          className="md:col-span-7"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto;
          }}
        >
          <div className="grid divide-y divide-border">
            {[
              { k: "name", label: "Your name", type: "text", required: true },
              { k: "email", label: "Email", type: "email", required: true },
              { k: "company", label: "Company / product", type: "text", required: false },
            ].map((f) => (
              <div key={f.k} className="bg-background py-5">
                <label htmlFor={f.k} className="label">
                  {f.label}
                </label>
                <input
                  id={f.k}
                  type={f.type}
                  required={f.required}
                  value={form[f.k as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="focus:border-ember mt-3 w-full border-b border-border bg-transparent pb-3 font-display text-2xl tracking-tight outline-none transition-colors placeholder:text-muted-foreground/40 md:text-3xl"
                  placeholder="—"
                />
              </div>
            ))}
          </div>

          <fieldset className="mt-10">
            <legend className="label">Scope</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {scopes.map((s) => {
                const on = scope.includes(s);
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggle(s)}
                    aria-pressed={on}
                    className={`rounded-full border px-4 py-2 font-mono text-[0.65rem] tracking-[0.12em] uppercase transition-colors duration-300 ${
                      on
                        ? "border-ember bg-ember text-primary-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-10">
            <label htmlFor="brief" className="label">
              The brief
            </label>
            <textarea
              id="brief"
              rows={5}
              value={form.brief}
              onChange={(e) => setForm({ ...form, brief: e.target.value })}
              className="focus:border-ember mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-base leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/40"
              placeholder="What are you building, who is it for, and what has to be true for it to work?"
            />
          </div>

          <button
            type="submit"
            className="bg-ember text-primary-foreground hover:bg-ember-soft mt-12 w-full rounded-full px-8 py-4 font-mono text-xs tracking-[0.18em] uppercase transition-colors md:w-auto"
          >
            Send the brief →
          </button>
        </form>
      </div>
    </section>
  );
}
