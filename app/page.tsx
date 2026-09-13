import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { FinancesFeature } from "@/components/FinancesFeature";
import { GoalsFeature } from "@/components/GoalsFeature";
import { ScheduleFeature } from "@/components/ScheduleFeature";
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
        <FinancesFeature />
        <GoalsFeature />
        <ScheduleFeature />
        <FeatureGrid />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
