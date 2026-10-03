import Image from "next/image";
import { clsx } from "@/lib/clsx";

/**
 * The Audel wordmark: the cream "a" with its three ascending bars, either on
 * its pine tile or on its own for a pine ground.
 */
export function Wordmark({
  className,
  variant = "tile",
  showText = true,
  size = 28,
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
          className="rounded-[7px]"
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
            "text-[19px] font-bold tracking-[-0.02em]",
            variant === "cream" ? "text-on-pine" : "text-label",
          )}
        >
          Audel
        </span>
      ) : null}
    </span>
  );
}
