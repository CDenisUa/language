# Current State

_Last updated: 2026-07-14_

This is the daily source of truth for what's actually built. If this disagrees with the code, trust the code and fix this file. For why decisions were made, see [`DECISIONS.md`](./DECISIONS.md).

## Done

- **Project scaffold** — Vite + React 19 + TypeScript, `vite-plugin-pwa` configured (unique manifest `id: /sprachlabor`, icons, apple meta tags, offline app-shell caching via Workbox).
- **Routing shell** — six placeholder pages wired up via `react-router-dom`: Dashboard, Vocabulary, Scheduler, Shadowing, Error Journal, Settings.
- **Two-language theming** — `zustand` store (`useLanguageStore`) drives a `data-language` attribute on the app root; CSS custom property `--color-accent` switches red (German) / blue (English) app-wide.
- **Branding** — `ChepioTechFooter` component wired in, per global project convention.
- **UI localization (i18n)** — interface text switches between Ukrainian (default) and Russian via `useLocaleStore` (zustand, persisted to `localStorage`), independent of the DE/EN study-language switch. Translation dictionaries live in `src/i18n/translations.ts`; `useTranslation()` is the access hook. Card content (word translations) is a separate, not-yet-built concern.
- **Test infra** — Vitest + Testing Library + jsdom configured (with a `localStorage` polyfill in `src/setupTests.ts` — Node's own built-in Web Storage shadows jsdom's in this Node version and isn't functional by default). 5 tests passing across 3 files.
- **Verified in-browser** — dev server, production build, and DE/EN + UA/RU switch behavior manually checked with Playwright.
- **Deployed to GitHub** — `git@github.com:CDenisUa/language.git`, `main` branch.

## Not built yet

Everything else in the roadmap: IndexedDB data layer, FSRS vocabulary review, Smart Scheduler calendar + temporal-separation logic, push notifications, Shadowing Lab, error journal, dashboard analytics, JSON export/import. See the todo list in-session or `DECISIONS.md` for the shape each of these is expected to take.

## Known constraints carried forward

- No speech-to-text on iOS/Safari — TTS only there (see `DECISIONS.md`).
- No backend/sync yet — everything is local to one browser/device.
