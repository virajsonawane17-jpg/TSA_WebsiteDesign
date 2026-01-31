import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EmergencyBanner } from "@/components/emergency-banner";
import { getTampaNews } from "@/lib/api";
import { getNews } from "@/lib/db";
import { getTampaGovNews } from "@/lib/tampa-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Building2 } from "lucide-react";

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
                <Card key={news.article_id} className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-white group shadow-sm">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={news.image_url || "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/Image-1-1769318907736.jpg"}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 right-4 bg-secondary text-white">
                      {news.source_id}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(news.pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-primary leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                      {news.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-muted-foreground mb-6 line-clamp-3 italic">
                      "{news.description || "Click to read more about this update from the Tampa area."}"
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
                <Card key={item.link || i} className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-white shadow-sm group">
                  <div className="relative h-44 overflow-hidden bg-muted">
                    <img
                      src={item.imageUrl || "https://images.unsplash.com/photo-1569025743873-ea3e9ce9c8ef?q=80&w=800&auto=format&fit=crop"}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground border-0 text-[10px] font-semibold">
                      City of Tampa
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        {item.pubDate
                          ? new Date(item.pubDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold text-primary leading-tight line-clamp-2 group-hover:text-secondary transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between pt-0">
                    <p className="text-muted-foreground text-sm mb-5 line-clamp-3 leading-relaxed">
                      {item.description || "Read the full story on the City of Tampa website."}
                    </p>
                    <Button variant="outline" className="w-full border-primary/40 text-primary hover:bg-primary hover:text-white hover:border-primary transition-colors" asChild>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        Read on Tampa.gov
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
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
              <Card key={news.id} className="h-full flex flex-col overflow-hidden hover:shadow-md transition-all border-none bg-white group shadow-sm">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={news.imageUrl || "https://images.unsplash.com/photo-1504711432869-efd5973e8d48?q=80&w=800&auto=format&fit=crop"} 
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-3 right-3 bg-accent text-white border-none text-[10px] px-2 py-0">
                    {news.category}
                  </Badge>
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1">
                    <Calendar className="h-3 w-3" />
                    <span>{news.date} • {news.source}</span>
                  </div>
                  <CardTitle className="text-base font-bold text-primary leading-tight group-hover:text-accent transition-colors line-clamp-2">
                    {news.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                    {news.excerpt}
                  </p>
                  <Button variant="link" className="p-0 h-auto text-accent text-xs font-bold" asChild>
                    <a href={news.link} target="_blank" rel="noopener noreferrer">
                      Read more →
                    </a>
                  </Button>
                </CardContent>
              </Card>
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
