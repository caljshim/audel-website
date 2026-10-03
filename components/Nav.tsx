"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { clsx } from "@/lib/clsx";

const links = [
  { href: "#finances", label: "Finances" },
  { href: "#goals", label: "Goals" },
  { href: "#copilot", label: "Copilot" },
  { href: "#schedule", label: "Schedule" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 bg-paper/85 backdrop-blur-xl",
        // The app's rule: a pinned header closes on a hairline once content is
        // behind it, and on nothing before that.
        scrolled ? "border-b border-hairline" : "border-b border-transparent",
      )}
    >
      <nav className="sheet flex items-center justify-between py-3.5">
        <a href="#top" aria-label="Audel home">
          <Wordmark />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[15px] font-medium text-meta transition-colors hover:text-label"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#waitlist"
          className="rounded-full bg-pine px-4 py-2 text-[15px] font-semibold text-on-pine transition-opacity duration-150 active:opacity-60"
        >
          Join waitlist
        </a>
      </nav>
    </header>
  );
}
