# Roadmap

Task-by-task plan for Sprachlabor, in execution order. This is the checklist of *what's next*; for *what's actually built*, see [`CURRENT_STATE.md`](./CURRENT_STATE.md); for *why* a choice was made, see [`DECISIONS.md`](./DECISIONS.md).

## Resuming this project in a new session

1. `cd /Volumes/Projects/language`
2. Read `CURRENT_STATE.md` (what's built) and this file (what's next) before writing any code.
3. Pick the next unchecked task below.
4. Workflow per task, no exceptions: `git checkout -b feature/<name>` → implement → `npm run test && npm run build && npm run lint` all green → commit → merge to `main` → deploy → update `CURRENT_STATE.md` and (if a real decision was made) `DECISIONS.md`.
5. Deploy: `npm run build && npx wrangler pages deploy dist --project-name=sprachlabor --branch=main`.
6. Repo: `git@github.com:CDenisUa/language.git` (branch `main`). Live: https://sprachlabor.pages.dev.

## Tasks

- [x] **Task 1 — Project scaffold**: Vite + React + TypeScript + PWA (`vite-plugin-pwa`), routing shell for 6 pages, `ChepioTechFooter`, DE/EN theme switch (`useLanguageStore`).
- [x] **Task 1b — UI localization**: Ukrainian (default) / Russian interface switch (`useLocaleStore`, `useTranslation`), independent of the DE/EN study-language switch.
- [x] **Cloudflare Pages deployment**: project `sprachlabor`, `_redirects`/`_headers` for SPA routing + SW caching. Manual `wrangler` deploys — no CI auto-deploy yet.
- [x] **Task 2 — IndexedDB data layer**: `idb` wrapper (`getDatabase`), generic `createRepository()` factory (id/createdAt/updatedAt stamping), `words` store.
- [x] **Task 3 — Vocabulary module**: FSRS review queue (`ts-fsrs`), on-demand TTS pronunciation, Austrian-variant tagging + filter.
- [x] **Task 4 — Smart Scheduler**: `scheduleEvents` store (recurring rules + skip/add exceptions), `react-big-calendar` week view, `getEnglishSeparationStatus()` (pure temporal-separation logic — blocks English until 3h after German ends). Status is only *displayed* on the Scheduler page so far, not enforced elsewhere.
- [x] **Task 5a — In-app reminder banner**: `ReminderBanner` nudges English-unblocked (blocked->available transition) and upcoming/ongoing labeled schedule occurrences (e.g. "Mi Casa, Graz"), dismissible and persisted per-day. Notification-only — never gates Vocabulary/Shadowing (open question from Task 4 resolved, see `DECISIONS.md`).
- [x] **Task 5b — Web Push (VAPID)**: standalone `worker/` (Cloudflare Worker + D1, `sprachlabor-push`) reuses the app's own `expandOccurrences`/`getEnglishSeparationStatus`/`getUpcomingEventReminders`/`shouldFireUnblockNudge` directly (relative import, no logic duplication) on a 5-minute cron, sending via `@block65/webcrypto-web-push`. Client subscribes via `usePushSubscription`/Settings toggle and syncs schedule events on app load (`usePushScheduleSync`). Not independently verified end-to-end here — the browser notification-permission grant needs a real device/user gesture; see `DECISIONS.md`.
- [ ] **Task 6 — Shadowing Lab**
  - Personal audio upload only (no RSS/URL fetching — copyright decision already made, see `DECISIONS.md`).
  - TTS-only pronunciation-base reminders on iOS/Safari; Chrome/Android also gets `SpeechRecognition`-based repetition scoring.
  - Needs its own IndexedDB store (schema v3) for audio blobs + shadowing sessions.
- [ ] **Task 7 — Error journal**
  - Manual entry only — no automatic grammar-checking source exists in this app.
  - Link entries to related words/sessions where relevant.
  - Needs its own IndexedDB store.
- [ ] **Task 8 — Dashboard analytics**
  - Hours per language via an in-app session timer (timer itself doesn't exist yet — will likely need to be threaded through Vocabulary/Scheduler/Shadowing).
  - 70/30 study-balance target as a configurable Settings value, not hardcoded.
  - Error-frequency breakdown (depends on Task 7's data).
- [ ] **Task 9 — Export/Import JSON backup**
  - Manual full-database export/import in Settings — the safety net for being local-first with no sync yet.

## Deferred / not scheduled

- **CEFR-level text parser** (paste an article → auto-flag C1–C2 vocabulary) — explicitly out of scope until the core daily-use loop (Vocabulary/Scheduler/Shadowing) is validated. When built, uses local frequency/CEFR wordlists, not a cloud LLM call.
- **Cross-device sync of app data** (words, review history, etc.) — still not built. Task 5b's `worker/` D1 database only holds push subscriptions and a schedule-events snapshot for reminder-scheduling purposes, not a general sync layer; the data layer's id/createdAt/updatedAt convention is still what a future full sync layer would build on.
- **CI auto-deploy on push to `main`** — currently manual `wrangler pages deploy`. Needs either Cloudflare's native Git integration (dashboard-connected) or a narrowly-scoped Pages-only API token; the only credential available so far is a broad account-wide OAuth token that's deliberately not being used for this.
