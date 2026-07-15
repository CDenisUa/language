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
