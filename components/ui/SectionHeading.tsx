import { WidgetTitle } from "@/components/ui/Ledger";
import { clsx } from "@/lib/clsx";

/**
 * A section of the sheet, headed the way a widget is headed in the app: the
 * section's name in small pine capitals, then the headline. With no card edge
 * to announce a new section, the title has to do that work itself.
 */
export function SectionHeading({
  name,
  title,
  intro,
  className,
}: {
  name: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("prose-measure", className)}>
      <WidgetTitle>{name}</WidgetTitle>
      <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.6rem)] font-bold tracking-[-0.03em]">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-[17px] leading-[1.55] text-prose">{intro}</p> : null}
    </div>
  );
}
