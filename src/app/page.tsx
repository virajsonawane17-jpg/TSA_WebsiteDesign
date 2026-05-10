import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EmergencyBanner } from "@/components/emergency-banner";
import { FeaturedResources, HowItWorks, InsightsPreview, NewsTeaser, EventsTeaser, CTASection } from "@/components/sections";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <EmergencyBanner />
      <Navbar />
      <main className="flex-grow">
        <HeroGeometric />
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
