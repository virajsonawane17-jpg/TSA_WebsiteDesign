import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import { Hero, FeaturedResources, HowItWorks, InsightsPreview, CTASection } from "@/components/sections";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <EmergencyBanner />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedResources />
        <HowItWorks />
        <InsightsPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
