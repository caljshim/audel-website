import type { LucideIcon } from "lucide-react";
import { clsx } from "@/lib/clsx";

type Tone = "brand" | "honey" | "copper" | "cream";

const tones: Record<Tone, string> = {
  brand: "bg-brand/12 text-brand",
  honey: "bg-honey/14 text-honey",
  copper: "bg-copper/14 text-copper",
  cream: "bg-cream/12 text-cream",
};

const sizes = {
  sm: "size-7 rounded-[9px] [&>svg]:size-[15px]",
  md: "size-10 rounded-[12px] [&>svg]:size-[19px]",
  lg: "size-12 rounded-[14px] [&>svg]:size-[22px]",
};

/** SF-symbol-in-a-tinted-square, straight from the app's IconChip. */
export function IconChip({
  icon: Icon,
  tone = "brand",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-grid place-items-center [&>svg]:stroke-[2.25]",
        tones[tone],
        sizes[size],
        className,
      )}
    >
      <Icon aria-hidden />
    </span>
  );
}
