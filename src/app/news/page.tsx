import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EmergencyBanner } from "@/components/emergency-banner";
import { getTampaNews } from "@/lib/news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Newspaper } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

export default async function NewsPage() {
  const liveNews = await getTampaNews(12);
  
  const displayNews = liveNews.map((article, index) => ({
    id: `live-${index}`,
    title: article.title,
    excerpt: article.description,
    date: new Date(article.pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    source: article.source_id,
    category: article.category?.[0] || "Latest",
    imageUrl: article.image_url || "https://images.unsplash.com/photo-1504711432869-efd5973e8d48?q=80&w=800&auto=format&fit=crop",
    link: article.link
  }));

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

        {displayNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayNews.map((news) => (
              <Card key={news.id} className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-white group">
                <div className="relative h-48 overflow-hidden bg-muted flex items-center justify-center">
                  {news.imageUrl ? (
                    <img 
                      src={news.imageUrl} 
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Newspaper className="h-12 w-12 text-muted-foreground/30" />
                  )}
                  <Badge className="absolute top-4 right-4 bg-secondary text-white capitalize">
                    {news.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>{news.date}</span>
                    <span className="mx-1">•</span>
                    <Newspaper className="h-3 w-3" />
                    <span className="capitalize">{news.source}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-primary leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                    {news.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-muted-foreground mb-6 line-clamp-3 italic">
                    "{news.excerpt}"
                  </p>
                  <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white group" asChild>
                    <a href={news.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      Read Full Story
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <Newspaper className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-muted-foreground">No recent news found. Please check back later.</p>
          </div>
        )}

        {/* Local Source Spotlight */}
        <section className="mt-24 p-8 md:p-12 rounded-3xl bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Newspaper className="w-64 h-64" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 font-heading">Our Information Partners</h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              We aggregate news from trusted local sources to ensure our residents have the most accurate and up-to-date information regarding Tampa's development and community resources.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Tampa Bay Times", "Creative Loafing", "Patch Tampa", "WFLA", "FOX 13"].map((source) => (
                <Badge key={source} variant="secondary" className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 text-sm border-none">
                  {source}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
