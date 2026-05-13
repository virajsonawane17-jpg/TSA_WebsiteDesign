import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import {
  Code2, Globe, Database, Palette, MapPin, Rss,
  Image as ImageIcon, Type, Cpu, Package, Shield,
  ExternalLink,
} from "lucide-react";
import { DocViewerSection } from "@/components/doc-viewer-section";

/* ─── Reference item shape ─── */
interface RefItem {
  name: string;
  version?: string;
  license?: string;
  url: string;
  description: string;
  role: string;
}

/* ─── Section data ─── */
const framework: RefItem[] = [
  {
    name: "Next.js 15",
    version: "^15.5.7",
    license: "MIT",
    url: "https://nextjs.org",
    description: "The React framework powering the entire site. Uses the App Router for file-based routing, server components for fast data fetching (events/news from Tampa.gov), and Turbopack for instant HMR in development.",
    role: "Core framework — SSR, SSG, routing, API routes",
  },
  {
    name: "React 19",
    version: "19.2.0",
    license: "MIT",
    url: "https://react.dev",
    description: "The UI component library. All interactive pages (directory search, events calendar, insights charts) are built as React components. React 19 brings improved server actions and concurrent rendering.",
    role: "UI component layer",
  },
  {
    name: "TypeScript 5",
    version: "^5",
    license: "Apache 2.0",
    url: "https://www.typescriptlang.org",
    description: "Adds static typing across the entire codebase. All resource, event, and news data shapes are type-checked, eliminating runtime bugs from mismatched API responses.",
    role: "Type-safe JavaScript throughout the project",
  },
];

const styling: RefItem[] = [
  {
    name: "Tailwind CSS v4",
    version: "^4",
    license: "MIT",
    url: "https://tailwindcss.com",
    description: "Utility-first CSS framework used for layout, spacing, and responsive design. The custom Tampa warm-coastal palette (coral, teal, cream, sand) is wired into Tailwind's theme via CSS custom properties in globals.css.",
    role: "Utility styling and responsive layout",
  },
  {
    name: "tw-animate-css",
    version: "^1.4.0",
    license: "MIT",
    url: "https://github.com/jamiebuilds/tailwindcss-animate",
    description: "Provides Tailwind-compatible animation utility classes. Used for entry animations on modal dialogs, dropdowns, and the reveal scroll-fade effect.",
    role: "CSS animation utilities",
  },
  {
    name: "Custom Tampa Design System",
    version: "Internal",
    url: "#",
    description: "A hand-crafted design system defined in globals.css. Includes the warm coastal palette (--coral #e85a3a, --teal #2d8a8a, --cream, --sand, --sun), typography scale, shadow tokens, border-radius tokens, and all custom component classes (spotlight, stats-band, cat-grid, news-card, calendar, etc.).",
    role: "Brand identity and all visual component styles",
  },
  {
    name: "PostCSS v4",
    version: "^4",
    license: "MIT",
    url: "https://postcss.org",
    description: "Processes Tailwind CSS directives at build time. Configured via postcss.config.mjs to transform @tailwind and @apply directives into plain CSS for the browser.",
    role: "CSS build pipeline / Tailwind processor",
  },
];

