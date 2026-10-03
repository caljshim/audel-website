import { clsx } from "@/lib/clsx";

type GaugeProps = {
  /** 0–100+; anything over 100 renders the copper overflow state */
  pct: number;
  tone?: "pine" | "honey" | "slate" | "wine";
  height?: number;
  className?: string;
  /** stagger the fill so a stack of gauges settles in sequence */
  delay?: number;
};

const TRACK: Record<string, string> = {
  pine: "bg-pine/[0.14]",
  honey: "bg-honey/[0.14]",
  slate: "bg-chart-3/[0.14]",
  wine: "bg-chart-5/[0.14]",
  copper: "bg-copper/[0.14]",
};

const FILL: Record<string, string> = {
  pine: "from-pine/70 to-pine",
  honey: "from-honey/70 to-honey",
  slate: "from-chart-3/70 to-chart-3",
  wine: "from-chart-5/70 to-chart-5",
  copper: "from-copper/70 to-copper",
};

/**
 * `GaugeBar` — the app's one progress language: a capsule with a soft
 * self-tinted track, a gradient fill, and a copper overflow state. A ring is
 * never used for this; there is exactly one progress mark in Audel.
 */
export function Gauge({ pct, tone = "pine", height = 10, className, delay = 0 }: GaugeProps) {
  const over = pct > 100;
  const fill = Math.min(Math.max(pct, 0), 100);
  const key = over ? "copper" : tone;

  return (
    <div
      className={clsx("relative w-full overflow-hidden rounded-full", TRACK[key], className)}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(fill)}
      aria-valuetext={`${Math.round(pct)} percent${over ? ", over target" : ""}`}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={clsx("h-full origin-left rounded-full bg-gradient-to-r", FILL[key])}
        style={{
          width: `${fill}%`,
          minWidth: fill > 0 ? height : 0,
          animation: `gauge-fill 0.45s var(--ease-out-soft) ${delay}ms both`,
        }}
      />
    </div>
  );
}
