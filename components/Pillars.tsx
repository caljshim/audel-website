import {
  LayoutGrid,
  Wallet,
  Target,
  CalendarDays,
  Flame,
} from "lucide-react";
import { IconChip } from "@/components/ui/IconChip";
import { TagBadge } from "@/components/ui/TagBadge";
import { Gauge } from "@/components/ui/Gauge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LucideIcon } from "lucide-react";

/* ---- mini motifs, built from the same widgets the app ships ---- */

function DashboardMotif() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        { h: "h-16", g: 62 },
        { h: "h-16", g: 88 },
        { h: "h-16", g: 40 },
        { h: "h-12", g: 112 },
        { h: "h-12", g: 74 },
        { h: "h-12", g: 55 },
      ].map((b, i) => (
        <div
          key={i}
          className={`${b.h} flex flex-col justify-end gap-1.5 rounded-lg border border-line bg-card p-2`}
        >
          <span className="h-1.5 w-6 rounded-full bg-ink/10" />
          <Gauge pct={b.g} height={5} delay={i * 70} />
        </div>
      ))}
    </div>
  );
}

function FinancesMotif() {
  const rows = [
    { l: "Groceries", pct: 54 },
    { l: "Dining", pct: 88 },
    { l: "Transport", pct: 112 },
    { l: "Subscriptions", pct: 66 },
  ];
  return (
    <div className="space-y-3 rounded-lg border border-line bg-card p-3.5">
      {rows.map((r, i) => (
        <div key={r.l} className="flex items-center gap-3">
          <span className="w-24 text-xs text-muted">{r.l}</span>
          <Gauge pct={r.pct} height={7} delay={i * 80} />
          <span
            className={`tabular w-9 text-right text-[11px] ${
              r.pct > 100 ? "text-copper" : "text-muted"
            }`}
          >
            {r.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

function GoalsMotif() {
  return (
    <div className="rounded-lg border border-line bg-card p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-ink">Emergency fund</span>
        <TagBadge tone="honey" icon={Flame}>
          Milestone
        </TagBadge>
      </div>
      <p className="tabular mt-2 text-2xl font-bold text-ink">
        $7,800{" "}
        <span className="text-sm font-medium text-faint">/ $10,000</span>
      </p>
      <div className="mt-3">
        <Gauge pct={78} height={10} />
        <p className="mt-1.5 text-[11px] text-muted">
          <span className="tabular text-brand">78%</span> — on pace for October
        </p>
      </div>
    </div>
  );
}

function ScheduleMotif() {
  const items = [
    { t: "8:30", l: "Morning review", tone: "bg-brand", done: true },
    { t: "12:00", l: "Lunch & log", tone: "bg-brand", done: true },
    { t: "18:00", l: "Reconcile spend", tone: "bg-honey", done: false },
  ];
  return (
    <div className="space-y-3 rounded-lg border border-line bg-card p-3.5">
      {items.map((it) => (
        <div key={it.l} className="flex items-center gap-3">
          <span className="tabular w-10 text-[11px] text-faint">{it.t}</span>
          <span className={`size-2 rounded-full ${it.tone}`} />
          <span
            className={`text-xs ${it.done ? "text-muted line-through decoration-line" : "text-ink"}`}
          >
            {it.l}
          </span>
          {it.done ? (
            <span className="tabular ml-auto text-[10px] text-brand">done</span>
          ) : (
            <span className="ml-auto text-[10px] text-honey">next</span>
          )}
        </div>
      ))}
    </div>
  );
}

type Pillar = {
  icon: LucideIcon;
  tone: "brand" | "honey";
  title: string;
  copy: string;
  motif: React.ReactNode;
};

const pillars: Pillar[] = [
  {
    icon: LayoutGrid,
    tone: "brand",
    title: "A dashboard that's yours",
    copy: "Every metric in Audel is a widget. Drag, resize, and arrange them into the home screen that fits how you actually think.",
    motif: <DashboardMotif />,
  },
  {
    icon: Wallet,
    tone: "brand",
    title: "Finances, in focus",
    copy: "Link your banks with Plaid, and Audel sorts transactions into budgets automatically — with copper warnings the moment a category runs hot.",
    motif: <FinancesMotif />,
  },
  {
    icon: Target,
    tone: "honey",
    title: "Goals with real momentum",
    copy: "Set a target, and watch the gauge fill. Streaks and milestones in honey gold keep the long game rewarding.",
    motif: <GoalsMotif />,
  },
  {
    icon: CalendarDays,
    tone: "brand",
    title: "Days that stay on plan",
    copy: "Turn a photo of your planner into a schedule, then let routines nudge you through the day and keep your money habits on track.",
    motif: <ScheduleMotif />,
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="One app, four surfaces"
        title={
          <>
            Everything you juggle,
            <br className="hidden sm:block" /> under one calm roof.
          </>
        }
        intro="Money, goals, and your calendar were never really separate. Audel keeps them in one place — and one copilot understands all of it."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {pillars.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 90}
            className="group flex flex-col rounded-card border border-line bg-card p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 sm:p-7"
          >
            <div className="flex items-center gap-3">
              <IconChip icon={p.icon} tone={p.tone} size="lg" />
              <h3 className="font-display text-xl font-bold">{p.title}</h3>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.copy}</p>
            <div className="mt-6">{p.motif}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
