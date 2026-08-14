# Audel marketing site — spec

Single-page Next.js (App Router, TypeScript, Tailwind) static marketing site promoting
**Audel**, a unified personal AI copilot (Finances via Plaid, Goals, Schedule, customizable
Dashboard widgets, and a central AI copilot chat). No backend.

## Design language — "Ledger pine" (ported from the iOS app Theme.swift)
- Brand pine `#146B54` (light) / mint `#63D0A8` (dark); honey gold `#B9871F` accents;
  copper `#B0562F` for negative states; canvas `#F0F3F1` light / `#0D1210` dark;
  white cards `#FFFFFF` / `#171D1A`; soft green-tinted shadows.
- Warm rounded sans typography. **Monospaced digits (tabular-nums)** on every metric — a
  signature detail from the app.
- Recreated signature components: capsule **gauge bar** (gradient fill, copper overflow),
  **icon chip** (icon in tinted rounded square), **tag badge** (uppercase capsule).
- "AI-inspired": subtle animated gradient-mesh glow behind the hero, copilot chat spotlight,
  restrained scroll-reveal motion. Light/dark aware.

## Sections (single long scroll)
1. Sticky nav — wordmark, section links, "Join waitlist".
2. Hero — headline, subcopy, waitlist email field, "Coming soon to iOS", floating iPhone
   mockup of the widget dashboard.
3. Trust strip — feature pills (Plaid-connected, read-only, private).
4. Four pillars — Dashboard / Finances / Goals / Schedule, each a card with a mini recreated
   UI motif.
5. AI Copilot spotlight — recreated chat exchange; "asks before it acts, never trades on its own."
6. How it works — Connect → Set goals → Ask Audel.
7. Feature grid — 6 smaller features.
8. Waitlist CTA band — client-side email capture with success state (no network/storage).
9. Footer — wordmark, nav, "not financial advice" disclaimer, copyright.

## Structure
- `app/page.tsx` composes small section components in `components/`.
- Design tokens in Tailwind config + `lib/theme.ts`.
- Waitlist: front-end only; validates + confirms; easy to later point at a real endpoint.

## Non-goals
- No real backend, auth, analytics, or App Store link (app not shipping yet).
