"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { HoverGlow } from "@/components/hover-glow";
import type { CommunityEventWithSource } from "@/lib/resources";
import { useLanguage } from "@/contexts/language-context";
import {
  ArrowRight, MapPin, Clock, Users, Calendar,
  CalendarDays, List, ChevronLeft, ChevronRight,
  ExternalLink, RefreshCw, X,
} from "lucide-react";

const DOWS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

function addToGoogleCalendar(ev: CommunityEventWithSource) {
  const title   = encodeURIComponent(ev.title);
  const loc     = encodeURIComponent(ev.location);
  const details = encodeURIComponent(ev.description || "");
  const p = parseDate(ev.date);
  let dates = "";
  if (p) {
    const pad = (n: number) => String(n).padStart(2, "0");
    const day = `${p.year}${pad(p.month)}${pad(p.day)}`;
    dates = `${day}/${day}`;
  }
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&location=${loc}&details=${details}`;
  window.open(url, "_blank");
}

const eventAccentColors = [
  { bg: "var(--coral-soft)", text: "var(--coral)", border: "var(--coral)" },
  { bg: "var(--teal-soft)",  text: "var(--teal)",  border: "var(--teal)" },
  { bg: "#fdf3da",            text: "#b07a14",      border: "#f5b945" },
];

export function EventsClient({ events }: { events: CommunityEventWithSource[] }) {
  const { s } = useLanguage();
  const ev = s.events;
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [calYear,  setCalYear]  = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth() + 1);
  const [activeFilter, setActiveFilter] = useState("All Events");
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list");
  const [modalDay, setModalDay] = useState<number | null>(null);

  /* ─── Upcoming events only (≥ today, sorted asc) ─── */
  const upcomingEvents = useMemo(() => {
    return events
      .filter((ev) => {
        const p = parseDate(ev.date);
        if (!p) return true;
        return new Date(p.year, p.month - 1, p.day) >= todayMidnight;
      })
      .sort((a, b) => {
        const pa = parseDate(a.date), pb = parseDate(b.date);
        if (!pa || !pb) return 0;
        return new Date(pa.year, pa.month - 1, pa.day).getTime()
             - new Date(pb.year, pb.month - 1, pb.day).getTime();
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  const categories = useMemo(() => {
    const cats = new Set(upcomingEvents.map((e) => e.category));
    return [ev.allEvents, ...Array.from(cats).slice(0, 6)];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upcomingEvents, ev.allEvents]);

  const filteredEvents = useMemo(() => {
    return activeFilter === ev.allEvents
      ? upcomingEvents
      : upcomingEvents.filter((e) => e.category === activeFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upcomingEvents, activeFilter, ev.allEvents]);

  /* ─── Events grouped by day in current calendar month ─── */
  const eventsByDay = useMemo(() => {
    const map: Record<number, CommunityEventWithSource[]> = {};
    filteredEvents.forEach((ev) => {
      const p = parseDate(ev.date);
      if (p && p.month === calMonth && p.year === calYear) {
        map[p.day] = map[p.day] ?? [];
        map[p.day].push(ev);
      }
    });
    return map;
  }, [filteredEvents, calMonth, calYear]);

  /* ─── Calendar grid ─── */
  const daysInMonth = new Date(calYear, calMonth, 0).getDate();
  const firstDow    = new Date(calYear, calMonth - 1, 1).getDay();

  const calDays = useMemo(() => {
    const days: Array<{ n: number | ""; muted?: boolean; today?: boolean }> = [];
    for (let i = 0; i < firstDow; i++) days.push({ n: "", muted: true });
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        n: d,
        today:
          d === now.getDate() &&
          calMonth === now.getMonth() + 1 &&
          calYear === now.getFullYear(),
      });
    }
    while (days.length % 7 !== 0) days.push({ n: "", muted: true });
    return days;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstDow, daysInMonth, calMonth, calYear]);

  /* ─── Modal events ─── */
  const modalEvents = useMemo(() => {
    if (modalDay === null) return [];
    return eventsByDay[modalDay] ?? [];
  }, [modalDay, eventsByDay]);

  function prevMonth() {
    setModalDay(null);
    if (calMonth === 1) { setCalMonth(12); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  }
  function nextMonth() {
    setModalDay(null);
    if (calMonth === 12) { setCalMonth(1); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  }

  const featured = upcomingEvents.find((e) => e.featured) ?? upcomingEvents[0];
  const listEvents = filteredEvents.slice(0, 20);

  return (
    <>
      <Navbar />
      <main style={{ background: "linear-gradient(180deg, #c8e2ef 0%, #c4dded 100%)" }}>
        <section id="events" className="section">
          <Reveal>
            <span className="section-eyebrow"><span className="dot" />{ev.eyebrow}</span>
            <h2 className="section-title">{ev.pageTitle} <em>{ev.pageTitleEm}</em></h2>
            <p className="section-sub">
              {upcomingEvents.length > 0
                ? `${upcomingEvents.length} ${ev.countSuffix} — live from the City of Tampa and community partners, updated daily.`
                : ev.noEvents}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
              <RefreshCw size={13} style={{ color: "var(--teal)" }} />
              <span style={{ fontSize: 12, color: "var(--teal)" }}>{ev.autoUpdated}</span>
            </div>
          </Reveal>

          {/* ─── Featured event ─── */}
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
                    {ev.featured} · {featured.category}
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
                      <Users size={14} /> {ev.allAges}
                    </span>
                  </div>
                  <div className="footer-row">
                    <a href={featured.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <HoverGlow size="md" background="#0E1525" glowColor="#5bc8f0" color="#fff" hoverColor="#b8e8f8" icon={<ExternalLink size={14} />}>
                        {ev.learnMore}
                      </HoverGlow>
                    </a>
                    <button className="btn-pill-ghost" onClick={() => addToGoogleCalendar(featured)}>
                      <Calendar size={14} /> {ev.addCal}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* ─── View tabs + Category filter ─── */}
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 36, marginBottom: 24 }}>
              <div className="evt-tabs">
                <button
                  className={`evt-tab ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => { setViewMode("list"); setModalDay(null); }}
                >
                  <List size={14} /> {ev.listView}
                </button>
                <button
                  className={`evt-tab ${viewMode === "calendar" ? "active" : ""}`}
                  onClick={() => setViewMode("calendar")}
                >
                  <CalendarDays size={14} /> {ev.calView}
                </button>
              </div>
              <div className="filter-row" style={{ margin: 0 }}>
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
            </div>
          </Reveal>

          {/* ─── CALENDAR VIEW ─── */}
          {viewMode === "calendar" && (
            <Reveal>
              <div className="calendar" style={{ marginTop: 0 }}>
                <div className="cal-head">
                  <h4>{monthLabel(calYear, calMonth)}</h4>
                  <div className="cal-nav">
                    <button className="icon-btn" onClick={prevMonth}><ChevronLeft size={14} /></button>
                    <button className="icon-btn" onClick={nextMonth}><ChevronRight size={14} /></button>
                  </div>
                </div>

                <div className="cal-grid">
                  {DOWS.map((d, i) => (
                    <div key={i} className="cal-dow">{d}</div>
                  ))}

                  {calDays.map((d, i) => {
                    const dayNum = typeof d.n === "number" ? d.n : null;
                    const eventsOnDay = dayNum ? (eventsByDay[dayNum] ?? []) : [];
                    const hasEvents = eventsOnDay.length > 0;

                    return (
                      <div
                        key={i}
                        className={`cal-day ${d.muted ? "muted" : ""} ${d.today ? "today" : ""} ${hasEvents ? "has" : ""}`}
                        onClick={() => {
                          if (!d.muted && dayNum !== null && hasEvents) {
                            setModalDay((prev) => (prev === dayNum ? null : dayNum));
                          }
                        }}
                        style={{ cursor: hasEvents && !d.muted ? "pointer" : "default" }}
                      >
                        {d.n !== "" && d.n}
                        {hasEvents && (
                          <span className="cal-evt-badge" title={`${eventsOnDay.length} event${eventsOnDay.length !== 1 ? "s" : ""}`}>
                            {eventsOnDay.length}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div style={{ marginTop: 14, display: "flex", gap: 18, fontSize: 12, color: "var(--mute)", flexWrap: "wrap" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--coral-soft)", border: "1px solid rgba(232,90,58,.3)", display: "inline-block" }} />
                    {ev.dayWithEvents}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--coral)", display: "inline-block", boxShadow: "0 0 8px rgba(23,135,184,.5)" }} />
                    {ev.today}
                  </span>
                </div>
              </div>

              {/* ─── Day popup modal ─── */}
              {modalDay !== null && (
                <div
                  className="cal-modal-overlay"
                  onClick={() => setModalDay(null)}
                >
                  <div
                    className="cal-modal"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="cal-modal-head">
                      <div>
                        <h4>
                          {monthLabel(calYear, calMonth).split(" ")[0]} {modalDay}, {calYear}
                        </h4>
                        <span style={{ fontSize: 13, color: "var(--mute)" }}>
                          {modalEvents.length} event{modalEvents.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <button className="cal-modal-close" onClick={() => setModalDay(null)}>
                        <X size={16} />
                      </button>
                    </div>

                    <div className="cal-modal-body">
                      {modalEvents.map((mev, i) => (
                        <div key={mev.id || i} className="cal-modal-evt">
                          <div
                            className="cal-modal-evt-accent"
                            style={{ background: eventAccentColors[i % eventAccentColors.length].border }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="cal-modal-evt-title">{mev.title}</div>
                            <div className="cal-modal-evt-meta">
                              <span><MapPin size={11} /> {mev.location}</span>
                              <span><Clock size={11} /> {mev.time}</span>
                            </div>
                            {mev.description && (
                              <p className="cal-modal-evt-desc">
                                {mev.description.slice(0, 100)}{mev.description.length > 100 ? "…" : ""}
                              </p>
                            )}
                            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                              <a
                                href={mev.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="event-cta"
                                style={{ textDecoration: "none", fontSize: 12, padding: "6px 12px" }}
                              >
                                {ev.details} <ArrowRight size={12} />
                              </a>
                              <button
                                className="btn-pill-ghost"
                                style={{ fontSize: 11, padding: "6px 10px", whiteSpace: "nowrap" }}
                                onClick={() => addToGoogleCalendar(modalEvents[i])}
                              >
                                <Calendar size={11} /> {ev.add}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Reveal>
          )}

          {/* ─── LIST VIEW ─── */}
          {viewMode === "list" && (
            <div className="event-stack">
              {listEvents.map((lev, i) => {
                const { m, d, y } = fmtEvtDate(lev.date);
                const accent = eventAccentColors[i % eventAccentColors.length];
                return (
                  <Reveal key={`${lev.id}-${i}`}>
                    <div className="event-row" style={{ borderLeft: `4px solid ${accent.border}` }}>
                      <div className="event-date" style={{ background: accent.bg, borderColor: accent.border + "40" }}>
                        <span className="m" style={{ color: accent.text }}>{m}</span>
                        <span className="d">{d}</span>
                        <span className="y">{y}</span>
                      </div>
                      <div className="event-info">
                        <h4>{lev.title}</h4>
                        <p style={{ color: "var(--mute)", fontSize: 14, margin: "4px 0 8px", lineHeight: 1.5 }}>
                          {lev.description.slice(0, 120)}{lev.description.length > 120 ? "…" : ""}
                        </p>
                        <div className="row">
                          <span><MapPin size={14} /> {lev.location}</span>
                          <span><Clock size={14} /> {lev.time}</span>
                          <span className="badge-cat ink" style={{ padding: "4px 10px", background: accent.bg, color: accent.text }}>{lev.category}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                        <a
                          href={lev.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="event-cta"
                          style={{ textDecoration: "none" }}
                        >
                          {ev.details} <ArrowRight size={14} />
                        </a>
                        <button
                          className="btn-pill-ghost"
                          style={{ fontSize: 12, padding: "7px 12px", whiteSpace: "nowrap" }}
                          onClick={() => addToGoogleCalendar(listEvents[i])}
                        >
                          <Calendar size={12} /> {ev.addCal}
                        </button>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
              {listEvents.length === 0 && (
                <div style={{ textAlign: "center", padding: "32px 0", color: "var(--mute)" }}>
                  {upcomingEvents.length === 0 ? ev.noUpcoming : ev.noMatch}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
