import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Award,
  Users,
  Code,
  Heart,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Clock,
} from "lucide-react";
import catImg from "@/assets/cat.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reyo Studio | Modern Websites That Bring Customers" },
      {
        name: "description",
        content:
          "Reyo Studio builds modern, high-performing websites and web applications that help businesses grow online.",
      },
      { property: "og:title", content: "Reyo Studio | Modern Websites That Bring Customers" },
      {
        property: "og:description",
        content:
          "We build digital experiences that help businesses grow, connect, and succeed in the real world.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Project = {
  name: string;
  url: string;
  type: "Business Website" | "Web Application" | "AI Commerce Platform";
  category: "Websites" | "Web Applications";
  status: "Completed" | "Under Development";
  description: string;
  buttonText: string;
  bg: string;
  content: React.ReactNode;
};

const projects: Project[] = [
  {
    name: "SmileCare Dental Studio",
    url: "https://smilecare-dental-studio.vercel.app",
    type: "Business Website",
    category: "Websites",
    status: "Completed",
    description: "Modern dental clinic website focused on trust, appointments and responsive design.",
    buttonText: "Visit Website",
    bg: "bg-gradient-to-br from-[#0d9488] via-[#14b8a6] to-[#06b6d4]",
    content: (
      <div className="flex h-full w-full flex-col justify-between p-5 text-white">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-medium backdrop-blur-xs">
            <Sparkles className="h-3 w-3" /> SmileCare Clinic
          </span>
          <span className="rounded-full bg-emerald-400/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-100">
            Active
          </span>
        </div>
        <div>
          <p className="text-[17px] font-bold leading-tight">
            Gentle Care,
            <br />
            Brighter Smiles.
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2.5">
            <span className="text-[11px] font-medium text-white/90">Book Instant Appointment</span>
            <span className="rounded-md bg-white px-2.5 py-1 text-[10px] font-bold text-[#0d9488] shadow-xs">
              Book Now
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "ChatterBoxx",
    url: "https://chatterboxx.vercel.app/",
    type: "Web Application",
    category: "Web Applications",
    status: "Completed",
    description: "Modern real-time communication web application.",
    buttonText: "Visit Website",
    bg: "bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca]",
    content: (
      <div className="flex h-full w-full flex-col justify-between p-5 text-white">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[12px] font-bold tracking-wide">
            💬 ChatterBoxx
          </span>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-300 font-medium">Live Chat</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="self-start max-w-[80%] rounded-xl rounded-tl-none bg-white/15 p-2 text-[11px] leading-tight">
            Hey! Check out this real-time app 🚀
          </div>
          <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-none bg-[#6366f1] p-2 text-[11px] leading-tight font-medium">
            Super fast & crisp interface!
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Total Print Solutions",
    url: "https://totalprintsolutions.co.in",
    type: "Business Website",
    category: "Websites",
    status: "Completed",
    description: "Professional business website showcasing printing services.",
    buttonText: "Visit Website",
    bg: "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#2563eb]",
    content: (
      <div className="flex h-full w-full flex-col justify-between p-5 text-white">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-extrabold tracking-wider text-blue-300">
            TOTAL PRINT
          </span>
          <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-200">
            Official Site
          </span>
        </div>
        <div>
          <p className="text-[15px] font-bold leading-snug">
            High Quality Digital
            <br />& Offset Printing
          </p>
          <p className="mt-1 text-[11px] text-blue-200/80">Corporate Branding • Packaging • Displays</p>
        </div>
      </div>
    ),
  },
  {
    name: "Seller+",
    url: "https://seller-plus-five.vercel.app",
    type: "AI Commerce Platform",
    category: "Web Applications",
    status: "Under Development",
    description:
      "AI-powered Commerce OS for online sellers. Manage listings, analytics, automation, inventory and business growth from one dashboard.",
    buttonText: "View Progress",
    bg: "bg-gradient-to-br from-[#0f172a] via-[#1a1c2e] to-[#31103f]",
    content: (
      <div className="relative flex h-full w-full flex-col justify-between p-5 text-white overflow-hidden">
        {/* Floating subtle glowing aura */}
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-500/20 blur-xl" />

        <div className="flex items-center justify-between z-10">
          <span className="flex items-center gap-1.5 text-[13px] font-black text-amber-400">
            ⚡ Seller+
          </span>
          <span className="flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
            <Clock className="h-3 w-3" /> Under Development
          </span>
        </div>

        <div className="z-10 mt-2">
          <p className="text-[15px] font-extrabold text-white">AI-Powered Commerce OS</p>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-[9px] text-center font-medium">
            <div className="rounded bg-white/10 p-1.5">Listings 🤖</div>
            <div className="rounded bg-white/10 p-1.5">Analytics 📊</div>
            <div className="rounded bg-white/10 p-1.5">Automation ⚡</div>
          </div>
        </div>
      </div>
    ),
  },
];

const filters = ["All", "Websites", "Web Applications"] as const;
type Filter = (typeof filters)[number];

function Index() {
  const [isQR, setIsQR] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const fromQr = params.get("from") === "qr";
      setIsQR(fromQr);
      document.title = fromQr
        ? "😹 Yep... You Scanned It | Reyo Studio"
        : "Reyo Studio | Modern Websites That Bring Customers";
    }
  }, []);

  const visibleProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#f6f3ec] text-[#0f0f10]">
      <div className="mx-auto max-w-[1200px] px-6 pt-8 pb-10">
        {/* Header / Logo */}
        <header className="flex items-center justify-between">
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

          <a
            href="https://wa.me/918796244100"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#e5e0d7] bg-white px-4 py-2 text-[13px] font-medium text-[#0f0f10] shadow-xs hover:border-[#4a2fd6]/40 hover:text-[#4a2fd6] transition"
          >
            <Phone className="h-3.5 w-3.5 text-[#4a2fd6]" />
            +91 8796244100
          </a>
        </header>

        {/* Hero Section */}
        <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div className="relative">
            <span className="pointer-events-none absolute -left-4 top-24 text-[#7c5cff]">✦</span>
            <span className="pointer-events-none absolute -left-6 bottom-24 text-[#c9c1ff]">✦</span>

            {isQR ? (
              <>
                <h1 className="text-[48px] font-extrabold leading-[1.05] tracking-tight md:text-[64px]">
                  Yep... you actually{" "}
                  <span className="bg-gradient-to-r from-[#7c5cff] to-[#4a2fd6] bg-clip-text text-transparent">
                    scanned
                  </span>{" "}
                  it. <span className="align-middle">😹</span>
                </h1>
                <h2 className="mt-6 text-[22px] font-bold text-[#4a2fd6]">
                  Welcome to Reyo Studio.
                </h2>
                <p className="mt-2 text-[18px] font-semibold text-[#4a2fd6]/90">
                  Curiosity got you.
                </p>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#0f0f10]/75">
                  If a simple QR code could grab your attention... imagine what we can do for{" "}
                  <span className="font-semibold text-[#0f0f10]">your business.</span>
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#work"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4a2fd6] px-6 py-3.5 text-[15px] font-semibold text-white shadow-md hover:bg-[#3b23b3] transition"
                  >
                    View Our Work <ArrowDown className="h-4 w-4" />
                  </a>
                  <a
                    href="https://wa.me/918796244100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e5e0d7] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0f0f10] shadow-xs hover:border-[#4a2fd6]/40 hover:text-[#4a2fd6] transition"
                  >
                    Let's Talk <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-[48px] font-extrabold leading-[1.05] tracking-tight md:text-[64px]">
                  Modern Websites That Bring{" "}
                  <span className="bg-gradient-to-r from-[#7c5cff] to-[#4a2fd6] bg-clip-text text-transparent">
                    Customers
                  </span>
                  , Not Just Visitors.
                </h1>
                <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#0f0f10]/75">
                  We build modern, high-performing websites that help businesses grow online.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#work"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4a2fd6] px-6 py-3.5 text-[15px] font-semibold text-white shadow-md hover:bg-[#3b23b3] transition"
                  >
                    View Our Work <ArrowDown className="h-4 w-4" />
                  </a>
                  <a
                    href="https://wa.me/918796244100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e5e0d7] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0f0f10] shadow-xs hover:border-[#4a2fd6]/40 hover:text-[#4a2fd6] transition"
                  >
                    Book a Free Consultation <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            {/* Purple blob background */}
            <svg
              viewBox="0 0 500 500"
              className="absolute inset-0 -z-0 h-full w-full pointer-events-none"
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
            {/* Doodles */}
            <span className="absolute left-2 top-4 text-2xl text-[#7c5cff] z-20 pointer-events-none">✦</span>
            <span className="absolute right-4 top-2 text-xl text-[#c9c1ff] z-20 pointer-events-none">✦</span>
            <span className="absolute left-8 top-16 text-2xl text-[#7c5cff] z-20 pointer-events-none">╱╱</span>
            <span className="absolute right-10 top-10 text-2xl text-[#ffb020] z-20 pointer-events-none">╲╲</span>
            <span className="absolute right-0 bottom-10 text-3xl text-[#ff4d6d] z-20 pointer-events-none">〜</span>
            <span className="absolute left-4 bottom-24 text-2xl text-[#4a90ff] z-20 pointer-events-none">〰</span>
            <span className="absolute left-16 bottom-8 text-xl text-[#ff4d6d] z-20 pointer-events-none">ˇˇ</span>
          </div>
        </section>

        {/* Portfolio / Work Section */}
        <section
          id="work"
          className="mt-16 rounded-[28px] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a2fd6]">
                <span>✦</span> Our Work
              </p>
              <h2 className="text-[34px] font-extrabold leading-tight tracking-tight md:text-[38px]">
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
                    "rounded-full px-5 py-2 text-[13px] font-medium transition cursor-pointer " +
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

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {visibleProjects.map((p) => (
              <div
                key={p.name}
                className="group flex flex-col justify-between rounded-2xl border border-[#e5e0d7]/60 bg-white p-4 transition-all hover:border-[#4a2fd6]/30 hover:shadow-lg"
              >
                <div>
                  <div
                    className={`h-44 overflow-hidden rounded-xl ${p.bg} shadow-[0_4px_20px_rgba(0,0,0,0.06)] relative`}
                  >
                    {p.content}
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[17px] font-bold text-[#0f0f10]">{p.name}</h3>
                        {p.status === "Under Development" ? (
                          <span className="rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                            🚧 Under Development
                          </span>
                        ) : (
                          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-[12px] font-medium text-[#4a2fd6]">{p.type}</p>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#0f0f10]/70">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#f0ece3] pt-3 flex justify-end">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#e5e0d7] bg-[#fdfbf7] px-4 py-1.5 text-[13px] font-semibold text-[#0f0f10] transition hover:bg-[#4a2fd6] hover:text-white hover:border-[#4a2fd6]"
                  >
                    {p.buttonText} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
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

        {/* About Section */}
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
                  icon: Code,
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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-xs">
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

        {/* CTA Section */}
        <section
          id="contact"
          className="relative mt-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#5b3cf0] to-[#7c5cff] p-8 text-white"
        >
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
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-[14px] font-semibold text-white shadow-md hover:bg-[#20b858] transition"
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
                href: "https://wa.me/918796244100",
              },
              {
                icon: Mail,
                bg: "bg-[#ff4d6d]",
                title: "reyostudio.dev@gmail.com",
                sub: "Drop us an email",
                href: "mailto:reyostudio.dev@gmail.com",
              },
              {
                icon: MapPin,
                bg: "bg-[#ffb020]",
                title: "Based in India",
                sub: "Working with clients worldwide",
                href: null,
              },
            ].map((c) => (
              <div key={c.title} className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${c.bg} text-white`}
                >
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[14px] font-semibold hover:text-[#4a2fd6] transition"
                    >
                      {c.title}
                    </a>
                  ) : (
                    <p className="text-[14px] font-semibold">{c.title}</p>
                  )}
                  <p className="text-[12px] text-[#0f0f10]/60">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[12px] text-[#0f0f10]/55">
            © {new Date().getFullYear()} Reyo Studio. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
