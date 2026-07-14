// Types
import type { ScheduleEventRecord } from '../../src/types/scheduleEvent'

export interface StoredSubscription {
  id: string
  endpoint: string
  p256dh: string
  auth: string
}

export interface PushSubscriptionInput {
  endpoint: string
  keys: { p256dh: string; auth: string }
}

export async function getSubscriptions(db: D1Database): Promise<StoredSubscription[]> {
  const { results } = await db.prepare('SELECT id, endpoint, p256dh, auth FROM subscriptions').all<StoredSubscription>()
  return results
}

export async function upsertSubscription(db: D1Database, subscription: PushSubscriptionInput): Promise<void> {
  await db
    .prepare(
      `INSERT INTO subscriptions (id, endpoint, p256dh, auth, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5)
       ON CONFLICT(endpoint) DO UPDATE SET p256dh = ?3, auth = ?4`,
    )
    .bind(crypto.randomUUID(), subscription.endpoint, subscription.keys.p256dh, subscription.keys.auth, new Date().toISOString())
    .run()
}

export async function removeSubscription(db: D1Database, endpoint: string): Promise<void> {
  await db.prepare('DELETE FROM subscriptions WHERE endpoint = ?1').bind(endpoint).run()
}

export async function getScheduleEvents(db: D1Database): Promise<ScheduleEventRecord[]> {
  const row = await db.prepare('SELECT events_json FROM schedule_snapshot WHERE id = 1').first<{ events_json: string }>()
  return row ? (JSON.parse(row.events_json) as ScheduleEventRecord[]) : []
}

export async function saveScheduleEvents(db: D1Database, events: ScheduleEventRecord[]): Promise<void> {
  await db
    .prepare(
      `INSERT INTO schedule_snapshot (id, events_json, updated_at) VALUES (1, ?1, ?2)
       ON CONFLICT(id) DO UPDATE SET events_json = ?1, updated_at = ?2`,
    )
    .bind(JSON.stringify(events), new Date().toISOString())
    .run()
}

export async function getWasBlocked(db: D1Database): Promise<boolean> {
  const row = await db.prepare('SELECT was_blocked FROM separation_state WHERE id = 1').first<{ was_blocked: number }>()
  return row?.was_blocked === 1
}

export async function setWasBlocked(db: D1Database, blocked: boolean): Promise<void> {
  await db
    .prepare(
      `INSERT INTO separation_state (id, was_blocked) VALUES (1, ?1)
       ON CONFLICT(id) DO UPDATE SET was_blocked = ?1`,
    )
    .bind(blocked ? 1 : 0)
    .run()
}

export async function wasReminderSent(db: D1Database, id: string): Promise<boolean> {
  const row = await db.prepare('SELECT 1 FROM sent_reminders WHERE id = ?1').bind(id).first()
  return row !== null
}

export async function markReminderSent(db: D1Database, id: string): Promise<void> {
  await db
    .prepare('INSERT OR IGNORE INTO sent_reminders (id, sent_at) VALUES (?1, ?2)')
    .bind(id, new Date().toISOString())
    .run()
}

export async function pruneSentReminders(db: D1Database, olderThan: Date): Promise<void> {
  await db.prepare('DELETE FROM sent_reminders WHERE sent_at < ?1').bind(olderThan.toISOString()).run()
}
