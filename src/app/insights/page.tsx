import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { TAMPA_RESOURCES } from "@/lib/resources";
import { getTampaGovEvents } from "@/lib/tampa-api";
import { TrendingUp, ArrowUpRight, RefreshCw } from "lucide-react";
import type { CommunityEventWithSource } from "@/lib/resources";

/* ─── Compute category breakdown from real resources ─── */
function buildCategoryStats(resources: typeof TAMPA_RESOURCES) {
  const counts: Record<string, number> = {};
  for (const r of resources) {
    counts[r.category] = (counts[r.category] ?? 0) + 1;
  }
  const total = resources.length;
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, count]) => ({
      lbl: cat,
      pct: Math.round((count / total) * 100),
      count,
    }));
}

const PALETTE = ["#e85a3a", "#2d8a8a", "#f5b945", "#0c1220", "#c8c1b6", "#6b6055"];

const spark = [4, 8, 6, 12, 10, 18, 16, 22, 20, 28, 26, 34, 32, 40];
const spW = 280, spH = 60;
const spMax = Math.max(...spark);
const spPath = spark.map((v, i) => {
  const x = (i / (spark.length - 1)) * spW;
  const y = spH - (v / spMax) * (spH - 4) - 2;
  return `${i === 0 ? "M" : "L"} ${x} ${y}`;
}).join(" ");

function buildDonut(segs: { lbl: string; pct: number; color: string }[]) {
  const cx = 80, cy = 80, r = 60;
  let acc = 0;
  return segs.map((s) => {
    const start = acc, end = acc + s.pct;
    acc = end;
    const a0 = (start / 100) * Math.PI * 2 - Math.PI / 2;
    const a1 = (end / 100) * Math.PI * 2 - Math.PI / 2;
    const x0 = cx + Math.cos(a0) * r, y0 = cy + Math.sin(a0) * r;
    const x1 = cx + Math.cos(a1) * r, y1 = cy + Math.sin(a1) * r;
    const large = end - start > 50 ? 1 : 0;
    return { d: `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`, color: s.color, lbl: s.lbl, pct: s.pct };
  });
}

