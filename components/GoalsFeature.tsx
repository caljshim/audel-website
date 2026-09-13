import { Wallet, ScanLine, MapPin, Activity, Plug, ArrowRight } from "lucide-react";
import { Gauge } from "@/components/ui/Gauge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AskAudel } from "@/components/ui/AskAudel";
import type { LucideIcon } from "lucide-react";

/**
 * Goals feature. The idea Audel is selling here: a goal points at a real data
 * source — your accounts, a barcode, a place, a workout — and tracks itself.
 * Each card wears a "source" chip naming the link, mapped from the app's
 * GoalProgressSource model (finances, nutrition, fitness, location), with MCPs
 * as the open-ended future.
 */

type Source = {
  label: string;
  icon: LucideIcon;
  /** hex; used at full strength for text and ~12% for the chip fill */
  color: string;
};

const SOURCES = {
  finances: { label: "Finances", icon: Wallet, color: "#146b54" },
  nutrition: { label: "Nutrition", icon: ScanLine, color: "#b9871f" },
  location: { label: "Location", icon: MapPin, color: "#46698c" },
  fitness: { label: "Fitness", icon: Activity, color: "#8c4658" },
} satisfies Record<string, Source>;

function SourceChip({ source }: { source: Source }) {
  const { icon: Icon, label, color } = source;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{ backgroundColor: `${color}1f`, color }}
    >
      <Icon className="size-3 stroke-[2.5]" aria-hidden />
      {label}
    </span>
  );
}

type Goal = {
  name: string;
  source: Source;
  value: string;
  target: string;
  pct: number;
  note: string;
  tone?: "brand" | "honey";
};

const goals: Goal[] = [
  {
    name: "Emergency fund",
    source: SOURCES.finances,
    value: "$7,800",
    target: "of $10,000",
    pct: 78,
    note: "Follows the balance across your accounts.",
  },
  {
    name: "Protein",
    source: SOURCES.nutrition,
    value: "128 g",
    target: "of 140 g today",
    pct: 91,
    tone: "honey",
    note: "Scan a barcode and the macros fill themselves in.",
  },
  {
    name: "Gym visits",
    source: SOURCES.location,
    value: "3",
    target: "of 4 this week",
    pct: 75,
    note: "Checks itself in the moment you arrive.",
  },
  {
    name: "Weekly run",
    source: SOURCES.fitness,
    value: "14 mi",
    target: "of 20 mi",
    pct: 70,
    note: "Your runs and workouts sync themselves.",
  },
];

function GoalCard({ goal }: { goal: Goal }) {
  return (
    <div className="app-surface h-full p-5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-[15px] font-bold text-ink">{goal.name}</h3>
        <SourceChip source={goal.source} />
      </div>
      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="tabular-round text-2xl font-extrabold text-ink">{goal.value}</span>
        <span className="text-xs font-medium text-faint">{goal.target}</span>
      </p>
      <div className="mt-3">
        <Gauge pct={goal.pct} tone={goal.tone ?? "brand"} height={9} />
      </div>
      <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">{goal.note}</p>
    </div>
  );
}

export function GoalsFeature() {
  return (
    <section id="goals" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Goals"
        title={
          <>
            Point a goal at your real life.
            <br className="hidden sm:block" /> It tracks itself.
          </>
        }
        intro="Link a goal straight to your finances, your nutrition, or the places you go, and Audel pulls the progress in for you — no spreadsheets, no manual logging."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {goals.map((g, i) => (
            <Reveal key={g.name} delay={(i % 2) * 90}>
              <GoalCard goal={g} />
            </Reveal>
          ))}
        </div>

        {/* Bring-your-own: the MCP roadmap, framed as the fifth "source" */}
        <Reveal delay={120} className="flex">
          <div className="app-surface relative flex w-full flex-col justify-between overflow-hidden p-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-chip bg-brand/12 text-brand">
                  <Plug className="size-5" aria-hidden />
                </span>
                <span className="rounded-full bg-honey/14 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-honey">
                  On the roadmap
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">
                Bring your own source.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                We&rsquo;re opening goals up to any MCP — connect the data you already
                track and build goals Audel never shipped. Sleep, screen time, reading,
                miles flown; if a server can report it, you can chase it.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Sleep", "Focus time", "Books read", "Your own data"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1 text-[11px] font-medium text-muted"
                >
                  {t}
                  {t === "Your own data" ? (
                    <ArrowRight className="size-3 text-brand" aria-hidden />
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-8 flex justify-center">
        <AskAudel
          question="Am I on track for my emergency fund?"
          answer={
            <>
              <p>
                Yes — <span className="tabular-round font-semibold">$7,800</span> of
                $10,000. On pace to finish in October.
              </p>
              <div className="mt-2">
                <Gauge pct={78} height={7} />
              </div>
            </>
          }
        />
      </Reveal>
    </section>
  );
}
