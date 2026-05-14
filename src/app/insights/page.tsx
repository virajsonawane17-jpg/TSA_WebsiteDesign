import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TAMPA_RESOURCES } from "@/lib/resources";
import { getTampaGovEvents } from "@/lib/tampa-api";
import type { CommunityEventWithSource } from "@/lib/resources";
import { InsightsContent } from "@/components/insights-content";

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

  const barCats = catStats.slice(0, 6);
  const maxCount = Math.max(...barCats.map((c) => c.count), 1);

  return (
    <>
      <Navbar />
      <InsightsContent
        totalResources={totalResources}
        categoryCount={categoryCount}
        eventCount={eventCount}
        featuredPartners={featuredPartners}
        catStats={catStats}
        arcs={arcs}
        donutSegs={donutSegs}
        barCats={barCats}
        maxCount={maxCount}
        spPath={spPath}
        spW={spW}
        spH={spH}
      />
      <Footer />
    </>
  );
}
