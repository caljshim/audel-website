import { Wordmark } from "@/components/ui/Wordmark";

const groups = [
  {
    title: "The app",
    links: [
      { href: "#finances", label: "Finances" },
      { href: "#goals", label: "Goals" },
      { href: "#copilot", label: "Ask Audel" },
      { href: "#schedule", label: "Schedule" },
    ],
  },
  {
    title: "Audel",
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
    <footer className="border-t border-rule">
      <div className="sheet grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div className="max-w-[30ch]">
          <Wordmark size={30} />
          <p className="mt-4 text-[15px] leading-relaxed text-prose">
            One copilot for your money, your goals, and your days. It reads
            everything, changes nothing without asking, and keeps it to itself.
          </p>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-[15px] font-semibold">{g.title}</p>
            <ul className="mt-4 space-y-2.5">
              {g.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[15px] text-meta transition-colors hover:text-label"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-hairline">
        <div className="sheet flex flex-col gap-2 py-6 text-[13px] text-meta sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Audel</p>
          <p className="max-w-[52ch] sm:text-right">
            Audel provides financial information, not financial advice. Account
            connections are read-only: it does not place trades or move money.
          </p>
        </div>
      </div>
    </footer>
  );
}
