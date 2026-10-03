import { HomeScreen } from "@/components/mockups/Screens";
import { Waitlist } from "@/components/ui/Waitlist";
import { TagBadge } from "@/components/ui/TagBadge";

export function Hero() {
  return (
    <section id="top" className="sheet pt-28 sm:pt-32">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div>
          <h1 className="max-w-[15ch] text-[clamp(2.6rem,6vw,4.1rem)] font-bold leading-[1.04] tracking-[-0.04em]">
            Your money, your goals, and your day, kept on one sheet.
          </h1>
          <p className="prose-measure mt-6 text-[19px] leading-[1.5] text-prose">
            Audel reads your accounts, follows the goals you set, and walks you
            through the day. Ask it anything. It asks you before it acts.
          </p>
          <div className="mt-8 max-w-[30rem]">
            <Waitlist />
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HomeScreen />
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-rule pt-6">
        <TagBadge>Bank-linked with Plaid</TagBadge>
        <TagBadge>Read-only</TagBadge>
        <TagBadge>No trades, no transfers</TagBadge>
        <TagBadge>Yours alone</TagBadge>
        <p className="ml-auto text-[13px] text-meta">Screens are real. Figures are sample data.</p>
      </div>
    </section>
  );
}
