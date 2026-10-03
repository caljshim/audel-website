import { Waitlist } from "@/components/ui/Waitlist";
import { FeatureCard, FeatureMetrics } from "@/components/ui/Ledger";

/**
 * The one brand-filled surface on the page.
 *
 * The app allows at most one `FeatureCard` per screen — a second one cancels
 * the first — so the whole sheet spends its single pine surface here, on the
 * one thing it is asking for.
 */
export function WaitlistCTA() {
  return (
    <section id="waitlist" className="sheet scroll-mt-20 py-20 sm:py-24">
      <FeatureCard label="Coming soon to iOS">
        <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
          <div>
            <h2 className="max-w-[16ch] text-[clamp(2rem,4vw,2.9rem)] font-bold leading-[1.08] tracking-[-0.035em] text-on-pine">
              Put Audel on your home screen first.
            </h2>
            <p className="mt-4 max-w-[34ch] text-[17px] leading-[1.5] text-on-pine/75">
              Leave an address and we&rsquo;ll send one email, the day it reaches
              the App Store.
            </p>
            <div className="mt-7 max-w-[30rem]">
              <Waitlist variant="on-pine" note="No spam. Unsubscribe in one tap." />
            </div>
          </div>

          <FeatureMetrics
            columns={1}
            metrics={[
              { label: "Platform", value: "iOS" },
              { label: "Accounts", value: "Read-only" },
              { label: "At launch", value: "Free" },
            ]}
          />
        </div>
      </FeatureCard>
    </section>
  );
}
