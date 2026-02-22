import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EmergencyBanner } from "@/components/emergency-banner";
import { getTampaNews } from "@/lib/api";
import { getNews } from "@/lib/db";
import { getTampaGovNews } from "@/lib/tampa-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Building2 } from "lucide-react";
import { NewsCard } from "@/components/news-card";
import { TampaGovNewsCard } from "@/components/tampa-gov-news-card";
import { CommunityNewsCard } from "@/components/community-news-card";

export const revalidate = 3600; // Revalidate every hour

export default async function NewsPage() {
  const [liveNews, communityNews, tampaGovNews] = await Promise.all([
    getTampaNews(12),
    getNews(),
    getTampaGovNews(6),
  ]);
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <EmergencyBanner />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-secondary border-secondary uppercase tracking-widest text-xs">
            Tampa Pulse
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-heading">
            Community News & Updates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about local developments, housing updates, and community achievements in the Tampa Bay area.
          </p>
        </div>

        {/* Live News Grid – only shown when real-time news is available */}
        {liveNews.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-secondary rounded-full" />
              <h2 className="text-2xl font-bold text-primary">Real-time Tampa Pulse</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {liveNews.map((news) => (
                <NewsCard
                  key={news.article_id}
                  article_id={news.article_id}
                  title={news.title}
                  description={news.description}
                  image_url={news.image_url}
                  link={news.link}
                  pubDate={news.pubDate}
                  source_id={news.source_id}
                />
              ))}
            </div>
          </div>
        )}

        {/* City of Tampa official news */}
        {tampaGovNews.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                City of Tampa News & Press Releases
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tampaGovNews.map((item, i) => (
                <TampaGovNewsCard
                  key={item.link || i}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  link={item.link}
                  pubDate={item.pubDate}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}

        {/* Static Community News Section */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-accent rounded-full" />
            <h2 className="text-2xl font-bold text-primary">Community Highlights & Local Updates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityNews.map((news) => (
              <CommunityNewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                imageUrl={news.imageUrl}
                link={news.link}
                date={news.date}
                source={news.source}
                category={news.category}
              />
            ))}
          </div>
        </div>

        {/* City of Tampa – official source for credibility */}
        <section className="mt-24 p-8 md:p-12 rounded-3xl bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Building2 className="w-64 h-64" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 font-heading">City of Tampa – Official Source</h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              News and press releases on this page are sourced from the official City of Tampa website. For the most accurate and up-to-date information on Tampa&apos;s government, development, and community resources, visit the City directly.
            </p>
            <Button
              asChild
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3"
            >
              <a
                href="https://www.tampa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Building2 className="h-5 w-5" />
                Visit Tampa.gov
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
