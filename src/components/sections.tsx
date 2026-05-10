"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { HoverGlow } from "@/components/hover-glow";
import type { CommunityEventWithSource } from "@/lib/resources";
import type { TampaGovNewsItem } from "@/lib/tampa-api";
import {
  ArrowRight,
  Plus,
  Utensils,
  Heart,
  Home,
  Book,
  Users,
  Activity,
  Briefcase,
  ShieldAlert,
  MapPin,
  Clock,
  TrendingUp,
} from "lucide-react";

function fmtPubDate(pubDate: string): string {
  if (!pubDate) return "";
  try {
    const d = new Date(pubDate);
    if (isNaN(d.getTime())) return pubDate.slice(0, 12);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch { return ""; }
}

function parseEvtDate(dateStr: string): { m: string; d: string; y: string } {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return {
        m: d.toLocaleDateString("en-US", { month: "short" }),
        d: String(d.getDate()),
        y: String(d.getFullYear()),
      };
    }
  } catch { /* fall through */ }
  const match = dateStr.match(/([A-Za-z]+)\s+(\d+),\s*(\d{4})/);
  if (match) return { m: match[1], d: match[2], y: match[3] };
  return { m: "", d: "", y: "" };
}

/* ─── Hero ─── */
export function Hero() {
  return (
    <div className="hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-bg"
        alt=""
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=70"
      />
      <div className="hero-overlay" />
      <div className="hero-grain" />

      <div className="fg">
        <div className="nav-spacer" />

        <div className="hero-inner">
          <h1 className="hero-h1">
            A trusted hub for the<br />
            <em>community</em> that raises us
          </h1>
          <p className="hero-sub">
            Discover food assistance, mental health support, housing programs,
            and the local organizations making Tampa a place where everyone belongs.
          </p>
          <div className="hero-ctas">
            <HoverGlow
              size="lg"
              background="#0E1525"
              glowColor="#FFB37A"
              color="#fff"
              hoverColor="#FFD8B8"
              icon={<ArrowRight size={16} />}
              onClick={() => {
                document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" });
                window.location.href = "/directory";
              }}
            >
              Browse resources
            </HoverGlow>
            <HoverGlow
              size="lg"
              background="rgba(255,255,255,.16)"
              glowColor="#5fd1c8"
              color="#fff"
              hoverColor="#cdf3ef"
              className="hg-glass"
              onClick={() => (window.location.href = "/submit")}
            >
              <Plus size={14} /> Submit a resource
            </HoverGlow>
          </div>
        </div>

        <div className="hero-strip">
          <div className="item">
            <div className="num"><Counter to={150} suffix="+" /></div>
            <div className="lbl">Local resources</div>
          </div>
          <div className="item">
            <div className="num"><Counter to={25} suffix="+" /></div>
            <div className="lbl">Community events</div>
          </div>
          <div className="item">
            <div className="num"><Counter to={10} suffix="+" /></div>
            <div className="lbl">Support categories</div>
          </div>
          <div className="item">
            <div className="num"><em>Thousands</em></div>
            <div className="lbl">Residents supported</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Featured Resources ─── */
const spotlightCards = [
  {
    icon: <Utensils size={22} />, tile: "",
    cat: "Food Assistance", tone: "",
    title: "Feeding Tampa Families",
    desc: "Connect with local food banks, meal programs, and emergency grocery assistance available across Tampa neighborhoods.",
    href: "/directory?cat=Food+Assistance",
  },
  {
    icon: <Heart size={22} />, tile: "teal",
    cat: "Mental Health", tone: "t-teal",
    title: "Youth Mental Health Support",
    desc: "Discover counseling programs, peer support groups, and crisis resources helping Tampa teens and families.",
    href: "/directory?cat=Mental+Health",
  },
  {
    icon: <Home size={22} />, tile: "sun",
    cat: "Housing Assistance", tone: "",
    title: "Housing & Shelter Services",
    desc: "Find affordable housing programs, temporary shelters, and local organizations supporting families in need.",
    href: "/directory?cat=Housing",
  },
];

export function FeaturedResources() {
  return (
    <section className="section">
      <Reveal>
        <span className="section-eyebrow"><span className="dot" />Featured</span>
        <div className="head-row">
          <div>
            <h2 className="section-title">
              Spotlight on the <em>community</em><br />programs working today.
            </h2>
          </div>
          <p className="section-sub">
            A curated selection of trusted organizations residents are turning to right now in Tampa Bay.
          </p>
        </div>
      </Reveal>
      <div className="resource-grid">
        {spotlightCards.map((c, i) => (
          <Reveal key={i}>
            <div className={`spotlight ${c.tone}`}>
              <div className={`icon-tile lg ${c.tile}`}>{c.icon}</div>
              <div style={{ marginTop: 18 }}>
                <span className={`badge-cat ${c.tile === "teal" ? "teal" : ""}`}>{c.cat}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div style={{ marginTop: 18 }}>
                <HoverGlow
                  size="sm"
                  background={c.tile === "teal" ? "#0f3a3a" : c.tile === "sun" ? "#3a2a14" : "#1a0f08"}
                  glowColor={c.tile === "teal" ? "#5fd1c8" : c.tile === "sun" ? "#ffcf6b" : "#ff8a5c"}
                  color="#fff"
                  hoverColor={c.tile === "teal" ? "#cdf3ef" : c.tile === "sun" ? "#ffe6b3" : "#ffd6c2"}
                  icon={<ArrowRight size={14} />}
                  onClick={() => (window.location.href = c.href)}
                >
                  Explore Resource
                </HoverGlow>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Stats Band ─── */
export function StatsBand() {
  return (
    <Reveal>
      <div className="stats-band">
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
          <span className="section-eyebrow"><span className="dot" />Community impact</span>
          <h2 className="section-title">Tampa shows up<br />for <em>Tampa</em>.</h2>
          <p className="section-sub" style={{ color: "rgba(255,255,255,.7)" }}>
            What the network looks like today — built by neighbors, nonprofits, and local partners across Hillsborough County.
          </p>
          <div className="stats-grid">
            <div className="stat">
              <div className="num"><Counter to={150} /><span className="plus">+</span></div>
              <div className="lbl">Local resources verified across Tampa Bay</div>
            </div>
            <div className="stat">
              <div className="num"><Counter to={25} /><span className="plus">+</span></div>
              <div className="lbl">Community events hosted this season</div>
            </div>
            <div className="stat">
              <div className="num"><Counter to={10} /><span className="plus">+</span></div>
              <div className="lbl">Tampa support categories covered</div>
            </div>
            <div className="stat">
              <div className="num"><em>Thousands</em></div>
              <div className="lbl">Of residents supported by partner programs</div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Categories ─── */
const cats = [
  { ico: <Utensils size={18} />, lbl: "Food Support",        desc: "Pantries, meal kits, weekend programs",    tile: "" },
  { ico: <Heart size={18} />,    lbl: "Mental Health",        desc: "Counseling, peer groups, crisis lines",    tile: "teal" },
  { ico: <Home size={18} />,     lbl: "Housing",              desc: "Shelter, rental aid, housing navigation",  tile: "sun" },
  { ico: <Book size={18} />,     lbl: "Education",            desc: "Tutoring, scholarships, adult learning",   tile: "" },
  { ico: <Users size={18} />,    lbl: "Youth Programs",       desc: "After-school, mentorship, leadership",     tile: "teal" },
  { ico: <Activity size={18} />, lbl: "Healthcare",           desc: "Free clinics, screenings, dental care",    tile: "ink" },
  { ico: <Briefcase size={18} />,lbl: "Employment",           desc: "Job training, resume help, hiring fairs",  tile: "sun" },
  { ico: <ShieldAlert size={18} />,lbl: "Emergency Assistance",desc: "Utility aid, disaster relief, hotlines", tile: "" },
];

export function Categories() {
  return (
    <section className="section" style={{ background: "transparent" }}>
      <Reveal>
        <div className="head-row">
          <div>
            <span className="section-eyebrow"><span className="dot" />Browse by need</span>
            <h2 className="section-title">Find what you need by <em>category</em>.</h2>
          </div>
          <p className="section-sub">Eight curated areas of support — each backed by vetted partners and updated weekly.</p>
        </div>
      </Reveal>
      <div className="cat-grid">
        {cats.map((c, i) => (
          <Reveal key={i}>
            <Link href={`/directory?cat=${encodeURIComponent(c.lbl)}`} className="cat">
              <div className={`icon-tile ${c.tile}`}>{c.ico}</div>
              <div className="lbl">{c.lbl}</div>
              <div className="desc">{c.desc}</div>
              <span className="arr"><ArrowRight size={14} /></span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── News Preview ─── */
const staticNewsItems = [
  { tag: "Community", date: "May 10", title: "Tampa Expands Free Weekend Meal Programs for Students", desc: "New community initiatives are helping students access meals outside school hours.", link: "/news", t: "" },
  { tag: "Youth",     date: "May 8",  title: "Youth Volunteer Opportunities Increase Across Hillsborough County", desc: "Local nonprofits are opening more leadership and volunteer opportunities for teens.", link: "/news", t: "t-2" },
  { tag: "Wellness",  date: "May 6",  title: "Community Wellness Fair Scheduled for Downtown Tampa", desc: "Residents can access free health screenings, local vendors, and family activities.", link: "/news", t: "t-3" },
];

const thumbVariants = ["", "t-2", "t-3"];

export function NewsTeaser({ news }: { news?: TampaGovNewsItem[] }) {
  const items = news && news.length > 0
    ? news.slice(0, 3).map((n, i) => ({
        tag: "City News",
        date: fmtPubDate(n.pubDate),
        title: n.title,
        desc: n.description || "",
        link: n.link || "/news",
        t: thumbVariants[i] ?? "",
      }))
    : staticNewsItems;

  return (
    <section className="section">
      <Reveal>
        <div className="head-row">
          <div>
            <span className="section-eyebrow"><span className="dot" />Latest updates</span>
            <h2 className="section-title">From the <em>community</em> wire.</h2>
          </div>
          <Link href="/news" className="btn-pill-ghost">
            All stories <ArrowRight size={14} />
          </Link>
        </div>
      </Reveal>
      <div className="news-grid">
        {items.map((a, i) => (
          <Reveal key={i}>
            <article className="news-card">
              <div className={`thumb ${a.t}`}>
                <span className="tag">{a.tag}</span>
                <svg width="120" height="120" viewBox="0 0 120 120" style={{ opacity: .35 }}>
                  <circle cx="60" cy="60" r="44" fill="none" stroke="#fff" strokeWidth="2" />
                  <circle cx="60" cy="60" r="22" fill="none" stroke="#fff" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="body">
                <div className="meta"><span>{a.date}</span></div>
                <h3>{a.title}</h3>
                <p>{a.desc.slice(0, 120)}{a.desc.length > 120 ? "…" : ""}</p>
                <a href={a.link} target="_blank" rel="noopener noreferrer" className="read-more">
                  Read article <ArrowRight size={14} />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Events Preview ─── */
const staticEvents = [
  { date: "May 12, 2026", title: "Tampa Family Resource Fair",    location: "Curtis Hixon Park",  category: "Family",   time: "10:00 AM – 4:00 PM" },
  { date: "May 19, 2026", title: "Youth Leadership Workshop",     location: "Tampa Bay Y",         category: "Youth",    time: "1:00 PM – 5:00 PM" },
  { date: "May 25, 2026", title: "Mental Health Awareness Walk",  location: "Bayshore Boulevard",  category: "Wellness", time: "8:00 AM – 11:00 AM" },
] as Pick<CommunityEventWithSource, "date" | "title" | "location" | "category" | "time">[];

export function EventsTeaser({ events }: { events?: CommunityEventWithSource[] }) {
  const items = events && events.length > 0 ? events.slice(0, 3) : staticEvents;

  return (
    <section className="section">
      <Reveal>
        <div className="head-row">
          <div>
            <span className="section-eyebrow"><span className="dot" />Upcoming</span>
            <h2 className="section-title">Mark your <em>calendar</em>.</h2>
          </div>
          <Link href="/events" className="btn-pill-ghost">
            Full calendar <ArrowRight size={14} />
          </Link>
        </div>
      </Reveal>
      <div className="event-stack">
        {items.map((ev, i) => {
          const { m, d, y } = parseEvtDate(ev.date);
          return (
            <Reveal key={i}>
              <div className="event-row">
                <div className="event-date">
                  <span className="m">{m}</span>
                  <span className="d">{d}</span>
                  <span className="y">{y}</span>
                </div>
                <div className="event-info">
                  <h4>{ev.title}</h4>
                  <div className="row">
                    <span><MapPin size={14} /> {ev.location}</span>
                    <span><Clock size={14} /> {ev.time}</span>
                    <span className="badge-cat ink" style={{ padding: "4px 10px" }}>{ev.category}</span>
                  </div>
                </div>
                <Link href="/events" className="event-cta">
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Insights Preview ─── */
export function InsightsPreview({
  resourceCount = 12,
  eventCount = 25,
}: {
  resourceCount?: number;
  eventCount?: number;
}) {
  const kpis = [
    { n: 3284,          lbl: "Resource requests this month", delta: "+12.4%" },
    { n: resourceCount, lbl: "Verified community resources",  delta: "Live"   },
    { n: eventCount,    lbl: "Upcoming Tampa events",         delta: "This season" },
  ];

  return (
    <section className="section">
      <Reveal>
        <div className="head-row">
          <div>
            <span className="section-eyebrow"><span className="dot" />Data</span>
            <h2 className="section-title">Community <em>impact</em> at a glance.</h2>
          </div>
          <Link href="/insights" className="btn-pill-ghost">
            Full insights <ArrowRight size={14} />
          </Link>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18, marginTop: 16 }}>
        {kpis.map((k, i) => (
          <Reveal key={i}>
            <div className="insight kpi-card" style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r-xl)", padding: 24, display: "flex", flexDirection: "column" }}>
              <div className="lbl">{k.lbl}</div>
              <div className="num"><Counter to={k.n} /></div>
              <span className="delta up">
                <TrendingUp size={11} /> {k.delta}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
export function CTASection() {
  return (
    <Reveal>
      <div className="big-cta">
        <span className="glass-orb a" />
        <span className="glass-orb b" />
        <span className="glass-orb c" />
        <div className="inner">
          <span className="section-eyebrow"><span className="dot" />Get involved</span>
          <h2>Helping Tampa <em>communities</em><br />stay connected.</h2>
          <p>Explore trusted local resources, discover community events, and support organizations making a difference throughout Tampa Bay.</p>
          <div className="ctas">
            <HoverGlow
              size="lg"
              background="#0E1525"
              glowColor="#FFB37A"
              color="#fff"
              hoverColor="#FFD8B8"
              icon={<ArrowRight size={16} />}
              onClick={() => (window.location.href = "/directory")}
            >
              Explore Resources
            </HoverGlow>
            <HoverGlow
              size="lg"
              background="#fff"
              glowColor="#5fd1c8"
              color="#0E1525"
              hoverColor="#0f3a3a"
              onClick={() => (window.location.href = "/submit")}
            >
              <Plus size={14} /> Submit a Resource
            </HoverGlow>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* Re-exports for layout-elements compat */
export { Navbar } from "@/components/navbar";
export { Footer } from "@/components/footer";
export { EmergencyBanner } from "@/components/emergency-banner";

/* Legacy aliases */
export function HowItWorks() { return null; }
