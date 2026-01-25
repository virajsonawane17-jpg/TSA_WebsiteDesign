import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EmergencyBanner } from "@/components/emergency-banner";
import { getTampaNews } from "@/lib/api";
import { TAMPA_NEWS } from "@/lib/resources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Newspaper } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

export default async function NewsPage() {
  const liveNews = await getTampaNews(12);
  
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

        {/* Live News Grid */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-secondary rounded-full" />
            <h2 className="text-2xl font-bold text-primary">Real-time Tampa Pulse</h2>
          </div>
          
          {liveNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {liveNews.map((news) => (
                <Card key={news.article_id} className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-white group shadow-sm">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={news.image_url || "https://images.unsplash.com/photo-1504711432869-efd5973e8d48?q=80&w=800&auto=format&fit=crop"} 
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
          ) : (
            <div className="text-center py-12 bg-primary/5 rounded-2xl border border-dashed border-primary/20">
              <Newspaper className="h-10 w-10 text-primary/20 mx-auto mb-4" />
              <p className="text-muted-foreground">No real-time news found at this moment. Showing community highlights below.</p>
            </div>
          )}
        </div>

        {/* Static Community News Section */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-accent rounded-full" />
            <h2 className="text-2xl font-bold text-primary">Community Highlights & Local Updates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TAMPA_NEWS.map((news) => (
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

        {/* Local Source Spotlight */}
        <section className="mt-24 p-8 md:p-12 rounded-3xl bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Newspaper className="w-64 h-64" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 font-heading">Our Information Partners</h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              We aggregate news from trusted local and national sources to ensure our residents have the most accurate and up-to-date information regarding Tampa's development and community resources.
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
