import Image from "next/image";
import { Check } from "lucide-react";
import { clsx } from "@/lib/clsx";

/**
 * One turn of the conversation, built the way `CopilotMessageRow` builds it:
 * the prompt sits in a pine bubble, and Audel's reply is plain text on whatever
 * surface is behind it. A reply bubble would be a second container around an
 * answer that may run to a paragraph and a table.
 *
 * Receipts — what Audel actually did — are a checkmark line in pine, so the
 * answer and the action taken are never the same mark.
 */
export function AskAudel({
  question,
  answer,
  receipt,
  className,
}: {
  question: string;
  answer: React.ReactNode;
  receipt?: string;
  className?: string;
}) {
  return (
    <div className={clsx("w-full", className)}>
      <div className="flex justify-end">
        <p className="max-w-[82%] rounded-[18px] bg-pine px-3.5 py-2.5 text-[15px] leading-snug text-on-pine">
          {question}
        </p>
      </div>

      <div className="mt-3">
        <div className="max-w-[88%] text-[15px] leading-relaxed">
          {answer}
          {receipt ? (
            <p className="mt-2.5 flex items-center gap-1.5 text-[13px] font-medium text-pine">
              <Check className="size-3.5 stroke-[2.5]" aria-hidden />
              {receipt}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** The pine disc with the Audel mark, as it sits in the centre of the tab bar. */
export function AudelMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span
      className={clsx("grid shrink-0 place-items-center rounded-full bg-pine", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/audel-mark-cream.png"
        alt=""
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size * 0.62, height: size * 0.62 }}
      />
    </span>
  );
}
