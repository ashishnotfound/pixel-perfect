export type Project = {
  slug: string;
  name: string;
  client: string;
  discipline: string;
  year: string;
  status: "Live" | "In development";
  url: string;
  oneLiner: string;
  tint: string;
  index: string;
  brief: string;
  approach: string[];
  build: string[];
  outcome: string;
  stack: string[];
  signals: { k: string; v: string }[];
};

export const projects: Project[] = [
  {
    slug: "sellerplus",
    name: "Seller+",
    client: "Seller+",
    discipline: "SaaS Platform · AI Product",
    year: "2025",
    status: "In development",
    url: "https://seller-plus-five.vercel.app/",
    index: "01",
    tint: "oklch(0.68 0.2 42)",
    oneLiner: "An AI commerce operating system that replaces a seller's entire tool stack.",
    brief:
      "Multi-marketplace sellers run their business across Amazon, Flipkart, Meesho and Shopify with one spreadsheet, three subscriptions and no single source of truth. Seller+ was briefed as the operating system that collapses that stack: catalog, profitability, keyword research and automation inside one workspace.",
    approach: [
      "Modelled the product around a Master SKU — one catalog record that binds an ASIN, a Flipkart listing, a Meesho catalog and a Shopify variant, so every downstream view resolves to the same object.",
      "Designed an AI surface that returns numbers, not prose: the Listing Judge scores conversion, keyword relevancy and imagery with granular, actionable notes.",
      "Built profitability as first-class UI — commissions, shipping, ad spend and GST are broken out rather than buried in an export.",
    ],
    build: [
      "Gemini-driven keyword engine tuned for Indian search behaviour and marketplace-specific indexing.",
      "Automation engine with trigger/action rules: pause out-of-stock listings, shift price bands, raise margin alerts.",
      "Row-level security, granular team permissions, MFA and full action audit logs from day one.",
      "Tiered plan architecture with metered AI generations, from a free tier through to scaled workspaces.",
    ],
    outcome:
      "A platform that reads as enterprise software while staying usable by a solo seller on a phone — currently in active development toward public launch.",
    stack: ["Next.js", "Postgres", "Row-Level Security", "Gemini", "Realtime sync"],
    signals: [
      { k: "Surface", v: "Multi-marketplace" },
      { k: "AI", v: "Listing Judge™" },
      { k: "Security", v: "RLS + MFA" },
    ],
  },
  {
    slug: "smilecare",
    name: "SmileCare Dental Studio",
    client: "SmileCare Dental Studio",
    discipline: "Healthcare Website · Booking",
    year: "2025",
    status: "Live",
    url: "https://smilecare-dental-studio.vercel.app/",
    index: "02",
    tint: "oklch(0.72 0.12 210)",
    oneLiner: "A clinic site engineered to convert anxiety into a booked appointment.",
    brief:
      "Dental patients don't compare features, they compare comfort. SmileCare needed a site where a nervous first-time visitor could understand the treatment, trust the practitioner and book — without ever needing to call.",
    approach: [
      "Led with the practitioner, not the practice: Dr. Aisha Sharma and the team carry the trust signal, supported by real experience and rating markers.",
      "Wrote every service card in patient language — 'pain-free therapy that saves your natural tooth' rather than clinical taxonomy.",
      "Kept the emergency path permanently reachable: same-day appointments and an after-hours line surface above the fold and persist through the journey.",
    ],
    build: [
      "Dedicated appointment flow separated from the marketing pages so booking never competes with browsing.",
      "Deep-linked service anchors so an ad or a referral can land a patient directly on implants, root canal or aligners.",
      "Responsive-first layout: the majority of clinic traffic arrives on a phone, so the phone layout was designed before the desktop one.",
    ],
    outcome:
      "A live clinic presence where the shortest path on every screen leads to a booked chair.",
    stack: ["React", "Responsive system", "Appointment flow", "Deep-linked services"],
    signals: [
      { k: "Focus", v: "Booking conversion" },
      { k: "Primary device", v: "Mobile" },
      { k: "Status", v: "Live" },
    ],
  },
  {
    slug: "chatterbox",
    name: "ChatterBox",
    client: "ChatterBox",
    discipline: "Web Application · Realtime",
    year: "2025",
    status: "Live",
    url: "https://chatterboxx.vercel.app/",
    index: "03",
    tint: "oklch(0.7 0.14 300)",
    oneLiner: "Realtime messaging that behaves identically on web and Android.",
    brief:
      "A chat product lives or dies on latency and on the first thirty seconds. ChatterBox needed instant delivery, a sign-up that never stalls, and a personality that survives the jump from browser to installed app.",
    approach: [
      "Treated authentication as part of the product, not a gate: Google sign-in alongside email, with sign-in and sign-up sharing one continuous panel rather than two disconnected pages.",
      "Built theming into the core so users can reshape the interface — a low-cost, high-retention lever in a social product.",
      "Kept the interface deliberately light so the realtime layer, not the chrome, defines the perceived speed.",
    ],
    build: [
      "Realtime message transport with optimistic sending and live presence.",
      "Cross-surface parity between the web app and a distributable Android APK.",
      "Theme system with premium tiers layered on top of the free experience.",
    ],
    outcome: "A shipped realtime app that feels instant on first message and installs as a phone app.",
    stack: ["React", "Realtime sockets", "OAuth", "Android APK"],
    signals: [
      { k: "Latency", v: "Realtime" },
      { k: "Surfaces", v: "Web + Android" },
      { k: "Auth", v: "Google + email" },
    ],
  },
  {
    slug: "commerce",
    name: "Wear The Silence",
    client: "E-Commerce Platform",
    discipline: "E-Commerce · Brand System",
    year: "2025",
    status: "Live",
    url: "https://e-commerce-p-five.vercel.app/",
    index: "04",
    tint: "oklch(0.85 0.02 85)",
    oneLiner: "An apparel storefront where the brand voice does the selling.",
    brief:
      "A heavyweight-cotton apparel label needed a store that reads as a fashion house rather than a product grid — restrained, editorial, and still ruthlessly efficient at moving a shopper from browse to bag.",
    approach: [
      "Anchored the store on a single editorial line — 'Wear the silence' — and let material facts (organic Pima, 220–300 GSM, fair-trade studios) carry the credibility instead of marketing adjectives.",
      "Designed product cards with dual imagery and inline add-to-bag so the shopper never loses the grid to reach the cart.",
      "Made merchandising navigable by fit and category, not by an exhaustive filter panel.",
    ],
    build: [
      "Catalog architecture with category routing, discount states and per-product detail pages.",
      "Cart and promotion mechanics including first-order code handling and free-shipping thresholds.",
      "Image-forward responsive grid tuned for fast perceived load on mobile connections.",
    ],
    outcome: "A storefront that behaves like a brand campaign and converts like a shop.",
    stack: ["React", "Catalog routing", "Cart + promotions", "Editorial design system"],
    signals: [
      { k: "Model", v: "Direct-to-consumer" },
      { k: "Merchandising", v: "Fit-led" },
      { k: "Status", v: "Live" },
    ],
  },
  {
    slug: "total-print",
    name: "Total Print Solutions",
    client: "Total Print Solutions · Noida",
    discipline: "Business Website · CMS",
    year: "2025",
    status: "Live",
    url: "https://totalprintsolutions.co.in/",
    index: "05",
    tint: "oklch(0.74 0.13 145)",
    oneLiner: "A physical print house translated into a browsable digital catalog.",
    brief:
      "Established in 2016 and serving over 500 corporate clients, Total Print Solutions was winning work on relationships and losing it on discoverability. The site had to make a tactile, quote-driven business explorable online.",
    approach: [
      "Structured the offer as a real product taxonomy — signage, large format, packaging, promotional, digital print, finishing — so a procurement manager can find their exact requirement in two clicks.",
      "Made the quote request the single dominant action; every category page terminates in it.",
      "Used the studio's own output as the imagery, so the site is a proof reel rather than a stock-photo brochure.",
    ],
    build: [
      "Category and sub-category routing across the full product range with individual detail views.",
      "Media-backed CMS so the team publishes new work without touching code.",
      "Performance-tuned image pipeline for a heavily visual, image-dense catalog.",
    ],
    outcome:
      "A live catalog that lets a nine-year-old print business be evaluated and quoted before the first phone call.",
    stack: ["Next.js", "Supabase storage", "CMS-driven catalog", "Image optimisation"],
    signals: [
      { k: "Established", v: "2016" },
      { k: "Clients", v: "500+" },
      { k: "Content", v: "Team-editable" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const capabilities = [
  {
    title: "Product Engineering",
    body: "Web applications, SaaS platforms, dashboards and internal business software — architected for the day the user count multiplies.",
    items: ["Web Applications", "SaaS Platforms", "Dashboards", "Internal Tools", "Automation Systems"],
  },
  {
    title: "Interfaces & Identity",
    body: "Brand systems and UI/UX foundations built as living design systems, not static files handed over and forgotten.",
    items: ["Branding", "UI/UX Systems", "Product Design", "Design Systems", "Interactive Experiences"],
  },
  {
    title: "Commerce & Web",
    body: "Storefronts, marketing sites and landing pages where every pixel is accountable to a conversion.",
    items: ["E-Commerce", "Marketing Websites", "Landing Pages", "Business Websites"],
  },
  {
    title: "Intelligence & Reach",
    body: "AI products, mobile applications and the content engine that keeps them in front of the right people.",
    items: ["AI Products", "Mobile Applications", "Digital Marketing", "Social Media", "Creative Content"],
  },
];
