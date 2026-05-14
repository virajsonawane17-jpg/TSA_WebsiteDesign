import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getTampaGovNews } from "@/lib/tampa-api";
import { getTampaNews } from "@/lib/api";
import { TAMPA_NEWS } from "@/lib/resources";
import type { TampaGovNewsItem } from "@/lib/tampa-api";
import type { NewsArticle } from "@/lib/api";
import { NewsContent } from "@/components/news-content";
import type { DisplayNews } from "@/components/news-content";

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
    description: n.description || "",
    category: "Tampa Bay",
    source: n.source_id,
    imageUrl: n.image_url || getFallback("Tampa Bay"),
  };
}

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
        description: n.excerpt,
        category: n.category,
        source: n.source,
        imageUrl: n.imageUrl || getFallback(n.category),
      }))
    : allNews;

  /* ─── Sort newest first ─── */
  displayNews.sort((a, b) => {
    const da = parseRawDate(a.date), db = parseRawDate(b.date);
    if (!da && !db) return 0;
    if (!da) return 1;
    if (!db) return -1;
    return db.getTime() - da.getTime();
  });

  /* ─── Split into recent (≤7 days) and past (>7 days) ─── */
  const cutoff = new Date(Date.now() - ONE_WEEK_MS);

  function isPast(item: DisplayNews): boolean {
    const d = parseRawDate(item.date);
    if (!d) return false;
    return d < cutoff;
  }

  const recentNews = displayNews.filter((n) => !isPast(n));
  const pastNews   = displayNews.filter((n) =>  isPast(n));

  const workingNews = recentNews.length > 0 ? recentNews : displayNews;

  const featured  = workingNews[0];
  const trending  = workingNews.slice(1, 5);
  const editorial = workingNews.slice(5, 11);

  return (
    <>
      <Navbar />
      <NewsContent
        featured={featured}
        trending={trending}
        editorial={editorial}
        pastNews={pastNews}
      />
      <Footer />
    </>
  );
}
