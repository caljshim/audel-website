import { clsx } from "@/lib/clsx";

/**
 * The app's page grammar, at page scale.
 *
 * Ported from Shared/Components/WidgetCard.swift and
 * Shared/DesignSystem/LedgerSection.swift + LedgerRow.swift. A widget has no
 * chrome: it is a title, its rows, and the rule it closes on. The rule sits at
 * the bottom so a widget owns its own mark and needs no knowledge of its
 * neighbours.
 */

/** `WidgetTitle` — small, pine, lettered out. The heading of a section. */
export function WidgetTitle({ children }: { children: React.ReactNode }) {
  return <p className="widget-title">{children}</p>;
}

/** `cardSurface()` — the content, then the rule it closes on. */
export function Widget({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("border-b border-rule py-7", className)}>
      {title ? <WidgetTitle>{title}</WidgetTitle> : null}
      <div className={title ? "mt-4" : undefined}>{children}</div>
    </section>
  );
}

/**
 * `LedgerSection` — a title, a rule that carries state, then rows. The coloured
 * states thicken the rule so a section can signal without spending a badge.
 */
export function LedgerSection({
  title,
  state = "neutral",
  accessory,
  children,
  className,
}: {
  title: string;
  state?: "neutral" | "over" | "earned";
  accessory?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const rule = {
    neutral: "bg-rule-faint h-px",
    over: "bg-copper h-[1.5px]",
    earned: "bg-honey h-[1.5px]",
  }[state];

  return (
    <div className={className}>
      <div className="flex items-baseline gap-3 pb-2">
        <h3 className="text-[15px] font-semibold">{title}</h3>
        <span className="ml-auto">{accessory}</span>
      </div>
      <div className={rule} />
      {children}
    </div>
  );
}

/**
 * `LedgerRow` — leading chip, name over meta, trailing figure. The value is
 * right-aligned with monospaced digits so a column of figures actually lines
 * up; that column is the thing a money app most needs to make scannable.
 */
export function LedgerRow({
  name,
  meta,
  leading,
  value,
  valueTone = "label",
  figure = true,
  showsDivider = true,
  children,
}: {
  name: string;
  meta?: React.ReactNode;
  leading?: React.ReactNode;
  value?: React.ReactNode;
  valueTone?: "label" | "pine" | "copper" | "honey" | "meta";
  /** figures take the rounded tabular face; a word stays in the text face */
  figure?: boolean;
  showsDivider?: boolean;
  /** anything that belongs under the row — a gauge, usually */
  children?: React.ReactNode;
}) {
  const tone = {
    label: "text-label",
    pine: "text-pine",
    copper: "text-copper",
    honey: "text-honey",
    meta: "text-meta",
  }[valueTone];

  return (
    <div>
      <div className="flex items-center gap-3 py-3">
        {leading}
        <div className="min-w-0 flex-1">
          <p className="text-[15px] leading-snug">{name}</p>
          {meta ? <p className="mt-0.5 text-[13px] leading-snug text-meta">{meta}</p> : null}
        </div>
        {value ? (
          <span
            className={clsx("shrink-0 text-[15px] font-semibold", figure && "fig", tone)}
          >
            {value}
          </span>
        ) : null}
      </div>
      {children ? <div className="pb-3">{children}</div> : null}
      {showsDivider ? <div className="h-px bg-rule-faint" /> : null}
    </div>
  );
}

/**
 * `FeatureCard` — the one brand-filled surface. At most one per screen; a
 * second one cancels the first. The label is uppercase and tracked on purpose
 * here: inside a filled surface a micro-cap label reads as a caption on an
 * object, and this is the only place that treatment still belongs.
 */
export function FeatureCard({
  label,
  children,
  className,
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[22px] p-7 sm:p-10",
        "bg-[linear-gradient(135deg,var(--color-pine)_0%,var(--color-pine-deep)_100%)]",
        "ring-1 ring-inset ring-on-pine/10",
        className,
      )}
    >
      {label ? (
        <p className="text-[12px] font-semibold uppercase tracking-[1.1px] text-on-pine/70">
          {label}
        </p>
      ) : null}
      {children}
    </div>
  );
}

/** `FeatureMetrics` — the three-up breakdown under a hero figure. */
export function FeatureMetrics({
  metrics,
  columns = 3,
}: {
  metrics: { label: string; value: string }[];
  columns?: 1 | 3;
}) {
  return (
    <div className={clsx("grid gap-2", columns === 3 && "sm:grid-cols-3")}>
      {metrics.map((m) => (
        <div key={m.label} className="rounded-[11px] bg-on-pine/[0.13] px-3.5 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.6px] text-on-pine/70">
            {m.label}
          </p>
          <p className="fig mt-0.5 text-[15px] font-semibold text-on-pine">{m.value}</p>
        </div>
      ))}
    </div>
  );
}
