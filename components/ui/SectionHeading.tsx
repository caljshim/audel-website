import { Reveal } from "@/components/ui/Reveal";
import { clsx } from "@/lib/clsx";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={70}>
        <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.035em]">
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={130}>
          <p
            className={clsx(
              "mt-4 text-lg leading-relaxed text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
