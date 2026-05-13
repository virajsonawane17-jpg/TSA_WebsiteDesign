"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { TAMPA_RESOURCES } from "@/lib/resources";
import type { Resource } from "@/lib/resources";
import { useLanguage } from "@/contexts/language-context";
import {
  Search, ArrowRight, Filter,
  MapPin, Phone, Globe, ChevronDown, Check,
  Share2, ExternalLink, PhoneCall,
} from "lucide-react";

const TampaResourceMap = dynamic(
  () => import("@/components/tampa-resource-map").then((m) => m.TampaResourceMap),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: "100%", background: "var(--sand)", borderRadius: "var(--r-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--mute)", fontSize: 14 }}>
        Loading map…
      </div>
    ),
  }
);

const CHIP_KEYS = ["All", "Food Assistance", "Mental Health", "Housing", "Healthcare", "Youth Programs", "Education", "Employment"];

const CAT_TONE: Record<string, string> = {
  "Food Assistance": "",
  "Mental Health": "teal",
  "Housing": "",
  "Healthcare": "teal",
  "Youth Programs": "",
  "Education": "",
  "Employment": "",
  "Crisis Support": "",
  "Legal Aid": "",
  "Seniors": "",
  "Veterans": "",
  "Arts & Culture": "",
};

function extractPhone(raw: string): string {
  const m = raw.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  return m ? m[0].replace(/\D/g, "") : "";
}

