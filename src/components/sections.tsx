"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { HoverGlow } from "@/components/hover-glow";
import { TAMPA_RESOURCES } from "@/lib/resources";
import type { CommunityEventWithSource } from "@/lib/resources";
import type { TampaGovNewsItem } from "@/lib/tampa-api";
import { useLanguage } from "@/contexts/language-context";
import { translateItemList } from "@/lib/translate";
import {
  ArrowRight, Plus, Utensils, Heart, Home, Book,
  Users, Activity, Briefcase, ShieldAlert, MapPin, Clock,
  TrendingUp, CalendarDays, Sparkles,
} from "lucide-react";

/* ─── Derived real stats ─── */
const RESOURCE_COUNT = TAMPA_RESOURCES.length;
const CATEGORY_COUNT = new Set(TAMPA_RESOURCES.map((r) => r.category)).size;

/* ─── Helpers ─── */
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

/* ─── Filter helper ─── */
const MONTH_MAP: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};
function isFutureOrToday(dateStr: string): boolean {
  if (!dateStr) return true;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return new Date(d.getFullYear(), d.getMonth(), d.getDate()) >= today;
    }
  } catch { /* fall through */ }
  const m = dateStr.match(/([A-Za-z]+)\s+(\d+),\s*(\d{4})/);
  if (m) {
    const mo = MONTH_MAP[m[1]];
    if (mo !== undefined) {
      return new Date(parseInt(m[3]), mo, parseInt(m[2])) >= today;
    }
  }
  return true;
}

const COMMUNITY_FALLBACKS = [
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=700&q=75",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=700&q=75",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=700&q=75",
];

