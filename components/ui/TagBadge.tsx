import type { LucideIcon } from "lucide-react";
import { clsx } from "@/lib/clsx";

type Tone = "pine" | "honey" | "copper" | "on-pine";

const TONES: Record<Tone, string> = {
  pine: "bg-pine/[0.12] text-pine",
  honey: "bg-honey/[0.12] text-honey",
  copper: "bg-copper/[0.12] text-copper",
  "on-pine": "bg-on-pine/[0.15] text-on-pine",
};

/**
 * `TagBadge` — a small capsule status label. Uppercase and tracked, which is
 * what the app reserves this treatment for: a label sitting inside a filled
 * shape, never the heading of a section.
 */
export function TagBadge({
  children,
  icon: Icon,
  tone = "pine",
  className,
}: {
  children: React.ReactNode;
  icon?: LucideIcon;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.6px]",
        TONES[tone],
        className,
      )}
    >
      {Icon ? <Icon className="size-3 stroke-[2.5]" aria-hidden /> : null}
      {children}
    </span>
  );
}
