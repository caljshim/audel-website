"use client";

import { useEffect, useRef } from "react";
import { clsx } from "@/lib/clsx";

/**
 * Scroll-triggered reveal. Adds the `.in` class once the element enters the
 * viewport, then unobserves. Honors reduced-motion via the CSS in globals.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver, or already within (or near) the viewport:
    // reveal immediately so content never gets stranded at opacity 0.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.classList.add("in");
      return;
    }

    el.classList.add("pending");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.remove("pending");
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.classList.remove("pending");
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={clsx("reveal", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
