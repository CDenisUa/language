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
**Status:** superseded — see 2026-07-15 "Text Analyzer" entries below

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

---

### 2026-07-14 — Web Push worker shares scheduling logic with the client via direct import, not duplication or a synced precomputed window
**Status:** accepted

`worker/` (Task 5b) imports `expandOccurrences`, `getEnglishSeparationStatus`, `getUpcomingEventReminders`, and `shouldFireUnblockNudge` from `src/services/scheduler/` and `src/services/reminders/` directly via relative path — the same files the client uses, not a copy. The client syncs only its raw `ScheduleEventRecord[]` to the Worker's D1 database (`PUT /api/schedule`), and the Worker's cron recomputes "is English blocked / is there a labeled event soon" fresh on every 5-minute tick.

**Why:** User's explicit choice when asked directly, over the alternative of having the client precompute a rolling window of concrete (timestamp, message) reminders and push that to the Worker. Reusing the exact same already-tested pure functions means there's exactly one implementation of the scheduling rules to keep correct, and the Worker's view of "what's due" is never stale from an out-of-date precomputed window — it's recomputed from the current raw schedule on every tick. This is also why these particular files were converted from `@/...` alias imports to relative imports (see the entry immediately below) — they needed to be portable to a second, independent bundler.

---

### 2026-07-14 — Shared scheduler/reminder modules use relative imports, not the `@/` alias
**Status:** accepted

`src/types/scheduleEvent.ts`, `scheduleOccurrence.ts`, `src/services/scheduler/expandOccurrences.ts`, `temporalSeparation.ts`, and `src/services/reminders/getUpcomingEventReminders.ts` import their own dependencies (`Language`, `ScheduleEventRecord`, etc.) via relative paths (`../../types/scheduleEvent`) instead of the app's `@/` Vite alias.

**Why:** These specific files are now a "shared kernel" imported by two independent bundlers — Vite (the app) and Wrangler/esbuild (`worker/`, Task 5b) — each with its own tsconfig. Relying on both configuring an identical `@/` alias would be a hidden coupling that silently breaks if either build tool's config changes; relative imports have no such dependency and work identically in both.

---

### 2026-07-14 — Workers have no local timezone; `zonedNow()` compensates so the reused client logic stays correct for Graz
**Status:** accepted

`worker/src/zonedNow.ts` produces a `Date` whose local-time getters (`getHours`, `getDay`, etc.) read as wall-clock time in `Europe/Vienna`, by round-tripping through `toLocaleString('en-US', { timeZone })`. The cron handler (`worker/src/index.ts`) feeds this into `expandOccurrences`/`getEnglishSeparationStatus` instead of a plain `new Date()`.

**Why:** Cloudflare Workers have no concept of a "local machine timezone" — `Date`'s local-time getters always behave as UTC there. The client's scheduler logic is written against those same getters and is correct in the browser only because the browser's local timezone happens to match the user (Graz, Austria). Reusing that logic unchanged in the Worker (per the decision above) without this compensation would silently compute occurrence times shifted by the UTC offset (2h in summer CEST, 1h in winter CET) — a wrong-but-no-error bug. Verified with `zonedNow.test.ts` against both DST cases and a UTC day-boundary crossing.

---

### 2026-07-14 — Web Push sending uses `@block65/webcrypto-web-push`, not the `web-push` npm package
**Status:** accepted

`worker/src/push.ts` builds and sends Web Push payloads via `@block65/webcrypto-web-push`, which implements VAPID signing and payload encryption entirely on the standard `crypto.subtle` (Web Crypto) API.

**Why:** The popular `web-push` package depends on Node's `crypto` module internally; Cloudflare Workers' `nodejs_compat` layer doesn't guarantee full parity with every Node crypto API, and getting VAPID/encryption subtly wrong fails silently (a push that never arrives, not a thrown error). `@block65/webcrypto-web-push` explicitly targets Workers/Deno/Bun alongside Node using only standard WebCrypto, avoiding that whole class of risk. Confirmed via `wrangler deploy --dry-run` that the bundle has no unresolved Node built-ins.

---

### 2026-07-14 — Custom service worker (`injectManifest`) replaces `vite-plugin-pwa`'s `generateSW` strategy
**Status:** accepted

`src/sw.ts` is now a hand-written service worker (workbox-precaching + workbox-routing for the precache/navigation-fallback behavior `generateSW` used to generate automatically), built via `vite-plugin-pwa`'s `injectManifest` strategy instead of `generateSW`.

**Why:** Receiving a Web Push message and turning it into a visible system notification requires a `push` event listener (and a `notificationclick` handler to focus/open the app) inside the service worker itself. `generateSW` only ever produces a Workbox SW from config — it has no injection point for custom event listeners — so supporting Task 5b required this switch. The precaching/offline-fallback behavior is preserved manually (`precacheAndRoute`, `NavigationRoute` + `createHandlerBoundToURL('index.html')`) to match what `generateSW`'s config (`navigateFallback: 'index.html'`, `cleanupOutdatedCaches: true`) was doing before.

---

### 2026-07-14 — Push subscription/schedule sync happens once per app load, not only after Scheduler edits
**Status:** accepted

`usePushScheduleSync()` re-PUTs the current `ScheduleEventRecord[]` to the Worker's `/api/schedule` route once per app session, the moment the schedule finishes loading from IndexedDB and an active push subscription exists — not tied to the Scheduler page's save/delete handlers.

**Why:** User's explicit choice when asked directly, over syncing only from the Scheduler's edit handlers. Syncing on every app load is self-healing (a previously failed sync gets retried the next time the app opens) without needing any retry/queue logic, at the cost of a sync call the schedule hasn't actually changed — acceptable since the payload is small and infrequent (once per session, not per keystroke).

---

### 2026-07-14 — Browser notification-permission grant and live push delivery are outside this environment's testing reach
**Status:** accepted

Task 5b's automated verification covers: the Worker's HTTP routes and D1 persistence (confirmed via direct `curl` requests with real CORS headers), the cron/reminder logic (unit-tested pure functions, reused as-is), the `zonedNow()` timezone compensation (unit-tested), and service worker registration in a real production build (`vite preview`). It does *not* cover an actual granted `Notification.requestPermission()` call or a real push notification arriving on a device — confirmed by direct test that `Notification.requestPermission()` hangs indefinitely in this environment's automated browser (no permission-grant capability available here), rather than resolving either way.

