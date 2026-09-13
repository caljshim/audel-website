import { ArrowDown, CalendarDays, Target, Wallet } from "lucide-react";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { Waitlist } from "@/components/ui/Waitlist";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section id="top" className="overflow-hidden pb-12 pt-36 sm:pt-40 lg:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="max-w-xl">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
              <span className="size-2 rounded-full bg-brand" aria-hidden />
              A little more clarity, every day.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-[clamp(2.8rem,5.5vw,4.4rem)] font-bold leading-[1.06] tracking-[-0.045em]">
              Your money.<br />
              Your goals.<br />
              <span className="text-brand">Your day, together.</span>
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 max-w-[470px] text-lg leading-relaxed text-muted">
              One AI copilot that sees the whole picture. Audel connects your
              accounts, follows your goals, and helps you make room for what matters.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 max-w-md" id="waitlist-hero">
              <Waitlist />
            </div>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {[
                { icon: Wallet, label: "Finances", href: "#finances" },
                { icon: Target, label: "Goals", href: "#goals" },
                { icon: CalendarDays, label: "Schedule", href: "#schedule" },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} className="flex items-center gap-2 py-2 text-sm font-medium text-muted transition-colors hover:text-brand">
                  <Icon className="size-4 text-brand" aria-hidden />{label}
                </a>
              ))}
            </div>
            <a href="#finances" className="mt-7 inline-flex items-center gap-2 py-2 text-sm font-semibold text-brand">
              Take a closer look <ArrowDown className="size-4" aria-hidden />
            </a>
          </Reveal>
        </div>
        <Reveal delay={160} className="flex flex-col items-center gap-5 lg:items-end">
          <PhoneMockup />
          <p className="w-full text-center text-xs text-muted lg:max-w-[332px]">A glimpse of Audel. Illustrative data.</p>
        </Reveal>
      </div>
    </section>
  );
}
