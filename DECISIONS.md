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

---

### 2026-07-14 — One IndexedDB store per owning task, not all upfront
**Status:** accepted

Task 2 (data-layer infra) ships exactly one concrete object store — `words` — plus a generic `createRepository()` factory that any future store can reuse. Stores for scheduling, shadowing, error journal, and study sessions are deliberately *not* pre-created; each gets added, with its own schema version bump, by the task that actually needs it (Scheduler, Shadowing Lab, etc.).

**Why:** IndexedDB schema changes are cheap incrementally (an `upgrade()` callback can add stores at any version), so there's no technical reason to guess every future store's shape now. Defining fields for e.g. shadowing sessions before that task's design questions are answered would be exactly the kind of speculative schema this project avoids elsewhere (see the CEFR-parser and sync deferrals above).

---

### 2026-07-14 — Reuse `ts-fsrs`'s `Card` type instead of redefining FSRS fields
**Status:** accepted

`WordRecord.fsrs` (`src/types/word.ts`) is typed directly as `ts-fsrs`'s own `Card` interface (`due`, `stability`, `difficulty`, `state`, `reps`, `lapses`, etc.), not a hand-rolled equivalent.

**Why:** `ts-fsrs` already owns this shape and evolves it (e.g. `elapsed_days` is marked deprecated upstream ahead of v6). Duplicating the fields would mean manually tracking every upstream change instead of getting it for free through the dependency.

---

### 2026-07-14 — Generic repository factory with auto id/createdAt/updatedAt stamping
**Status:** accepted

`createRepository(storeName)` (`src/services/db/createRepository.ts`) gives every object store the same `getAll/getById/put/remove/clear/save` shape. `save()` generates a `crypto.randomUUID()` id when absent and stamps `createdAt`/`updatedAt`, enforced via a `{ id, createdAt, updatedAt }` type constraint on every store's value.

**Why:** This isn't speculative — every store planned in the roadmap (words, schedule events, shadowing sessions, error log, study sessions) needs identical CRUD plus the id/timestamp convention already committed to in the local-first/sync-deferred decision above. One factory avoids re-implementing that stamping logic per store as each later task adds its own.

---

### 2026-07-14 — Cloudflare Pages over Vercel; manual `wrangler` deploys for now
**Status:** accepted

