import { Navbar, Footer } from "@/components/layout-elements";
import { Hero, FeaturedResources, ResourceDirectory, SubmissionForm } from "@/components/sections";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedResources />
        <ResourceDirectory />
        <SubmissionForm />
      </main>
      <Footer />
    </div>
  );
}
