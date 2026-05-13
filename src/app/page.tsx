import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Hero,
  FeaturedResources,
  StatsBand,
  Categories,
  NewsTeaser,
  EventsTeaser,
  InsightsPreview,
  CTASection,
} from "@/components/sections";
import { getTampaGovNews } from "@/lib/tampa-api";
import { getTampaGovEvents } from "@/lib/tampa-api";
import { TAMPA_RESOURCES } from "@/lib/resources";

export default async function Home() {
  const [news, events] = await Promise.all([
    getTampaGovNews(3).catch(() => []),
    getTampaGovEvents().catch(() => []),
  ]);

  return (
    <>
      <Navbar />
      <div className="page-wrap">
        <Hero eventCount={events.length} />
      </div>
      <main>
        <div id="home">
          <FeaturedResources />
          <StatsBand />
          <Categories />
          <NewsTeaser news={news} />
          <EventsTeaser events={events} />
          <InsightsPreview
            resourceCount={TAMPA_RESOURCES.length}
            eventCount={events.length || 25}
          />
          <CTASection />
        </div>
      </main>
      <Footer />
    </>
  );
}