const uiLibs: RefItem[] = [
  {
    name: "Radix UI Primitives",
    version: "various ^1–2",
    license: "MIT",
    url: "https://www.radix-ui.com",
    description: "A suite of 20+ unstyled, accessible UI primitives (accordion, dialog, tooltip, select, tabs, checkbox, radio-group, scroll-area, popover, dropdown-menu, and more). Provides WAI-ARIA compliance without requiring us to implement keyboard navigation from scratch.",
    role: "Accessible headless component primitives",
  },
  {
    name: "shadcn/ui",
    version: "components.json",
    license: "MIT",
    url: "https://ui.shadcn.com",
    description: "Pre-built components layered on top of Radix UI with class-variance-authority (CVA) styling. Used for the command palette (cmdk), date picker (react-day-picker), OTP input, and other higher-level UI elements.",
    role: "Styled component library built on Radix",
  },
  {
    name: "Lucide React",
    version: "^0.554.0",
    license: "ISC",
    url: "https://lucide.dev",
    description: "Open-source icon library with 1000+ consistent SVG icons. Used throughout the site for navigation (ArrowRight, Menu), resource cards (MapPin, Phone, Globe), category icons (Utensils, Heart, Home, Book), and UI indicators (TrendingUp, RefreshCw, CalendarDays).",
    role: "Icon system across every page",
  },
  {
    name: "Framer Motion",
    version: "^12.23.24",
    license: "MIT",
    url: "https://www.framer.com/motion",
    description: "Production-grade motion library for React. Powers the hover-glow button's cursor-following radial glow effect and could be extended for page transitions. Provides physics-based spring animations for a polished feel.",
    role: "Animation and gesture library",
  },
  {
    name: "class-variance-authority (CVA)",
    version: "^0.7.1",
    license: "Apache 2.0",
    url: "https://cva.style",
    description: "Type-safe variant management for component styling. Used internally by shadcn/ui components to manage size, color, and state variants without string concatenation.",
    role: "Component variant management",
  },
  {
    name: "tailwind-merge",
    version: "^3.4.0",
    license: "MIT",
    url: "https://github.com/dcastil/tailwind-merge",
    description: "Intelligently merges conflicting Tailwind class names. Prevents duplicate utility classes when combining conditional classes in component props.",
    role: "Tailwind class deduplication utility",
  },
  {
    name: "Sonner",
    version: "^2.0.7",
    license: "MIT",
    url: "https://sonner.emilkowal.ski",
    description: "Elegant toast notification library. Used for user-facing feedback messages (e.g., when sharing a resource link to the clipboard on the directory page).",
    role: "Toast / notification system",
  },
  {
    name: "Embla Carousel React",
    version: "^8.6.0",
    license: "MIT",
    url: "https://www.embla-carousel.com",
    description: "Lightweight, accessible carousel/slider component. Available for use in event galleries or featured resource slideshows.",
    role: "Carousel component",
  },
  {
    name: "Recharts",
    version: "^2.15.4",
    license: "MIT",
    url: "https://recharts.org",
    description: "React-native charting library. Used on the Insights page for visualizing category distributions. Supports responsive SVG charts out of the box.",
    role: "Data visualization / charts",
  },
];

const mapping: RefItem[] = [
  {
    name: "Leaflet",
    version: "^1.9.4",
    license: "BSD 2-Clause",
    url: "https://leafletjs.com",
    description: "The leading open-source JavaScript mapping library. Powers the interactive resource map on the directory page — renders markers for each of the 12 partner organizations with their geographic coordinates.",
    role: "Interactive map engine",
  },
  {
    name: "React Leaflet",
    version: "^5.0.0",
    license: "Hippocratic 3.0",
    url: "https://react-leaflet.js.org",
    description: "React bindings for Leaflet. Provides MapContainer, TileLayer, Marker, and Popup components that integrate naturally with Next.js. The map is loaded lazily with next/dynamic to avoid SSR issues.",
    role: "React wrapper for Leaflet maps",
  },
  {
    name: "OpenStreetMap",
    version: "tile service",
    license: "ODbL",
    url: "https://www.openstreetmap.org",
    description: "Free, open-source map tile data used as the base layer in the resource map. Community-maintained geographic data for Tampa Bay area streets, neighborhoods, and landmarks.",
    role: "Map tile provider (base layer imagery)",
  },
];

const apis: RefItem[] = [
  {
    name: "City of Tampa Events API",
    version: "REST / JSON",
    url: "https://www.tampa.gov/mobile-feeds/events/all",
    description: "Official City of Tampa open data API returning all city-hosted events in JSON format. Fetched server-side with a 15-minute revalidation window. Powers the live Events page calendar and list, the EventsTeaser on the homepage, and the event count on the Insights page. No API key required.",
    role: "Live Tampa city events — dynamic events page",
  },
  {
    name: "City of Tampa News RSS Feed",
    version: "RSS 2.0 / XML",
    url: "https://tampa.gov/news/feed",
    description: "Official City of Tampa press releases and news items delivered as RSS XML. Parsed server-side using a custom XML parser (no external dependency). Fetched hourly (revalidate: 3600). Powers the featured story, trending sidebar, and editorial grid on the News page.",
    role: "Live city news and press releases",
  },
  {
    name: "City of Tampa Calendar Types API",
    version: "REST / JSON",
    url: "https://www.tampa.gov/taxonomy/terms/calendar_type",
    description: "Returns event taxonomy/category types from Tampa's content management system. Used to classify incoming events by type (Community, Recreation, Public Meetings, etc.). Cached for 24 hours.",
    role: "Event category classification",
  },
  {
    name: "NewsData.io",
    version: "v2 REST API",
    url: "https://newsdata.io",
    description: "Supplemental news API providing localized Tampa Bay news articles from regional outlets. Fills in the editorial grid on the News page when Tampa.gov RSS has fewer recent items. Returns title, description, image URL, and publication date.",
    role: "Supplemental Tampa Bay regional news",
  },
  {
    name: "Google Calendar Deep Link",
    version: "URL scheme",
    url: "https://calendar.google.com/calendar/render",
    description: "Not an API key — uses Google Calendar's public URL scheme to let users add any event directly to their Google Calendar from the Events page with a single click. Encodes event title, date, location, and description as URL parameters.",
    role: "Add-to-calendar functionality",
  },
];

