"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import { clsx } from "@/lib/clsx";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Front-end only waitlist capture. Validates an email and confirms — no data
 * leaves the browser. Point it at a real endpoint when there is one.
 */
export function Waitlist({
  variant = "paper",
  note = "Coming soon to iOS. One email, on launch day.",
  className,
}: {
  /** "paper" sits on the sheet; "on-pine" sits on the one brand surface */
  variant?: "paper" | "on-pine";
  note?: string;
  className?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const onPine = variant === "on-pine";

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
          "flex items-center gap-3 rounded-[14px] px-4 py-3.5",
          onPine ? "bg-on-pine/[0.13] text-on-pine" : "bg-pine/[0.10] text-pine",
          className,
        )}
        role="status"
      >
        <span
          className={clsx(
            "grid size-7 shrink-0 place-items-center rounded-full",
            onPine ? "bg-on-pine text-pine" : "bg-pine text-on-pine",
          )}
        >
          <Check className="size-4 stroke-[3]" aria-hidden />
        </span>
        <span className="text-[15px] font-semibold">
          You&rsquo;re on the list. We&rsquo;ll email you the day it ships.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={clsx("w-full", className)}>
      <div className="flex flex-col gap-2 sm:flex-row">
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
            "min-w-0 flex-1 rounded-[14px] px-4 py-3 text-[16px] outline-none transition-colors",
            onPine
              ? "bg-on-pine/[0.13] text-on-pine placeholder:text-on-pine/65 focus:bg-on-pine/[0.18]"
              : "bg-label/[0.05] text-label placeholder:text-meta focus:bg-label/[0.08]",
            state === "error" && !onPine && "ring-1 ring-copper",
          )}
        />
        <button
          type="submit"
          className={clsx(
            "shrink-0 rounded-[14px] px-6 py-3 text-[16px] font-semibold transition-opacity duration-150 active:opacity-60",
            onPine
              ? "bg-on-pine text-pine"
              : "bg-pine text-on-pine",
          )}
        >
          Join waitlist
        </button>
      </div>
      <p
        className={clsx(
          "mt-2.5 text-[13px]",
          state === "error"
            ? onPine
              ? "text-on-pine"
              : "text-copper"
            : onPine
              ? "text-on-pine/70"
              : "text-meta",
        )}
      >
        {state === "error"
          ? "Enter a valid email address to join."
          : note}
      </p>
    </form>
  );
}
