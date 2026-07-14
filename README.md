# Sprachlabor

> Working name — rename anytime. See `DECISIONS.md` for why this name/stack was picked, and `CURRENT_STATE.md` for what's actually built right now (this file doesn't track day-to-day status).

Personal offline-first PWA for learning German (Austrian-focused, intensive daytime study) and English (evenings), built around spaced repetition (FSRS), a shadowing/pronunciation lab, and a schedule-aware reminder system that keeps the two languages temporally separated.

## Stack

- Vite + React + TypeScript
- `vite-plugin-pwa` (Workbox) — offline app shell, installable on iOS/Android/desktop
- IndexedDB (via `idb`) — local-first storage, no backend in MVP
- `ts-fsrs` — spaced repetition scheduling
- `react-router-dom`, `zustand`, `date-fns`, `react-big-calendar`

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run test     # vitest
npm run build    # typecheck + production build
npm run lint     # oxlint
```

## Docs

Start a new session by reading these in order:

1. [`ROADMAP.md`](./ROADMAP.md) — task checklist (what's next) and how to resume work
2. [`CURRENT_STATE.md`](./CURRENT_STATE.md) — dated snapshot of what's actually implemented
3. [`DECISIONS.md`](./DECISIONS.md) — architecture decision log (ADR-lite), why each choice was made
