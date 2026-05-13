import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { ArrowRight, ExternalLink, Clock } from "lucide-react";
import { getTampaGovNews } from "@/lib/tampa-api";
import { getTampaNews } from "@/lib/api";
import { TAMPA_NEWS } from "@/lib/resources";
import type { TampaGovNewsItem } from "@/lib/tampa-api";
import type { NewsArticle } from "@/lib/api";

interface DisplayNews {
  title: string;
  link: string;
  date: string;
  rawDate: string;
  description: string;
  category: string;
  source: string;
  imageUrl?: string;
}

/* ─── Fallback images by category ─── */
const FALLBACK_IMAGES: Record<string, string> = {
  "City News":  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=75",
  "Tampa Bay":  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=75",
  "Community":  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=75",
  "Events":     "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=75",
  "Housing":    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=75",
  "Education":  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=75",
  "default":    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=75",
};

function getFallback(cat: string): string {
  return FALLBACK_IMAGES[cat] || FALLBACK_IMAGES["default"];
}

function fmtDate(raw: string): string {
  if (!raw) return "";
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw.slice(0, 12);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return raw.slice(0, 12); }
}

function parseRawDate(raw: string): Date | null {
  if (!raw) return null;
  try {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return d;
  } catch { /* fall through */ }
  return null;
}

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function fromGov(n: TampaGovNewsItem): DisplayNews {
  return {
    title: n.title,
    link: n.link,
    date: fmtDate(n.pubDate),
    rawDate: n.pubDate,
    description: n.description,
    category: "City News",
    source: "Tampa.gov",
    imageUrl: n.imageUrl || getFallback("City News"),
  };
}

function fromApi(n: NewsArticle): DisplayNews {
  return {
    title: n.title,
    link: n.link,
    date: fmtDate(n.pubDate),
    rawDate: n.pubDate,
    description: n.description || "",
    category: "Tampa Bay",
    source: n.source_id,
    imageUrl: n.image_url || getFallback("Tampa Bay"),
  };
}

const thumbVariants = ["", "t-2", "t-3", "", "t-2", "t-3"];

