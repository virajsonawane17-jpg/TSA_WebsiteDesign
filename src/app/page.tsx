import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EmergencyBanner } from "@/components/emergency-banner";
import { Hero, FeaturedResources, HowItWorks, InsightsPreview, NewsTeaser, EventsTeaser, CTASection } from "@/components/sections";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <EmergencyBanner />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedResources />
        <NewsTeaser />
        <HowItWorks />
        <EventsTeaser />
        <InsightsPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
