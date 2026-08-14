# Audel — marketing site

A single-page marketing site for **Audel**, the unified personal AI copilot
(Finances via Plaid, Goals, Schedule, a customizable widget dashboard, and a central
AI copilot chat). Built on the app logo's palette — green **`#1E6051`** and cream
**`#FFF7E9`** — for a bright, light-mode "scheduler" feel.

- **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4**
- Static — no backend. The waitlist form is front-end only (validation + success
  state; no data leaves the browser). Point it at a real endpoint later in
  `components/ui/Waitlist.tsx`.
- **Light-only**, green + cream primarily: green hero / copilot / CTA / footer bands
  alternating with warm-white sections. Fully responsive; respects
  `prefers-reduced-motion`.
- Uses the real Audel logo (`public/audel-icon.png` green tile, `public/audel-mark-cream.png`
  cream mark, `app/icon.png` favicon).

## Develop

```bash
npm run dev      # http://localhost:3000
npm run build    # production build (also runs typecheck + lint)
npm run start    # serve the production build
```

## Structure

```
app/
  layout.tsx      fonts (Bricolage Grotesque / Hanken Grotesk / IBM Plex Mono), metadata
  globals.css     "Ledger pine" design tokens (light/dark), base layer, motion
  page.tsx        composes the sections
components/
  Nav, Hero, TrustStrip, Pillars, CopilotSpotlight, HowItWorks,
  FeatureGrid, WaitlistCTA, Footer          — page sections
  mockups/PhoneMockup.tsx                    — recreated widget dashboard
  ui/  Gauge, IconChip, TagBadge, Wordmark,  — signature primitives ported from the app
       Waitlist, Reveal, SectionHeading
lib/clsx.ts                                  — tiny classnames helper
docs/spec.md                                 — design spec
```

## Design notes

- **Gauge** (`components/ui/Gauge.tsx`) is the signature motif — the app's capsule
  progress bar with a pine→mint gradient and a copper overflow state — reused across
  the whole page.
- Metrics use **monospaced tabular digits** (`.tabular`), echoing the app.
- Scroll reveals are a progressive enhancement: content is visible without JS and
  reveals on scroll when JS is present (`components/ui/Reveal.tsx` + the `.js` flag set
  in `app/layout.tsx`).
