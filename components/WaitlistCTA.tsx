import { Apple } from "lucide-react";
import { Waitlist } from "@/components/ui/Waitlist";
import { Reveal } from "@/components/ui/Reveal";

export function WaitlistCTA() {
  return (
    <section id="waitlist" className="scroll-mt-24 px-5 py-20 sm:py-24">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-brand px-6 py-16 text-center shadow-float sm:px-12 sm:py-20">
        {/* faint gauge motif in the band */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          aria-hidden
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent 0 26px, rgba(255,255,255,0.6) 26px 27px)",
            maskImage: "radial-gradient(70% 120% at 50% 0%, #000, transparent 70%)",
            WebkitMaskImage: "radial-gradient(70% 120% at 50% 0%, #000, transparent 70%)",
          }}
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-on-brand/15 px-3 py-1.5 text-xs font-semibold text-on-brand">
            <Apple className="size-3.5" aria-hidden />
            Coming soon to iOS
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.02] text-on-brand">
            Be first to put Audel on your home screen.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-on-brand/80">
            Join the waitlist for early access. We&rsquo;ll send a single email the day
            it lands on the App Store.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <Waitlist variant="on-brand" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
