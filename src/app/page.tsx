import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EmergencyBanner } from "@/components/emergency-banner";
import { Hero, FeaturedResources, HowItWorks, InsightsPreview, NewsTeaser, EventsTeaser, CTASection } from "@/components/sections";
import { getTampaNews } from "@/lib/news";

export default async function Home() {
  const news = await getTampaNews(3);
  
  return (
    <div className="flex min-h-screen flex-col">
      <EmergencyBanner />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedResources />
        <NewsTeaser articles={news} />
        <HowItWorks />
        <EventsTeaser />
        <InsightsPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