/* ─── Hero ─── */
export function Hero({ eventCount = 0 }: { eventCount?: number }) {
  const { s } = useLanguage();
  const h = s.hero;
  return (
    <div className="hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero-bg" alt=""
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=70" />
      <div className="hero-overlay" />
      <div className="hero-grain" />
      <div className="fg">
        <div className="nav-spacer" />
        <div className="hero-inner">
          <h1 className="hero-h1">
            {h.lineA}<br />
            <em>{h.lineEm}</em> {h.lineB}
          </h1>
          <p className="hero-sub">{h.sub}</p>
          <div className="hero-ctas">
            <HoverGlow size="lg" background="#0E1525" glowColor="#5bc8f0"
              color="#fff" hoverColor="#b8e8f8" icon={<ArrowRight size={16} />}
              onClick={() => (window.location.href = "/directory")}>
              {h.browse}
            </HoverGlow>
            <HoverGlow size="lg" background="rgba(255,255,255,.16)" glowColor="#5fd1c8"
              color="#fff" hoverColor="#cdf3ef" className="hg-glass"
              onClick={() => (window.location.href = "/submit")}>
              <Plus size={14} /> {h.submit}
            </HoverGlow>
          </div>
        </div>
        <div className="hero-strip">
          <div className="item">
            <div className="num"><Counter to={RESOURCE_COUNT} suffix="+" /></div>
            <div className="lbl">{h.statResources}</div>
          </div>
          <div className="item">
            <div className="num">
              {eventCount > 0 ? <Counter to={eventCount} suffix="+" /> : <em>{h.live}</em>}
            </div>
            <div className="lbl">{h.statEvents}</div>
          </div>
          <div className="item">
            <div className="num"><Counter to={CATEGORY_COUNT} /></div>
            <div className="lbl">{h.statCategories}</div>
          </div>
          <div className="item">
            <div className="num"><em>{h.free}</em></div>
            <div className="lbl">{h.statFree}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Featured Resources ─── */
export function FeaturedResources() {
  const { s } = useLanguage();
  const f = s.featured;

  const spotlightCards = [
    {
      icon: <Utensils size={22} />, tile: "", tone: "",
      cat: f.food_cat, title: f.food_title, desc: f.food_desc,
      href: "/directory?cat=Food+Assistance",
    },
    {
      icon: <Heart size={22} />, tile: "teal", tone: "t-teal",
      cat: f.mental_cat, title: f.mental_title, desc: f.mental_desc,
      href: "/directory?cat=Mental+Health",
    },
    {
      icon: <Home size={22} />, tile: "sun", tone: "",
      cat: f.housing_cat, title: f.housing_title, desc: f.housing_desc,
      href: "/directory?cat=Housing",
    },
  ];

  return (
    <section className="section">
      <Reveal>
        <span className="section-eyebrow"><span className="dot" />{f.eyebrow}</span>
        <div className="head-row">
          <div>
            <h2 className="section-title">
              {f.title} <em>{f.titleEm}</em><br />{f.titleEnd}
            </h2>
          </div>
          <p className="section-sub">{f.sub}</p>
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
                <HoverGlow size="sm"
                  background={c.tile === "teal" ? "#0f3a3a" : c.tile === "sun" ? "#3a2a14" : "#0a1e30"}
                  glowColor={c.tile === "teal" ? "#5fd1c8" : c.tile === "sun" ? "#ffcf6b" : "#60c4f0"}
                  color="#fff"
                  hoverColor={c.tile === "teal" ? "#cdf3ef" : c.tile === "sun" ? "#ffe6b3" : "#c0e8f8"}
                  icon={<ArrowRight size={14} />}
                  onClick={() => (window.location.href = c.href)}>
                  {f.explore}
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
  const { s } = useLanguage();
  const st = s.stats;
  return (
    <Reveal>
      <div className="stats-band">
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
          <span className="section-eyebrow"><span className="dot" />{st.eyebrow}</span>
          <h2 className="section-title">{st.title}<br /><em>{st.titleEm}</em></h2>
          <p className="section-sub" style={{ color: "rgba(255,255,255,.7)" }}>
            {RESOURCE_COUNT} {st.sub_a} {CATEGORY_COUNT} {st.sub_b}
          </p>
          <div className="stats-grid">
            <div className="stat">
              <div className="num"><Counter to={RESOURCE_COUNT} /><span className="plus">+</span></div>
              <div className="lbl">{st.s1_lbl}</div>
            </div>
            <div className="stat">
              <div className="num"><Counter to={CATEGORY_COUNT} /></div>
              <div className="lbl">{st.s2_lbl}</div>
            </div>
            <div className="stat">
              <div className="num"><em>{st.s3_val}</em></div>
              <div className="lbl">{st.s3_lbl}</div>
            </div>
            <div className="stat">
              <div className="num"><Counter to={1} /><span className="plus">M+</span></div>
              <div className="lbl">{st.s4_lbl}</div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Categories ─── */
export function Categories() {
  const { s } = useLanguage();
  const c = s.categories;

  const cats = [
    { ico: <Utensils size={18} />,    lbl: c.food,       desc: c.food_desc,       tile: "" },
    { ico: <Heart size={18} />,       lbl: c.mental,     desc: c.mental_desc,     tile: "teal" },
    { ico: <Home size={18} />,        lbl: c.housing,    desc: c.housing_desc,    tile: "sun" },
    { ico: <Book size={18} />,        lbl: c.education,  desc: c.education_desc,  tile: "" },
    { ico: <Users size={18} />,       lbl: c.youth,      desc: c.youth_desc,      tile: "teal" },
    { ico: <Activity size={18} />,    lbl: c.health,     desc: c.health_desc,     tile: "ink" },
    { ico: <Briefcase size={18} />,   lbl: c.employment, desc: c.employment_desc, tile: "sun" },
    { ico: <ShieldAlert size={18} />, lbl: c.emergency,  desc: c.emergency_desc,  tile: "" },
  ];

  return (
    <section className="section" style={{ background: "transparent" }}>
      <Reveal>
        <div className="head-row">
          <div>
            <span className="section-eyebrow"><span className="dot" />{c.eyebrow}</span>
            <h2 className="section-title">{c.title} <em>{c.titleEm}</em></h2>
          </div>
          <p className="section-sub">{c.sub}</p>
        </div>
      </Reveal>
      <div className="cat-grid">
        {cats.map((cat, i) => (
          <Reveal key={i}>
            <Link href={`/directory?cat=${encodeURIComponent(cat.lbl)}`} className="cat">
              <div className={`icon-tile ${cat.tile}`}>{cat.ico}</div>
              <div className="lbl">{cat.lbl}</div>
              <div className="desc">{cat.desc}</div>
              <span className="arr"><ArrowRight size={14} /></span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── News Preview ─── */
export function NewsTeaser({ news }: { news?: TampaGovNewsItem[] }) {
  const { s } = useLanguage();
  const n = s.news;

  const staticNewsItems = [
    { tag: n.tag_community, date: "May 10", title: n.item1_title, desc: n.item1_desc, link: "/news", imgUrl: COMMUNITY_FALLBACKS[0] },
    { tag: n.tag_youth,     date: "May 8",  title: n.item2_title, desc: n.item2_desc, link: "/news", imgUrl: COMMUNITY_FALLBACKS[1] },
    { tag: n.tag_wellness,  date: "May 6",  title: n.item3_title, desc: n.item3_desc, link: "/news", imgUrl: COMMUNITY_FALLBACKS[2] },
  ];

  const items = news && news.length > 0
    ? news.slice(0, 3).map((item, i) => ({
        tag: "City News",
        date: fmtPubDate(item.pubDate),
        title: item.title,
        desc: item.description || "",
        link: item.link || "/news",
        imgUrl: item.imageUrl || COMMUNITY_FALLBACKS[i % COMMUNITY_FALLBACKS.length],
      }))
    : staticNewsItems;

  return (
    <section className="section">
      <Reveal>
        <div className="head-row">
          <div>
            <span className="section-eyebrow"><span className="dot" />{n.eyebrow}</span>
            <h2 className="section-title">{n.title} <em>{n.titleEm}</em> {n.titleEnd}</h2>
          </div>
          <Link href="/news" className="btn-pill-ghost">
            {n.allStories} <ArrowRight size={14} />
          </Link>
        </div>
      </Reveal>
      <div className="news-grid">
        {items.map((a, i) => (
          <Reveal key={i}>
            <article className="news-card news-card--equal">
              <div className="thumb"
                style={{ backgroundImage: `url(${a.imgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <span className="tag">{a.tag}</span>
              </div>
              <div className="body">
                <div className="meta"><span>{a.date}</span></div>
                <h3>{a.title}</h3>
                <p>{a.desc.slice(0, 120)}{a.desc.length > 120 ? "…" : ""}</p>
                <a href={a.link} target="_blank" rel="noopener noreferrer" className="read-more">
                  {n.readArticle} <ArrowRight size={14} />
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
const eventAccents = ["var(--coral)", "var(--teal)", "#e8b530"];
const eventBgs = ["var(--coral-soft)", "var(--teal-soft)", "#fdf3da"];
const eventTextColors = ["var(--coral)", "var(--teal)", "#b07a14"];

export function EventsTeaser({ events }: { events?: CommunityEventWithSource[] }) {
  const { s } = useLanguage();
  const e = s.eventsTeaser;

  const staticEvents = [
    { date: "May 17, 2026", title: e.staticEv1, location: "Curtis Hixon Park",  category: "Family",   time: "10:00 AM – 4:00 PM" },
    { date: "May 21, 2026", title: e.staticEv2, location: "Tampa Bay Y",         category: "Youth",    time: "1:00 PM – 5:00 PM" },
    { date: "May 28, 2026", title: e.staticEv3, location: "Bayshore Boulevard",  category: "Wellness", time: "8:00 AM – 11:00 AM" },
  ] as Pick<CommunityEventWithSource, "date" | "title" | "location" | "category" | "time">[];

  const upcoming = (events ?? []).filter((ev) => isFutureOrToday(ev.date));
  const items = upcoming.length > 0 ? upcoming.slice(0, 3) : staticEvents;

  return (
    <section className="section events-teaser-section">
      <div className="events-teaser-bg" aria-hidden="true" />
      <Reveal>
        <div className="head-row">
          <div>
            <span className="section-eyebrow">
              <span className="dot" /><CalendarDays size={12} style={{ marginRight: 2 }} /> {e.eyebrow}
            </span>
            <h2 className="section-title">{e.title} <em>{e.titleEm}</em></h2>
            <p className="section-sub" style={{ marginTop: 12 }}>{e.sub}</p>
          </div>
          <Link href="/events" className="btn-pill-ghost">
            {e.fullCal} <ArrowRight size={14} />
          </Link>
        </div>
      </Reveal>
      <div className="event-stack">
        {items.map((ev, i) => {
          const { m, d, y } = parseEvtDate(ev.date);
          const accent = eventAccents[i % eventAccents.length];
          const bg = eventBgs[i % eventBgs.length];
          const textColor = eventTextColors[i % eventTextColors.length];
          return (
            <Reveal key={i}>
              <div className="event-row event-row--vivid" style={{ borderLeft: `4px solid ${accent}` }}>
                <div className="event-date" style={{ background: bg, borderColor: accent + "40" }}>
                  <span className="m" style={{ color: textColor }}>{m}</span>
                  <span className="d" style={{ color: "var(--ink)" }}>{d}</span>
                  <span className="y">{y}</span>
                </div>
                <div className="event-info">
                  <h4>{ev.title}</h4>
                  <div className="row">
                    <span><MapPin size={14} /> {ev.location}</span>
                    <span><Clock size={14} /> {ev.time}</span>
                    <span className="badge-cat ink" style={{ padding: "4px 10px", background: bg, color: textColor }}>{ev.category}</span>
                  </div>
                </div>
                <Link href="/events" className="event-cta">
                  {e.viewDetails} <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal>
        <div className="events-teaser-footer">
          <Sparkles size={15} style={{ color: "var(--coral)" }} />
          <span>{e.updated}</span>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Insights Preview ─── */
export function InsightsPreview({
  resourceCount = RESOURCE_COUNT,
  eventCount = 0,
}: {
  resourceCount?: number;
  eventCount?: number;
}) {
  const { s } = useLanguage();
  const ins = s.insightsTeaser;
  const categoryCount = CATEGORY_COUNT;

  const kpis = [
    { n: resourceCount,                       lbl: ins.kpi1_lbl, delta: ins.kpi1_delta },
    { n: categoryCount,                       lbl: ins.kpi2_lbl, delta: ins.kpi2_delta },
    {
      n: eventCount > 0 ? eventCount : resourceCount,
      lbl: eventCount > 0 ? ins.kpi3_lbl_events : ins.kpi3_lbl_res,
      delta: eventCount > 0 ? ins.kpi3_delta_events : ins.kpi3_delta_res,
    },
  ];

  return (
    <section className="section">
      <Reveal>
        <div className="head-row">
          <div>
            <span className="section-eyebrow"><span className="dot" />{ins.eyebrow}</span>
            <h2 className="section-title">
              {ins.title} <em>{ins.titleEm}</em> {ins.titleEnd}
            </h2>
          </div>
          <Link href="/insights" className="btn-pill-ghost">
            {ins.fullInsights} <ArrowRight size={14} />
          </Link>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18, marginTop: 16 }}>
        {kpis.map((k, i) => (
          <Reveal key={i}>
            <div className="insight kpi-card" style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r-xl)", padding: 24, display: "flex", flexDirection: "column" }}>
              <div className="lbl">{k.lbl}</div>
              <div className="num"><Counter to={k.n} /></div>
              <span className="delta up"><TrendingUp size={11} /> {k.delta}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
export function CTASection() {
  const { s } = useLanguage();
  const c = s.cta;
  return (
    <Reveal>
      <div className="big-cta">
        <span className="glass-orb a" />
        <span className="glass-orb b" />
        <span className="glass-orb c" />
        <div className="inner">
          <span className="section-eyebrow"><span className="dot" />{c.eyebrow}</span>
          <h2>{c.title} <em>{c.titleEm}</em><br />{c.titleEnd}</h2>
          <p>{c.sub}</p>
          <div className="ctas">
            <HoverGlow size="lg" background="#0E1525" glowColor="#5bc8f0"
              color="#fff" hoverColor="#b8e8f8" icon={<ArrowRight size={16} />}
              onClick={() => (window.location.href = "/directory")}>
              {c.explore}
            </HoverGlow>
            <HoverGlow size="lg" background="#fff" glowColor="#5fd1c8"
              color="#0E1525" hoverColor="#0f3a3a"
              onClick={() => (window.location.href = "/submit")}>
              <Plus size={14} /> {c.submit}
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