export default async function NewsPage() {
  const [govNews, apiNews] = await Promise.all([
    getTampaGovNews(20).catch(() => [] as TampaGovNewsItem[]),
    getTampaNews(12).catch(() => [] as NewsArticle[]),
  ]);

  const govItems = govNews.map(fromGov);
  const apiItems = apiNews.map(fromApi);
  const allNews: DisplayNews[] = [...govItems, ...apiItems];

  const useStatic = allNews.length === 0;
  const displayNews: DisplayNews[] = useStatic
    ? TAMPA_NEWS.map((n) => ({
        title: n.title,
        link: n.link,
        date: n.date,
        rawDate: n.date,
        description: n.excerpt,
        category: n.category,
        source: n.source,
        imageUrl: n.imageUrl || getFallback(n.category),
      }))
    : allNews;

  /* ─── Sort newest first ─── */
  displayNews.sort((a, b) => {
    const da = parseRawDate(a.rawDate), db = parseRawDate(b.rawDate);
    if (!da && !db) return 0;
    if (!da) return 1;
    if (!db) return -1;
    return db.getTime() - da.getTime();
  });

  /* ─── Split into recent (≤7 days) and past (>7 days) ─── */
  const cutoff = new Date(Date.now() - ONE_WEEK_MS);

  function isPast(item: DisplayNews): boolean {
    const d = parseRawDate(item.rawDate);
    if (!d) return false;
    return d < cutoff;
  }

  const recentNews = displayNews.filter((n) => !isPast(n));
  const pastNews   = displayNews.filter((n) =>  isPast(n));

  /* Use recent news for layout; fall back to all if everything is "past" */
  const workingNews = recentNews.length > 0 ? recentNews : displayNews;

  const featured  = workingNews[0];
  const trending  = workingNews.slice(1, 5);
  const editorial = workingNews.slice(5, 11);

  return (
    <>
      <Navbar />
      <main style={{ background: "linear-gradient(180deg, #d4e8f5 0%, #c8e2ef 100%)" }}>
        <section id="news" className="section">
          <Reveal>
            <span className="section-eyebrow"><span className="dot" />Newsroom</span>
            <h2 className="section-title">Community News &amp; <em>Updates</em>.</h2>
            <p className="section-sub">
              Live coverage from Tampa.gov and local outlets — updated automatically every hour.
            </p>
          </Reveal>

          {/* ─── Featured + Trending ─── */}
          {featured && (
            <div className="news-hero">
              <Reveal>
                <article className="featured-news">
                  <div
                    className="img"
                    style={
                      featured.imageUrl
                        ? { backgroundImage: `url(${featured.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                        : undefined
                    }
                  >
                    {!featured.imageUrl && <div className="stripe" />}
                    <span className="badge">Featured · {featured.source}</span>
                  </div>
                  <div className="body">
                    <div className="meta">
                      <span>{featured.date}</span>
                      <span>·</span>
                      <span>{featured.category}</span>
                      <span>·</span>
                      <span>{featured.source}</span>
                    </div>
                    <h3>{featured.title}</h3>
                    <p>{featured.description}</p>
                    <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
                      <a
                        href={featured.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill-dark"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
                      >
                        Read full story <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>

              <Reveal>
                <aside className="trending">
                  <h4>Trending stories</h4>
                  {trending.length > 0 ? trending.map((t, i) => (
                    <a
                      key={i}
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="item"
                      style={{ textDecoration: "none", color: "inherit", display: "flex", gap: 16, alignItems: "flex-start", padding: "12px 0", borderBottom: "1px solid var(--line)" }}
                    >
                      <div className="num">{String(i + 1).padStart(2, "0")}</div>
                      <div>
                        <div className="ttl">{t.title}</div>
                        <div className="sub">{t.category} · {t.date}</div>
                      </div>
                    </a>
                  )) : (
                    <p style={{ color: "var(--mute)", fontSize: 14 }}>
                      No trending stories at the moment — check back soon.
                    </p>
                  )}
                </aside>
              </Reveal>
            </div>
          )}

          {/* ─── Editorial grid ─── */}
          {editorial.length > 0 && (
            <div className="editorial-grid">
              {editorial.map((a, i) => (
                <Reveal key={i}>
                  <article className="news-card">
                    <div
                      className={`thumb ${thumbVariants[i]}`}
                      style={
                        a.imageUrl
                          ? { backgroundImage: `url(${a.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                          : undefined
                      }
                    >
                      <span className="tag">{a.category}</span>
                      {!a.imageUrl && (
                        <svg width="120" height="120" viewBox="0 0 120 120" style={{ opacity: .35 }}>
                          <rect x="30" y="30" width="60" height="60" rx="14" fill="none" stroke="#fff" strokeWidth="1.5" />
                          <circle cx="60" cy="60" r="14" fill="#fff" opacity=".4" />
                        </svg>
                      )}
                    </div>
                    <div className="body">
                      <div className="meta"><span>{a.date}</span><span>·</span><span>{a.source}</span></div>
                      <h3>{a.title}</h3>
                      <p>{a.description.slice(0, 120)}{a.description.length > 120 ? "…" : ""}</p>
                      <a href={a.link} target="_blank" rel="noopener noreferrer" className="read-more">
                        Read article <ArrowRight size={14} />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          {/* ─── Past News ─── */}
          {pastNews.length > 0 && (
            <div className="past-news-section">
              <div className="past-news-head">
                <Clock size={14} style={{ color: "var(--mute)" }} />
                <h3>Past News</h3>
                <span className="past-news-badge">{pastNews.length} article{pastNews.length !== 1 ? "s" : ""} · older than 7 days</span>
              </div>
              <div className="editorial-grid">
                {pastNews.slice(0, 6).map((a, i) => (
                  <Reveal key={i}>
                    <article className="news-card" style={{ opacity: 0.82 }}>
                      <div
                        className={`thumb ${thumbVariants[i]}`}
                        style={
                          a.imageUrl
                            ? { backgroundImage: `url(${a.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(20%)" }
                            : undefined
                        }
                      >
                        <span className="tag">{a.category}</span>
                      </div>
                      <div className="body">
                        <div className="meta"><span>{a.date}</span><span>·</span><span>{a.source}</span></div>
                        <h3>{a.title}</h3>
                        <p>{a.description.slice(0, 100)}{a.description.length > 100 ? "…" : ""}</p>
                        <a href={a.link} target="_blank" rel="noopener noreferrer" className="read-more">
                          Read article <ArrowRight size={14} />
                        </a>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