const backend: RefItem[] = [
  {
    name: "Supabase",
    version: "^2.93.1",
    license: "Apache 2.0",
    url: "https://supabase.com",
    description: "Open-source Firebase alternative providing a hosted PostgreSQL database, authentication, and file storage. The project uses Supabase for user auth (login/profile pages), storing submitted resources pending review, and hosting uploaded images in the references section.",
    role: "Database, auth, and file storage backend",
  },
  {
    name: "@supabase/ssr",
    version: "^0.8.0",
    license: "Apache 2.0",
    url: "https://supabase.com/docs/guides/auth/server-side",
    description: "Supabase's server-side rendering helpers for Next.js. Manages session cookies across server components and API routes so users stay logged in across page navigations using Next.js middleware.",
    role: "Server-side Supabase session management",
  },
];

const forms: RefItem[] = [
  {
    name: "React Hook Form",
    version: "^7.66.1",
    license: "MIT",
    url: "https://react-hook-form.com",
    description: "Performant, minimal re-render form library. Used on the Submit Resource page for managing form state, validation errors, and submission — without causing a full page re-render on every keystroke.",
    role: "Form state management (Submit page)",
  },
  {
    name: "Zod",
    version: "^4.1.12",
    license: "MIT",
    url: "https://zod.dev",
    description: "TypeScript-first schema validation library. Defines the data shape for resource submissions and validates incoming form data both client-side and in API route handlers before inserting to Supabase.",
    role: "Schema validation and type inference",
  },
  {
    name: "date-fns",
    version: "^4.1.0",
    license: "MIT",
    url: "https://date-fns.org",
    description: "Modern date manipulation library. Used for date formatting, comparison (e.g., filtering events older than 7 days for the Past News section), and computing relative dates across news and events pages.",
    role: "Date parsing, formatting, and comparison",
  },
];

const fonts: RefItem[] = [
  {
    name: "Inter",
    version: "Variable",
    license: "SIL OFL 1.1",
    url: "https://rsms.me/inter",
    description: "The primary body typeface loaded via next/font/google for zero-CLS font loading. Used for all body text, navigation, labels, and UI elements. Its wide numeric character set makes it ideal for displaying the stats and data counters on the site.",
    role: "Body text, navigation, labels, data displays",
  },
  {
    name: "Instrument Serif",
    version: "Italic",
    license: "SIL OFL 1.1",
    url: "https://fonts.google.com/specimen/Instrument+Serif",
    description: "The accent serif typeface loaded via next/font/google. Used exclusively for <em> elements inside headings (e.g., 'community', 'Tampa', 'calendar') to create the editorial warmth and humanity that distinguishes the site's brand voice.",
    role: "Italic accent text in all section headings",
  },
];

const media: RefItem[] = [
  {
    name: "Unsplash",
    version: "Free License",
    url: "https://unsplash.com",
    description: "The primary source for all photography on the site. Specific uses: (1) Hero background — Tampa beach waterfront (photo-1507525428034-b723cf961d3e). (2) Community news fallback images — community gathering, youth event, wellness walk. (3) Category page images. All images are fetched at runtime via CDN URL with width/quality parameters for performance.",
    role: "Hero photo, community news images, fallback photography",
  },
  {
    name: "Supabase Storage",
    version: "Hosted CDN",
    url: "https://supabase.com/storage",
    description: "Used to host project-specific uploaded images referenced in the static news and event fallback data. Images are served from the Supabase CDN at slelguoygbfzlpylpxfs.supabase.co.",
    role: "Hosted project images for static data fallbacks",
  },
];

