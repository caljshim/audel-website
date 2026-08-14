"use client";

import { useId, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { clsx } from "@/lib/clsx";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Front-end only waitlist capture. Validates an email and shows a confirmation
 * — no data leaves the browser. Point `onJoin` at a real endpoint later.
 */
export function Waitlist({
  variant = "light",
  className,
}: {
  /** "light" sits on the canvas; "on-brand" sits on a pine band */
  variant?: "light" | "on-brand";
  className?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const onBrand = variant === "on-brand";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setState("error");
      return;
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <div
        className={clsx(
          "flex items-center gap-3 rounded-full py-3 pl-3 pr-5",
          onBrand ? "bg-on-brand/15 text-on-brand" : "bg-brand/10 text-brand",
          className,
        )}
        role="status"
      >
        <span
          className={clsx(
            "grid size-8 shrink-0 place-items-center rounded-full",
            onBrand ? "bg-on-brand text-brand" : "bg-brand text-on-brand",
          )}
        >
          <Check className="size-4 stroke-[3]" aria-hidden />
        </span>
        <span className="text-sm font-semibold">
          You&rsquo;re on the list — we&rsquo;ll email you at launch.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={clsx("w-full", className)}>
      <div
        className={clsx(
          "flex flex-col gap-2 rounded-[18px] p-2 sm:flex-row sm:items-center sm:rounded-full",
          onBrand
            ? "bg-on-brand/12 ring-1 ring-on-brand/25"
            : "border border-line bg-card shadow-card",
        )}
      >
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          aria-invalid={state === "error"}
          className={clsx(
            "min-w-0 flex-1 bg-transparent px-4 py-2.5 text-[15px] outline-none placeholder:text-faint",
            onBrand ? "text-on-brand placeholder:text-on-brand/55" : "text-ink",
          )}
        />
        <button
          type="submit"
          className={clsx(
            "group inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 active:scale-[0.97] sm:py-2.5",
            onBrand
              ? "bg-on-brand text-brand hover:bg-on-brand/90"
              : "bg-brand text-on-brand hover:bg-brand-strong",
          )}
        >
          Join waitlist
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </button>
      </div>
      <p
        className={clsx(
          "mt-2 pl-4 text-xs",
          state === "error"
            ? "text-copper"
            : onBrand
              ? "text-on-brand/70"
              : "text-faint",
        )}
      >
        {state === "error"
          ? "Enter a valid email address to join."
          : "Coming soon to iOS. No spam — one launch email."}
      </p>
    </form>
  );
}