function ResourceCard({
  r,
  expanded,
  selected,
  onToggle,
  onSelect,
}: {
  r: Resource;
  expanded: boolean;
  selected: boolean;
  onToggle: () => void;
  onSelect: () => void;
}) {
  const { s } = useLanguage();
  const d = s.directory;
  const initial = r.name.charAt(0).toUpperCase();
  const tone = CAT_TONE[r.category] ?? "";
  const phoneDigits = extractPhone(r.phone || "");

  const handleShare = useCallback(async () => {
    const url = r.website || window.location.href;
    const text = `${r.name} — ${r.description}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: r.name, text, url });
        return;
      } catch { /* fall through to clipboard */ }
    }
    try {
      await navigator.clipboard.writeText(`${r.name}\n${text}\n${url}`);
      alert(d.shareSuccess);
    } catch {
      alert(`Share this resource: ${url}`);
    }
  }, [r, d.shareSuccess]);

  return (
    <article
      className="res-item"
      style={selected ? { outline: "2px solid var(--coral)", outlineOffset: 2 } : undefined}
    >
      <div className="res-head">
        <div className="logo" style={{ cursor: "pointer" }} onClick={onSelect}>{initial}</div>
        <div className="info">
          <h3 className="name">{r.name}</h3>
          <div className="meta">
            <span className={`badge-cat ${tone}`}>{r.category}</span>
            <span><MapPin size={12} /> {r.location.split(",")[1]?.trim() || "Tampa, FL"}</span>
            {r.phone && <span><Phone size={12} /> {r.phone}</span>}
          </div>
        </div>
        <div className="actions">
          {phoneDigits && (
            <a
              href={`tel:${phoneDigits}`}
              className="icon-btn"
              aria-label={`${d.call} ${r.name}`}
              title={d.call}
              style={{ textDecoration: "none" }}
            >
              <PhoneCall size={14} />
            </a>
          )}
          <button
            className="icon-btn"
            aria-label={d.share}
            title={d.share}
            onClick={handleShare}
          >
            <Share2 size={14} />
          </button>
          <a
            href={r.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-coral"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}
          >
            <ExternalLink size={14} /> {d.website}
          </a>
        </div>
      </div>
      <div className="res-body">
        <p>{r.description}</p>
        <button className="toggle-expand" onClick={onToggle}>
          {expanded ? d.hideDetails : d.seeDetails}
          <ChevronDown size={14} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
        </button>
        {expanded && (
          <div className="res-expand">
            <div>
              <h5>{d.about}</h5>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink)" }}>
                {r.longDescription || r.description}
              </p>
              {r.audiences.length > 0 && (
                <>
                  <h5 style={{ marginTop: 16 }}>{d.whoWeServe}</h5>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                    {r.audiences.map((a) => (
                      <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, padding: "3px 10px", background: "var(--sand)", borderRadius: 20, color: "var(--ink)" }}>
                        <Check size={10} /> {a}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div>
              <h5>{d.address}</h5>
              <div className="addr">{r.location}</div>
              <h5 style={{ marginTop: 16 }}>{d.phone}</h5>
              <div className="addr">{r.phone}</div>
            </div>
            <div>
              <h5>{d.contact}</h5>
              <ul>
                {phoneDigits && (
                  <li style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Phone size={12} />
                    <a href={`tel:${phoneDigits}`} style={{ color: "var(--coral)", textDecoration: "none" }}>
                      {r.phone}
                    </a>
                  </li>
                )}
                {r.email && (
                  <li style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Globe size={12} />
                    <a href={`mailto:${r.email}`} style={{ color: "var(--coral)", textDecoration: "none" }}>
                      {r.email}
                    </a>
                  </li>
                )}
                <li style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <Globe size={12} />
                  <a href={r.website} target="_blank" rel="noopener noreferrer" style={{ color: "var(--coral)", textDecoration: "none" }}>
                    {r.website.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function DirectoryPage() {
  const { s } = useLanguage();
  const d = s.directory;

  const chipLabel = (key: string) => {
    if (key === "All") return d.allCats;
    const map: Record<string, string> = {
      "Food Assistance": d.chip_food,
      "Mental Health": d.chip_mental,
      "Housing": d.chip_housing,
      "Healthcare": d.chip_healthcare,
      "Youth Programs": d.chip_youth,
      "Education": d.chip_education,
      "Employment": d.chip_employment,
    };
    return map[key] ?? key;
  };

  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState("All");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const filtered = useMemo(() => {
    let list = TAMPA_RESOURCES;
    if (activeChip !== "All") {
      list = list.filter((r) =>
        r.category === activeChip ||
        r.category.toLowerCase().includes(activeChip.toLowerCase())
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, activeChip]);

  return (
    <>
      <Navbar />
      <main style={{ background: "linear-gradient(180deg, #e0f1f8 0%, #d4e8f5 100%)" }}>
        <section id="resources" className="section">
          <Reveal>
            <span className="section-eyebrow"><span className="dot" />{d.eyebrow}</span>
            <h2 className="section-title">{d.title} <em>{d.titleEm}</em></h2>
            <p className="section-sub">{d.sub}</p>

            <div style={{ marginTop: 36 }}>
              <div className="search-bar">
                <Search size={18} color="var(--mute)" />
                <input
                  placeholder={d.searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Escape" && setQuery("")}
                />
                {query && (
                  <button
                    className="submit"
                    style={{ background: "transparent", color: "var(--mute)" }}
                    onClick={() => setQuery("")}
                  >
                    {d.clear}
                  </button>
                )}
                <button className="submit">
                  {d.search} <ArrowRight size={14} />
                </button>
              </div>

              <div className="filter-row" style={{ marginTop: 16 }}>
                {CHIP_KEYS.map((c) => (
                  <button
                    key={c}
                    className={`tag-chip ${activeChip === c ? "active" : ""}`}
                    onClick={() => setActiveChip(c)}
                  >
                    {c === "All" && <Filter size={12} />}
                    {chipLabel(c)}
                  </button>
                ))}
                <button
                  className={`tag-chip ${showMap ? "active" : ""}`}
                  style={{ marginLeft: "auto" }}
                  onClick={() => setShowMap((v) => !v)}
                >
                  <MapPin size={12} /> {showMap ? d.hideMap : d.showMap}
                </button>
              </div>

              <div style={{ color: "var(--mute)", fontSize: 13, marginTop: 10 }}>
                {filtered.length === TAMPA_RESOURCES.length
                  ? `${TAMPA_RESOURCES.length} ${d.resourcesSuffix}`
                  : `${filtered.length} / ${TAMPA_RESOURCES.length} ${d.resourcesSuffix}`}
                {query && ` · ${d.matching} "${query}"`}
              </div>
            </div>
          </Reveal>

          {showMap && (
            <Reveal>
              <div style={{ height: 420, marginTop: 24, borderRadius: "var(--r-xl)", overflow: "hidden", border: "1px solid var(--line)" }}>
                <TampaResourceMap
                  resources={filtered}
                  selectedResourceId={selectedId}
                  onSelectResource={(id) => {
                    setSelectedId(id);
                    setExpanded((prev) => ({ ...prev, [id]: true }));
                    setTimeout(() => {
                      document.getElementById(`res-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }, 100);
                  }}
                />
              </div>
            </Reveal>
          )}

          <div className="res-list" style={{ marginTop: 24 }}>
            {filtered.length === 0 ? (
              <Reveal>
                <div style={{ textAlign: "center", padding: "48px 0", color: "var(--mute)" }}>
                  <p style={{ fontSize: 16, fontWeight: 500 }}>{d.noResults}</p>
                  <p style={{ fontSize: 14, marginTop: 6 }}>{d.tryDifferent}</p>
                  <button
                    className="btn-pill-ghost"
                    style={{ marginTop: 16 }}
                    onClick={() => { setQuery(""); setActiveChip("All"); }}
                  >
                    {d.clearFilters}
                  </button>
                </div>
              </Reveal>
            ) : (
              filtered.map((r) => (
                <div key={r.id} id={`res-${r.id}`}>
                  <Reveal>
                    <ResourceCard
                      r={r}
                      expanded={!!expanded[r.id]}
                      selected={selectedId === r.id}
                      onToggle={() => setExpanded((prev) => ({ ...prev, [r.id]: !prev[r.id] }))}
                      onSelect={() => setSelectedId(r.id === selectedId ? null : r.id)}
                    />
                  </Reveal>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
