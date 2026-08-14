import Image from "next/image";
import { clsx } from "@/lib/clsx";

/**
 * Audel wordmark using the real app logo — the cream "a" mark with its three
 * ascending schedule bars.
 *
 * - `tile`  → the green app-icon tile, for light backgrounds
 * - `cream` → the cream mark on transparent, for green backgrounds
 */
export function Wordmark({
  className,
  variant = "tile",
  showText = true,
  size = 30,
}: {
  className?: string;
  variant?: "tile" | "cream";
  showText?: boolean;
  size?: number;
}) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      {variant === "tile" ? (
        <Image
          src="/audel-icon.png"
          alt="Audel"
          width={size}
          height={size}
          className="rounded-[8px] shadow-[0_1px_2px_rgba(19,60,51,0.25)]"
          priority
        />
      ) : (
        <Image
          src="/audel-mark-cream.png"
          alt="Audel"
          width={size}
          height={size}
          className="-my-1"
          priority
        />
      )}
      {showText ? (
        <span
          className={clsx(
            "font-display text-[19px] font-bold tracking-[-0.03em]",
            variant === "cream" ? "text-cream" : "text-ink",
          )}
        >
          Audel
        </span>
      ) : null}
    </span>
  );
}
