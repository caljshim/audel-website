import { SlidersHorizontal, Undo2, Repeat, ShieldCheck, Settings, Flag } from "lucide-react";
import { Gauge } from "@/components/ui/Gauge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AskAudel } from "@/components/ui/AskAudel";
import type { LucideIcon } from "lucide-react";

/* ---------- an actual screen from the app ---------- */

type Txn = {
  name: string;
  date: string;
  category: string;
  amount: string;
  income?: boolean;
  unbudgeted?: boolean;
};

const txns: Txn[] = [
  { name: "Whole Foods Market", date: "Aug 12", category: "Groceries", amount: "$84.20" },
  { name: "Acme Payroll", date: "Aug 10", category: "Income", amount: "+$3,200.00", income: true },
  { name: "Blue Bottle Coffee", date: "Aug 10", category: "Dining", amount: "$6.50", unbudgeted: true },
  { name: "Uber", date: "Aug 9", category: "Transport", amount: "$18.40" },
  { name: "Rent", date: "Aug 1", category: "Housing", amount: "$1,850.00" },
];

const segments = ["Overview", "Transactions", "Plan"];

function FinancesScreen() {
  return (
    <div className="app-preview">
      <div className="app-masthead">
        <h4>
          Finances
        </h4>
        <Settings className="ml-auto size-4 text-brand" strokeWidth={2} aria-hidden />
      </div>

      {/* SectionStrip uses natural-width labels, with pine for selection. */}
      <div className="app-sections">
        {segments.map((s) => (
          <span
            key={s}
            className={`${
              s === "Transactions"
                ? "font-bold text-brand"
                : "text-muted"
            }`}
          >
            {s}
          </span>
        ))}
      </div>

      {/* transactions list */}
      <div className="app-surface px-3.5">
        <p className="border-b border-line py-3 text-[12px] font-semibold text-ink">Recent transactions</p>
        {txns.map((t, i) => (
          <div
            key={t.name}
            className={`flex items-center justify-between py-2.5 ${
              i !== txns.length - 1 ? "border-b border-[rgba(20,53,42,0.07)]" : ""
            }`}
          >
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium text-ink">{t.name}</p>
              <p className="mt-0.5 text-[10px] text-muted">
                {t.date} · {t.category}
              </p>
              {t.unbudgeted ? (
                <p className="mt-1 flex items-center gap-1 text-[9.5px] font-semibold text-honey">
                  <Flag className="size-2.5 fill-current" aria-hidden />
                  No matching budget
                </p>
              ) : null}
            </div>
            <span
              className={`tabular-round shrink-0 pl-3 text-[13px] font-bold ${
                t.income ? "text-brand" : "text-ink"
              }`}
            >
              {t.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- copy side ---------- */

const points: { icon: LucideIcon; tone: string; title: string; copy: string }[] = [
  {
    icon: SlidersHorizontal,
    tone: "#146b54",
    title: "Set budgets",
    copy: "Give any category a limit. The gauge fills as you spend and turns copper the moment you cross it.",
  },
  {
    icon: Undo2,
    tone: "#146b54",
    title: "Track reimbursements",
    copy: "A friend pays you back? Link it to the expense and Audel nets it out of the right budget automatically.",
  },
  {
    icon: Repeat,
    tone: "#146b54",
    title: "Catch recurring transactions",
    copy: "Rent, subscriptions, and paychecks are spotted as they repeat — so nothing recurring slips past you.",
  },
  {
    icon: ShieldCheck,
    tone: "#146b54",
    title: "Read-only and private",
    copy: "Connect your accounts and Audel imports balances and transactions. It can look — never touch.",
  },
];

export function FinancesFeature() {
  return (
    <section id="finances" className="scroll-mt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:py-28 lg:grid-cols-2">
        {/* copy */}
        <div>
          <SectionHeading
            eyebrow="Finances"
            title="Every dollar, sorted the moment it lands."
            intro="Connect your accounts and Audel does the filing — categorizing spend, flagging what slipped through, and keeping every budget honest."
          />
          <div className="mt-9 space-y-5">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="flex gap-4">
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-chip"
                  style={{ backgroundColor: `${p.tone}1f`, color: p.tone }}
                >
                  <p.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{p.title}</h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* actual UI + a live question */}
        <Reveal
          delay={120}
          className="mx-auto flex w-full max-w-[430px] flex-col items-center gap-4 rounded-[32px] bg-canvas-2 p-3 pb-5 sm:p-5"
        >
          <FinancesScreen />
          <AskAudel
            className="lg:self-end"
            question="How much have I spent on dining this month?"
            answer={
              <>
                <p>
                  <span className="tabular-round font-semibold">$340</span> on dining —{" "}
                  <span className="font-semibold text-copper">$40 over</span> your $300
                  budget.
                </p>
                <div className="mt-2">
                  <Gauge pct={113} height={7} />
                </div>
              </>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
