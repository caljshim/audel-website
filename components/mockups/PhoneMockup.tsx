import Image from "next/image";
import {
  Settings,
  Sparkles,
  ArrowDownLeft,
  ArrowUpRight,
  LayoutGrid,
  Target,
  Calendar,
  CreditCard,
} from "lucide-react";
import { Gauge } from "@/components/ui/Gauge";

/**
 * A hand-built recreation of Audel's iOS home screen — the customizable widget
 * dashboard the app actually opens to. Layout, tokens, and widget grammar are
 * drawn from the SwiftUI source: flat cards on sage, a large masthead, and
 * an edge-to-edge navigation bar with Audel in the center. Illustrative data.
 */

/** The current WidgetCard: flat white fill and a sentence-case title. */
function WidgetCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`app-surface p-3.5 ${className}`}
    >
      {title ? (
        <p className="mb-3 text-[12px] font-semibold text-ink">
          {title}
        </p>
      ) : null}
      {children}
    </div>
  );
}

/** One Today/Week/Month cell of the Left-to-spend period control. */
function PeriodCell({
  label,
  value,
  active,
  over,
}: {
  label: string;
  value: string;
  active?: boolean;
  over?: boolean;
}) {
  return (
    <div
      className={`flex-1 rounded-[10px] px-2 py-1.5 ${
        active ? "bg-[#146b54]/[0.13]" : "bg-[rgba(20,53,42,0.05)]"
      }`}
    >
      <p className="text-[8.5px] text-muted">{label}</p>
      <p
        className={`tabular-round text-[13px] font-extrabold leading-tight ${
          over ? "text-copper" : "text-brand"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/** A budget line: name + remaining, "$spent of $limit", and the signature gauge. */
function BudgetRow({
  label,
  remaining,
  spent,
  limit,
  pct,
  over,
}: {
  label: string;
  remaining: string;
  spent: string;
  limit: string;
  pct: number;
  over?: boolean;
}) {
  return (
    <div className="py-0.5">
      <div className="flex items-baseline justify-between">
        <span className="text-[12px] font-medium text-ink">{label}</span>
        <span
          className={`flex items-baseline gap-1 ${
            over ? "text-copper" : "text-brand"
          }`}
        >
          <span className="tabular-round text-[12px] font-bold">{remaining}</span>
          <span className="text-[8.5px] font-medium">left</span>
        </span>
      </div>
      <p className="tabular-round mb-1.5 mt-0.5 text-[9.5px] text-muted">
        {spent} of {limit}
      </p>
      <Gauge pct={pct} height={8} />
    </div>
  );
}

// Categorical chart scale, straight from Theme.chartScale (light mode).
const CHART = ["#146b54", "#b9871f", "#46698c", "#b0562f", "#7a5586"];

export function PhoneMockup() {
  const spending = [
    { label: "Rent", amt: "$1,850", w: 100, c: CHART[0] },
    { label: "Groceries", amt: "$612", w: 64, c: CHART[1] },
    { label: "Dining", amt: "$438", w: 47, c: CHART[2] },
    { label: "Transport", amt: "$286", w: 32, c: CHART[3] },
    { label: "Shopping", amt: "$204", w: 24, c: CHART[4] },
  ];

  return (
    <div className="relative w-full max-w-[300px] shrink-0 select-none sm:max-w-[332px]">
      {/* device shell */}
      <div className="relative rounded-[46px] border border-[#0a1512] bg-[#0a1512] p-[9px] shadow-float">
        <div className="relative h-[672px] overflow-hidden rounded-[38px] bg-app-canvas">
          {/* status bar + dynamic island */}
          <div className="relative flex items-center justify-between px-6 pb-1 pt-3.5 text-[11px] font-semibold text-ink">
            <span className="tabular-round">9:41</span>
            <div className="absolute left-1/2 top-2.5 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-[#0a1512]" />
            <div className="flex items-center gap-1 text-ink/70">
              <span className="text-[9px] font-bold">5G</span>
              <span className="inline-block h-2.5 w-4 rounded-[3px] border border-current" />
            </div>
          </div>

          {/* TabMasthead: large, left-aligned, separated by space. */}
          <div className="app-masthead mx-3.5 mt-4">
            <h3>
              Dashboard
            </h3>
            <Settings
              className="ml-auto size-[17px] text-brand"
              strokeWidth={2}
              aria-hidden
            />
          </div>

          {/* widget column */}
          <div className="flex flex-col gap-2.5 px-3.5 pb-[74px] pt-1">
            {/* HERO — Available this month (green gradient card) */}
            <div
              className="rounded-[22px] border border-white/10 p-[17px]"
              style={{
                background:
                  "linear-gradient(135deg, #146b54 0%, #0b493a 100%)",
              }}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.11em] text-on-brand/70">
                Available this month
              </p>
              <p className="tabular-round mt-1 text-[34px] font-bold leading-none text-on-brand">
                $2,480
              </p>

              {/* Potential extra inset */}
              <div className="mt-3 flex items-center gap-2.5 rounded-[14px] bg-on-brand/10 p-2.5">
                <span className="grid size-[30px] shrink-0 place-items-center rounded-[9px] bg-on-brand/[0.12]">
                  <Sparkles className="size-[15px] text-honey-light" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[9px] text-on-brand/70">Potential extra</p>
                  <p className="tabular-round text-[15px] font-extrabold leading-tight text-on-brand">
                    $620
                  </p>
                  <p className="truncate text-[8px] text-on-brand/55">
                    3-month avg income minus budgets
                  </p>
                </div>
              </div>

              {/* cash-flow row */}
              <div className="mt-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid size-[22px] place-items-center rounded-[7px] bg-on-brand/[0.13]">
                    <ArrowDownLeft className="size-3 text-on-brand" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[8px] text-on-brand/70">Income</p>
                    <p className="tabular-round text-[11px] font-bold text-on-brand">
                      $6,400
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="grid size-[22px] place-items-center rounded-[7px] bg-on-brand/[0.13]">
                    <ArrowUpRight className="size-3 text-on-brand" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[8px] text-on-brand/70">Spent</p>
                    <p className="tabular-round text-[11px] font-bold text-on-brand">
                      $3,920
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left to spend */}
            <WidgetCard title="Flexible budget remaining">
              <div className="flex gap-1.5">
                <PeriodCell label="Today" value="$82" />
                <PeriodCell label="Week" value="$410" />
                <PeriodCell label="Month" value="$1,240" active />
              </div>
              <div className="mt-3 space-y-2.5">
                <BudgetRow
                  label="Groceries"
                  remaining="$240"
                  spent="$360"
                  limit="$600"
                  pct={60}
                />
                <div className="h-px bg-[rgba(20,53,42,0.08)]" />
                <BudgetRow
                  label="Dining"
                  remaining="-$40"
                  spent="$340"
                  limit="$300"
                  pct={113}
                  over
                />
              </div>
            </WidgetCard>

            {/* Spending by category */}
            <WidgetCard title="Spending by category">
              <div className="space-y-2">
                {spending.map((row) => (
                  <div key={row.label} className="flex items-center gap-2.5">
                    <span className="w-14 shrink-0 text-[10px] text-muted">
                      {row.label}
                    </span>
                    <div className="h-[9px] flex-1 overflow-hidden rounded-full bg-[rgba(20,53,42,0.05)]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${row.w}%`, background: row.c }}
                      />
                    </div>
                    <span className="tabular-round w-10 shrink-0 text-right text-[9.5px] text-muted">
                      {row.amt}
                    </span>
                  </div>
                ))}
              </div>
            </WidgetCard>
          </div>

          {/* fade so content dissolves into the tab bar */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[52px] h-10 bg-gradient-to-t from-app-canvas to-transparent" />

          {/* Flat five-item bar, including the central Audel action. */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-line bg-app-canvas px-2 pb-4 pt-3">
            <TabItem icon={LayoutGrid} label="Dashboard" active />
            <TabItem icon={CreditCard} label="Finances" />
            <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-brand">
              <Image
                src="/audel-mark-cream.png"
                alt="Ask Audel"
                width={28}
                height={28}
                className="size-[23px] object-contain"
              />
            </span>
            <TabItem icon={Target} label="Goals" />
            <TabItem icon={Calendar} label="Schedule" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabItem({
  icon: Icon,
  label,
  active,
}: {
  icon: typeof LayoutGrid;
  label: string;
  active?: boolean;
}) {
  return (
    <span
      className={`relative flex w-14 flex-col items-center gap-1 ${
        active ? "text-brand" : "text-muted"
      }`}
    >
      {active ? <span className="absolute -top-3 h-[2.5px] w-7 rounded-full bg-brand" /> : null}
      <Icon className="size-[19px]" strokeWidth={active ? 2.4 : 2} aria-hidden />
      <span className="text-[8px] font-medium leading-none">{label}</span>
    </span>
  );
}
