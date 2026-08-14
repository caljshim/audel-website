"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { clsx } from "@/lib/clsx";

const links = [
  { href: "#pillars", label: "Product" },
  { href: "#copilot", label: "Copilot" },
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
      <nav
        className={clsx(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled
            ? "border border-line bg-canvas/85 shadow-card backdrop-blur-xl"
            : "border border-transparent bg-transparent",
        )}
      >
        <a href="#top" className="rounded-full" aria-label="Audel home">
          <Wordmark variant={scrolled ? "tile" : "cream"} />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={clsx(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                scrolled
                  ? "text-muted hover:text-ink"
                  : "text-cream/80 hover:text-cream",
              )}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#waitlist"
          className={clsx(
            "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            scrolled
              ? "bg-brand text-on-brand hover:bg-brand-strong"
              : "bg-cream text-brand hover:bg-cream/90",
          )}
        >
          Join waitlist
        </a>
      </nav>
    </header>
  );
}