const devTools: RefItem[] = [
  {
    name: "Vercel",
    version: "Hosting / Edge",
    url: "https://vercel.com",
    description: "The production deployment platform. Handles edge caching (ISR), serverless function execution for API routes, automatic HTTPS, and CI/CD from the GitHub repository. The site's revalidation intervals (15 min for events, 1 hr for news) are enforced at the Vercel edge layer.",
    role: "Production hosting, CI/CD, ISR edge caching",
  },
  {
    name: "npm / bun",
    version: "package managers",
    url: "https://bun.sh",
    description: "Bun is the primary JavaScript runtime and package manager for fast installs and builds. npm is the fallback. Both lockfiles are present; npm is used for production builds on Vercel.",
    role: "Package management and local development runtime",
  },
  {
    name: "ESLint v9",
    version: "^9",
    license: "MIT",
    url: "https://eslint.org",
    description: "Configured with eslint-config-next for Next.js-specific rules. Catches common mistakes such as missing alt attributes on images, improper use of next/image vs <img>, and exhaustive dependency rules in React hooks.",
    role: "Code quality linting",
  },
  {
    name: "Playwright",
    version: "^1.58.0",
    license: "Apache 2.0",
    url: "https://playwright.dev",
    description: "End-to-end testing framework. Can be used to test critical user flows — resource search, event filtering, and form submission — across Chromium, Firefox, and WebKit browsers.",
    role: "End-to-end browser testing",
  },
];

const standards: RefItem[] = [
  {
    name: "WCAG 2.2 AA",
    version: "W3C · 2023",
    url: "https://www.w3.org/TR/WCAG22",
    description: "Web Content Accessibility Guidelines. The site follows AA compliance: color contrast ratios ≥4.5:1 for normal text, ≥3:1 for large text, keyboard-navigable interactive elements via Radix UI, proper ARIA roles and labels on all icon-only buttons (aria-label), and semantic HTML heading hierarchy.",
    role: "Accessibility compliance standard",
  },
  {
    name: "Next.js App Router",
    version: "Next.js 15",
    url: "https://nextjs.org/docs/app",
    description: "The file-system-based routing convention used throughout the project. Each page lives in src/app/[route]/page.tsx. Server components fetch data at the top level; client components are explicitly marked with 'use client' and handle interactivity.",
    role: "Routing architecture and server/client component model",
  },
  {
    name: "navigator.share / Clipboard API",
    version: "Web API",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share",
    description: "The native browser share sheet (navigator.share) is used as the primary share mechanism on the Directory page. Falls back to navigator.clipboard.writeText for environments that don't support the Web Share API (e.g., desktop Chrome on non-HTTPS).",
    role: "Resource sharing functionality",
  },
];

/* ─── Rendering ─── */

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: RefItem[];
  accent?: "coral" | "teal" | "sun";
}

function RefDetailSection({ icon, title, subtitle, items, accent = "coral" }: SectionProps) {
  const accentColor = accent === "coral" ? "var(--coral)" : accent === "teal" ? "var(--teal)" : "#b07a14";
  const accentBg    = accent === "coral" ? "var(--coral-soft)" : accent === "teal" ? "var(--teal-soft)" : "#fdf3da";

  return (
    <Reveal>
      <div style={{ marginTop: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,.12)" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: accentBg, display: "flex", alignItems: "center", justifyContent: "center", color: accentColor, flexShrink: 0 }}>
            {icon}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: ".04em", textTransform: "uppercase" }}>{title}</h3>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: "rgba(255,255,255,.55)" }}>{subtitle}</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.09)",
                borderRadius: 16,
                padding: "20px 24px",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: "-.01em" }}>
                    {item.name}
                  </span>
                  {item.version && (
                    <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 9999, background: accentBg, color: accentColor, letterSpacing: ".04em" }}>
                      {item.version}
                    </span>
                  )}
                  {item.license && (
                    <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 9999, background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.5)" }}>
                      {item.license}
                    </span>
                  )}
                </div>
                {item.url && item.url !== "#" && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: accentColor, textDecoration: "none", flexShrink: 0 }}
                  >
                    {item.url.replace(/^https?:\/\//, "").split("/")[0]}
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.55, borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 10 }}>
                <span style={{ display: "inline-block", marginBottom: 6, fontSize: 11, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: accentColor }}>
                  Role: {item.role}
                </span>
                <br />
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}


