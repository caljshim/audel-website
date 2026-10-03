import { Camera, ScanBarcode, MapPin, Flame, Lock, Plug } from "lucide-react";
import { IconChip } from "@/components/ui/IconChip";
import { LedgerRow } from "@/components/ui/Ledger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LucideIcon } from "lucide-react";

const features: {
  icon: LucideIcon;
  tone: "pine" | "honey" | "slate" | "wine";
  title: string;
  copy: string;
  value: string;
}[] = [
  {
    icon: Camera,
    tone: "pine",
    title: "Snap to add",
    copy: "A receipt, a planner page, a whiteboard. Audel reads it into expenses, events, or goal context.",
    value: "Camera",
  },
  {
    icon: ScanBarcode,
    tone: "honey",
    title: "Nutrition and macros",
    copy: "Scan a barcode to log calories and protein in a tap, or let workouts and steps arrive on their own.",
    value: "Barcode",
  },
  {
    icon: MapPin,
    tone: "slate",
    title: "Location check-ins",
    copy: "Pin a place. A goal or routine tied to it closes itself the moment you get there.",
    value: "Geofence",
  },
  {
    icon: Flame,
    tone: "honey",
    title: "Streaks and milestones",
    copy: "Honey is the app's colour for earned. A held streak or a cleared milestone thickens the rule on its section.",
    value: "Honey",
  },
  {
    icon: Lock,
    tone: "pine",
    title: "Private by construction",
    copy: "Read-only connections, no trading scope, no money movement. There is no code path that could.",
    value: "Read-only",
  },
  {
    icon: Plug,
    tone: "wine",
    title: "Your own MCP servers",
    copy: "Bring a data source Audel has never heard of and build goals on top of it.",
    value: "Roadmap",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="sheet scroll-mt-20 border-b border-rule py-20 sm:py-24">
      <div className="grid gap-6 md:grid-cols-2 md:gap-x-16">
        <SectionHeading name="In the details" title="The small things that make it stick." />
        <p className="text-[17px] leading-[1.55] text-prose md:self-end md:pb-1">
          Most of what Audel does happens without being asked. These are the
          parts people notice a week in.
        </p>
      </div>

      <div className="mt-10 grid gap-x-16 md:grid-cols-2">
        {features.map((f, i) => (
          <LedgerRow
            key={f.title}
            name={f.title}
            meta={f.copy}
            leading={<IconChip icon={f.icon} tone={f.tone} size="md" />}
            value={f.value}
            valueTone="meta"
            figure={false}
            showsDivider={i < features.length - 2}
          />
        ))}
      </div>
    </section>
  );
}
