import { BellRing, Sparkles, Camera } from "lucide-react";
import { ScheduleScreen } from "@/components/mockups/Screens";
import { IconChip } from "@/components/ui/IconChip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LucideIcon } from "lucide-react";

const points: { icon: LucideIcon; tone: "pine" | "honey"; title: string; copy: string }[] = [
  {
    icon: BellRing,
    tone: "pine",
    title: "Routines that show up",
    copy: "Build the repeating parts of your week once. Audel puts them on the day and reminds you at the hour they matter, not in a digest at midnight.",
  },
  {
    icon: Sparkles,
    tone: "pine",
    title: "The sources close the day out",
    copy: "Arrive at the gym and it logs. Scan lunch and it counts. The same links that feed your goals tick the boxes on your schedule.",
  },
  {
    icon: Camera,
    tone: "honey",
    title: "Photograph a week, get a week",
    copy: "Point the camera at a paper planner or a screenshot and Audel reads it into events, reminders, and routines in one shot.",
  },
];

export function ScheduleFeature() {
  return (
    <section id="schedule" className="sheet scroll-mt-20 border-b border-rule py-20 sm:py-24">
      <div className="grid gap-14 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
        <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
          <ScheduleScreen />
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            name="Schedule"
            title="Your day, already in motion."
            intro="Goals set the direction; the schedule does the walking. The week sits across the top, today’s list sits under it, and the things wired to a source tick themselves off as the day goes."
          />

          <div className="mt-10">
            {points.map((p, i) => (
              <div
                key={p.title}
                className={i < points.length - 1 ? "border-b border-rule-faint" : undefined}
              >
                <div className="flex gap-4 py-5">
                  <IconChip icon={p.icon} tone={p.tone} size="md" />
                  <div className="prose-measure">
                    <h3 className="text-[17px] font-semibold">{p.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.55] text-prose">{p.copy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
