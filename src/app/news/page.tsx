import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Bookmark, ExternalLink } from "lucide-react";
import { getTampaGovNews } from "@/lib/tampa-api";
import { getTampaNews } from "@/lib/api";
import { TAMPA_NEWS } from "@/lib/resources";
import type { TampaGovNewsItem } from "@/lib/tampa-api";
import type { NewsArticle } from "@/lib/api";

interface DisplayNews {
  title: string;
  link: string;
  date: string;
  description: string;
  category: string;
  source: string;
  imageUrl?: string;
}

function fmtDate(raw: string): string {
  if (!raw) return "";
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw.slice(0, 12);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return raw.slice(0, 12); }
}

function fromGov(n: TampaGovNewsItem): DisplayNews {
  return {
    title: n.title,
    link: n.link,
    date: fmtDate(n.pubDate),
    description: n.description,
    category: "City News",
    source: "Tampa.gov",
    imageUrl: n.imageUrl,
  };
}

function fromApi(n: NewsArticle): DisplayNews {
  return {
    title: n.title,
    link: n.link,
    date: fmtDate(n.pubDate),
    description: n.description || "",
    category: "Tampa Bay",
    source: n.source_id,
    imageUrl: n.image_url || undefined,
  };
}

const thumbVariants = ["", "t-2", "t-3", "", "t-2", "t-3"];

export default async function NewsPage() {
  const [govNews, apiNews] = await Promise.all([
    getTampaGovNews(12).catch(() => [] as TampaGovNewsItem[]),
    getTampaNews(8).catch(() => [] as NewsArticle[]),
  ]);

  const govItems = govNews.map(fromGov);
  const apiItems = apiNews.map(fromApi);

  // Merge: gov news first (authoritative city source), then API news
  const allNews: DisplayNews[] = [...govItems, ...apiItems];

  // Fall back to static if both APIs fail
  const useStatic = allNews.length === 0;
  const displayNews: DisplayNews[] = useStatic
    ? TAMPA_NEWS.map((n) => ({
        title: n.title,
        link: n.link,
        date: n.date,
        description: n.excerpt,
        category: n.category,
        source: n.source,
        imageUrl: n.imageUrl,
      }))
    : allNews;

  const featured = displayNews[0];
  const trending = displayNews.slice(1, 5);
  const editorial = displayNews.slice(5, 11);

  const cats = ["All", "City News", "Tampa Bay", "Community", "Events", "Housing", "Education"];

  return (
    <>
      <Navbar />
      <main style={{ background: "linear-gradient(180deg, #f3eee5 0%, #e8efee 100%)" }}>
        <section id="news" className="section">
          <Reveal>
            <span className="section-eyebrow"><span className="dot" />Newsroom</span>
            <h2 className="section-title">Community News &amp; <em>Updates</em>.</h2>
            <p className="section-sub">
              Live coverage from Tampa.gov and local outlets — updated automatically every hour.
            </p>

            <div className="filter-row" style={{ marginTop: 28 }}>
              {cats.map((c) => (
                <button key={c} className="tag-chip">{c}</button>
              ))}
            </div>
          </Reveal>

          {featured && (
            <div className="news-hero">
              <Reveal>
                <article className="featured-news">
                  <div className="img" style={featured.imageUrl ? { backgroundImage: `url(${featured.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
                    {!featured.imageUrl && <div className="stripe" />}
                    <span className="badge">Featured · {featured.source}</span>
                    <svg style={{ position: "absolute", right: 24, bottom: 24, opacity: .5 }} width="120" height="120" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#fff" strokeWidth="1.5" />
                      <circle cx="60" cy="60" r="30" fill="none" stroke="#fff" strokeWidth="1" />
                      <circle cx="60" cy="60" r="10" fill="#fff" opacity=".5" />
                    </svg>
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
                      <a href={featured.link} target="_blank" rel="noopener noreferrer" className="btn-pill-dark" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                        Read full story <ExternalLink size={14} />
                      </a>
                      <button className="btn-pill-ghost"><Bookmark size={14} /> Save for later</button>
                    </div>
                  </div>
                </article>
              </Reveal>

              <Reveal>
                <aside className="trending">
                  <h4>Trending stories</h4>
                  {trending.map((t, i) => (
                    <a key={i} href={t.link} target="_blank" rel="noopener noreferrer" className="item" style={{ textDecoration: "none", color: "inherit", display: "flex", gap: 16, alignItems: "flex-start", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                      <div className="num">{String(i + 1).padStart(2, "0")}</div>
                      <div>
                        <div className="ttl">{t.title}</div>
                        <div className="sub">{t.category} · {t.date}</div>
                      </div>
                    </a>
                  ))}
                </aside>
              </Reveal>
            </div>
          )}

          {editorial.length > 0 && (
            <div className="editorial-grid">
              {editorial.map((a, i) => (
                <Reveal key={i}>
                  <article className="news-card">
                    <div
                      className={`thumb ${thumbVariants[i]}`}
                      style={a.imageUrl ? { backgroundImage: `url(${a.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
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
        </section>
      </main>
      <Footer />
    </>
  );
}
