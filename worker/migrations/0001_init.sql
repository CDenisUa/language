CREATE TABLE subscriptions (
  id TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Single-row snapshot of the client's ScheduleEventRecord[], replaced wholesale on every sync.
CREATE TABLE schedule_snapshot (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  events_json TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Tracks the previous English-separation blocked/available value across cron runs,
-- so the unblock nudge only fires on the blocked -> available transition.
CREATE TABLE separation_state (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  was_blocked INTEGER NOT NULL DEFAULT 0
);

-- Reminder ids already pushed, so a repeated cron tick within the same lead window
-- doesn't resend. Pruned periodically by the cron handler.
CREATE TABLE sent_reminders (
  id TEXT PRIMARY KEY,
  sent_at TEXT NOT NULL
);
