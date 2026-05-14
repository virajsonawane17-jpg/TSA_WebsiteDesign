"use client";

import { useState, useEffect } from "react";
import { Reveal } from "@/components/reveal";
import { ArrowRight, ExternalLink, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { translateItemList } from "@/lib/translate";

export interface DisplayNews {
  title: string;
  link: string;
  date: string;
  description: string;
  category: string;
  source: string;
  imageUrl?: string;
}

const thumbVariants = ["", "t-2", "t-3", "", "t-2", "t-3"];

export function NewsContent({
  featured,
  trending,
  editorial,
  pastNews,
}: {
  featured?: DisplayNews;
  trending: DisplayNews[];
  editorial: DisplayNews[];
  pastNews: DisplayNews[];
}) {
  const { s, lang } = useLanguage();
  const np = s.newsPage;

  const [txFeatured, setTxFeatured] = useState(featured);
  const [txTrending, setTxTrending] = useState(trending);
  const [txEditorial, setTxEditorial] = useState(editorial);
  const [txPast, setTxPast] = useState(pastNews);

  useEffect(() => {
    if (lang !== "es") {
      setTxFeatured(featured);
      setTxTrending(trending);
      setTxEditorial(editorial);
      setTxPast(pastNews);
      return;
    }
    let cancelled = false;
    const keys: (keyof DisplayNews)[] = ["title", "description"];
    async function run() {
      const [tFeat, tTrend, tEdit, tPast] = await Promise.all([
        featured ? translateItemList([featured], keys, "es").then((r) => r[0]) : Promise.resolve(undefined),
        translateItemList(trending, keys, "es"),
        translateItemList(editorial, keys, "es"),
        translateItemList(pastNews, keys, "es"),
      ]);
      if (!cancelled) {
        setTxFeatured(tFeat);
        setTxTrending(tTrend);
        setTxEditorial(tEdit);
        setTxPast(tPast);
      }
    }
    run();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <main style={{ background: "linear-gradient(180deg, #d4e8f5 0%, #c8e2ef 100%)" }}>
      <section id="news" className="section">
        <Reveal>
          <span className="section-eyebrow"><span className="dot" />{np.eyebrow}</span>
          <h2 className="section-title">{np.title} <em>{np.titleEm}</em> {np.titleEnd}</h2>
          <p className="section-sub">{np.sub}</p>
        </Reveal>

        {/* ─── Featured + Trending ─── */}
        {txFeatured && (
          <div className="news-hero">
            <Reveal>
              <article className="featured-news">
                <div
                  className="img"
                  style={
                    txFeatured.imageUrl
                      ? { backgroundImage: `url(${txFeatured.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                      : undefined
                  }
                >
                  {!txFeatured.imageUrl && <div className="stripe" />}
                  <span className="badge">{np.featured} · {txFeatured.source}</span>
                </div>
                <div className="body">
                  <div className="meta">
                    <span>{txFeatured.date}</span>
                    <span>·</span>
                    <span>{txFeatured.category}</span>
                    <span>·</span>
                    <span>{txFeatured.source}</span>
                  </div>
                  <h3>{txFeatured.title}</h3>
                  <p>{txFeatured.description}</p>
                  <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
                    <a
                      href={txFeatured.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill-dark"
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
                    >
                      {np.readFullStory} <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal>
              <aside className="trending">
                <h4>{np.trendingTitle}</h4>
                {txTrending.length > 0 ? txTrending.map((t, i) => (
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
                  <p style={{ color: "var(--mute)", fontSize: 14 }}>{np.noTrending}</p>
                )}
              </aside>
            </Reveal>
          </div>
        )}

        {/* ─── Editorial grid ─── */}
        {txEditorial.length > 0 && (
          <div className="editorial-grid">
            {txEditorial.map((a, i) => (
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
                      {np.readArticle} <ArrowRight size={14} />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {/* ─── Past News ─── */}
        {txPast.length > 0 && (
          <div className="past-news-section">
            <div className="past-news-head">
              <Clock size={14} style={{ color: "var(--mute)" }} />
              <h3>{np.pastTitle}</h3>
              <span className="past-news-badge">
                {txPast.length} {txPast.length !== 1 ? np.pastArticles : np.pastArticle} · {np.pastBadge}
              </span>
            </div>
            <div className="editorial-grid">
              {txPast.slice(0, 6).map((a, i) => (
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
                        {np.readArticle} <ArrowRight size={14} />
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
  );
}
