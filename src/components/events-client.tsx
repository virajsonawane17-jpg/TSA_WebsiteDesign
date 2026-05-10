"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { HoverGlow } from "@/components/hover-glow";
import type { CommunityEventWithSource } from "@/lib/resources";
import { ArrowRight, MapPin, Clock, Users, Calendar, Share, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const DOWS = ["S", "M", "T", "W", "T", "F", "S"];

interface ParsedDate {
  year: number;
  month: number; // 1-12
  day: number;
}

function parseDate(dateStr: string): ParsedDate | null {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    }
  } catch { /* fall through */ }
  // Try "Sat, May 10, 2026" or "May 10, 2026"
  const m = dateStr.match(/([A-Za-z]+)\s+(\d+),\s*(\d{4})/);
  if (m) {
    const months: Record<string, number> = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
    };
    const mo = months[m[1]] ?? null;
    if (mo) return { year: parseInt(m[3]), month: mo, day: parseInt(m[2]) };
  }
  return null;
}

function fmtEvtDate(dateStr: string) {
  const p = parseDate(dateStr);
  if (!p) return { m: "", d: "", y: "" };
  const d = new Date(p.year, p.month - 1, p.day);
  return {
    m: d.toLocaleDateString("en-US", { month: "short" }),
    d: String(p.day),
    y: String(p.year),
  };
}

function monthLabel(year: number, month: number) {
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function EventsClient({ events }: { events: CommunityEventWithSource[] }) {
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth() + 1);
  const [activeFilter, setActiveFilter] = useState("All Events");

  const categories = useMemo(() => {
    const cats = new Set(events.map((e) => e.category));
    return ["All Events", ...Array.from(cats).slice(0, 6)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "All Events") return events;
    return events.filter((e) => e.category === activeFilter);
  }, [events, activeFilter]);

  const eventDaysInCal = useMemo(() => {
    const days = new Set<number>();
    events.forEach((ev) => {
      const p = parseDate(ev.date);
      if (p && p.month === calMonth && p.year === calYear) days.add(p.day);
    });
    return days;
  }, [events, calMonth, calYear]);

  const daysInMonth = new Date(calYear, calMonth, 0).getDate();
  const firstDow = new Date(calYear, calMonth - 1, 1).getDay();

  const calDays = useMemo(() => {
    const days: Array<{ n: number | ""; muted?: boolean; today?: boolean; has?: boolean }> = [];
    for (let i = 0; i < firstDow; i++) days.push({ n: "", muted: true });
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        n: d,
        has: eventDaysInCal.has(d),
        today:
          d === now.getDate() &&
          calMonth === now.getMonth() + 1 &&
          calYear === now.getFullYear(),
      });
    }
    while (days.length % 7 !== 0) days.push({ n: "", muted: true });
    return days;
  }, [firstDow, daysInMonth, eventDaysInCal, calMonth, calYear]);

  function prevMonth() {
    if (calMonth === 1) { setCalMonth(12); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  }
  function nextMonth() {
    if (calMonth === 12) { setCalMonth(1); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  }

  const featured = events.find((e) => e.featured) ?? events[0];

  return (
    <>
      <Navbar />
      <main style={{ background: "linear-gradient(180deg, #e8efee 0%, #e2ece8 100%)" }}>
        <section id="events" className="section">
          <Reveal>
            <span className="section-eyebrow"><span className="dot" />Events</span>
            <h2 className="section-title">Upcoming Community <em>Events</em>.</h2>
            <p className="section-sub">
              {events.length > 0
                ? `${events.length} upcoming events — live from the City of Tampa and community partners.`
                : "Family fairs, workshops, walks, and gatherings — all happening across Tampa Bay this season."}
            </p>
          </Reveal>

          {featured && (
            <Reveal>
              <div className="events-feature" style={{ marginTop: 36 }}>
                <div className="vis">
                  <svg style={{ position: "absolute", right: -40, top: -20, opacity: .25 }} width="320" height="320" viewBox="0 0 320 320">
                    <circle cx="160" cy="160" r="140" fill="none" stroke="#fff" strokeWidth="1.5" />
                    <circle cx="160" cy="160" r="80"  fill="none" stroke="#fff" strokeWidth="1" />
                    <circle cx="160" cy="160" r="20"  fill="#fff" opacity=".5" />
                  </svg>
                  <div className="date-block">
                    <div className="m">{featured.date}</div>
                    <div className="d">{featured.time}</div>
                  </div>
                </div>
                <div className="body">
                  <span className="badge-cat" style={{ alignSelf: "flex-start" }}>
                    Featured · {featured.category}
                  </span>
                  <h3>{featured.title}</h3>
                  <p>{featured.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 18, color: "var(--mute)", fontSize: 14 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <MapPin size={14} /> {featured.location}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <Clock size={14} /> {featured.time}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <Users size={14} /> All ages
                    </span>
                  </div>
                  <div className="footer-row">
                    <a href={featured.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <HoverGlow size="md" background="#0E1525" glowColor="#FFB37A" color="#fff" hoverColor="#FFD8B8" icon={<ExternalLink size={14} />}>
                        Learn more
                      </HoverGlow>
                    </a>
                    <button className="btn-pill-ghost"><Calendar size={14} /> Add to calendar</button>
                    <button className="btn-pill-ghost"><Share size={14} /> Share</button>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, marginTop: 32 }}>
            <Reveal>
              <div className="filter-row">
                {categories.map((c) => (
                  <button
                    key={c}
                    className={`tag-chip ${activeFilter === c ? "active" : ""}`}
                    onClick={() => setActiveFilter(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 24 }}>
              <Reveal>
                <div className="calendar">
                  <div className="cal-head">
                    <h4>{monthLabel(calYear, calMonth)}</h4>
                    <div className="cal-nav">
                      <button className="icon-btn" onClick={prevMonth}><ChevronLeft size={14} /></button>
                      <button className="icon-btn" onClick={nextMonth}><ChevronRight size={14} /></button>
                    </div>
                  </div>
                  <div className="cal-grid">
                    {DOWS.map((d, i) => <div key={i} className="cal-dow">{d}</div>)}
                    {calDays.map((d, i) => (
                      <div
                        key={i}
                        className={`cal-day ${d.muted ? "muted" : ""} ${d.today ? "today" : ""} ${d.has ? "has" : ""}`}
                        title={d.has && !d.muted ? `Event on ${monthLabel(calYear, calMonth).split(" ")[0]} ${d.n}` : undefined}
                      >
                        {d.n}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <div className="event-stack">
                {filteredEvents.slice(0, 8).map((ev, i) => {
                  const { m, d, y } = fmtEvtDate(ev.date);
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
                          <p style={{ color: "var(--mute)", fontSize: 14, margin: "4px 0 8px", lineHeight: 1.5 }}>
                            {ev.description.slice(0, 120)}{ev.description.length > 120 ? "…" : ""}
                          </p>
                          <div className="row">
                            <span><MapPin size={14} /> {ev.location}</span>
                            <span><Clock size={14} /> {ev.time}</span>
                            <span className="badge-cat ink" style={{ padding: "4px 10px" }}>{ev.category}</span>
                          </div>
                        </div>
                        <a
                          href={ev.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="event-cta"
                          style={{ textDecoration: "none" }}
                        >
                          Details <ArrowRight size={14} />
                        </a>
                      </div>
                    </Reveal>
                  );
                })}
                {filteredEvents.length === 0 && (
                  <div style={{ textAlign: "center", padding: "32px 0", color: "var(--mute)" }}>
                    No events in this category.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
