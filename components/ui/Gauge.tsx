import { clsx } from "@/lib/clsx";

type GaugeProps = {
  /** 0–100+, values over 100 render the copper overflow state */
  pct: number;
  tone?: "brand" | "honey" | "copper";
  height?: number;
  className?: string;
  /** delay the grow-in animation (ms) so a stack of gauges cascades */
  delay?: number;
};

/**
 * The app's one progress language: a capsule gauge with a soft self-tinted
 * track, a gradient fill, and a copper overflow state. This is Audel's
 * signature mark, reused across the whole page.
 */
export function Gauge({ pct, tone = "brand", height = 10, className, delay = 0 }: GaugeProps) {
  const over = pct > 100;
  const fill = Math.min(Math.max(pct, 0), 100);
  const color = over ? "copper" : tone;

  const track: Record<string, string> = {
    brand: "bg-brand/12",
    honey: "bg-honey/14",
    copper: "bg-copper/14",
  };
  const grad: Record<string, string> = {
    brand: "from-brand/70 to-brand",
    honey: "from-honey/70 to-honey-light",
    copper: "from-copper/70 to-copper-light",
  };

  return (
    <div
      className={clsx("relative w-full overflow-hidden rounded-full", track[color], className)}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={clsx(
          "h-full origin-left rounded-full bg-gradient-to-r",
          grad[color],
        )}
        style={{
          width: `${fill}%`,
          minWidth: fill > 0 ? height : 0,
          animation: `gauge-grow 0.9s var(--ease-out-soft) ${delay}ms both`,
        }}
      />
    </div>
  );
}
