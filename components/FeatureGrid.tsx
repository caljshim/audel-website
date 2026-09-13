import {
  Camera,
  ScanLine,
  MapPin,
  Flame,
  Lock,
  Plug,
} from "lucide-react";
import { IconChip } from "@/components/ui/IconChip";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LucideIcon } from "lucide-react";

const features: {
  icon: LucideIcon;
  tone: "brand" | "honey";
  title: string;
  copy: string;
}[] = [
  {
    icon: Camera,
    tone: "brand",
    title: "Snap to add",
    copy: "Photograph a planner or receipt and Audel turns it into events, expenses, or goal context.",
  },
  {
    icon: ScanLine,
    tone: "honey",
    title: "Nutrition & macros",
    copy: "Scan a barcode to log calories and protein in a tap, or let your workouts and steps sync in on their own.",
  },
  {
    icon: MapPin,
    tone: "brand",
    title: "Location-aware",
    copy: "Pin a place and a goal or routine checks itself in the moment you arrive — no tapping required.",
  },
  {
    icon: Flame,
    tone: "honey",
    title: "Streaks & milestones",
    copy: "Honey-gold rewards for staying under budget and hitting the targets you set.",
  },
  {
    icon: Lock,
    tone: "brand",
    title: "Private by design",
    copy: "Read-only connections, no trading scope, and data you control. Your finances stay yours.",
  },
  {
    icon: Plug,
    tone: "honey",
    title: "Bring your own MCP",
    copy: "Connect new data sources as MCPs and chase goals Audel never shipped with. On the roadmap.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Built into every day"
        title="The details that make it stick."
        intro="Small, considered touches — the same ones that make the app feel like it was made for the way you actually live."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal
            key={f.title}
            delay={(i % 3) * 90}
            className="app-surface p-6"
          >
            <IconChip icon={f.icon} tone={f.tone} size="lg" />
            <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
