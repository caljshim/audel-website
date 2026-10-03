"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AudioLines, Quote, Check, Camera } from "lucide-react";
import { Gauge } from "@/components/ui/Gauge";
import { AudelMark } from "@/components/ui/AskAudel";
import { clsx } from "@/lib/clsx";

/**
 * One turn with Audel, played out: hold the button, watch the transcript land,
 * send it, and see the budgets it made appear underneath.
 *
 * The states are the app's own — `AudelTranscriptCard` is a waveform and a
 * copper "listening" label while the mic is open, a quote mark and "heard" once
 * it closes, and it only offers Cancel and Send at that point, because nothing
 * is sent until a person says so. The reply is plain text, what Audel actually
 * did is a checkmark receipt, and the budgets arrive in the app's one progress
 * language.
 *
 * It runs only while on screen, and `prefers-reduced-motion` gets the finished
 * turn with no playback at all.
 */

const PROMPT = "Set me a $600 grocery budget and $300 for dining";

type Phase =
  | "idle"
  | "listening"
  | "heard"
  | "sending"
  | "thinking"
  | "replying"
  | "results"
  | "done";

/** ms from the start of the loop that each phase begins. */
const TIMELINE: [Phase, number][] = [
  ["idle", 0],
  ["listening", 600],
  ["heard", 3400],
  ["sending", 4800],
  ["thinking", 5200],
  ["replying", 6500],
  ["results", 7400],
  ["done", 9000],
];

const LOOP = 14000;
const TYPE_START = 800;
const TYPE_END = 3300;

const QUERY = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia(QUERY);
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia(QUERY).matches,
    // On the server there is no preference to read. Rendering the played-out
    // turn would ship the ending to everyone, so assume motion is welcome and
    // let the client correct it before anything animates.
    () => false,
  );
}