**Why:** This is a hard platform boundary, not a gap in test coverage that more effort would close — granting a notification permission is deliberately gated behind a real user gesture in every browser, and no automation hook for it was available in this session's toolset. The user needs to manually enable notifications from the Settings page on an actual device/browser to confirm the last mile of the pipeline.

---

### 2026-07-15 — NavBar collapses into a hamburger dropdown below 768px, rather than a bottom tab bar
**Status:** accepted

Below a 768px `min-width` breakpoint, `NavBar`'s six nav links plus locale switch plus language switch collapse into a single hamburger-triggered dropdown panel (`nav-bar__menu--open`), rendered as an absolutely-positioned panel below a sticky header. At 768px+, the same markup renders as the original horizontal row via a media query, so there's one component, not two parallel mobile/desktop implementations.

**Why:** The app was fully broken on mobile before this — the flex row wrapped its links into a vertical stack that visually overlapped the brand name and pushed the language switch off-screen. A bottom tab bar (the other common mobile-app nav pattern) was rejected because six destinations plus two switches don't fit a tab bar's ~5-item comfort limit without either cutting a destination or still needing an overflow menu for the switches — the hamburger drawer handles an arbitrary number of items and switches in one place without that compromise.

---

### 2026-07-15 — Scheduler's calendar scrolls horizontally on mobile; toolbar deliberately excluded from that scroll region
**Status:** accepted

Only `.rbc-time-header`/`.rbc-time-content` (the day-header row and the time grid) get `overflow-x: auto` and a 640px min-width on mobile. `react-big-calendar`'s toolbar (Today/Back/Next + the date-range label) is a sibling at the `.rbc-time-view` level and is left alone, so it stays fully visible without needing to scroll first.

**Why:** An earlier version of this fix scoped the scroll container one level too high (`.rbc-time-view`, which contains the toolbar too), and confirmed by testing that this dragged the toolbar out of view along with the grid — a user would've had to swipe right just to find the "Next" button. Scoping the scroll to only the grid keeps navigation controls reachable at all times, which matters more for actual usability than a technically-simpler one-line fix.

A sticky time-gutter column (hour labels staying pinned while day columns scroll) was also attempted and reverted — confirmed via `getBoundingClientRect()` that `position: sticky` on `.rbc-time-gutter` doesn't take effect, because `react-big-calendar`'s internal header/content scroll-sync mechanism applies a CSS transform to an intermediate ancestor, which establishes a new containing block and defeats sticky positioning relative to the actual scroll container. Not worth vendoring a patched version of the library's scroll-sync just for this; losing the time-of-day label while mid-swipe is a minor rough edge, not a blocker.

---

### 2026-07-15 — Shadowing Lab is real-time (play-along), not a segment-drill; no transcript/auto-scoring; nothing recorded

**Status:** accepted

Three scope decisions for Task 6, made with the user before implementation (each had a real alternative, so recorded explicitly rather than left implicit in code):

1. **Interaction model**: the practice flow is classic real-time shadowing — the user plays their uploaded track via a native `<audio controls>` element and speaks along live while it plays. There's no clip-marking or listen-pause-repeat drill mode; a session is one continuous pass over a track.
2. **No reference transcript, no computed accuracy score**: track uploads have no transcript field. Where `SpeechRecognition` is supported (`src/services/speechRecognition/`), its live output is surfaced to the user as in-the-moment feedback ("Heard: ...") only — never diffed against anything. The only score that exists is the user's own 1–5 self-rating (`ShadowingPractice`'s star widget), saved on every session regardless of browser, so behavior doesn't fork between Chrome and Safari beyond whether the feedback panel is present.
3. **The user's own repetition is never recorded or stored**: no `MediaRecorder` capture, no audio blob for the user's voice. `SpeechRecognition` is used live and discarded after each result callback.

**Why:** Keeps scoring behavior uniform across browsers (real-time text-diff accuracy scoring would only ever work on Chrome/Android per the existing WebKit `SpeechRecognition` gap, see the Task 6 line above) and avoids fragile word-error-rate matching logic for an MVP. Not recording the user's voice avoids a second, larger IndexedDB blob per session (on top of the uploaded track itself) and the extra mic-recording-permission UX, for a feature whose value (self-assessment while shadowing) doesn't obviously require played-back self-review to work.

**How to apply:** `shadowingSessions` records (`src/types/shadowingSession.ts`) only ever hold `rating`, `practiceDurationSeconds` (read from `audio.currentTime` when the user clicks save, not accumulated across seeks), and optional freeform `notes` — no transcript or recognition-confidence fields. If transcript-based scoring is ever wanted later, it's a new decision (a transcript field on `ShadowingTrackRecord` plus real diffing), not a natural extension of today's `recognizedText`-as-feedback plumbing.

---

### 2026-07-15 — Test-env `Blob`/`File` polyfill: swapped for Node's native `node:buffer` versions

**Status:** accepted

`src/setupTests.ts` overrides `globalThis.Blob`/`globalThis.File` with `node:buffer`'s implementations before tests run.

**Why:** jsdom's own `Blob`/`File` classes don't survive `structuredClone` in this Node/vitest combo — cloning one silently produces an empty `{}` rather than throwing or preserving content, because Node's native `structuredClone` doesn't recognize jsdom's polyfilled class as a "real" Blob. `fake-indexeddb` uses `structuredClone` internally for every `put()` (per the IndexedDB spec's "clone value" step), so any test that round-trips a Blob through a repository — `shadowingTracksRepository`, and by extension anything touching `<input type="file">` via `userEvent.upload` — would silently store a corrupted, content-less record. Node's native Blob/File round-trip correctly through `structuredClone`, confirmed by direct test before adopting this. Same category of gap as the `localStorage` polyfill above: an environment quirk, not an app bug — real browsers store Blobs in IndexedDB natively without any of this.

**How to apply:** If a future Node/vitest/jsdom upgrade makes jsdom's own Blob/File structured-clone-compatible, this override becomes redundant and can be removed — check `shadowingTracksRepository.test.ts`'s `toBeInstanceOf(Blob)` assertion still passes first.

---

### 2026-07-15 — Error Journal entry shape and linking, agreed with the user before implementation

**Status:** accepted

