"use client";

import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { TrendingUp, ArrowUpRight, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import type { Resource } from "@/lib/resources";

export interface InsightsData {
  totalResources: number;
  categoryCount: number;
  eventCount: number;
  featuredPartners: Resource[];
  catStats: Array<{ lbl: string; pct: number; count: number }>;
  arcs: Array<{ d: string; color: string; lbl: string; pct: number }>;
  donutSegs: Array<{ lbl: string; pct: number; color: string }>;
  barCats: Array<{ lbl: string; pct: number; count: number }>;
  maxCount: number;
  spPath: string;
  spW: number;
  spH: number;
}

export function InsightsContent({
  totalResources, categoryCount, eventCount, featuredPartners,
  catStats, arcs, donutSegs, barCats, maxCount,
  spPath, spW, spH,
}: InsightsData) {
  const { s, lang } = useLanguage();
  const ins = s.insightsPage;
  const locale = lang === "es" ? "es-US" : "en-US";
  const txCat = (lbl: string) => (s.catMap as Record<string, string>)[lbl] ?? lbl;

  const updatedAt = new Date().toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit", hour12: true });

  return (
    <main style={{ background: "linear-gradient(180deg, #c4dded 0%, #c8e8e2 100%)" }}>
      <section id="insights" className="section">
        <Reveal>
          <span className="section-eyebrow"><span className="dot" />{ins.eyebrow}</span>
          <h2 className="section-title">{ins.title} <em>{ins.titleEm}</em>{ins.titleEnd}</h2>
          <p className="section-sub">
            {ins.sub} {totalResources} {ins.subMid} {categoryCount} {ins.subEnd}
          </p>
          <div className="insights-updated">
            <RefreshCw size={11} />
            {ins.refreshed} {updatedAt} {ins.refreshedSuffix}
          </div>
        </Reveal>

        <div className="insights-grid">
          {/* KPI 1 */}
          <Reveal className="i-2">
            <div className="insight kpi-card">
              <div className="lbl">{ins.kpi1_lbl}</div>
              <div className="num"><Counter to={totalResources} /></div>
              <span className="delta up"><TrendingUp size={11} /> {ins.kpi1_delta}</span>
              <svg className="spark" viewBox={`0 0 ${spW} ${spH}`} preserveAspectRatio="none">
                <path d={spPath} fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                <path d={`${spPath} L ${spW} ${spH} L 0 ${spH} Z`} fill="var(--coral)" opacity=".12" />
              </svg>
            </div>
          </Reveal>

          {/* KPI 2 */}
          <Reveal className="i-2">
            <div className="insight kpi-card">
              <div className="lbl">{ins.kpi2_lbl}</div>
              <div className="num"><Counter to={categoryCount} /></div>
              <span className="delta up"><TrendingUp size={11} /> {ins.kpi2_delta}</span>
              <div className="progress-list" style={{ marginTop: 18 }}>
                <div className="progress-item">
                  <div className="top">
                    <span className="l">{ins.kpi2_goal}</span>
                    <span className="r">{Math.round((categoryCount / 12) * 100)}%</span>
                  </div>
                  <div className="track"><div className="fill" style={{ width: `${Math.min((categoryCount / 12) * 100, 100)}%` }} /></div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* KPI 3 */}
          <Reveal className="i-2">
            <div className="insight kpi-card">
              <div className="lbl">{ins.kpi3_lbl}</div>
              <div className="num">
                {eventCount > 0 ? <Counter to={eventCount} /> : <em style={{ fontSize: 28 }}>{ins.live}</em>}
              </div>
              <span className="delta up"><TrendingUp size={11} /> {ins.kpi3_delta}</span>
              <div style={{ display: "flex", gap: 4, marginTop: 18 }}>
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 8, height: 28,
                      background: eventCount > 0 && i < Math.min(Math.round((eventCount / 50) * 14), 14)
                        ? "var(--coral)"
                        : "var(--sand)",
                      borderRadius: 3,
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Bar chart */}
          <Reveal className="i-4">
            <div className="insight chart-card">
              <div className="head">
                <h4>{ins.chartTitle}</h4>
                <div className="legend" style={{ fontSize: 11, color: "var(--mute)" }}>
                  {ins.chartSub} {totalResources} {ins.chartSuffix}
                </div>
              </div>
              <div className="bar-chart">
                {barCats.map((cat, i) => (
                  <div key={cat.lbl} className="col" title={`${txCat(cat.lbl)}: ${cat.count} ${cat.count !== 1 ? ins.resources : ins.resource}`}>
                    <div style={{ display: "flex", gap: 4, alignItems: "flex-end", width: "100%", justifyContent: "center", height: "100%" }}>
                      <div
                        className={`bar ${i % 2 === 1 ? "t-2" : ""}`}
                        style={{ height: `${(cat.count / maxCount) * 100}%` }}
                      />
                    </div>
                    <span className="lbl" style={{ fontSize: 10, textAlign: "center", lineHeight: 1.2 }}>
                      {txCat(cat.lbl).split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Donut */}
          <Reveal className="i-2">
            <div className="insight chart-card">
              <div className="head"><h4>{ins.donutTitle} {totalResources} {ins.resources}</h4></div>
              <div className="donut">
                <svg width="160" height="160" viewBox="0 0 160 160">
                  {arcs.map((a, i) => (
                    <path key={i} d={a.d} fill="none" stroke={a.color} strokeWidth="26" strokeLinecap="butt" />
                  ))}
                  <text x="80" y="76" textAnchor="middle" fontSize="22" fontWeight="500" fill="var(--ink)" fontFamily="Inter">{totalResources}</text>
                  <text x="80" y="96" textAnchor="middle" fontSize="11" fill="var(--mute)" fontFamily="Inter" letterSpacing="1.2">{ins.donutInner}</text>
                </svg>
                <div className="donut-legend">
                  {donutSegs.map((s, i) => (
                    <div className="row" key={i}>
                      <span className="sw" style={{ background: s.color }} />
                      {txCat(s.lbl)}<span className="pct">{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Callouts */}
          <Reveal className="i-6">
            <div className="callouts">
              <div className="callout t-coral">
                <div className="num-big"><Counter to={1} /><em>M+</em></div>
                <p>{ins.callout1}</p>
              </div>
              <div className="callout t-teal">
                <div className="num-big"><Counter to={7} /><em>K+</em></div>
                <p>{ins.callout2}</p>
              </div>
              <div className="callout">
                <div className="num-big"><Counter to={totalResources} /></div>
                <p>{ins.callout3}</p>
              </div>
            </div>
          </Reveal>

          {/* Progress bars */}
          <Reveal className="i-3">
            <div className="insight">
              <h4 style={{ fontSize: 17, margin: "0 0 18px", fontWeight: 500 }}>{ins.progressTitle}</h4>
              <div className="progress-list">
                {catStats.slice(0, 5).map((cat, i) => (
                  <div className="progress-item" key={cat.lbl}>
                    <div className="top">
                      <span className="l">{txCat(cat.lbl)}</span>
                      <span className="r">{cat.count} ({cat.pct}%)</span>
                    </div>
                    <div className="track">
                      <div
                        className={`fill ${i === 1 ? "t-teal" : i === 2 ? "t-sun" : i === 4 ? "t-teal" : ""}`}
                        style={{ width: `${Math.min(cat.pct * 3, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Partner highlights */}
          <Reveal className="i-3">
            <div className="insight">
              <h4 style={{ fontSize: 17, margin: "0 0 18px", fontWeight: 500 }}>{ins.partnersTitle}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {featuredPartners.slice(0, 4).map((p, i) => (
                  <div key={p.id} style={{ display: "grid", gridTemplateColumns: "40px 1fr auto", gap: 14, alignItems: "center", padding: "10px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "#fff", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                      {p.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.logoUrl} alt={p.name} style={{ width: 36, height: 36, objectFit: "contain" }} />
                      ) : (
                        <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 20, color: "var(--coral)" }}>{p.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: 12.5, color: "var(--mute)", marginTop: 2 }}>{txCat(p.category)}</div>
                    </div>
                    <a href={p.website} target="_blank" rel="noopener noreferrer" style={{ color: "var(--mute)" }}>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
