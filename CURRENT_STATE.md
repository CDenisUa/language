# Current State

_Last updated: 2026-07-14_

This is the daily source of truth for what's actually built. If this disagrees with the code, trust the code and fix this file. For what's next, see [`ROADMAP.md`](./ROADMAP.md); for why decisions were made, see [`DECISIONS.md`](./DECISIONS.md).

## Done

- **Project scaffold** — Vite + React 19 + TypeScript, `vite-plugin-pwa` configured (unique manifest `id: /sprachlabor`, icons, apple meta tags, offline app-shell caching via Workbox).
- **Routing shell** — six placeholder pages wired up via `react-router-dom`: Dashboard, Vocabulary, Scheduler, Shadowing, Error Journal, Settings.
- **Two-language theming** — `zustand` store (`useLanguageStore`) drives a `data-language` attribute on the app root; CSS custom property `--color-accent` switches red (German) / blue (English) app-wide.
- **Branding** — `ChepioTechFooter` component wired in, per global project convention.
- **UI localization (i18n)** — interface text switches between Ukrainian (default) and Russian via `useLocaleStore` (zustand, persisted to `localStorage`), independent of the DE/EN study-language switch. Translation dictionaries live in `src/i18n/translations.ts`; `useTranslation()` is the access hook. Card content (word translations) is a separate, not-yet-built concern.
- **IndexedDB data layer** (`src/services/db/`) — `getDatabase()` singleton via `idb`, schema-typed against `SprachlaborDBSchema` (v2: `words` indexed `by-language`, plus `scheduleEvents`). A generic `createRepository(storeName)` factory gives every store `getAll/getById/put/remove/clear/save`, with `save()` auto-stamping `id`/`createdAt`/`updatedAt` per the sync-readiness convention in `DECISIONS.md` — its type now uses a distributive `Omit` so `save()` still works correctly for discriminated-union stores like `scheduleEvents`. `wordsRepository` adds `getByLanguage()`. `WordRecord` (`src/types/word.ts`) embeds `ts-fsrs`'s own `Card` type directly rather than redefining FSRS fields.
- **Verified in-browser** — dev server, production build, and DE/EN + UA/RU switch behavior manually checked with Playwright.
- **Deployed to GitHub** — `git@github.com:CDenisUa/language.git`, `main` branch.
- **Deployed to Cloudflare Pages** — project `sprachlabor`, production branch `main`, live at https://sprachlabor.pages.dev. `public/_redirects` (`/* /index.html 200`) gives client-side routes a SPA fallback; `public/_headers` sets `Cache-Control: public, max-age=0, must-revalidate` on `/sw.js` so service-worker updates aren't stuck behind stale caching. Deploys are currently manual via `wrangler pages deploy dist --project-name=sprachlabor`; no CI auto-deploy is wired up yet (see `DECISIONS.md`).
- **Vocabulary module** (`src/pages/Vocabulary/`) — full add/edit/delete word CRUD (`WordForm`), an FSRS-driven review queue (`ReviewCard`, one due card at a time, Again/Hard/Good/Easy rating), and a word list (`WordList`) with an Austrian-variant-only filter. New words start immediately due via `createNewCard()`. `src/services/fsrs/fsrsScheduler.ts` wraps `ts-fsrs` (`createNewCard`/`scheduleReview`/`isDue`); `src/services/tts/speak.ts` wraps `SpeechSynthesis` for on-demand pronunciation (front/back/Austrian variant, using `de-DE`/`de-AT`/`en-US` per `src/consts/speechLocales.ts` — nothing is recorded or stored). The Austrian variant field only shows when the active study language is German. Manually verified end-to-end in-browser with Playwright (add → review → rate → filter → language switch).
- **Smart Scheduler** (`src/pages/Scheduler/`) — the `scheduleEvents` store holds recurring rules (`daysOfWeek`/`startTime`/`endTime`) and one-off exceptions (`skip` a recurring date, or `add` a standalone block like the Thursday language exchange). `expandOccurrences()` turns those into concrete calendar occurrences for a date range; `getEnglishSeparationStatus()` is the pure function that says whether English is currently blocked — from the start of today's German block(s) until `ENGLISH_SEPARATION_BUFFER_HOURS` (3h) after the latest one ends. `ScheduleCalendar` renders the current Monday-start week via `react-big-calendar` (red = German, blue = English); `ScheduleForm` adds either kind of event; `SeparationStatus` surfaces the blocked/available state on the page itself — nothing elsewhere in the app reads or enforces it yet (that's for Task 5, Notifications). Manually verified in-browser: a Mon–Thu German block and the Thursday 20:00 "Mi Casa, Graz" exception both render correctly on the calendar and persist across reloads.
- **Test infra** — 37 tests passing across 12 files. `src/setupTests.ts` polyfills three jsdom gaps: `localStorage`, IndexedDB (`fake-indexeddb/auto`), and `SpeechSynthesisUtterance`. All new UI text across every module is localized (uk/ru) through the i18n system.

## Not built yet

See [`ROADMAP.md`](./ROADMAP.md) for the task-by-task checklist and scope of each remaining piece (Notifications, Shadowing Lab, Error Journal, Dashboard, Export/Import). Additional IndexedDB stores get added incrementally, one per owning task, via schema version bumps in `src/services/db/schema.ts` — not all upfront.

## Known constraints carried forward

- No speech-to-text on iOS/Safari — TTS only there (see `DECISIONS.md`).
- No backend/sync yet — everything is local to one browser/device.