export function AudelDemo({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [livePhase, setPhase] = useState<Phase>("idle");
  const [liveTyped, setTyped] = useState(0);
  const still = usePrefersReducedMotion();

  // Nothing plays, so the turn is simply shown finished.
  const phase: Phase = still ? "results" : livePhase;
  const typed = still ? PROMPT.length : liveTyped;

  useEffect(() => {
    if (still) return;
    const node = ref.current;
    if (!node) return;

    let timers: number[] = [];
    let raf = 0;
    let start = 0;
    let running = false;

    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
      cancelAnimationFrame(raf);
    };

    const tick = () => {
      const t = performance.now() - start;
      const ratio = Math.min(Math.max((t - TYPE_START) / (TYPE_END - TYPE_START), 0), 1);
      setTyped(Math.round(ratio * PROMPT.length));
      if (running) raf = requestAnimationFrame(tick);
    };

    const play = () => {
      clear();
      start = performance.now();
      setTyped(0);
      TIMELINE.forEach(([name, at]) => {
        timers.push(window.setTimeout(() => setPhase(name), at));
      });
      timers.push(window.setTimeout(play, LOOP));
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          play();
        } else if (!entry.isIntersecting && running) {
          running = false;
          clear();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      running = false;
      clear();
    };
  }, [still]);

  const at = (name: Phase) => TIMELINE.findIndex(([p]) => p === name);
  const reached = (name: Phase) => at(phase) >= at(name);

  const listening = phase === "listening";
  const sending = phase === "sending";
  // the card stays up through the send, so the button can be seen being pressed
  const showTranscript = listening || phase === "heard" || sending;
  const showBubble = reached("sending");
  const showReply = reached("replying");
  const showResults = reached("results");

  return (
    <div
      ref={ref}
      className={clsx(
        "flex flex-col rounded-[22px] bg-paper p-6 shadow-float ring-1 ring-hairline sm:p-7",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-rule-faint pb-4">
        <AudelMark size={26} />
        <span className="text-[13px] font-semibold text-meta">Audel</span>
        <span className="ml-auto flex items-center gap-3 text-meta">
          <Camera className="size-[17px]" strokeWidth={2} aria-hidden />
        </span>
      </div>

      {/* The turn, built downward. A fixed floor keeps the card from resizing
          under the reader as each piece lands. */}
      <div className="min-h-[330px] flex-1 pt-5" aria-live="polite">
        {showBubble ? (
          <div className={clsx("flex justify-end", !still && "animate-[rise_.32s_var(--ease-out-soft)_both]")}>
            <p className="max-w-[85%] rounded-[18px] bg-pine px-3.5 py-2.5 text-[15px] leading-snug text-on-pine">
              {PROMPT}
            </p>
          </div>
        ) : null}

        {phase === "thinking" ? (
          <div className="flex items-center gap-1.5 pt-4">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 rounded-full bg-pine"
                style={{ animation: `blink 1.1s ${i * 0.16}s ease-in-out infinite` }}
              />
            ))}
          </div>
        ) : null}

        {showReply ? (
          <div className={clsx("pt-4", !still && "animate-[rise_.36s_var(--ease-out-soft)_both]")}>
            <p className="text-[15px] leading-relaxed">
              Done. Groceries has <span className="tabular-nums">$239.62</span> left this
              month. Dining is already <span className="tabular-nums">$40.00</span> over, so
              I left it flagged rather than quietly raising it.
            </p>
            <p className="mt-2.5 flex items-center gap-1.5 text-[13px] font-medium text-pine">
              <Check className="size-3.5 stroke-[2.5]" aria-hidden />2 budgets created
            </p>
          </div>
        ) : null}

        {showResults ? (
          <div className="mt-5 border-t border-rule-faint pt-4">
            <p className="widget-title">Flexible budget remaining</p>
            <div className="mt-3">
              <Row
                name="Groceries"
                left="$239.62"
                spent="$360.38"
                limit="$600.00"
                pct={60}
                delay={0}
                still={still}
              />
              <Row
                name="Dining"
                left="-$40.00"
                spent="$340.00"
                limit="$300.00"
                pct={113}
                over
                delay={140}
                still={still}
                last
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* The input. `AudelTranscriptCard` while the mic is open or just closed;
          the hold-to-speak bar the rest of the time. */}
      <div className="pt-5">
        {showTranscript ? (
          <div
            className={clsx(
              "rounded-[18px] bg-paper p-3.5 shadow-float ring-1 ring-rule-faint",
              !still && "animate-[rise_.28s_var(--ease-out-soft)_both]",
            )}
          >
            <div className="flex items-center gap-1.5">
              {listening ? (
                <AudioLines className="size-[15px] animate-pulse text-copper" strokeWidth={2.4} aria-hidden />
              ) : (
                <Quote className="size-[15px] fill-pine text-pine" aria-hidden />
              )}
              <span className="text-[11px] font-bold uppercase tracking-[0.6px] text-quiet">
                {listening ? "Listening" : "Heard"}
              </span>
            </div>
            <p className="mt-2 min-h-[2.6em] text-[15px] leading-snug">
              {typed === 0 ? (
                <span className="text-quiet">…</span>
              ) : (
                <>
                  {PROMPT.slice(0, typed)}
                  {listening ? (
                    <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-pine align-middle" />
                  ) : null}
                </>
              )}
            </p>
            {!listening ? (
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[15px] font-medium text-meta">Cancel</span>
                <span
                  className={clsx(
                    "rounded-full bg-pine px-[18px] py-2 text-[15px] font-semibold text-on-pine transition-transform duration-150",
                    sending && "scale-90",
                  )}
                >
                  Send
                </span>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-[18px] bg-label/[0.04] py-2.5 pl-4 pr-2.5">
            <span className="flex-1 text-[15px] text-meta">Hold to speak, or type</span>
            <span
              className={clsx(
                "grid size-[38px] place-items-center rounded-full bg-pine",
                showResults && !still && "animate-[breathe_2.4s_ease-in-out_infinite]",
              )}
            >
              <AudioLines className="size-[18px] text-on-pine" strokeWidth={2.2} aria-hidden />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  name,
  left,
  spent,
  limit,
  pct,
  over,
  delay,
  still,
  last,
}: {
  name: string;
  left: string;
  spent: string;
  limit: string;
  pct: number;
  over?: boolean;
  delay: number;
  still: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={clsx(!still && "animate-[rise_.4s_var(--ease-out-soft)_both]")}
      style={still ? undefined : { animationDelay: `${delay}ms` }}
    >
      <div className="pt-3">
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-medium">{name}</span>
          <span className={clsx("ml-auto flex items-baseline gap-1", over ? "text-copper" : "text-pine")}>
            <span className="text-[15px] font-medium tabular-nums">{left}</span>
            <span className="text-[11px] font-medium">left</span>
          </span>
        </div>
        <p className="mt-1 text-[13px] tabular-nums text-meta">
          {spent} of {limit}
        </p>
        <div className="mb-3 mt-2">
          <Gauge pct={pct} height={10} delay={still ? 0 : delay + 180} />
        </div>
      </div>
      {!last ? <div className="h-px bg-rule-faint" /> : null}
    </div>
  );
}
