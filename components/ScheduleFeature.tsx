import {
  Check,
  Camera,
  BellRing,
  Sparkles,
  Plus,
  ChevronDown,
  MapPin,
  ScanLine,
  Activity,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AskAudel } from "@/components/ui/AskAudel";
import type { LucideIcon } from "lucide-react";

type Item = {
  time: string;
  title: string;
  done?: boolean;
  next?: boolean;
  tag?: { label: string; icon: LucideIcon; color: string };
};

const agenda: Item[] = [
  {
    time: "7:00 AM",
    title: "Morning run",
    done: true,
    tag: { label: "Fitness", icon: Activity, color: "#8c4658" },
  },
  {
    time: "8:30 AM",
    title: "Log breakfast",
    done: true,
    tag: { label: "Scanned", icon: ScanLine, color: "#b9871f" },
  },
  { time: "12:30 PM", title: "Lunch with Sam", next: true },
  {
    time: "6:00 PM",
    title: "Gym",
    tag: { label: "Auto check-in", icon: MapPin, color: "#46698c" },
  },
  { time: "9:00 PM", title: "Reconcile spending" },
];

function ScheduleScreen() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const routines = [
    { name: "Morning run", completed: [true, true, true, false, false, false, false] },
    { name: "Log nutrition", completed: [true, true, true, false, false, false, false] },
    { name: "Under budget", completed: [true, true, false, false, false, false, false] },
  ];

  return (
    <div className="app-preview">
      <div className="app-masthead">
        <h4>Schedule</h4>
        <Plus className="size-5 text-brand" aria-hidden />
      </div>
      <div className="app-surface p-3.5">
        <p className="mb-4 flex items-center gap-2 text-[13px] font-semibold text-ink">
          August 2025 <ChevronDown className="size-3 text-muted" aria-hidden />
        </p>
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-muted">{day}</span>
              <span className={`tabular-round grid size-7 place-items-center rounded-full text-[12px] font-semibold ${i === 2 ? "bg-brand text-on-brand" : "text-ink"}`}>
                {11 + i}
              </span>
              <span className={`size-1 rounded-full ${i < 5 ? "bg-brand" : "bg-transparent"}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="app-surface mt-3 px-3.5">
        <p className="border-b border-line py-3 text-[12px] font-semibold text-ink">
          Wednesday, August 13
        </p>
        {agenda.map((item) => (
          <div key={item.title} className="flex items-center gap-2.5 border-b border-line py-3 last:border-0">
            <span className="tabular-round w-12 shrink-0 text-[9px] text-muted">{item.time}</span>
            <span className={`grid size-4 shrink-0 place-items-center rounded-full ${item.done ? "bg-brand" : "border border-line"}`}>
              {item.done ? <Check className="size-2.5 text-on-brand" strokeWidth={3} aria-hidden /> : null}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`text-[12px] ${item.done ? "text-muted line-through" : "font-medium text-ink"}`}>{item.title}</p>
              {item.tag ? (
                <p className="mt-1 flex items-center gap-1 text-[9px] text-muted">
                  <item.tag.icon className="size-2.5" aria-hidden />{item.tag.label}
                </p>
              ) : null}
            </div>
            {item.next ? <span className="text-[9px] font-semibold text-honey">Next</span> : null}
          </div>
        ))}
      </div>
      <div className="app-surface mt-3 p-3.5">
        <p className="mb-3 text-[12px] font-semibold text-ink">Routine roster</p>
        <div className="grid grid-cols-[82px_repeat(7,minmax(0,1fr))] text-center text-[9px]">
          <span />
          {days.map((day, i) => (
            <span key={i} className={`py-1.5 text-muted ${i === 2 ? "rounded-t bg-ink/5" : ""}`}>{day}</span>
          ))}
          {routines.map((routine) => (
            <div key={routine.name} className="contents">
              <span className="flex items-center py-2 text-left text-[10px] text-ink">{routine.name}</span>
              {routine.completed.map((done, i) => (
                <span key={i} className={`grid place-items-center py-2 ${i === 2 ? "bg-ink/5" : ""}`}
                  aria-label={`${routine.name}, August ${11 + i}: ${done ? "completed" : "not completed"}`}>
                  {done
                    ? <Check className="size-3 text-brand" strokeWidth={2.5} aria-hidden />
                    : <span className="size-1 rounded-full bg-ink/15" />}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const points: { icon: LucideIcon; tone: string; title: string; copy: string }[] = [
  {
    icon: BellRing,
    tone: "#146b54",
    title: "Routines that nudge",
    copy: "Build repeating routines and reminders, and Audel walks you through the day at the right moments.",
  },
  {
    icon: Sparkles,
    tone: "#146b54",
    title: "The links check it off",
    copy: "Arrive at the gym and it logs. Scan a lunch and it counts. The same sources behind your goals close out your day.",
  },
  {
    icon: Camera,
    tone: "#b9871f",
    title: "Snap a planner, get a week",
    copy: "Photograph a paper planner or a screenshot and Audel turns it into a full schedule in one shot.",
  },
];

export function ScheduleFeature() {
  return (
    <section id="schedule" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* actual UI (left on desktop) */}
        <div className="order-2 flex flex-col items-center gap-4 lg:order-1">
          <Reveal delay={120} className="w-full max-w-[430px] rounded-[32px] bg-canvas-2 p-3 sm:p-5">
            <ScheduleScreen />
          </Reveal>
          <Reveal delay={200} className="lg:self-start">
            <AskAudel
              question="What's left on my plate today?"
              answer={
                <p>
                  Three things: <span className="font-semibold">lunch with Sam</span> at
                  12:30, <span className="font-semibold">gym</span> at 6, and{" "}
                  <span className="font-semibold">reconcile spending</span> at 9.
                </p>
              }
            />
          </Reveal>
        </div>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Schedule"
            title="Your day, already in motion."
            intro="Goals set the direction; your schedule does the walking. Routines and reminders move you through the day — and check themselves off as you go."
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
      </div>
    </section>
  );
}