export default function ReferencesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#0E1525", minHeight: "100vh" }}>
        <section id="references" className="section" style={{ color: "#fff" }}>
          <Reveal>
            <span className="section-eyebrow" style={{ background: "rgba(255,255,255,.1)", color: "#ffcebe", border: "1px solid rgba(255,255,255,.12)" }}>
              <span className="dot" style={{ background: "var(--coral)" }} />TSA Documentation
            </span>
            <h2 className="section-title" style={{ color: "#fff" }}>References &amp; <em>Credits</em>.</h2>
            <p className="section-sub" style={{ color: "rgba(255,255,255,.65)", maxWidth: 600 }}>
              A complete, transparent record of every framework, library, API, image source, font, and tool used to design and build Tampa Resource Hub for the TSA Webmaster competition.
            </p>
          </Reveal>

          {/* Summary cards */}
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginTop: 36 }}>
              {[
                { label: "Libraries & Frameworks", count: "30+" },
                { label: "Live Data APIs",          count: "4" },
                { label: "Font Families",            count: "2" },
                { label: "Image Sources",            count: "2" },
                { label: "Open Source Licenses",     count: "MIT / OFL" },
                { label: "Accessibility Standard",   count: "WCAG 2.2 AA" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, padding: "16px 18px" }}>
                  <div style={{ fontSize: 22, fontWeight: 600, color: "#fff", letterSpacing: "-.02em" }}>{s.count}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Inline doc viewer */}
          <Reveal>
            <div style={{ marginTop: 48 }}>
              <DocViewerSection />
            </div>
          </Reveal>

          {/* ─── All reference sections ─── */}
          <RefDetailSection
            icon={<Cpu size={18} />}
            title="Core Framework & Runtime"
            subtitle="The foundational technologies the entire site is built on"
            items={framework}
            accent="coral"
          />

          <RefDetailSection
            icon={<Palette size={18} />}
            title="Styling & Design System"
            subtitle="How the Tampa coastal visual identity is implemented in code"
            items={styling}
            accent="teal"
          />

          <RefDetailSection
            icon={<Package size={18} />}
            title="UI Component Libraries"
            subtitle="Accessible, reusable UI building blocks"
            items={uiLibs}
            accent="sun"
          />

          <RefDetailSection
            icon={<MapPin size={18} />}
            title="Mapping & Geolocation"
            subtitle="The interactive resource map on the directory page"
            items={mapping}
            accent="teal"
          />

          <RefDetailSection
            icon={<Rss size={18} />}
            title="Live Data APIs"
            subtitle="Real-time data sources that keep the site dynamic and accurate"
            items={apis}
            accent="coral"
          />

          <RefDetailSection
            icon={<Database size={18} />}
            title="Database & Backend"
            subtitle="Data persistence, authentication, and file storage"
            items={backend}
            accent="teal"
          />

          <RefDetailSection
            icon={<Code2 size={18} />}
            title="Forms, Validation & Utilities"
            subtitle="Libraries handling data entry, schema validation, and date logic"
            items={forms}
            accent="sun"
          />

          <RefDetailSection
            icon={<Type size={18} />}
            title="Typography"
            subtitle="Font families and how they shape the site's editorial voice"
            items={fonts}
            accent="coral"
          />

          <RefDetailSection
            icon={<ImageIcon size={18} />}
            title="Photography & Media"
            subtitle="Image sources, licenses, and how photos are used"
            items={media}
            accent="teal"
          />

          <RefDetailSection
            icon={<Globe size={18} />}
            title="Build Tools & Deployment"
            subtitle="How the site is built, tested, and delivered to users"
            items={devTools}
            accent="sun"
          />

          <RefDetailSection
            icon={<Shield size={18} />}
            title="Standards, Accessibility & Web APIs"
            subtitle="Guidelines and browser APIs the project follows and uses"
            items={standards}
            accent="coral"
          />

          {/* Copyright footer */}
          <Reveal>
            <div style={{ marginTop: 64, padding: "28px 32px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>
                Copyright &amp; License Summary
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                {[
                  { label: "Site code",             value: "MIT License · © 2026 Tampa Resource Hub" },
                  { label: "Site content",          value: "CC BY 4.0 · Tampa Resource Hub team" },
                  { label: "Fonts (Inter + Instrument Serif)", value: "SIL Open Font License 1.1" },
                  { label: "Icons (Lucide)",        value: "ISC License · Lucide Contributors" },
                  { label: "Photos (Unsplash)",     value: "Unsplash License · Free for commercial use" },
                  { label: "Partner logos / marks", value: "Used with permission · trademarks of respective owners" },
                ].map((c, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--coral)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 3 }}>{c.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,.65)" }}>{c.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
