import { Wordmark } from "@/components/ui/Wordmark";

const groups = [
  {
    title: "Product",
    links: [
      { href: "#finances", label: "Finances" },
      { href: "#goals", label: "Goals" },
      { href: "#schedule", label: "Schedule" },
      { href: "#features", label: "Features" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#waitlist", label: "Join waitlist" },
      { href: "mailto:hello@audel.app", label: "Contact" },
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line text-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-xs">
          <Wordmark size={34} />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            One AI copilot for your money, goals, and days. Private by design, and always
            asks before it acts.
          </p>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-sm font-semibold text-ink">
              {g.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {g.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Audel. All rights reserved.</p>
          <p className="max-w-md sm:text-right">
            Audel provides financial information and education, not financial advice. It is
            read-only and does not place trades or move money.
          </p>
        </div>
      </div>
    </footer>
  );
}
