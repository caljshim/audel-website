import { SlidersHorizontal, Undo2, Repeat, ShieldCheck } from "lucide-react";
import { FinancesScreen } from "@/components/mockups/Screens";
import { IconChip } from "@/components/ui/IconChip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LucideIcon } from "lucide-react";

const points: { icon: LucideIcon; title: string; copy: string }[] = [
  {
    icon: SlidersHorizontal,
    title: "Budgets that answer back",
    copy: "Give a category a limit. The gauge fills as you spend and turns copper the moment you cross it — the same mark the app uses for every kind of progress.",
  },
  {
    icon: Repeat,
    title: "Recurring money, spotted",
    copy: "Rent, subscriptions, and paychecks are recognised as they repeat, so the part of the month that is already spoken for is separated from the part you get to decide.",
  },
  {
    icon: Undo2,
    title: "Reimbursements that net out",
    copy: "A friend pays you back. Link it to the expense and Audel takes it back out of the right budget instead of counting it as new income.",
  },
  {
    icon: ShieldCheck,
    title: "Read-only, on purpose",
    copy: "Accounts connect through Plaid, and Audel imports balances and transactions. It can look. It has no way to touch.",
  },
];

export function FinancesFeature() {
  return (
    <section id="finances" className="sheet scroll-mt-20 border-b border-rule py-20 sm:py-24">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div>
          <SectionHeading
            name="Finances"
            title="Every dollar filed the moment it lands."
            intro="Connect your accounts and Audel does the bookkeeping — sorting what arrives, flagging what no budget covers, and keeping the month honest."
          />

          <div className="mt-10">
            {points.map((p, i) => (
              <div
                key={p.title}
                className={i < points.length - 1 ? "border-b border-rule-faint" : undefined}
              >
                <div className="flex gap-4 py-5">
                  <IconChip icon={p.icon} size="md" />
                  <div className="prose-measure">
                    <h3 className="text-[17px] font-semibold">{p.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.55] text-prose">{p.copy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <FinancesScreen />
        </div>
      </div>
    </section>
  );
}
