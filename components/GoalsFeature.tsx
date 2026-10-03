import { PiggyBank, ScanBarcode, MapPin, Plug } from "lucide-react";
import { GoalsScreen } from "@/components/mockups/Screens";
import { IconChip } from "@/components/ui/IconChip";
import { LedgerRow } from "@/components/ui/Ledger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagBadge } from "@/components/ui/TagBadge";
import type { LucideIcon } from "lucide-react";

/**
 * Goals, shown as the app draws them rather than rebuilt here. An earlier pass
 * recreated `PinnedGoalsWidget` in HTML at page scale; it drifted, the way every
 * reimplementation of a SwiftUI screen does, so this section now shows the
 * capture and spends its words on what a goal is wired to.
 */
const sources: { icon: LucideIcon; tone: "pine" | "honey" | "slate"; name: string; meta: string }[] = [
  {
    icon: PiggyBank,
    tone: "pine",
    name: "Your accounts",
    meta: "Connected read-only through Plaid. A savings target reads the balance itself; a spending limit watches the transactions land.",
  },
  {
    icon: ScanBarcode,
    tone: "honey",
    name: "A barcode",
    meta: "Scan the packet and the macros fill themselves in — nothing to weigh, nothing to look up at the end of the day.",
  },
  {
    icon: MapPin,
    tone: "slate",
    name: "A place",
    meta: "Pin the gym. The goal checks itself off in the moment you arrive, which is the only moment you were ever going to do it.",
  },
];

export function GoalsFeature() {
  return (
    <section id="goals" className="sheet scroll-mt-20 border-b border-rule py-20 sm:py-24">
      <SectionHeading
        name="Goals"
        title="Point a goal at something real and it tracks itself."
        intro="A goal in Audel is wired to a source — your balances, a barcode, a place you go, a workout you finish. You set the target once; the progress arrives on its own, in the one progress mark the app uses for everything."
      />

      <div className="mt-12 grid items-center gap-14 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
        <div className="flex justify-center lg:justify-start">
          <GoalsScreen />
        </div>

        <div>
          {sources.map((s) => (
            <LedgerRow
              key={s.name}
              name={s.name}
              meta={s.meta}
              leading={<IconChip icon={s.icon} tone={s.tone} size="md" />}
            />
          ))}

          <div className="pt-6">
            <div className="flex items-center gap-3">
              <IconChip icon={Plug} size="md" />
              <TagBadge tone="honey">On the roadmap</TagBadge>
            </div>
            <h3 className="mt-4 text-[19px] font-semibold">Bring your own source</h3>
            <p className="prose-measure mt-2 text-[15px] leading-[1.55] text-prose">
              Goals are opening up to any MCP server, so the data you already
              keep somewhere else can become a target here. Hours slept, pages
              read, miles flown — things Audel never shipped with.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
