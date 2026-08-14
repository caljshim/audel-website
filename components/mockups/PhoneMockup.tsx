import {
  Wallet,
  Target,
  Flame,
  CalendarCheck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Gauge } from "@/components/ui/Gauge";
import { IconChip } from "@/components/ui/IconChip";

/** A card inside the phone — mirrors the app's white widget on green canvas. */
function Widget({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[16px] border border-line bg-card p-3.5 shadow-[0_1px_2px_rgba(10,42,31,0.05)] ${className}`}
    >
      {children}
    </div>
  );
}

function WidgetTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-faint">
      {children}
    </p>
  );
}

/**
 * A faithful, hand-built recreation of Audel's customizable widget
 * dashboard — the same widget grammar the iOS app uses. Purely presentational.
 */
export function PhoneMockup() {
  return (
    <div className="relative w-[300px] shrink-0 select-none sm:w-[330px]">
      {/* device shell */}
      <div className="relative rounded-[46px] border border-line bg-[#0a1512] p-[9px] shadow-float">
        <div className="relative overflow-hidden rounded-[38px] bg-canvas">
          {/* status bar + dynamic island */}
          <div className="relative flex items-center justify-between px-6 pb-1 pt-3.5 text-[11px] font-semibold text-ink">
            <span className="tabular">9:41</span>
            <div className="absolute left-1/2 top-2.5 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-[#0a1512]" />
            <div className="flex items-center gap-1 text-ink/70">
              <span className="text-[9px]">5G</span>
              <span className="inline-block h-2.5 w-4 rounded-[3px] border border-current" />
            </div>
          </div>

          {/* app header */}
          <div className="flex items-center justify-between px-4 pb-3 pt-1">
            <div>
              <p className="text-[11px] text-muted">Good morning, Caleb</p>
              <h3 className="font-display text-[19px] font-bold leading-none text-ink">
                Audel
              </h3>
            </div>
            <span className="grid size-9 place-items-center rounded-full bg-brand text-on-brand">
              <Sparkles className="size-[18px]" aria-hidden />
            </span>
          </div>

          {/* widget grid */}
          <div className="grid grid-cols-2 gap-2.5 px-3 pb-24">
            {/* spendable hero — full width */}
            <Widget className="col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <WidgetTitle>Spendable this month</WidgetTitle>
                  <p className="tabular text-[26px] font-bold leading-none text-ink">
                    $2,480
                  </p>
                </div>
                <IconChip icon={Wallet} size="sm" />
              </div>
              <div className="mt-3">
                <Gauge pct={62} height={9} />
                <div className="mt-1.5 flex justify-between text-[10px] text-muted">
                  <span>
                    <span className="tabular text-ink">$4,020</span> spent
                  </span>
                  <span className="tabular">62%</span>
                </div>
              </div>
            </Widget>

            {/* goal */}
            <Widget>
              <div className="flex items-center justify-between">
                <WidgetTitle>Emergency fund</WidgetTitle>
                <IconChip icon={Target} size="sm" />
              </div>
              <p className="tabular mt-1 text-[17px] font-bold leading-none text-ink">
                $7,800
              </p>
              <p className="tabular mb-2 text-[10px] text-muted">of $10,000</p>
              <Gauge pct={78} height={8} delay={120} />
            </Widget>

            {/* streak */}
            <Widget>
              <div className="flex items-center justify-between">
                <WidgetTitle>Streak</WidgetTitle>
                <IconChip icon={Flame} size="sm" tone="honey" />
              </div>
              <p className="tabular mt-1 text-[17px] font-bold leading-none text-ink">
                12 days
              </p>
              <p className="mb-2 text-[10px] text-muted">Under budget</p>
              <div className="flex gap-1">
                {[1, 1, 1, 1, 1, 1, 0].map((on, i) => (
                  <span
                    key={i}
                    className={`h-4 flex-1 rounded-[3px] ${
                      on ? "bg-honey/80" : "bg-honey/15"
                    }`}
                  />
                ))}
              </div>
            </Widget>

            {/* budget categories */}
            <Widget className="col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <WidgetTitle>Budgets</WidgetTitle>
                <span className="text-[10px] font-semibold text-brand">
                  This month
                </span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Groceries", pct: 54, tone: "brand" as const },
                  { label: "Dining", pct: 88, tone: "brand" as const },
                  { label: "Transport", pct: 112, tone: "brand" as const },
                ].map((row, i) => (
                  <div key={row.label} className="flex items-center gap-2.5">
                    <span className="w-16 text-[11px] text-muted">{row.label}</span>
                    <Gauge pct={row.pct} tone={row.tone} height={7} delay={i * 90} />
                    <span
                      className={`tabular w-8 text-right text-[10px] ${
                        row.pct > 100 ? "text-copper" : "text-muted"
                      }`}
                    >
                      {row.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </Widget>

            {/* schedule */}
            <Widget className="col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <WidgetTitle>Today</WidgetTitle>
                <IconChip icon={CalendarCheck} size="sm" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="tabular w-11 text-[10px] text-faint">8:30</span>
                  <span className="size-1.5 rounded-full bg-brand" />
                  <span className="text-[11px] text-ink">Morning review</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="tabular w-11 text-[10px] text-faint">18:00</span>
                  <span className="size-1.5 rounded-full bg-honey" />
                  <span className="text-[11px] text-ink">Log expenses</span>
                </div>
              </div>
            </Widget>
          </div>

          {/* floating copilot pill / tab bar */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-2.5 bg-gradient-to-t from-canvas via-canvas/90 to-transparent px-4 pb-4 pt-8">
            <div className="flex w-full items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2.5 shadow-card">
              <Sparkles className="size-4 text-brand" aria-hidden />
              <span className="text-[11px] text-muted">Ask Audel anything…</span>
              <ArrowUpRight className="ml-auto size-4 text-brand" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
