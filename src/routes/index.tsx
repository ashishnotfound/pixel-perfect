import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Award,
  Users,
  Code2,
  Heart,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import catImg from "@/assets/cat.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reyo Studio — Websites & Apps built with love" },
      {
        name: "description",
        content:
          "Reyo Studio designs and builds modern websites, web applications and mobile apps that help businesses grow, connect and succeed.",
      },
      { property: "og:title", content: "Reyo Studio — Websites & Apps built with love" },
      {
        property: "og:description",
        content:
          "We build digital experiences that help businesses grow, connect and succeed in the real world.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Project = {
  name: string;
  type: "Website" | "Web Application" | "Mobile App";
  category: "Websites" | "Web Applications" | "Mobile Apps";
  bg: string;
  content: React.ReactNode;
};

const projects: Project[] = [
  {
    name: "hexa labs",
    type: "Website",
    category: "Websites",
    bg: "bg-[#0f0f10]",
    content: (
      <div className="flex h-full w-full items-center justify-between px-6 py-6 text-white">
        <div>
          <p className="text-[15px] font-semibold leading-tight">
            Elevating Brands
            <br />
            Through Design
            <br />& Technology
          </p>
          <span className="mt-4 inline-block rounded-full bg-[#f5b544] px-3 py-1 text-[10px] font-medium text-black">
            Get Started
          </span>
        </div>
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-white/10 to-white/0 blur-sm" />
      </div>
    ),
  },
  {
    name: "greenova",
    type: "Website",
    category: "Websites",
    bg: "bg-[#f4f1ea]",
    content: (
      <div className="flex h-full w-full items-center justify-between px-6 py-6 text-[#1e3a2a]">
        <div>
          <p className="text-[15px] font-semibold leading-tight">
            Plant care
            <br />
            made easy.
          </p>
          <span className="mt-4 inline-block rounded-full bg-[#1e3a2a] px-3 py-1 text-[10px] font-medium text-white">
            Save Water
          </span>
        </div>
        <div className="text-3xl">🌿</div>
      </div>
    ),
  },
  {
    name: "novus agency",
    type: "Website",
    category: "Websites",
    bg: "bg-[#0f0f10]",
    content: (
      <div className="flex h-full w-full items-center justify-between px-6 py-6 text-white">
        <div>
          <p className="text-[15px] font-bold leading-tight tracking-tight">
            WHERE IDEAS
            <br />
            TURN INTO
            <br />
            IMPACT
          </p>
          <span className="mt-4 inline-block rounded-full bg-[#ff4d6d] px-3 py-1 text-[10px] font-medium text-white">
            Explore Now
          </span>
        </div>
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#ff7a45] to-[#c92a6b]" />
      </div>
    ),
  },
  {
    name: "fittrack",
    type: "Mobile App",
    category: "Mobile Apps",
    bg: "bg-gradient-to-br from-[#efeaff] to-[#e6dfff]",
    content: (
      <div className="flex h-full w-full items-center justify-center gap-3 px-4 py-4">
        <div className="h-full w-24 rounded-xl bg-white shadow-md p-2 text-[8px]">
          <p className="font-bold text-[#3a2a6b]">Track.</p>
          <p className="font-bold text-[#3a2a6b]">Analyze.</p>
          <p className="font-bold text-[#3a2a6b]">Improve.</p>
        </div>
        <div className="h-full w-24 rounded-xl bg-[#1a1633] shadow-md p-2 text-[8px] text-white">
          <p className="font-semibold">Workout</p>
          <div className="mt-2 h-8 rounded bg-white/10" />
          <div className="mt-1 h-8 rounded bg-[#ff7a45]/70" />
        </div>
      </div>
    ),
  },
  {
    name: "finova dashboard",
    type: "Web Application",
    category: "Web Applications",
    bg: "bg-[#0f0f10]",
    content: (
      <div className="flex h-full w-full flex-col justify-between px-6 py-5 text-white">
        <div className="flex items-center justify-between">
          <span className="text-[10px] opacity-60">finovapp</span>
          <span className="text-[10px] opacity-60">•••</span>
        </div>
        <div>
          <p className="text-2xl font-bold">$24,850</p>
          <div className="mt-3 h-12 w-full bg-gradient-to-t from-[#7c5cff]/40 to-transparent rounded" />
        </div>
        <span className="self-end rounded-full bg-[#7c5cff] px-3 py-1 text-[10px] font-medium">
          Pricing
        </span>
      </div>
    ),
  },
  {
    name: "roamly",
    type: "Mobile App",
    category: "Mobile Apps",
    bg: "bg-[#0f0f10]",
    content: (
      <div className="flex h-full w-full items-center justify-center gap-3 px-4 py-4">
        <div className="h-full w-24 rounded-xl bg-[#1a1633] p-2 text-[8px] text-white">
          <p className="font-semibold">Discover Your Next Adventure</p>
          <div className="mt-2 h-10 rounded bg-gradient-to-br from-orange-400 to-red-500" />
        </div>
        <div className="h-full w-24 rounded-xl bg-[#1a1633] p-2 text-[8px] text-white">
          <p className="font-semibold">Descoveries</p>
          <div className="mt-2 grid grid-cols-2 gap-1">
            <div className="h-6 rounded bg-gradient-to-br from-red-400 to-orange-500" />
            <div className="h-6 rounded bg-gradient-to-br from-orange-400 to-yellow-500" />
          </div>
        </div>
      </div>
    ),
  },
];

