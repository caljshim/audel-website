import { Link2, Target, MessagesSquare } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LucideIcon } from "lucide-react";

const steps: { icon: LucideIcon; title: string; copy: string }[] = [
  {
    icon: Link2,
    title: "Connect your accounts",
    copy: "Link banks with Plaid and add read-only brokerage access. Audel imports and categorizes everything in minutes.",
  },
  {
    icon: Target,
    title: "Set goals & routines",
    copy: "Name what you're working toward and the habits that get you there. Arrange your dashboard around what matters.",
  },
  {
    icon: MessagesSquare,
    title: "Ask Audel",
    copy: "From “can I afford this?” to “what changed this month?” — get clear, cross-domain answers whenever you need them.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="scroll-mt-24 border-y border-line bg-card/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Three steps"
          title="Set up once. Understand everything after."
          align="center"
        />

        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {/* connecting line on desktop */}
          <span
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-line md:block"
            aria-hidden
          />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 110} as="li" className="relative">
              <div className="flex items-center gap-4 md:flex-col md:items-start">
                <span className="tabular relative z-10 grid size-12 shrink-0 place-items-center rounded-full border border-line bg-card text-lg font-bold text-brand shadow-card">
                  {i + 1}
                </span>
                <s.icon className="size-6 text-brand md:mt-4" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted">
                {s.copy}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