Hosting is Cloudflare Pages (project `sprachlabor`, production branch `main`, live at https://sprachlabor.pages.dev), not Vercel. Deploys are run manually via `wrangler pages deploy dist --project-name=sprachlabor` after a merge to `main` — there's no CI/auto-deploy wired up yet.

**Why:** Cloudflare Pages serves static assets + the service worker without needing a `vercel.json` rewrite for cache headers (handled here by `public/_headers`). More importantly, it matches the local-first-with-sync-deferred decision above: if/when a sync backend is built, Cloudflare Workers + D1 sit on the same account/deploy pipeline as this Pages project, rather than introducing a second platform. Continuous deployment on push-to-main was deliberately *not* set up via a GitHub Actions + API token, since the only Cloudflare credential available in this environment is a broad, account-wide OAuth token (workers/D1/KV/secrets_store/email write, etc.) — far more scope than a Pages deploy needs, and not something to hand to a CI secret. The safer path is either Cloudflare's native Git integration (dashboard-connected, no token to manage) or a narrowly-scoped Pages-only API token created by the user — both require a one-time manual step in the Cloudflare dashboard that wasn't done yet.

---

### 2026-07-14 — New cards are immediately due; review queue always shows `dueWords[0]`
**Status:** accepted

A newly-added word gets `fsrs: createNewCard()`, whose `due` is "now" — so it enters the review queue the same session instead of waiting a day. The review UI has no manual queue/index state: it always renders `dueWords[0]` from a `useMemo`-filtered, due-sorted list, and re-derives that list from IndexedDB after every rating.

**Why:** Simpler than tracking a review-session index — after `wordsRepository.save()` moves a card's `due` into the future and `reload()` refetches, that card naturally drops out of `dueWords` and whatever's next becomes `dueWords[0]` with no extra state to keep in sync.

---

### 2026-07-14 — TTS locale codes: `de-DE` / `de-AT` / `en-US`
**Status:** accepted

`speak()` (`src/services/tts/speak.ts`) is called with `de-DE` for standard German, `de-AT` specifically when reading out a word's `austrianVariant`, and `en-US` for English (`src/consts/speechLocales.ts`).

**Why:** Direct extension of the Austrian-focus decision already made for card content — hearing "Erdapfel" pronounced with an `de-AT` voice (where the browser has one) reinforces the accent goal from the original plan, not just the vocabulary.

---

### 2026-07-14 — Test-env `SpeechSynthesisUtterance` stub required
**Status:** accepted

`src/setupTests.ts` defines a minimal `SpeechSynthesisUtterance` stub when the global is absent.

**Why:** Same category of gap as the `localStorage` and IndexedDB polyfills above — jsdom doesn't implement the Web Speech API at all, so constructing a real utterance in a test throws a `ReferenceError` without this.

---

### 2026-07-14 — Schedule events are a discriminated union; `createRepository` needed a distributive `Omit`
**Status:** accepted

`ScheduleEventRecord` (`src/types/scheduleEvent.ts`) is `RecurringScheduleEvent | ExceptionScheduleEvent`, not one flat type with a pile of optional fields — recurring events carry `daysOfWeek`/`startTime`/`endTime`, exceptions carry `date`/`action`/optional `startTime`/`endTime`. This surfaced a real bug in the generic repository factory from Task 2: plain `Omit<Value, 'id'|'createdAt'|'updatedAt'>` collapses a union to only its *shared* keys (`keyof (A|B)` is an intersection, not a union, of each member's keys), silently dropping `daysOfWeek`, `date`, etc. from `save()`'s input type. Fixed with a distributive conditional type (`T extends unknown ? Omit<T, K> : never`) in `src/services/db/createRepository.ts`.

**Why:** A flat type with every field optional (`daysOfWeek?`, `date?`, `action?`, ...) would've dodged the union-typing bug entirely, but would let a "recurring" event get saved with a `date` field or vice versa — the type system wouldn't catch a legitimate class of bugs. Worth the extra distributive-type complexity in one shared, already-generic file rather than losing that safety in every event handler.

---

### 2026-07-14 — Scheduler computes the separation status but doesn't act on it yet
**Status:** superseded by the decision below

`getEnglishSeparationStatus()` and `SeparationStatus` only surface the blocked/available state on the Scheduler page itself. No other page (Vocabulary, Shadowing) checks it, and nothing pushes a notification about it yet.

**Why:** Matches the roadmap split — Task 4 (Scheduler) owns the calendar and the pure blocking logic; Task 5 (Notifications) is where that logic gets *consumed* (push reminders, and potentially gating the Vocabulary/Shadowing review flows for English while blocked). Wiring enforcement into other pages now would be scope creep ahead of deciding, in Task 5, what "blocked" should actually do in the UI beyond a status readout.

---

### 2026-07-14 — English-blocked status stays a notification-only nudge, never a gate
**Status:** accepted

Resolves the open question carried from Task 4. Being "blocked" (per `getEnglishSeparationStatus()`) never disables or hides anything in Vocabulary or Shadowing — it only drives the in-app reminder banner (Task 5a). Studying English during the blocked window remains fully possible; the app nudges, it doesn't enforce.

**Why:** User's explicit choice when asked directly. A hard or soft gate risks a dead-end if the schedule data is ever wrong or missing an exception (e.g. a cancelled class), and self-discipline around the separation is the actual goal — friction from the app getting in the way when the calendar is stale is a worse failure mode than an occasional missed nudge.

---

### 2026-07-14 — Task 5 split: in-app reminder banner first, Web Push deferred to Task 5b
**Status:** accepted

Task 5 ("Notifications") is split into 5a (in-app reminder banner, built now) and 5b (Web Push/VAPID, deferred). 5a ships a `ReminderBanner` that nudges on the English-unblock transition and on upcoming/ongoing labeled schedule occurrences, entirely client-side — no push subscriptions, no VAPID keys, no send-side endpoint.

**Why:** User's explicit choice when asked directly. Web Push needs a subscription-storage + send-side piece (most likely a Cloudflare Worker, consistent with the hosting decision above) that's a meaningfully separate chunk of work from the reminder *logic* itself; validating the reminder content/timing with the simpler in-app banner first avoids building the push infrastructure before knowing the nudges are the right ones.

---

### 2026-07-14 — Reminder banner is generic over any labeled occurrence, not hardcoded to "Mi Casa, Graz"
**Status:** accepted

`getUpcomingEventReminders()` (`src/services/reminders/`) reminds about *any* schedule occurrence (recurring or one-off exception) that has a `label` and is starting within `UPCOMING_EVENT_LEAD_MINUTES` or already in progress — not a special case for the Thursday language exchange specifically.

**Why:** The roadmap named "Mi Casa, Graz" as the motivating example, but hardcoding a label string would silently stop working the moment that event's wording changes, and wouldn't cover any future labeled event the user adds. The generic rule covers the named case for free.

---

### 2026-07-14 — English-unblock nudge only fires on a live transition, not retroactively
**Status:** accepted

The "English unblocked" reminder (`shouldFireUnblockNudge()`) is detected as a blocked->available transition while the app is open (a `now`-driven `useEffect` comparing consecutive `separationStatus.blocked` values, ticking every `REMINDER_TICK_INTERVAL_MS`). If the user opens the app *after* the transition already happened, no nudge appears for it.

**Why:** This is the correct scope for an in-app-only fallback (Task 5a) — there's no backend to remember "the transition happened at 16:00 and nobody saw it" and replay that later. Task 5b's Web Push is what actually needs to reach the user regardless of whether the app is open; this gap is exactly why Web Push isn't deferred forever, just deferred past this task.

---

### 2026-07-14 — Reminder dismissals persist in `localStorage`, keyed by reminder id
**Status:** accepted

`useReminders()` stores dismissed reminder ids in `localStorage` (`DISMISSED_REMINDERS_STORAGE_KEY`), not IndexedDB. The English-unblock nudge's id embeds the date (`english-unblocked:yyyy-MM-dd`) so it can fire again the next day; an upcoming-event reminder's id is the occurrence id, which is already date-scoped for exceptions and day-scoped for recurring events.

**Why:** This is UI-preference-shaped data (aligned with the interface language, not app content), not a durable record worth a full IndexedDB repository/schema bump — same category as `useLocaleStore`'s persisted zustand store, which also uses `localStorage`.

---

### 2026-07-14 — PWA icons regenerated from a single source artwork; maskable variant is a solid-background safe-zone crop, not the raw source
**Status:** accepted

`public/icons/icon-192.png`, `icon-512.png`, and `apple-touch-icon.png` are direct resizes of a user-provided 1254×1254 source icon. `icon-512-maskable.png` is *not* a direct resize — the source is scaled to 80% and centered on an opaque `#0b0b0f` (the app's own `theme_color`/`background_color`) 512×512 canvas, per the maskable safe-zone rule in the global PWA guidelines.

**Why:** The source artwork's content (book + language badges) runs close to its own edges, and its corners are baked-in solid black rather than transparent — using it as-is for the maskable icon risked Android's shape mask (circle/squircle) cropping into the badges. Filling the safe-zone margin with the app's existing theme background color (rather than sampling a color from the artwork's gradient) keeps the icon visually consistent with the rest of the PWA's dark theme instead of introducing an arbitrary new color.
