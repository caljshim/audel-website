# Audel marketing site — spec

Single-page Next.js (App Router, TypeScript, Tailwind v4) static site for
**Audel**, the iOS copilot for money, goals, and days. No backend.

## Design language — ported from the iOS app

The source of truth is `goals-app/ios/goals-app/goals-app/Shared/DesignSystem/`,
not this document. Where the two disagree, the Swift wins.

- **White paper, ruled sections.** `Theme.canvas` is `#FFFFFF` and a widget
  carries no fill, border, or shadow (`WidgetCard.swift`, user decision
  2026-09-06). The site has no cards. Earlier passes of this site used a
  `#EEF1EE` canvas under white rounded cards — the exact arrangement the app
  rejected as "too weak to read, too strong to vanish" plus "the default look
  in software right now".
- **Three rules.** `ruleSection` (16%) closes a widget, `ruleFaint` (11%)
  separates rows inside one, `cardStroke` (6%) is an edge. A widget boundary
  must never read as the same weight as a row divider.
- **One hue.** Pine `#146B54`; honey `#B9871F` for earned; copper `#B0562F`
  for over — never alarm-red. Chart series come from `Theme.chartScale`.
- **One progress mark.** The capsule `GaugeBar`, with a self-tinted track, a
  gradient fill, and a copper overflow state. No rings.
- **Numbers.** SF Pro Rounded with `tabular-nums` on every figure; SF Pro
  everywhere else.
- **One filled surface per screen.** `FeatureCard` is allowed once; a second
  cancels the first. The page spends it on the waitlist CTA.
- **Uppercase is rationed.** A `WidgetTitle`, a `TagBadge`, and the caption on
  a filled surface. `LedgerSection` titles are sentence case — twelve tracked
  caps headings per screen is what made the app's dashboard read as noise.

## The app's screens are captures, not recreations

The Swift source is the authority for tokens. For the screens themselves there
is no authority but the app, so the site ships simulator captures of it
(`public/screens/`, procedure in `docs/screens.md`).

A CSS rebuild came first and was measured against a capture: its vertical
rhythm drifted up to 112pt down the screen, and it had quietly invented a month
grid where Schedule shows a week strip. Both failures are the same failure —
a reimplementation drifts, and it keeps drifting every time the app moves.

## Sections (one long sheet)

1. Pinned header — wordmark, section links, the one pine pill.
2. Hero — headline, waitlist field, and the Home screen in a device.
3. Trust capsules on the hero's closing rule.
4. Finances — copy and the Finances screen on its Transactions section.
5. Goals — `PinnedGoalsWidget` rebuilt at page scale, plus the MCP roadmap.
6. Ask Audel — one static exchange: pine prompt bubble, plain-text reply,
   checkmark receipt, and a pending decision that changes nothing until it is
   answered.
7. Schedule — copy and the Schedule screen (week strip, today, routine group).
8. In the details — six features as `LedgerRow`s in two columns.
9. Waitlist CTA — the single `FeatureCard`, with `FeatureMetrics`.
10. Footer — wordmark, links, and the not-financial-advice disclaimer.

## Motion

One moment: gauges fill on load. No scroll reveals, no looping chat, no hover
transitions on cards. Reduced motion collapses the fill.

## Light mode only

The site ships one theme, and so does any exploration of it (user decision
2026-09-13). The app has a dark mode that inverts the surface ramp rather than
flipping tokens; the marketing surface does not follow it.

## Non-goals

No backend, auth, analytics, or App Store link.