Three scope decisions for Task 7, made with the user directly (each had a real alternative):

1. **Fields**: an entry is `mistake` + `correction` (both required free text) + `category` (`grammar` | `vocabulary` | `pronunciation` | `other`) + optional `note`. Category was chosen over a field-free log specifically so Task 8's planned "error-frequency breakdown" has something to group by.
2. **Linking**: an entry can optionally reference one existing Vocabulary word or Shadowing track, picked from a single combined `<select>` (`ErrorEntryForm`'s "link to" field, built by `ErrorJournal.tsx` from `useWords`/`useShadowingTracks` for the active language). Stored as a loose `linkedRecordType`/`linkedRecordId` pair (`src/types/errorJournalEntry.ts`), not a real foreign key — resolved back to a display label at render time by matching against the current word/track list (`resolveLinkLabel` in `ErrorJournal.tsx`).
3. **Edit/delete**: entries are fully editable and deletable, matching the Vocabulary module's pattern (`ErrorEntryForm` doubles as add/edit, same as `WordForm`), rather than being an append-only log.

**Why:** Keeping the link as an unenforced reference (rather than a real relational constraint IndexedDB doesn't have anyway) means deleting a linked word or track later doesn't need any cascade/cleanup logic — `resolveLinkLabel` just returns `null` and the entry silently stops showing a link. This matches the project's broader local-first/no-heavy-relational-integrity posture.

**How to apply:** If a linked word/track is deleted, its error-journal entries are *not* cleaned up or unlinked — the stale `linkedRecordId` stays on the record but simply resolves to no visible link. Don't add cascade-delete logic for this without a fresh decision; it hasn't come up as a problem yet since Vocabulary/Shadowing deletion is infrequent and low-stakes.

---

### 2026-07-15 — Dashboard time tracking: automatic visibility-based timer, actual activity only, reuse Shadowing's existing duration

**Status:** accepted

Two scope decisions for Task 8, made with the user directly before implementation:

1. **Automatic timer, not manual start/stop, not a discrete-action proxy**: `useStudyTimer(language)` starts accruing time as soon as the Vocabulary page mounts and the tab is visible — no "start studying" button. Pausing/resuming is driven by the Page Visibility API (`visibilitychange`), not mouse/keyboard idle-detection — simpler, and directly addresses the main accuracy concern (time while tabbed away) without extra complexity for a single-user app.
2. **Only actual logged activity counts toward the 70/30 balance, not Scheduler's planned blocks**: Dashboard sums `vocabularyStudySessions` (new, Vocabulary-only) plus Shadowing's already-existing `shadowingSessions.practiceDurationSeconds` — Scheduler stays a pure planning tool with no analytics role. Shadowing didn't get its own copy of `useStudyTimer`; it already records accurate per-session duration from `audio.currentTime` (see the Task 6 decision above), which is more precise than a generic mount-visibility timer would be for that page, so Dashboard just reads it directly.

**Why:** A manual timer only works if the user remembers to press it, and a discrete-action proxy (word/session counts) doesn't answer "how many hours" the roadmap actually asked for. Visibility-based automatic tracking gets real elapsed time with no user action required. Keeping Scheduler out of the balance calculation avoids reconciling "planned vs. actual," which the user didn't ask for and which would need its own design pass.

---

### 2026-07-15 — Study timer persists per visibility-hidden transition, not only on unmount

**Status:** accepted

`useStudyTimer`'s first implementation accumulated elapsed time in a local variable and only called `vocabularyStudySessionsRepository.save()` in the `useEffect` cleanup (i.e., on unmount). Manual Playwright verification caught a real bug this caused: navigating with `page.goto()` — a hard browser navigation — tears down the page without ever running React's cleanup, so the accumulated time was silently lost. This isn't a testing artifact — it's exactly what happens for a real user who closes the tab, quits the browser, or does anything short of an in-app client-side route change while on the Vocabulary page.

The fix: persist immediately on every `visibilitychange` to `'hidden'`, not just accumulate locally — `visibilitychange` reliably fires on tab close per the Page Lifecycle API, unlike `beforeunload`/a React cleanup. `useStudyTimer` now saves one session record per hidden-transition (plus a final one on actual unmount for any remaining visible time), rather than one lump-sum record per mount.

**Why:** Confirmed by direct test (`useStudyTimer.test.ts`'s "does not lose time when the tab is closed without an unmount" case, which asserts a save happens on a bare `visibilitychange` to hidden with no unmount at all) that the fix closes the gap the original design had.

**How to apply:** A single Vocabulary visit can now produce multiple `vocabularyStudySessions` records if the user tabs away and back more than once — this is expected and fine, since Dashboard aggregates by summing all records per language rather than expecting one record per visit. Don't "simplify" this back to accumulate-then-save-on-unmount without re-confirming the tab-close case still works.

---

### 2026-07-15 — Backup export/import: shadowing audio excluded, import fully replaces existing data

**Status:** accepted

Two scope decisions for Task 9, made with the user directly before implementation:

1. **Shadowing tracks back up as metadata only — the audio `Blob` is excluded from the export.** `createBackup()` strips `audioBlob` off every `ShadowingTrackRecord` before serializing (`ShadowingTrackBackupRecord = Omit<ShadowingTrackRecord, 'audioBlob'>`). Since a restored track without its audio is a broken, non-functional record in this app (Shadowing practice requires playing the audio back), `restoreBackup()` goes one step further and doesn't write `shadowingTracks` to IndexedDB at all on import — the field only exists in the exported JSON for reference (so the user can see what titles they had). The `shadowingTracks` store is left completely untouched by an import: not cleared, not restored. `shadowingSessions` (which reference a `trackId`) *are* still exported/restored normally, since nothing currently resolves or displays that reference — Dashboard just sums `practiceDurationSeconds`, so a session outliving its original track is harmless.
2. **Import fully replaces existing data, after an explicit confirmation step.** `restoreBackup()` clears `words`/`scheduleEvents`/`shadowingSessions`/`errorJournalEntries`/`vocabularyStudySessions` before writing the imported records — a true "restore to this backup" rather than an additive merge. The Settings UI never calls `restoreBackup()` directly off a file selection; it first parses and validates the file into a `pendingImport` state and shows a confirm/cancel prompt, matching this project's pattern for other destructive actions.

**Why:** Base64-encoding audio would inflate export size by ~33% and add real complexity (encode on export, decode + re-blob on import) for a personal single-user app where the original audio file still exists on the user's device — a manual re-upload is a trivial ask. A merge-on-import semantics was rejected because its behavior is harder to predict (e.g. a deleted word could silently reappear from an old backup) and doesn't match what "restore a backup" means to most users.

**How to apply:** `restoreBackup()`'s return value (`ImportResult.skippedShadowingTracksCount`) exists specifically so the Settings UI can tell the user "N shadowing tracks weren't restored" rather than silently dropping that data with no explanation. If shadowing audio backup is ever wanted, it's a new decision (base64 in the JSON, or a separate binary export format) — don't quietly bolt it onto this JSON export.

---

### 2026-07-15 — Backup import revives `WordRecord.fsrs` Date fields explicitly

**Status:** accepted

`ts-fsrs`'s `Card` type (embedded as `WordRecord.fsrs`) has real `due: Date` and `last_review?: Date` fields. `JSON.stringify` serializes a `Date` to an ISO string automatically, but `JSON.parse` does *not* revive it back into a `Date` — after a real export→import round-trip, `word.fsrs.due` would be a plain string. `restoreBackup()`'s `reviveWordDates()` explicitly reconstructs both fields with `new Date(...)` before writing to IndexedDB.

**Why:** Without this, the very next visit to the Vocabulary page would call `isDue(word.fsrs)`, which does `word.fsrs.due.getTime()` — a `TypeError` on a string, crashing the review queue for every imported word. Confirmed the fix actually works (not just in a unit test that could itself get the mock wrong) by running a real file through the browser: exported, edited the file on disk, re-imported via the actual file input, and confirmed the restored word still appeared correctly in the FSRS review queue rather than crashing the page.

**How to apply:** If a future field is added to `WordRecord` (or any other record type) that holds a real `Date` instance rather than an ISO string, it needs the same explicit revival treatment in `backupService.ts` — JSON round-tripping is silent about this, so it won't fail loudly during development, only later when a real word happens to hit the broken code path.

---

### 2026-07-15 — Text Analyzer uses word-frequency rank, not a real CEFR wordlist — supersedes the 2026-07-14 CEFR-parser deferral

**Status:** accepted

Before building this (deferred "Stage 3" feature, picked up once the core loop was done), a real gap was found by research: English has a genuinely good open academic CEFR-tagged wordlist (CEFR-J A1–B2 + the Octanove C1/C2 extension, CC BY-SA 4.0). **German does not** — the only German CEFR-tagged lists findable are community scrapes of the Goethe-Institut's own exam word lists (unclear/likely non-permissive licensing), and even those mostly stop at B1/B2; advanced German levels generally aren't published as fixed word lists at all. Since German is the user's primary, intensive-study language, a "real CEFR" approach would have been strong for English and weak-to-nonexistent for the language that matters most here — the opposite of useful.

Decided with the user directly: use word **frequency rank** as a difficulty proxy instead, sourced from `FrequencyWords` by Hermit Dave (https://github.com/hermitdave/FrequencyWords, OpenSubtitles2018 corpus, CC BY-SA 4.0) — the same methodology and license for both German and English, avoiding the asymmetry entirely. Rare words get flagged; the flagging is bucketed into rough CEFR-*like* tiers, not real CEFR labels (see the next entry for the exact cutoffs). Two other real alternatives were explicitly rejected: real-CEFR-for-English-only (drops German from the feature entirely) and a mixed approach (real CEFR for English, frequency for German — rejected for having two different underlying methodologies/label meanings between the two languages, more complexity for a personal app).

**Why:** A uniform, cleanly-licensed method across both study languages was judged more valuable than a technically-more-accurate label system that would only really work for the less-studied language.

**License/attribution:** CC BY-SA 4.0 requires attribution. Credited via a visible footer note on the Text Analyzer page itself (both uk/ru locales, `t.textAnalyzer.dataCredit`) plus here. The two source files (`de_50k.txt`/`en_50k.txt`, top-50k words per language) were reformatted into rank-ordered JSON arrays (word only, frequency counts dropped since only rank position is used) and committed as static assets at `public/data/frequency-{de,en}.json` (~500KB each), not fetched from a CDN at runtime — keeps the feature fully offline-capable and avoids a runtime dependency on an external host.

**How to apply:** If a comparably open, full-range (A1–C2) German CEFR wordlist ever turns up, switching to real CEFR labels is a new decision, not a silent upgrade — it would need the same "how do B2/C1/C2 buckets work" design pass as the frequency-rank approach got.

---

### 2026-07-15 — Text Analyzer: tier cutoffs, no lemmatization, click-to-add reuses WordForm

**Status:** accepted

Three implementation decisions made while building the Text Analyzer, each a natural consequence of the frequency-rank approach above rather than something requiring a separate user decision:

1. **Tier cutoffs** (`src/consts/frequency.ts`): rank ≤3000 → `common` (rendered as plain, unstyled text — only genuinely advanced words visually stand out), ≤6000 → `B2`, ≤15000 → `C1`, ≤50000 → `C2`, not in the top 50k at all → `unranked` (shown distinctly from C2 — could be a proper noun, typo, or genuinely rare word, not confidently "advanced vocabulary"). Chosen as a reasonable-looking split by inspecting real output on real German/English paragraphs (see `CURRENT_STATE.md` for the specific examples checked); these are a judgment call, easy to retune later since `getDifficultyTier()` is a small pure function with its own tests.
2. **No lemmatizer/stemmer dependency.** German is highly inflected (a naive wordlist lookup would miss "gegangen" if only "gehen" were listed), which would normally argue for adding a stemming library. Skipped because the frequency data is built from *real corpus usage* (OpenSubtitles dialogue), not dictionary lemmas — common inflected forms are themselves frequent enough to appear directly in the top-50k list. Confirmed acceptable quality via the same real-paragraph manual testing, not just assumed.
3. **Clicking a flagged word reuses `WordForm` directly** (from `src/pages/Vocabulary/WordForm.tsx`) rather than building a second add-word UI. `WordForm` gained one new optional prop, `initialFront`, that pre-fills the front field when there's no `editingWord` — a small additive change (Vocabulary's own usage is unaffected, since it never passes this prop) rather than forking the component. The Cancel button's visibility condition was also loosened from `editingWord` to `editingWord || initialFront`, so the Text Analyzer's inline form can be dismissed without saving.

**Why:** All three keep the feature's real complexity (tokenization, frequency lookup, offline data) without adding speculative complexity (a WASM stemmer, a second word-entry form) that the frequency-based design doesn't actually need.

---

### 2026-07-15 — Grammar module: English-only, explanations in Ukrainian, auto-checked exercises, all 8 categories built together

**Status:** superseded — see 2026-07-15 "German grammar content" entry below (the "not wired to `useLanguageStore`" part specifically; the exercise-type/explanation-language/build-together choices below still stand for both languages)

A new, large, previously-unplanned feature (not on the original roadmap), so — consistent with this project's standing pattern of clarifying scope before building rather than guessing — four scope questions were put to the user directly before any code was written:

1. **Where it lives**: a new in-app module (`/grammar`, 8th nav item), not standalone markdown files or an external document. This keeps it inside the same offline-first PWA/IndexedDB architecture as everything else, rather than being a second, disconnected artifact.
2. **Exercise type**: auto-checked (multiple-choice / fill-blank), not open self-graded questions. The app validates the answer itself and shows immediate feedback + an explanation, rather than a "click to reveal the answer" pattern.
3. **Scope of the first pass**: all 8 grammar categories the user listed (Tenses & Aspects, Modals, Conditionals, Voice & Causatives, Verb Patterns, Syntax & Emphasis, Parts of Speech, Cohesion) built together in one feature branch, rather than one category first as a format pilot — the user's explicit choice over the more incremental alternative offered.
4. **Explanation language**: Ukrainian, for the theory/example-translation/exercise-explanation text. The grammar being taught (English) is separate from the language explanations are written in (Ukrainian) — a third axis distinct from both the DE/EN study-language switch and the uk/ru interface-locale switch.

**Why:** This mirrors the same reasoning as the 2026-07-14 "UI localization is Ukrainian/Russian, separate from card translations" decision — three genuinely independent language axes exist in this app (interface chrome, DE/EN study content, and now English-grammar-explained-in-Ukrainian), and conflating any two of them would make one axis silently follow another in a way that doesn't match how the user actually wants to study. The module is therefore **not** wired to `useLanguageStore` (the DE/EN study switch) at all — it always teaches English grammar, regardless of which study language is currently active — and its content text does **not** change when the uk/ru interface locale is toggled, unlike every other page's chrome.

**How to apply:** If German grammar content is ever wanted, that's a new, separate content set (its own category namespace or a language-scoped split of `GRAMMAR_CATEGORIES`), not a retrofit of the existing English-only data — don't assume `GrammarCategory`/`GrammarTopic` implicitly generalizes across study languages without a fresh decision.

---

### 2026-07-15 — Grammar content is static bundled TypeScript data, not fetched JSON

**Status:** accepted

Unlike the Text Analyzer's frequency wordlists (`public/data/frequency-{de,en}.json`, fetched at runtime and precached by the service worker), Grammar's theory/examples/exercises (`src/content/grammar/*.ts`, one file per category, aggregated by `src/content/grammar/index.ts`) are plain TypeScript modules imported directly and bundled into the app's main JS, typed against `GrammarCategory`/`GrammarTopic`/`GrammarExercise` (`src/types/grammarTopic.ts`).

**Why:** The frequency wordlists are large (~500KB each) externally-sourced data with an open license that needed attribution; Grammar's content is authored specifically for this app, gets full compile-time type-checking against the shared interfaces (a malformed exercise — e.g. a `correctIndex` out of range, or a missing `explanation` — is a build error, not a silent runtime bug), and needs no separate fetch/precache-registration step. The tradeoff is a bigger main JS bundle (confirmed via `npm run build`: ~685KB uncompressed / ~203KB gzipped, over Vite's 500KB chunk-size-warning threshold) — accepted for now since this is a single-user offline PWA where a one-time larger initial download isn't a meaningful cost, consistent with this project's "don't add complexity ahead of an actual problem" posture elsewhere (e.g. the CI-auto-deploy and cross-device-sync deferrals).

**How to apply:** If bundle size becomes a real problem later (e.g. if more large content sets are added on top of this), splitting Grammar's content into a dynamically-`import()`-ed chunk per category is the natural fix — don't reach for it preemptively without that being an actual, observed problem.

---

### 2026-07-15 — Grammar progress: one record per exercise, deterministic id for upsert, category/topic-level rollups computed client-side from a single full read

**Status:** accepted

A new `grammarProgress` IndexedDB store (schema v6, `src/types/grammarProgress.ts`, indexed `by-topic`) holds one record per answered exercise: `{ id: "<topicId>:<exerciseId>", topicId, exerciseId, correct }`. The deterministic, composite `id` means re-answering the same exercise calls `grammarProgressRepository.save()` with the same `id` again, which the existing generic repository (`createRepository`) already treats as an update-in-place (matching id → same record, `createdAt` preserved, `updatedAt` bumped) rather than a new row — no new upsert logic needed beyond what Task 2's repository factory already provides. `useGrammarProgress()` reads the *entire* store once per page load (not scoped per topic/category), and `Grammar.tsx` filters that in-memory array client-side to compute both the topic-list progress badges (e.g. "2/5") and the category-grid rollup (e.g. "2/45") — one IndexedDB read instead of up to 50 scoped index queries.

**Why:** With only 250 exercises total across the whole module, one full-store read is cheap and simple, and avoids either a second per-topic hook (extra round trips when browsing the topic list) or a denormalized rollup counter that would need separate invalidation logic. This is the same "read once, derive the rest in memory" shape already used by Dashboard's error/hours breakdown.

**How to apply:** If the exercise count grows by an order of magnitude and a full-store read becomes a real cost, category/topic-level counts could be pre-aggregated instead — not a concern at the current content size, so not built now.

---

### 2026-07-15 — Grammar reviews reuse Vocabulary's FSRS scheduler per-topic, with an auto-derived grade instead of self-rating

**Status:** accepted

User's explicit choice when asked directly (over a plain fixed interval, or just a Dashboard "not reviewed lately" widget). Each grammar *topic* — not each exercise — gets its own FSRS card in a new `grammarTopicReviews` store (schema v7), scheduled with the exact same `ts-fsrs` wrapper (`src/services/fsrs/fsrsScheduler.ts`) Vocabulary already uses, rather than a second scheduling implementation. The one real difference from Vocabulary: Vocabulary's review flow asks the user to self-rate their own recall (Again/Hard/Good/Easy) after seeing the answer, but Grammar's exercises are already auto-checked right/wrong — there's no natural moment to ask "how well did you know that?" a second time. `deriveGradeFromScore()` (`src/services/grammarReview/deriveGradeFromScore.ts`) closes that gap by mapping the topic's correct-answer ratio onto a grade (5/5 → Easy, 4/5 → Good, 2–3/5 → Hard, 0–1/5 → Again) the moment all of a topic's exercises have been answered for the first time.

**Why:** Reusing the existing scheduler means Grammar's spacing behaves identically to Vocabulary's (same algorithm, same tuning) rather than inventing a second, subtly-different notion of "due" in the same app. Auto-deriving the grade from the score is a reasonable proxy for self-rating specifically *because* the exercises are objectively checked — a real wrong/right count is at least as informative as an unprompted self-assessment would be, and doesn't require adding a redundant "how did that feel?" step after an already-graded quiz.

**How to apply:** `handleAnswered` in `Grammar.tsx` only schedules a review on the *transition* from "not fully answered" to "fully answered" (checked via the topic's progress-record count before vs. after saving) — re-answering exercises in an already-completed topic does not reschedule it again. If a "retake this topic" flow is ever added that's meant to intentionally re-trigger scheduling, that's a new, explicit action, not a side effect of editing old answers.

---

### 2026-07-15 — engVid: a generic per-topic search link, not per-topic curated videos or an embedded player

**Status:** accepted

User's explicit choice, informed by real research done before building: engVid.com does organize lessons by topic and has a search feature with stable per-lesson URLs (confirmed via a live fetch), but there is no reliable way to know in advance which specific lesson URL matches any given one of this module's ~50+ (and growing, with German) topics without verifying each one individually by hand — and guessing/fabricating a specific engVid URL per topic was rejected outright as a fabrication risk. Embedding engVid's own player via `iframe` was also not pursued, since it's a third-party, ad-supported site with no confirmed embed support and real ToS/technical uncertainty.

Instead, `getEngVidSearchUrl()` (`src/consts/engvid.ts`) builds `https://www.engvid.com/?s=<topic title>` — engVid's own real search page, opened in a new tab (`target="_blank"`) from a link rendered on every topic view, right after the theory/examples and before the exercises (per the user's requested placement: watch first, then practice).

**Why:** A universal search link is honest and correct for every topic today, including all future German topics, at zero per-topic curation cost — versus a curated-video approach that would need real, individually-verified research per topic and would still leave gaps wherever no matching engVid lesson exists.

**How to apply:** If a specific, verified video is later wanted for a particular high-value topic, that's an additive, per-topic override on top of this generic link (e.g. an optional `engVidUrl` field on `GrammarTopic`), not a replacement of the general mechanism.

---

### 2026-07-15 — German grammar content: its own category structure, scoped by the DE/EN study-language switch — supersedes the "English-only" part of the earlier Grammar decision

**Status:** accepted

The user asked for German grammar alongside English. Two real design questions came with that, both resolved with the user directly before building:

1. **Category structure**: German gets its own 11 categories (Kasus, Genus & Artikel, Wortstellung, Verbformen & Zeiten, Modalverben, Trennbare Verben, Konjunktiv, Passiv, Präpositionen, Adjektivdeklination, Nebensätze) rather than reusing the English 8 (Tenses & Aspects, Modals, Conditionals...) — the user's explicit choice, over mechanically relabeling the English list. This is the right call structurally too: German's core difficulties (case system, gender/article declension, V2/verb-final word order, separable verb prefixes) have no clean equivalent in the English category list, and several English categories (Conditionals as a distinct system, the Tenses/Aspects 4-way Simple/Continuous/Perfect/Perfect-Continuous grid) don't map onto how German grammar is actually organized.
2. **Scoping to the DE/EN switch**: the Grammar module is now wired to `useLanguageStore`'s `activeLanguage` — English content shows only in English mode, German only in German mode — reversing the earlier decision that Grammar was deliberately *not* tied to this switch. That earlier decision made sense when only English existed (there was nothing to switch between); now that German exists too, leaving both languages' categories visible at once would defeat the purpose of the switch that every other module (Vocabulary, Text Analyzer, Shadowing) already respects.

Two structural changes followed directly from this: `GrammarCategory` gained a required `language: Language` field, and `GrammarExample`'s `en` field was renamed to `target` (English-specific naming stopped making sense once a German category needed the same field for German sentences) — applied mechanically across all 8 existing English content files via a scoped `sed` replace, verified with `tsc --noEmit` and the full test suite afterward.

**Why:** A German-specific structure teaches German the way German actually works, rather than forcing it through an English-shaped lens; scoping by the study-language switch keeps Grammar consistent with how every other module in the app already behaves, and avoids a 19-category, ~90-topic single list that would be unwieldy to browse regardless of which language the user is actually studying that day.

**How to apply:** Explanation language (Ukrainian) and exercise type (auto-checked multiple-choice/fill-blank) from the original 2026-07-15 Grammar decision still apply to German content unchanged — only the "not wired to the language switch" part was superseded.

---

### 2026-07-15 — Content-integrity test added after real bugs surfaced during German content review

**Status:** accepted

While merging the German content, a new `src/content/grammar/index.test.ts` was written to assert three invariants across the entire `GRAMMAR_CATEGORIES` dataset: every topic id and every exercise id is globally unique (not just unique within its own file), every `multiple-choice` exercise's `correctIndex` is a valid index into its own `options`, and every `fill-blank` exercise has at least one non-empty `correctAnswers` entry. This test caught two real, pre-merge bugs: (1) exercise ids `pc-*` were reused between an English "Present Continuous" topic and an unrelated English "Participle Clauses" topic (both written directly, not by an agent — a same-author abbreviation collision across files that were never cross-checked against each other), and `sv-*` were reused between an English "State Verbs" topic and a German "Separable Verbs" topic (an English file and an agent-written German file, neither aware of the other's abbreviations); and (2) two German "Nullartikel" fill-blank exercises had `correctAnswers: ['—', '']` — an empty string intended to mean "type nothing," which is impossible to actually submit since the exercise UI disables its Check button until the input is non-empty. All three were fixed before merging (the id collisions renamed, the two broken exercises converted to multiple-choice with an explicit "— (kein Artikel)" option, matching the pattern already used correctly elsewhere in the same file).

**Why:** Neither bug is something `tsc` or the per-file agent-authoring process could catch — ids are just string literals with no type-level uniqueness constraint, and an empty-but-non-empty-typed `correctAnswers` array passes the `GrammarExercise` type contract just fine. Both are exactly the class of cross-file, whole-dataset invariant that only becomes checkable once every file is aggregated together, which only happens at merge time — so a real regression test for it, not just a one-off manual check, is worth keeping permanently as more categories/topics get added later (e.g. if French or another language is ever added to Grammar).

**How to apply:** Any new grammar content file — for any language — must pick exercise-id prefixes that don't assume they're safe just because they're unique within that one file; `index.test.ts` will fail loudly at test time if that assumption breaks, which is the intended safety net.

---

### 2026-07-16 — Curated per-topic engVid videos for 39 of 50 English topics — supersedes the "generic search link only" part of the earlier engVid decision

**Status:** accepted

The user asked directly for real per-topic engVid videos, not just the generic search link. `GrammarTopic` (`src/types/grammarTopic.ts`) gained an optional `engVidUrl` field; `GrammarTopicView` now renders `topic.engVidUrl ?? getEngVidSearchUrl(topic.title)` — the generic search link becomes a fallback, not a replacement, exactly as the earlier decision's "How to apply" note anticipated.

Finding real URLs was delegated to 4 parallel research agents (one per group of English categories, ~10-14 topics each), each required to verify every candidate URL via a live `WebFetch` (confirming the page is a real engVid lesson and its content genuinely matches the topic) before reporting it, and explicitly instructed to report "NO MATCH FOUND" rather than force a loose or fabricated fit — the same integrity bar the original engVid decision set. Every returned URL was then re-verified independently with a direct `curl` HTTP-status check (all 39 returned `200`) before being written into the content files, and `index.test.ts` gained a regression test asserting every `engVidUrl` matches `https://www.engvid.com/.../ ` and that no German-category topic ever has one (see below).

Result: **39 of 50** English topics got a real, verified, specific video (e.g. `present-simple` → `https://www.engvid.com/present-simple-tense/`, "Learn English Tenses: PRESENT SIMPLE" by Rebecca). **11 topics genuinely have no dedicated engVid lesson** and keep the generic search-link fallback: `complex-object`, `infinitive-with-without-to`, `cleft-sentences`, `fronting`, `questions-general-special-subject` (verified against a close-looking "9 Types of Questions" video that turned out not to teach the general/special/subject framework), `determiners-quantifiers`, `pronouns`, `adjectives-adverbs-comparison`, `prepositions`, `ellipsis-and-substitution`, and `unreal-time`. A few matches are intentionally partial-coverage rather than exhaustive (e.g. `semi-modals` links to a video covering only "have to / have got to" of the six listed semi-modals; `alternatives-to-if` covers only "unless / if not" of six alternatives) — kept because a real, on-topic, verified video covering *some* of the topic is still strictly better for the user than no video, and the topic's own theory/exercises already cover the rest in text.

**Why German topics have no curated links:** engVid teaches English grammar exclusively — there is no engVid video about German Kasus, Konjunktiv, etc. Curating "closest English-language video" matches for German grammar points was rejected as misleading (a German learner clicking through to an English-tense video from a German case-system topic isn't a real match, it's noise). German topics keep the pre-existing generic engVid search-link fallback unchanged.

**Why:** This is a direct extension of the 2026-07-15 "generic per-topic search link, not curated" decision's own stated escape hatch — it was written specifically to anticipate this ask ("if a specific, verified video is later wanted... that's an additive, per-topic override... not a replacement of the general mechanism"). The verification bar (live fetch + independent HTTP re-check, explicit NO MATCH reporting) is unchanged from the fabrication-risk concern that motivated the original decision to not guess URLs.

**How to apply:** If a topic that currently has no `engVidUrl` gets a real matching engVid lesson published later, adding it is a one-line content-file edit, not a new decision. Don't add an `engVidUrl` to any topic without actually verifying the URL loads and is genuinely on-topic first — `index.test.ts`'s format check catches malformed URLs but can't catch a wrong-but-well-formed one.

---

### 2026-07-15 — Word Levels: self-assessment ("Знаю"/"Не знаю"), not an auto-graded quiz — frequency rank as the CEFR proxy for both languages

**Status:** accepted

The user asked for an A1–C2 word list "baked into" the app, sourced from open/academic material, with some form of testing. Before building, the same real constraint from the Text Analyzer decision was reconfirmed: the open frequency wordlists already in this project (`public/data/frequency-{de,en}.json`) are just rank-ordered word lists — word only, no translations, no example sentences, no CEFR tags. Two design questions followed directly from that gap, both resolved with the user directly:

1. **How the "test" works, given there's no translation to grade against**: self-assessment ("Знаю" / "Не знаю"), not an auto-graded quiz — the user's explicit choice over a real quiz, which would have required bulk-translating thousands of words (rejected: no reliable open bilingual dataset was identified, and machine-translating at scale wasn't something to do without a fresh decision on accuracy/licensing). This matches how a real learner actually self-assesses vocabulary knowledge anyway (I-know-this vs. I-don't), and sidesteps needing any translation data at all for the pass/fail signal itself.
2. **Where the CEFR levels come from**: the same frequency-rank proxy already used by Text Analyzer (`loadFrequencyRanks()`, reused directly — no new fetch, no duplicated data), bucketed into six bands instead of Text Analyzer's four, uniformly for German and English — the user's explicit choice, consistent with the existing 2026-07-15 Text Analyzer decision's reasoning (no open, full-range CEFR wordlist exists for German, so a uniform proxy method beats a technically-better-for-English-only approach).

For a word marked "Не знаю", `WordForm` (already built for Vocabulary, already reused once for Text Analyzer's click-to-add) opens pre-filled with that word via the same `initialFront` prop — the user supplies their own translation there rather than the app inventing one, keeping Vocabulary's existing "the user writes both sides of the card" model intact.

**Why:** Self-assessment is the only grading mechanism that's actually honest about what data exists — anything claiming to auto-grade a quiz here would either need fabricated/unreliable translations or silently defer to some other, undisclosed correctness signal. Reusing the exact same frequency data and fetch path as Text Analyzer avoids a second large dataset and a second offline-precaching concern for what is fundamentally the same underlying resource used a different way.

**How to apply:** If real bilingual translation data is ever sourced for these words (a licensed dictionary, a vetted bulk-translation pass), swapping self-assessment for an actual recall quiz is a new decision with its own data-quality bar to clear — not a silent upgrade bolted onto today's word-only dataset.

---

### 2026-07-15 — Word Levels: six-band tier cutoffs are a separate const from Text Analyzer's four-tier cutoffs; corpus artifacts filtered by a dedicated helper

**Status:** accepted

`src/consts/cefrWordLevels.ts`'s `CEFR_LEVEL_MAX_RANK` (A1 ≤1000, A2 ≤2000, B1 ≤4000, B2 ≤8000, C1 ≤20000, C2 ≤50000) is a new, separate set of cutoffs from Text Analyzer's existing `FREQUENCY_TIER_MAX_RANK` (`common`/`B2`/`C1`/`C2`, `src/consts/frequency.ts`) — not a shared or renamed version of it. `isDisplayableWord()` (`src/services/wordLevels/isDisplayableWord.ts`) filters out corpus artifacts — contraction fragments like `'s`/`'t`/`'re` and stray single letters — that show up verbatim in the raw frequency word list (an OpenSubtitles-derived corpus splits contractions into fragments) but would look broken as standalone vocabulary-browser entries, keeping a small allowlist for the single letters that are real words ("I", "a").

**Why:** Text Analyzer's four tiers answer "is this word advanced enough to flag while reading running text" (only B2+ gets visually flagged; A1–B1-equivalent words are deliberately left as plain, unstyled text) — a coarser, reading-focused split. Word Levels needs the full A1–C2 range as distinct, browsable levels, which is a different granularity for a different purpose; conflating the two consts would mean a change meant for one feature's tuning silently affecting the other's. The artifact filter wasn't needed for Text Analyzer (it operates on real running text, where contractions stay whole — "don't", not "do" + "'t" — per `tokenize()`'s own apostrophe-inclusive word pattern) but matters here because Word Levels reads the raw word list directly, fragments included.

**How to apply:** If Text Analyzer's own tier cutoffs are ever retuned, that's independent of `CEFR_LEVEL_MAX_RANK` and vice versa — check both call sites before assuming a single "the frequency tiers" source of truth exists.

---

### 2026-07-16 — Grammar theory readability: inline backtick formula markup, monospace chip styling, numbered examples

**Status:** accepted

The user asked for the Grammar module's rule explanations to be visually more readable, specifically calling out sentence-structure schemes and special constructions as things that should be "beautifully schematically highlighted." Before writing any CSS, the `impeccable` design skill was invoked, which required a `PRODUCT.md` (register: `product`; personality: "строгий, зосереджений, дисциплінований" — strict/focused/disciplined; explicit anti-references: Duolingo-style gamification, generic SaaS dashboards) — written to the repo root and now the standing source for the app's design register going forward.

Three implementation decisions:

1. **Inline `` `formula` `` markup in the existing `theory: string` field, not a new structured data model.** `GrammarTopic.theory` (`src/types/grammarTopic.ts`) is documented as supporting backtick-delimited spans; `parseFormulaMarkup()` (`src/services/grammarText/parseFormulaMarkup.ts`) splits the string into alternating text/formula segments, rendered by `GrammarTopicView` as plain text or a `<code className="grammar-formula">` chip. Rewriting all 89 topics into a structured "pattern" schema (e.g. `{ subject, verb, object }[]`) was rejected as far more content-migration risk and effort for a benefit inline markup already delivers — the formulas in this content are free-form (`have/has + V3`, `der Mann → des Mannes`, whole quoted sentences like `Never have I seen such chaos`), not a single uniform shape a structured schema could cleanly capture anyway.
2. **Chips are styled neutral/monospace, not in the accent color.** `.grammar-formula` (`GrammarTopicView.css`) uses `--color-text` on a `--color-surface` background with a `--color-border` outline — not `--color-accent` (red/blue per DE/EN). `PRODUCT.md`'s design principle "accent color marks interactive state only" ruled out accent-colored chips: a formula chip isn't clickable, and coloring it like the rest of the app's interactive elements (links, active nav, focus states) would misleadingly suggest it is.
3. **Markup was applied to all 89 topics (50 English + 39 German) across all 12 content files**, not just a pilot subset — consistent with this project's existing "build the full first pass together" pattern from the original Grammar module decision, rather than leaving half the content unstyled. Each topic's genuine formulas/quoted constructions were identified and wrapped by hand (not by a blind regex over "contains a +"), since a wrong auto-detected span would degrade real study content silently; backtick-balance was verified across every file (`grep -c` even-count check) before rollout.

The example-sentence list (`.grammar-topic-view__examples`) was also redesigned in the same pass: each example gets a small numbered circular badge (`.grammar-topic-view__example-index`) instead of being a plain, unnumbered stack of cards — turns the three examples into a clearer, ordered "worked examples" set. `.grammar-topic-view__theory` gained a `max-width: 68ch` measure and `text-wrap: pretty`, since the theory paragraph previously had no line-length constraint at all inside the page's wide `80rem` container.

**Why:** Backtick markup is the smallest change that achieves the actual ask (visually distinguish schema/formula/construction from prose) without a large, error-prone content-schema migration across 89 topics authored over multiple prior sessions. Verified in-browser with Playwright at both desktop and 390px mobile widths, in both English (e.g. `state-verbs` with 4 chips in one paragraph) and German (e.g. `modal-verbs-present`'s full conjugation table, `Genitiv`'s declension arrow-chains) before considering the rollout done.

**How to apply:** Any new grammar topic added later (a new category, or more topics in an existing one) should use the same `` `formula` `` convention for genuine structural patterns and quoted illustrative constructions, styled via the existing `.grammar-formula` class — don't invent a second visual treatment for the same kind of content. Don't wrap ordinary prose in backticks just to add emphasis; the convention is specifically for schema-like material (patterns, transformations, quoted example fragments demonstrating a rule), not general emphasis.