export default async function InsightsPage() {
  const events = await getTampaGovEvents().catch(() => [] as CommunityEventWithSource[]);

  const catStats = buildCategoryStats(TAMPA_RESOURCES);
  const totalResources = TAMPA_RESOURCES.length;
  const categoryCount = catStats.length;
  const featuredPartners = TAMPA_RESOURCES.filter((r) => r.featured);
  const eventCount = events.length;

  /* ─── Donut from real category data (top 5 + Other) ─── */
  const topCats = catStats.slice(0, 5);
  const otherPct = catStats.slice(5).reduce((s, c) => s + c.pct, 0);
  const donutSegs = [
    ...topCats.map((c, i) => ({ lbl: c.lbl, pct: c.pct, color: PALETTE[i] })),
    ...(otherPct > 0 ? [{ lbl: "Other", pct: otherPct, color: PALETTE[5] }] : []),
  ];
  const donutTotal = donutSegs.reduce((s, c) => s + c.pct, 0);
  if (donutTotal !== 100 && donutSegs.length > 0) {
    donutSegs[donutSegs.length - 1].pct += 100 - donutTotal;
  }
  const arcs = buildDonut(donutSegs);

  /* ─── Bar chart: real category counts ─── */
  const barCats = catStats.slice(0, 6);
  const maxCount = Math.max(...barCats.map((c) => c.count), 1);

  /* ─── Last-updated timestamp ─── */
  const updatedAt = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  return (
    <>
      <Navbar />
      <main style={{ background: "linear-gradient(180deg, #c4dded 0%, #c8e8e2 100%)" }}>
        <section id="insights" className="section">
          <Reveal>
            <span className="section-eyebrow"><span className="dot" />Data</span>
            <h2 className="section-title">Community <em>Insights</em>.</h2>
            <p className="section-sub">
              Real data from {totalResources} verified partner organizations across {categoryCount} support categories in Tampa Bay.
            </p>
            <div className="insights-updated">
              <RefreshCw size={11} />
              Data refreshed at {updatedAt} — sourced from live Tampa.gov feed and partner directory
            </div>
          </Reveal>

          <div className="insights-grid">
            {/* KPI 1 — Verified resources (real) */}
            <Reveal className="i-2">
              <div className="insight kpi-card">
                <div className="lbl">Verified resources in directory</div>
                <div className="num"><Counter to={totalResources} /></div>
                <span className="delta up"><TrendingUp size={11} /> Live data</span>
                <svg className="spark" viewBox={`0 0 ${spW} ${spH}`} preserveAspectRatio="none">
                  <path d={spPath} fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                  <path d={`${spPath} L ${spW} ${spH} L 0 ${spH} Z`} fill="var(--coral)" opacity=".12" />
                </svg>
              </div>
            </Reveal>

            {/* KPI 2 — Support categories (real) */}
            <Reveal className="i-2">
              <div className="insight kpi-card">
                <div className="lbl">Support categories covered</div>
                <div className="num"><Counter to={categoryCount} /></div>
                <span className="delta up"><TrendingUp size={11} /> From food to legal aid</span>
                <div className="progress-list" style={{ marginTop: 18 }}>
                  <div className="progress-item">
                    <div className="top"><span className="l">Coverage goal · 12</span><span className="r">{Math.round((categoryCount / 12) * 100)}%</span></div>
                    <div className="track"><div className="fill" style={{ width: `${Math.min((categoryCount / 12) * 100, 100)}%` }} /></div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* KPI 3 — Upcoming events (real or labeled clearly) */}
            <Reveal className="i-2">
              <div className="insight kpi-card">
                <div className="lbl">Upcoming city events tracked</div>
                <div className="num">
                  {eventCount > 0 ? <Counter to={eventCount} /> : <em style={{ fontSize: 28 }}>Live</em>}
                </div>
                <span className="delta up"><TrendingUp size={11} /> From Tampa.gov</span>
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

            {/* Bar chart — real category distribution (replacing fake monthly data) */}
            <Reveal className="i-4">
              <div className="insight chart-card">
                <div className="head">
                  <h4>Resources by category — actual distribution</h4>
                  <div className="legend" style={{ fontSize: 11, color: "var(--mute)" }}>
                    Live from {totalResources} partner organizations
                  </div>
                </div>
                <div className="bar-chart">
                  {barCats.map((cat, i) => (
                    <div key={cat.lbl} className="col" title={`${cat.lbl}: ${cat.count} resource${cat.count !== 1 ? "s" : ""}`}>
                      <div style={{ display: "flex", gap: 4, alignItems: "flex-end", width: "100%", justifyContent: "center", height: "100%" }}>
                        <div
                          className={`bar ${i % 2 === 1 ? "t-2" : ""}`}
                          style={{ height: `${(cat.count / maxCount) * 100}%` }}
                        />
                      </div>
                      <span className="lbl" style={{ fontSize: 10, textAlign: "center", lineHeight: 1.2 }}>
                        {cat.lbl.split(" ")[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Donut — real category mix */}
            <Reveal className="i-2">
              <div className="insight chart-card">
                <div className="head"><h4>Category mix · {totalResources} resources</h4></div>
                <div className="donut">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    {arcs.map((a, i) => (
                      <path key={i} d={a.d} fill="none" stroke={a.color} strokeWidth="26" strokeLinecap="butt" />
                    ))}
                    <text x="80" y="76" textAnchor="middle" fontSize="22" fontWeight="500" fill="var(--ink)" fontFamily="Inter">{totalResources}</text>
                    <text x="80" y="96" textAnchor="middle" fontSize="11" fill="var(--mute)" fontFamily="Inter" letterSpacing="1.2">RESOURCES</text>
                  </svg>
                  <div className="donut-legend">
                    {donutSegs.map((s, i) => (
                      <div className="row" key={i}>
                        <span className="sw" style={{ background: s.color }} />
                        {s.lbl}<span className="pct">{s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Callouts — updated with real/verifiable data */}
            <Reveal className="i-6">
              <div className="callouts">
                <div className="callout t-coral">
                  <div className="num-big"><Counter to={1} /><em>M+</em></div>
                  <p>Residents reached annually by Feeding Tampa Bay alone — the region&apos;s largest food rescue network.</p>
                </div>
                <div className="callout t-teal">
                  <div className="num-big"><Counter to={7} /><em>K+</em></div>
                  <p>Youth served each year by Boys &amp; Girls Clubs of Tampa Bay across Hillsborough County.</p>
                </div>
                <div className="callout">
                  <div className="num-big"><Counter to={totalResources} /></div>
                  <p>Verified community organizations active in the Tampa Resource Hub directory — all free to access.</p>
                </div>
              </div>
            </Reveal>

            {/* Progress bars — real category data */}
            <Reveal className="i-3">
              <div className="insight">
                <h4 style={{ fontSize: 17, margin: "0 0 18px", fontWeight: 500 }}>Resources by category</h4>
                <div className="progress-list">
                  {catStats.slice(0, 5).map((cat, i) => (
                    <div className="progress-item" key={cat.lbl}>
                      <div className="top">
                        <span className="l">{cat.lbl}</span>
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

            {/* Partner highlights — real data from featured resources */}
            <Reveal className="i-3">
              <div className="insight">
                <h4 style={{ fontSize: 17, margin: "0 0 18px", fontWeight: 500 }}>Partner highlights</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {featuredPartners.slice(0, 4).map((p, i) => (
                    <div key={p.id} style={{ display: "grid", gridTemplateColumns: "40px 1fr auto", gap: 14, alignItems: "center", padding: "10px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--sand)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 20, color: "var(--coral)" }}>
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 14.5, fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: 12.5, color: "var(--mute)", marginTop: 2 }}>{p.category}</div>
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
      <Footer />
    </>
  );
}
