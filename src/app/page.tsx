import { CampaignFilter } from "@/components/CampaignFilter";
import { CTASection } from "@/components/CTASection";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { MatchingPreview } from "@/components/MatchingPreview";
import { Navbar } from "@/components/Navbar";
import { ProblemSection } from "@/components/ProblemSection";
import { RoleToggleSection } from "@/components/RoleToggleSection";
import { SessionZeroPreview } from "@/components/SessionZeroPreview";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <RoleToggleSection />
      <CampaignFilter />
      <MatchingPreview />
      <Features />
      <SessionZeroPreview />
      <CTASection />
      <Footer />
    </main>
  );
}
