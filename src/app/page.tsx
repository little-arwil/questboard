import { CTASection } from "@/components/CTASection";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { MatchingPreview } from "@/components/MatchingPreview";
import { Navbar } from "@/components/Navbar";
import { ProfileDiscovery } from "@/components/ProfileDiscovery";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <ProfileDiscovery />
      <MatchingPreview />
      <Features />
      <CTASection />
      <Footer />
    </main>
  );
}
