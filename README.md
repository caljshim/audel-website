# Audel — marketing site

A single-page site for **Audel**, the iOS copilot for money, goals, and days
(Finances via Plaid, Goals wired to real data sources, a Schedule, a
customisable widget dashboard, and a copilot that lives in the middle of the
navigation bar).

- **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4**
- **Light mode only.** The site, and any design exploration of it, ships one
  theme. Do not add a dark variant.
- Static — no backend. The waitlist form is front-end only (validation +
  success state; nothing leaves the browser). Point it at a real endpoint in
  `components/ui/Waitlist.tsx`.
- Light-only, responsive, respects `prefers-reduced-motion`.

## Develop

```bash
npm run dev      # http://localhost:3000
npm run build    # production build (also typechecks)
npm run lint
```

## The design language

Everything here is taken from the iOS app's
`ios/goals-app/goals-app/Shared/DesignSystem/Theme.swift` and the components
next to it, so the site and the app read as one document. The two rules that
matter most, both of which the app arrived at by removing things:

**The page is white paper, and a widget has no chrome.** A widget is a title,
its rows, and the rule it closes on — no fill, no border, no shadow
(`Shared/Components/WidgetCard.swift`). The sheet is built the same way: there
are no cards on this site. Three rule weights do the separating, and each one
means something different:

| Token | Value | Job |
| --- | --- | --- |
| `rule` | `rgba(20,53,42,.16)` | closes a section |
| `rule-faint` | `rgba(20,53,42,.11)` | separates rows inside one |
| `hairline` | `rgba(20,53,42,.06)` | an edge — the pinned header, a bar's top |

**Money is set in rounded type with monospaced digits.** The `.fig` class is
SF Pro Rounded with `tabular-nums`; text is SF Pro. Inter and Nunito are loaded
as the fallback for anyone not on an Apple device.

Colour is one hue. Pine `#146B54` is the brand and "on track", honey `#B9871F`
is earned, copper `#B0562F` is over — never alarm-red. The app allows at most
one brand-filled `FeatureCard` per screen, so the whole page spends its single
pine surface on the waitlist CTA.

Where the app uses uppercase tracked labels, so does this site, and nowhere
else: a `WidgetTitle` heading a section, a `TagBadge` capsule, and the caption
on the one filled surface. A `LedgerSection` title is sentence case.

## Structure

```
app/
  layout.tsx      fonts + metadata
  globals.css     tokens ported from Theme.swift, base layer, the one animation
  page.tsx        composes the sections
components/
  Nav, Hero, FinancesFeature, GoalsFeature, CopilotFeature,
  ScheduleFeature, FeatureGrid, WaitlistCTA, Footer     — sections of the sheet
  ui/
    Ledger.tsx    Widget, WidgetTitle, LedgerSection, LedgerRow,
                  FeatureCard, FeatureMetrics — the app's page grammar
    Gauge, IconChip, TagBadge, Wordmark, AskAudel, SectionHeading, Waitlist
  mockups/
    Phone.tsx     the device shell around a captured screen
    Screens.tsx   Home, Finances, and Schedule, with their alt text
public/screens/   the captures themselves
tools/            the stub API they are captured against
lib/clsx.ts
docs/spec.md
```

## The screens

`public/screens/*.png` — Home, Goals, Finances and Schedule — are simulator
captures of the app running against a stub API. The real screens, not
recreations. `components/mockups/Phone.tsx` draws
only the device around them.

A hand-built HTML rebuild was tried first and abandoned. Measured against a
capture, its vertical rhythm drifted by up to 112pt down the screen: close
enough in style to pass a glance, wrong enough to feel off. A reimplementation
in a different text engine converges slowly and never arrives, and it goes
stale every time the app changes. A capture cannot drift.

**docs/screens.md** has the full procedure for retaking them, and
`tools/screens-stub-api.py` is the sample data they are captured against.
Nothing in that flow touches the real backend or its database.

## Motion

One moment: the gauges fill on load. Nothing else on the page moves unless a
person asks it to — no scroll reveals, no looping chat. `prefers-reduced-motion`
collapses it.
