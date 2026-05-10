"use client";

import { useState, useEffect, useMemo } from "react";
import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import type { CommunityEventWithSource } from "@/lib/resources";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  Building2,
  Ticket,
  ArrowRight,
  Waves,
} from "lucide-react";
import Link from "next/link";

/* ─── Wave divider (local) ─── */
function WaveDivider({ fill = "#ffffff" }: { fill?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none pointer-events-none" aria-hidden>
      <svg
        viewBox="0 0 1440 72"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-14 md:h-[72px]"
      >
        <path
          d="M0,44 C240,72 480,16 720,44 C960,72 1200,20 1440,44 L1440,72 L0,72 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ─── EventImage with fallback chain ─── */
const FALLBACK_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">' +
      '<rect fill="#063B4C" width="800" height="400"/>' +
      '<rect fill="#0E7490" x="0" y="0" width="800" height="400" opacity="0.35"/>' +
      '<g fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.6">' +
      '<rect x="300" y="150" width="200" height="100" rx="8"/>' +
      '<path d="M320 175 h160 M320 200 h120"/>' +
      "</g>" +
      '<text x="400" y="310" font-family="system-ui,sans-serif" font-size="16" fill="#cbd5e1" text-anchor="middle">Tampa Community Event</text>' +
      "</svg>"
  );

function categoryPlaceholder(cat: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(cat.replace(/\s+/g, "").slice(0, 20) || "tampa")}/800/400`;
}

function EventImage({
  src,
  alt,
  category,
  className,
}: {
  src?: string;
  alt: string;
  category: string;
  className?: string;
}) {
  const chain = useMemo(() => {
    const urls: string[] = [];
    if (src?.trim()) urls.push(src.trim());
    urls.push(categoryPlaceholder(category));
    urls.push(FALLBACK_SVG);
    return urls;
  }, [src, category]);

  const [idx, setIdx] = useState(0);

  useEffect(() => setIdx(0), [src, category]);

  return (
    <img
      src={chain[idx] ?? FALLBACK_SVG}
      alt={alt}
      className={className}
      onError={() => setIdx((i) => Math.min(i + 1, chain.length - 1))}
    />
  );
}

/* ─── Compact date display (e.g. "MAY 15") ─── */
function DateBadge({ dateStr }: { dateStr: string }) {
  const d = new Date(dateStr);
  const valid = !isNaN(d.getTime());
  const month = valid
    ? d.toLocaleString("en-US", { month: "short" }).toUpperCase()
    : "";
  const day = valid ? d.getDate() : "";
  return (
    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl text-white shrink-0"
      style={{ backgroundColor: "oklch(0.655 0.197 10)" }}>
      <span className="text-[10px] font-bold tracking-widest leading-none">{month}</span>
      <span className="text-2xl font-black leading-none mt-0.5">{day || "—"}</span>
    </div>
  );
}

/* ─── Single event card ─── */
function EventCard({ event, idx }: { event: CommunityEventWithSource; idx: number }) {
  const isFeatured = event.featured;
  const isTampaGov = event.source === "tampa_gov";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.4) }}
      layout
      className="group"
    >
      <div className="h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col">

        {/* ── Photo ── */}
        <div className="relative h-52 overflow-hidden shrink-0">
          <EventImage
            src={event.imageUrl}
            alt={event.title}
            category={event.category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Gradient scrim at bottom of photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Category pill — bottom-left */}
          <span
            className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
            style={{ backgroundColor: "oklch(0.49 0.118 212 / 0.85)", backdropFilter: "blur(4px)" }}
          >
            {event.category}
          </span>

          {/* Source badge — top-right */}
          {isTampaGov ? (
            <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold bg-white/90 backdrop-blur-sm text-primary rounded-full px-2.5 py-1">
              <Building2 className="w-3 h-3" />
              City of Tampa
            </span>
          ) : (
            <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1"
              style={{ color: "oklch(0.655 0.197 10)" }}>
              <Ticket className="w-3 h-3" />
              Free / Open
            </span>
          )}

          {/* Featured star */}
          {isFeatured && (
            <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: "oklch(0.655 0.197 10)" }}>
              ★ Featured
            </span>
          )}
        </div>

        {/* ── Content ── */}
        <div className="p-6 flex flex-col flex-1">

          {/* Title + date side-by-side */}
          <div className="flex items-start gap-4 mb-4">
            <DateBadge dateStr={event.date} />
            <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-3 group-hover:text-secondary transition-colors">
              {event.title}
            </h3>
          </div>

          {/* Meta rows */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4 text-secondary shrink-0" />
              <span>{event.time || "See event page for time"}</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span className="line-clamp-2">{event.location}</span>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-5 flex-1">
              {event.description}
            </p>
          )}

          {/* CTA link */}
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:opacity-90 hover:shadow-md mt-auto"
            style={{ backgroundColor: "oklch(0.235 0.068 213)" }}
          >
            View Event Details
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Pill filter button ─── */
function PillBtn({
  active,
  onClick,
  children,
  accent,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap"
      style={
        active
          ? {
              backgroundColor: accent
                ? "oklch(0.655 0.197 10)"
                : "oklch(0.235 0.068 213)",
              color: "#fff",
            }
          : { backgroundColor: "#f3f4f6", color: "#374151" }
      }
    >
      {children}
    </button>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════ */
type SourceFilter = "all" | "tampa_gov" | "community";

export function EventsContent({ events }: { events: CommunityEventWithSource[] }) {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterSource, setFilterSource] = useState<SourceFilter>("all");

  const categories = useMemo(
    () => Array.from(new Set(events.map((e) => e.category).filter(Boolean))).sort(),
    [events]
  );

  const filtered = useMemo(() => {
    let list = [...events];
    if (filterCategory !== "all") list = list.filter((e) => e.category === filterCategory);
    if (filterSource === "tampa_gov") list = list.filter((e) => e.source === "tampa_gov");
    else if (filterSource === "community") list = list.filter((e) => e.source !== "tampa_gov");
    return list;
  }, [events, filterCategory, filterSource]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <EmergencyBanner />
      <Navbar />

      <main className="flex-grow">

        {/* ════ COASTAL HEADER ════ */}
        <div className="relative bg-primary overflow-hidden">
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 coastal-pattern opacity-20 pointer-events-none" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 pb-4 text-center">
            {/* Label */}
            <div className="inline-flex items-center gap-2 text-white/60 text-sm mb-6">
              <Waves className="w-4 h-4" />
              <span className="font-medium tracking-wide">Tampa Bay Community Calendar</span>
            </div>

            {/* Heading */}
            <h1
              className="font-black text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", letterSpacing: "-0.025em" }}
            >
              Community
              <span style={{ color: "oklch(0.655 0.197 10)" }}>*</span>
              Events
            </h1>

            {/* Animated script underline */}
            <div className="flex justify-center mb-6">
              <svg viewBox="0 0 360 40" fill="none" className="w-56" aria-hidden>
                <motion.path
                  d="M8,28 C55,10 110,36 170,20 C230,4 280,32 320,18 C338,11 350,24 356,20"
                  stroke="oklch(0.655 0.197 10)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
                />
              </svg>
            </div>

            <p className="text-white/60 max-w-xl mx-auto text-base mb-4">
              Workshops, festivals, job fairs, and neighborhood gatherings — including official
              City of Tampa events, all in one place.
            </p>

            {/* Stats chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                {events.length} upcoming events
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full">
                <Building2 className="w-3.5 h-3.5" />
                {events.filter((e) => e.source === "tampa_gov").length} from City of Tampa
              </span>
            </div>
          </div>

          <WaveDivider fill="#ffffff" />
        </div>

        {/* ════ FILTER BAR ════ */}
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col gap-4">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2 items-center">
              <PillBtn active={filterCategory === "all"} onClick={() => setFilterCategory("all")}>
                All Categories
              </PillBtn>
              {categories.map((cat) => (
                <PillBtn
                  key={cat}
                  active={filterCategory === cat}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </PillBtn>
              ))}
            </div>

            {/* Source + count row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                {(
                  [
                    { v: "all", label: "All Sources" },
                    { v: "tampa_gov", label: "City of Tampa" },
                    { v: "community", label: "Community" },
                  ] as { v: SourceFilter; label: string }[]
                ).map(({ v, label }) => (
                  <PillBtn
                    key={v}
                    active={filterSource === v}
                    onClick={() => setFilterSource(v)}
                    accent
                  >
                    {label}
                  </PillBtn>
                ))}
              </div>
              <p className="text-sm text-gray-400 font-medium">
                {filtered.length} event{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* ════ EVENTS GRID ════ */}
        <div className="container mx-auto px-4 sm:px-6 pb-20">
          {filtered.length === 0 ? (
            <div className="py-20 text-center rounded-3xl border-2 border-dashed border-gray-200">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-700 mb-2">No events match your filters</h3>
              <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                Try a different category or source to see more upcoming events.
              </p>
              <button
                onClick={() => { setFilterCategory("all"); setFilterSource("all"); }}
                className="px-6 py-2.5 rounded-full text-sm font-semibold bg-primary text-white hover:opacity-90 transition-opacity"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((event, i) => (
                  <EventCard key={event.id} event={event} idx={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* ════ HOST AN EVENT CTA ════ */}
        <div className="bg-primary relative overflow-hidden">
          <div className="absolute inset-0 coastal-pattern opacity-20 pointer-events-none" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <h2
                className="font-black text-white mb-4"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
              >
                Hosting a Community Event?
              </h2>
              <p className="text-white/65 text-lg mb-8 leading-relaxed">
                Organizing a resource fair, workshop, or neighborhood gathering? Add it to our
                calendar and reach thousands of Tampa Bay residents.
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: "oklch(0.655 0.197 10)" }}
              >
                Submit an Event
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
