"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { clsx } from "@/lib/clsx";

const links = [
  { href: "#finances", label: "Finances" },
  { href: "#goals", label: "Goals" },
  { href: "#schedule", label: "Schedule" },
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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center bg-canvas/90 px-3 backdrop-blur-xl">
      <nav
        className={clsx(
          "flex w-full max-w-6xl items-center justify-between border-b px-2 py-4 transition-colors duration-300 sm:px-5",
          scrolled
            ? "border-line"
            : "border-transparent",
        )}
      >
        <a href="#top" className="rounded-full" aria-label="Audel home">
          <Wordmark />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={clsx(
                "rounded-lg px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-brand",
              )}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#waitlist"
          className={clsx(
            "inline-flex items-center rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-strong",
          )}
        >
          Join waitlist
        </a>
      </nav>
    </header>
  );
}
