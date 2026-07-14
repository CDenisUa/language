# Current State

_Last updated: 2026-07-14_

This is the daily source of truth for what's actually built. If this disagrees with the code, trust the code and fix this file. For why decisions were made, see [`DECISIONS.md`](./DECISIONS.md).

## Done

- **Project scaffold** — Vite + React 19 + TypeScript, `vite-plugin-pwa` configured (unique manifest `id: /sprachlabor`, icons, apple meta tags, offline app-shell caching via Workbox).
- **Routing shell** — six placeholder pages wired up via `react-router-dom`: Dashboard, Vocabulary, Scheduler, Shadowing, Error Journal, Settings.
- **Two-language theming** — `zustand` store (`useLanguageStore`) drives a `data-language` attribute on the app root; CSS custom property `--color-accent` switches red (German) / blue (English) app-wide.
- **Branding** — `ChepioTechFooter` component wired in, per global project convention.
- **Test infra** — Vitest + Testing Library + jsdom configured, one smoke test passing (`src/App.test.tsx`).
- **Verified in-browser** — dev server, production build, and language-switch behavior manually checked with Playwright.

## Not built yet

Everything else in the roadmap: IndexedDB data layer, FSRS vocabulary review, Smart Scheduler calendar + temporal-separation logic, push notifications, Shadowing Lab, error journal, dashboard analytics, JSON export/import. See the todo list in-session or `DECISIONS.md` for the shape each of these is expected to take.

## Known constraints carried forward

- No speech-to-text on iOS/Safari — TTS only there (see `DECISIONS.md`).
- No backend/sync yet — everything is local to one browser/device.
