import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Pillars } from "@/components/Pillars";
import { CopilotSpotlight } from "@/components/CopilotSpotlight";
import { HowItWorks } from "@/components/HowItWorks";
import { FeatureGrid } from "@/components/FeatureGrid";
import { WaitlistCTA } from "@/components/WaitlistCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Pillars />
        <CopilotSpotlight />
        <HowItWorks />
        <FeatureGrid />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
