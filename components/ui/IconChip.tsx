import type { LucideIcon } from "lucide-react";
import { clsx } from "@/lib/clsx";

type Tone = "pine" | "honey" | "copper" | "slate" | "wine" | "meta";

const TONES: Record<Tone, string> = {
  pine: "bg-pine/[0.13] text-pine",
  honey: "bg-honey/[0.13] text-honey",
  copper: "bg-copper/[0.13] text-copper",
  slate: "bg-chart-3/[0.13] text-chart-3",
  wine: "bg-chart-5/[0.13] text-chart-5",
  meta: "bg-label/[0.06] text-meta",
};

const SIZES = {
  /** the app's exact chip: 27pt square, 8pt corner */
  sm: "size-[27px] rounded-[8px] [&>svg]:size-[15px]",
  md: "size-[34px] rounded-[10px] [&>svg]:size-[18px]",
};

/** `IconChip` — a symbol in a tinted rounded square. Replaces ad-hoc emoji. */
export function IconChip({
  icon: Icon,
  tone = "pine",
  size = "sm",
  className,
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-grid shrink-0 place-items-center [&>svg]:stroke-[2.25]",
        TONES[tone],
        SIZES[size],
        className,
      )}
    >
      <Icon aria-hidden />
    </span>
  );
}
