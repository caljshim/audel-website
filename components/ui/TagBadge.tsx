import type { LucideIcon } from "lucide-react";
import { clsx } from "@/lib/clsx";

type Tone = "brand" | "honey" | "copper" | "muted";

const tones: Record<Tone, string> = {
  brand: "bg-brand/12 text-brand",
  honey: "bg-honey/14 text-honey",
  copper: "bg-copper/14 text-copper",
  muted: "bg-ink/6 text-muted",
};

/** Small uppercase capsule status label ("Recommended", "Read-only"). */
export function TagBadge({
  children,
  icon: Icon,
  tone = "brand",
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
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {Icon ? <Icon className="size-3 stroke-[2.5]" aria-hidden /> : null}
      {children}
    </span>
  );
}
