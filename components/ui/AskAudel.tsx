import Image from "next/image";
import { clsx } from "@/lib/clsx";

/**
 * A small, self-looping "Ask Audel" exchange: the question slides in, three dots
 * think, then the answer resolves — on a calm 11s loop. The animation lives in
 * globals.css and degrades to a static, completed Q&A under reduced motion.
 *
 * `answer` is a node so a section can fold its own signature (a gauge, a total)
 * into Audel's reply.
 */
export function AskAudel({
  question,
  answer,
  className,
}: {
  question: string;
  answer: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "w-full max-w-[330px] rounded-card bg-card p-4 shadow-float",
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-brand">
          <Image
            src="/audel-mark-cream.png"
            alt=""
            width={13}
            height={13}
            className="size-3 object-contain"
          />
        </span>
        <span className="text-[11px] font-semibold tracking-[0.02em] text-faint">
          Ask Audel
        </span>
      </div>

      {/* question */}
      <div className="ask-q flex justify-end">
        <p className="max-w-[86%] rounded-2xl rounded-br-md bg-brand px-3 py-2 text-[12.5px] leading-snug text-on-brand">
          {question}
        </p>
      </div>

      {/* answer (reserves its height) with thinking dots overlaid on top */}
      <div className="relative mt-2.5 flex justify-start">
        <div className="ask-a max-w-[92%] rounded-2xl rounded-bl-md bg-card-2 px-3 py-2.5 text-[12.5px] leading-snug text-ink">
          {answer}
        </div>
        <div className="ask-dots absolute left-3 top-3 flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-brand"
              style={{ animation: `blink 1.2s ${i * 0.16}s ease-in-out infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
