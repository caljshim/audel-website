import { Sparkles, Wallet, TrendingUp, ShieldCheck, GitBranch } from "lucide-react";
import { Gauge } from "@/components/ui/Gauge";
import { TagBadge } from "@/components/ui/TagBadge";
import { Reveal } from "@/components/ui/Reveal";
import { IconChip } from "@/components/ui/IconChip";

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Audel is thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 rounded-full bg-brand"
          style={{ animation: `blink 1.2s ${i * 0.16}s ease-in-out infinite` }}
        />
      ))}
    </span>
  );
}

function ChatCard() {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-card shadow-float">
      {/* header */}
      <div className="flex items-center gap-2.5 border-b border-line bg-card-2 px-4 py-3">
        <span className="grid size-8 place-items-center rounded-full bg-brand text-on-brand">
          <Sparkles className="size-4" aria-hidden />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold text-ink">Audel copilot</p>
          <p className="text-[11px] text-faint">Budgeting + Investing specialists</p>
        </div>
        <TagBadge tone="muted" icon={ShieldCheck}>
          Read-only
        </TagBadge>
      </div>

      {/* thread */}
      <div className="space-y-3.5 px-4 py-5">
        {/* user */}
        <div className="flex justify-end">
          <p className="max-w-[80%] rounded-2xl rounded-br-md bg-brand px-3.5 py-2.5 text-[13px] text-on-brand">
            How much spare cash could I safely invest this month?
          </p>
        </div>

        {/* routing */}
        <div className="flex items-center gap-2 text-[11px] text-faint">
          <GitBranch className="size-3.5" aria-hidden />
          Routed to
          <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 font-medium text-brand">
            <Wallet className="size-3" aria-hidden /> Budgeting
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-honey/12 px-2 py-0.5 font-medium text-honey">
            <TrendingUp className="size-3" aria-hidden /> Investing
          </span>
        </div>

        {/* assistant */}
        <div className="max-w-[88%] space-y-3 rounded-2xl rounded-bl-md bg-card-2 px-3.5 py-3">
          <p className="text-[13px] leading-relaxed text-ink">
            After rent, bills, and your $500 buffer, you have roughly{" "}
            <span className="tabular font-semibold text-brand">$840</span>{" "}
            uncommitted this month. That&rsquo;s about{" "}
            <span className="tabular font-semibold">21%</span> of your take-home —
            within a comfortable range.
          </p>
          <div className="rounded-lg border border-line bg-card p-3">
            <div className="flex justify-between text-[11px] text-muted">
              <span>Safe-to-invest</span>
              <span className="tabular text-ink">$840 / $4,020</span>
            </div>
            <div className="mt-2">
              <Gauge pct={21} height={8} />
            </div>
          </div>
          <p className="flex items-start gap-2 text-[12px] text-muted">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden />
            I can&rsquo;t place trades — this is guidance only. Want me to show it beside
            your portfolio?
          </p>
        </div>

        {/* typing */}
        <div className="flex items-center gap-2 pl-1">
          <TypingDots />
        </div>
      </div>
    </div>
  );
}

const points = [
  {
    icon: GitBranch,
    title: "One question, the right specialist",
    copy: "Ask anything and Audel delegates to a budgeting or investing expert — or both, for cross-domain questions.",
  },
  {
    icon: ShieldCheck,
    title: "It asks before it acts",
    copy: "Read-only by default and conservative by design. Audel never moves money or places a trade without an explicit yes.",
  },
  {
    icon: Sparkles,
    title: "Education-forward answers",
    copy: "Every answer explains the why, in plain language — so you finish smarter, not just informed.",
  },
];

export function CopilotSpotlight() {
  return (
    <section
      id="copilot"
      className="relative scroll-mt-24 overflow-hidden bg-brand py-20 text-on-brand sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(70% 60% at 88% 0%, #2c7a66 0%, transparent 55%)," +
            "linear-gradient(180deg, #1b564a 0%, #164a3f 100%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow text-honey-light">The copilot</p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.02] text-cream">
              A copilot that reasons across your whole financial life.
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-4 text-lg leading-relaxed text-cream/80">
              Most apps hand you charts and leave the thinking to you. Audel connects the
              dots between what you earn, owe, own, and plan — and tells you what it means.
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={180 + i * 90} className="flex gap-4">
                <IconChip icon={p.icon} size="md" tone="cream" />
                <div>
                  <h3 className="font-display text-base font-bold text-cream">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cream/75">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={150}>
          <ChatCard />
        </Reveal>
      </div>
    </section>
  );
}