const filters = ["All", "Websites", "Web Applications", "Mobile Apps"] as const;
type Filter = (typeof filters)[number];

function Index() {
  const [fromQr, setFromQr] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFromQr(params.get("from") === "qr");
  }, []);

  const visibleProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#f6f3ec] text-[#0f0f10]">
      <div className="mx-auto max-w-[1200px] px-6 pt-8 pb-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md">
            <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
              <path
                d="M8 6 h14 a10 10 0 0 1 0 20 h-8 l14 8"
                stroke="url(#reyoGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <defs>
                <linearGradient id="reyoGrad" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0" stopColor="#7c5cff" />
                  <stop offset="1" stopColor="#4a2fd6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="leading-none">
            <p className="text-[13px] font-bold tracking-[0.2em]">REYO</p>
            <p className="text-[10px] font-medium tracking-[0.35em] text-[#0f0f10]/70">STUDIO</p>
          </div>
        </div>

        {/* Hero */}
        <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div className="relative">
            <span className="pointer-events-none absolute -left-4 top-24 text-[#7c5cff]">✦</span>
            <span className="pointer-events-none absolute -left-6 bottom-24 text-[#c9c1ff]">✦</span>

            {fromQr ? (
              <>
                <h1 className="text-[56px] font-extrabold leading-[1.02] tracking-tight md:text-[68px]">
                  Yep... you actually{" "}
                  <span className="bg-gradient-to-r from-[#7c5cff] to-[#4a2fd6] bg-clip-text text-transparent">
                    scanned
                  </span>{" "}
                  it. <span className="align-middle">😹</span>
                </h1>
                <p className="mt-6 text-[20px] font-bold text-[#4a2fd6]">
                  Welcome to Reyo Studio.
                </p>
                <p className="mt-3 text-[17px] font-semibold text-[#4a2fd6]">
                  Curiosity got you.
                </p>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#0f0f10]/70">
                  If a simple QR code could grab your attention... imagine what we can do for{" "}
                  <span className="font-semibold text-[#0f0f10]">your business.</span>
                </p>
              </>
            ) : (
              <>
                <h1 className="text-[56px] font-extrabold leading-[1.02] tracking-tight md:text-[68px]">
                  Yep... you{" "}
                  <span className="bg-gradient-to-r from-[#7c5cff] to-[#4a2fd6] bg-clip-text text-transparent">
                    scanned
                  </span>{" "}
                  it. <span className="align-middle">😺</span>
                </h1>
                <p className="mt-6 text-[20px] font-bold text-[#4a2fd6]">
                  Curiosity got you.
                </p>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#0f0f10]/70">
                  If a simple QR code could grab your attention... imagine what we can do for{" "}
                  <span className="font-semibold text-[#0f0f10]">your business.</span>
                </p>
              </>
            )}

            <a
              href="#work"
              className="mt-10 inline-flex items-center gap-3 text-[15px] font-medium text-[#0f0f10] hover:text-[#4a2fd6]"
            >
              <ArrowDown className="h-4 w-4" />
              check our work
            </a>
          </div>

          <div className="relative">
            {/* soft purple blob behind cat */}
            <svg
              viewBox="0 0 500 500"
              className="absolute inset-0 -z-0 h-full w-full"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <path
                fill="#d9c9ff"
                opacity="0.55"
                d="M395,120 C455,170 470,260 430,330 C395,395 315,430 240,415 C165,400 95,355 80,285 C65,215 115,140 190,105 C270,68 340,75 395,120 Z"
              />
            </svg>
            <img
              src={catImg}
              alt="Curious cat sticking out its tongue"
              className="relative z-10 mx-auto w-full max-w-[520px] object-contain"
            />
            {/* doodles */}
            <span className="absolute left-2 top-4 text-2xl text-[#7c5cff] z-20">✦</span>
            <span className="absolute right-4 top-2 text-xl text-[#c9c1ff] z-20">✦</span>
            <span className="absolute left-8 top-16 text-2xl text-[#7c5cff] z-20">╱╱</span>
            <span className="absolute right-10 top-10 text-2xl text-[#ffb020] z-20">╲╲</span>
            <span className="absolute right-0 bottom-10 text-3xl text-[#ff4d6d] z-20">〜</span>
            <span className="absolute left-4 bottom-24 text-2xl text-[#4a90ff] z-20">〰</span>
            <span className="absolute left-16 bottom-8 text-xl text-[#ff4d6d] z-20">ˇˇ</span>
          </div>

        </section>

        {/* Work */}
        <section
          id="work"
          className="mt-14 rounded-[28px] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a2fd6]">
                <span>✦</span> Our Work
              </p>
              <h2 className="text-[36px] font-extrabold leading-tight tracking-tight">
                Websites &amp; Apps
                <br />
                we've built with{" "}
                <span className="text-[#ff4d6d]">love</span>.{" "}
                <span className="align-middle">😍</span>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={
                    "rounded-full px-5 py-2 text-[13px] font-medium transition " +
                    (filter === f
                      ? "bg-[#4a2fd6] text-white shadow-md"
                      : "border border-[#e5e0d7] bg-white text-[#0f0f10] hover:border-[#4a2fd6]/30")
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {visibleProjects.map((p) => (
              <div key={p.name}>
                <div
                  className={`h-40 overflow-hidden rounded-2xl ${p.bg} shadow-[0_4px_20px_rgba(0,0,0,0.06)]`}
                >
                  {p.content}
                </div>
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <p className="text-[15px] font-semibold">{p.name}</p>
                    <p className="text-[12px] text-[#0f0f10]/60">{p.type}</p>
                  </div>
                  <button className="text-[#4a2fd6]">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e5e0d7] bg-white px-5 py-2 text-[13px] text-[#0f0f10]/70">
              <span className="text-[#4a2fd6]">✦</span> more projects coming soon...
            </span>
          </div>
        </section>

        {/* About */}
        <section className="mt-8 rounded-[28px] bg-[#f4efe2] p-8">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a2fd6]">
            About Us
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none">
                  <path
                    d="M8 6 h14 a10 10 0 0 1 0 20 h-8 l14 8"
                    stroke="url(#reyoGrad2)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="reyoGrad2" x1="0" y1="0" x2="40" y2="40">
                      <stop offset="0" stopColor="#7c5cff" />
                      <stop offset="1" stopColor="#4a2fd6" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="text-[22px] font-bold">reyo studio</p>
              </div>
              <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-[#0f0f10]/75">
                We don't just build websites or apps, we build digital experiences that help
                businesses <span className="font-semibold text-[#4a2fd6]">grow</span>,{" "}
                <span className="font-semibold text-[#ff4d6d]">connect</span> and{" "}
                <span className="font-semibold text-[#4a2fd6]">succeed</span> in the real world.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                {
                  icon: Award,
                  title: "2–6 Years of Experience",
                  desc: "Delivering quality digital solutions across industries.",
                },
                {
                  icon: Users,
                  title: "Client Focused",
                  desc: "We listen, we understand and we deliver.",
                },
                {
                  icon: Code2,
                  title: "Modern & Scalable",
                  desc: "Clean code, smooth design and future ready solutions.",
                },
                {
                  icon: Heart,
                  title: "Here to Serve",
                  desc: "We're here to make your business better, always.",
                },
              ].map((f) => (
                <div key={f.title} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <f.icon className="h-5 w-5 text-[#4a2fd6]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold">{f.title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-[#0f0f10]/65">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative mt-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#5b3cf0] to-[#7c5cff] p-8 text-white">
          <span className="absolute left-6 top-6 text-lg opacity-70">✦</span>
          <span className="absolute right-64 top-4 text-lg opacity-60">✦</span>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h3 className="text-[32px] font-extrabold leading-tight">
                Still thinking?
                <br />
                Your <span className="text-[#ffd75e]">competitor</span> isn't.{" "}
                <span className="align-middle">😉</span>
              </h3>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/85">
                Every day without a great website is another day someone else gets the customer.
              </p>
              <p className="mt-5 text-[18px] font-bold">Give Reyo Studio a call.</p>
              <p className="mt-1 text-[14px] text-white/85">
                Let's build something people actually{" "}
                <span className="font-semibold text-[#ffd75e]">remember</span>.
              </p>
            </div>
            <div className="relative rounded-2xl bg-white p-6 text-[#0f0f10] shadow-xl">
              <div className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-[#25D366] shadow-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <p className="mt-3 text-center text-[20px] font-bold">Let's talk on WhatsApp</p>
              <p className="mt-2 text-center text-[13px] text-[#0f0f10]/65">
                Quick replies. Real conversations.
                <br />
                Actual results.
              </p>
              <a
                href="https://wa.me/918796244100"
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-[14px] font-semibold text-white shadow-md hover:bg-[#20b858]"
              >
                Chat on WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3 text-center text-[13px] font-medium text-[#0f0f10]/75">
                +91 8796244100
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10">
          <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 md:grid-cols-3">
            {[
              {
                icon: Phone,
                bg: "bg-[#7c5cff]",
                title: "+91 8796244100",
                sub: "Call / WhatsApp",
              },
              {
                icon: Mail,
                bg: "bg-[#ff4d6d]",
                title: "reyostudio.dev@gmail.com",
                sub: "Drop us an email",
              },
              {
                icon: MapPin,
                bg: "bg-[#ffb020]",
                title: "Based in India",
                sub: "Working with clients worldwide",
              },
            ].map((c) => (
              <div key={c.title} className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${c.bg} text-white`}
                >
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold">{c.title}</p>
                  <p className="text-[12px] text-[#0f0f10]/60">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[12px] text-[#0f0f10]/55">
            © 2025 Reyo Studio. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
