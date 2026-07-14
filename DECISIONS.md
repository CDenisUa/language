# Decisions (ADR-lite)

Each entry: status, date, decision, why. Later decisions that change an earlier one are appended as new entries — the old entry is marked `superseded`, never edited away.

---

### 2026-07-14 — Local-first storage, sync deferred but designed for
**Status:** accepted

Data lives in IndexedDB only for MVP. No backend, no auth. Data layer (Task 2) will be structured so a sync layer can be added later without a rewrite (e.g. every record gets an id + updatedAt from day one).

**Why:** App will be used from phone + laptop (native Mac/iOS ports planned later), so cross-device sync matters eventually — but a backend/auth adds real complexity that isn't needed to validate the core learning loop first.

---

### 2026-07-14 — React + TypeScript + Vite
**Status:** accepted

Frontend stack is Vite + React 19 + TypeScript, `vite-plugin-pwa` for the PWA layer, per this project's global PWA rules (`/Volumes/Projects/CLAUDE.md`).

**Why:** Largest ecosystem for FSRS/PWA/calendar libraries; easiest future path to native iOS/Mac via Capacitor.

---

### 2026-07-14 — No speech recognition on iOS/Safari; TTS only
**Status:** accepted

Shadowing Lab uses `SpeechSynthesis` (TTS) everywhere. `SpeechRecognition` (speech-to-text feedback) is only wired up where the browser supports it (Chrome/Edge/Android) — not attempted on Safari/iOS/macOS, since WebKit does not implement the `SpeechRecognition` interface at all.

**Why:** Confirmed platform limitation, not a bug to work around. A cloud STT fallback (e.g. Whisper API) was considered and explicitly rejected for MVP — it would require a backend and break the offline-first/on-device goal for this one feature. Native Speech framework integration is deferred to the eventual native Mac/iOS port.

**How to apply:** Any Shadowing Lab feature that depends on recognition (auto-scoring repetition accuracy) must degrade gracefully to "record + manual self-rating" on unsupported browsers, not silently fail.

---

### 2026-07-14 — CEFR word-difficulty parser (Roadmap Stage 3) deferred
**Status:** accepted

The text-parser feature that auto-tags C1–C2 vocabulary from pasted articles is out of scope until the core review/scheduling loop is validated. When built, it will use local/offline frequency+CEFR wordlists rather than a cloud LLM call, to stay consistent with the offline-first/local-data decision above.

**Why:** Already flagged as Stage 3 in the original plan; premature to build before the daily-use core (Vocabulary + Scheduler + Shadowing) is proven out.

---

### 2026-07-14 — Smart Scheduler uses a full calendar UI
**Status:** accepted

Scheduler (Task 4) is a real calendar (recurring rules + one-off exceptions), not just a settings form, using `react-big-calendar`.

**Why:** User's course schedule has real exceptions (holidays, cancellations, the Thursday language exchange) that a fixed weekly-pattern form can't represent well.

---

### 2026-07-14 — Vocabulary card shape: rich cards
**Status:** accepted

FSRS cards (Task 3) store: front/back, example sentence, TTS-generated audio (not stored as a file — regenerated on demand), and grammar notes (article/declension for German).

**Why:** Richer retrieval context improves long-term memory encoding; storing TTS output as a file was rejected as unnecessary IndexedDB bloat since it can be regenerated instantly client-side.

---

### 2026-07-14 — Austrian German variants are a tag, not a separate deck
**Status:** accepted

Austrian vocabulary (e.g. *Jänner*, *Erdapfel*) lives as a tag/field on the same German card, filterable in the review queue — not a separate "Austrian German" deck.

**Why:** Simpler data model and review flow; user wants Austrian variants integrated into daily practice, not walled off.

---

### 2026-07-14 — Shadowing Lab audio is user-uploaded only
**Status:** accepted

No RSS/URL fetching of podcast audio in MVP — user uploads their own already-downloaded files.

**Why:** Avoids copyright/hosting questions around storing third-party audio, and is significantly simpler to build first.

---

### 2026-07-14 — Error journal is manual, time tracking is an in-app timer, balance ratio is configurable
**Status:** accepted

No grammar-checking engine exists in this plan, so error-journal entries (Task 7) are logged manually by the user. Study time for the 70/30 dashboard (Task 8) comes from an in-app session timer, not external logging. The target balance ratio is a Settings value, not hardcoded.

**Why:** No automatic error-detection source was ever specified; keeping the ratio configurable avoids a hardcoded assumption that will go stale as the user's study balance shifts over time.

---

### 2026-07-14 — iOS push notifications get an in-app fallback
**Status:** accepted

Notifications (Task 5) use standard Web Push (VAPID). Because iOS only supports Web Push for PWAs added to the home screen (iOS 16.4+) and only after an explicit user gesture, an in-app reminder banner is the fallback when push isn't available/granted.

**Why:** Without a fallback, iOS users would silently get no reminders at all, defeating the point of the temporal-separation reminder system.

---

### 2026-07-14 — JSON export/import for backup
**Status:** accepted

Settings (Task 9) includes manual JSON export/import of the full local database.

**Why:** Direct consequence of being local-first with no sync/backend yet — IndexedDB data has no other durability guarantee if browser storage is cleared.

---

### 2026-07-14 — UI localization is Ukrainian/Russian, separate from card translations
**Status:** accepted

Interface chrome (nav labels, page headings, ARIA labels) switches between Ukrainian (default) and Russian via a dedicated `useLocaleStore` + `useTranslation()`, independent of the DE/EN study-language switch (`useLanguageStore`). Vocabulary card translations (what language the "back" of a word card is shown in) were explicitly scoped out of this — that's a separate decision to make when Task 3 (Vocabulary) is built.

**Why:** User's native/understood languages are Ukrainian and Russian; the app's own UI text was previously hardcoded in English, which doesn't belong to either their study languages (DE/EN) or their native languages. Keeping `Locale` (uk/ru, interface) and `Language` (de/en, study target) as separate types/stores avoids conflating "what am I reading the UI in" with "what am I studying right now."

---

### 2026-07-14 — Test-env `localStorage` polyfill required
**Status:** accepted

`src/setupTests.ts` overrides `globalThis.localStorage` with a minimal in-memory `Storage` implementation before tests run.

**Why:** In this Node version (25.x), Node's own built-in `localStorage` (Web Storage API) global shadows jsdom's window-scoped one and is non-functional without a `--localstorage-file` path, causing `storage.setItem is not a function` inside zustand's `persist` middleware. This is an environment quirk, not an app bug — remove this workaround if a future Node/vitest/jsdom upgrade resolves the conflict, but check `useLocaleStore.test.ts` still passes first.
