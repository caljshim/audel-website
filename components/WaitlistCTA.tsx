import { Apple } from "lucide-react";
import { Waitlist } from "@/components/ui/Waitlist";
import { Reveal } from "@/components/ui/Reveal";

export function WaitlistCTA() {
  return (
    <section id="waitlist" className="scroll-mt-24 px-5 py-20 sm:py-24">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[22px] bg-gradient-to-br from-brand to-brand-deep px-6 py-14 sm:px-12 sm:py-16">
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-on-brand/15 px-3 py-1.5 text-xs font-semibold text-on-brand">
            <Apple className="size-3.5" aria-hidden />
            Coming soon to iOS
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.12] text-on-brand">
            Be first to put Audel on your home screen.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-on-brand/80">
            Join the waitlist for early access. We&rsquo;ll send a single email the day
            it lands on the App Store.
          </p>
          <div className="mt-8 max-w-md">
            <Waitlist variant="on-brand" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
