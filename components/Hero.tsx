import { Apple } from "lucide-react";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { Waitlist } from "@/components/ui/Waitlist";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-brand pb-16 pt-28 text-on-brand sm:pt-32 lg:pb-24"
    >
      {/* green depth + warm glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(80% 70% at 82% 4%, #2c7a66 0%, transparent 55%)," +
            "radial-gradient(70% 60% at 8% 100%, #133c33 0%, transparent 55%)," +
            "linear-gradient(180deg, #1e6051 0%, #184f43 100%)",
        }}
      />
      {/* scheduler grid, drawn in cream */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(#fff7e9 1px, transparent 1px), linear-gradient(90deg, #fff7e9 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(75% 65% at 50% 35%, #000 25%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(75% 65% at 50% 35%, #000 25%, transparent 80%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* copy */}
        <div className="max-w-xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/12 px-3 py-1.5 text-xs font-semibold text-cream ring-1 ring-cream/20">
              <Apple className="size-3.5" aria-hidden />
              Coming soon to iOS
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-cream">
              One AI copilot for your{" "}
              <span className="text-honey-light">money</span>,{" "}
              <span className="text-honey-light">goals</span>, and{" "}
              <span className="text-honey-light">days</span>.
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-5 text-lg leading-relaxed text-cream/80">
              Audel connects your accounts, tracks the goals you set, and keeps your
              schedule on plan — then answers the hard questions across all of it.
              Private by design, and it always asks before it acts.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 max-w-md" id="waitlist-hero">
              <Waitlist variant="on-brand" />
            </div>
          </Reveal>

          <Reveal delay={300}>
            <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
              {[
                { n: "3", l: "domains, one copilot" },
                { n: "100%", l: "read-only by default" },
                { n: "0", l: "trades without your yes" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="tabular text-2xl font-bold text-cream">{s.n}</dt>
                  <dd className="text-xs text-cream/60">{s.l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* phone */}
        <Reveal delay={200} className="flex justify-center lg:justify-end">
          <div className="float">
            <PhoneMockup />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
