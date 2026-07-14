// Core
import { endOfDay, format, startOfDay } from 'date-fns'
// Services
import { expandOccurrences } from '../../src/services/scheduler/expandOccurrences'
import { getEnglishSeparationStatus } from '../../src/services/scheduler/temporalSeparation'
import { getUpcomingEventReminders } from '../../src/services/reminders/getUpcomingEventReminders'
import { shouldFireUnblockNudge } from '../../src/services/reminders/shouldFireUnblockNudge'
import * as db from './db'
import { sendPush } from './push'
import { zonedNow } from './zonedNow'
import { corsHeaders, isAllowedOrigin } from './cors'
// Types
import type { ScheduleEventRecord } from '../../src/types/scheduleEvent'
import type { PushSubscriptionInput } from './db'
// Consts
import { ENGLISH_SEPARATION_BUFFER_HOURS } from '../../src/consts/scheduler'
import { UPCOMING_EVENT_LEAD_MINUTES } from '../../src/consts/reminders'

/** Graz, Austria — see zonedNow.ts for why this matters on an edge runtime. */
const STUDY_TIMEZONE = 'Europe/Vienna'
const SENT_REMINDER_RETENTION_MS = 2 * 24 * 60 * 60 * 1000

export interface Env {
  DB: D1Database
  VAPID_PUBLIC_KEY: string
  VAPID_PRIVATE_KEY: string
  VAPID_SUBJECT: string
}

function json(data: unknown, allowedOrigin: string | null, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(allowedOrigin), ...init.headers },
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin')
    const allowedOrigin = origin && isAllowedOrigin(origin) ? origin : null

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(allowedOrigin) })
    }

    const url = new URL(request.url)

    try {
      if (url.pathname === '/api/subscribe' && request.method === 'POST') {
        const body = (await request.json()) as PushSubscriptionInput
        await db.upsertSubscription(env.DB, body)
        return json({ ok: true }, allowedOrigin)
      }

      if (url.pathname === '/api/unsubscribe' && request.method === 'POST') {
        const body = (await request.json()) as { endpoint: string }
        await db.removeSubscription(env.DB, body.endpoint)
        return json({ ok: true }, allowedOrigin)
      }

      if (url.pathname === '/api/schedule' && request.method === 'PUT') {
        const events = (await request.json()) as ScheduleEventRecord[]
        await db.saveScheduleEvents(env.DB, events)
        return json({ ok: true }, allowedOrigin)
      }

      return json({ error: 'Not found' }, allowedOrigin, { status: 404 })
    } catch (error) {
      console.error('Request failed', error)
      return json({ error: 'Bad request' }, allowedOrigin, { status: 400 })
    }
  },

  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(checkAndSendReminders(env))
  },
}

async function checkAndSendReminders(env: Env): Promise<void> {
  const events = await db.getScheduleEvents(env.DB)
  const subscriptions = await db.getSubscriptions(env.DB)
  if (events.length === 0 || subscriptions.length === 0) return

  const now = zonedNow(STUDY_TIMEZONE)
  const todayOccurrences = expandOccurrences(events, startOfDay(now), endOfDay(now))
  const separationStatus = getEnglishSeparationStatus(todayOccurrences, now, ENGLISH_SEPARATION_BUFFER_HOURS)

  const wasBlocked = await db.getWasBlocked(env.DB)
  await db.setWasBlocked(env.DB, separationStatus.blocked)

  const pending: Array<{ id: string; body: string }> = []

  if (shouldFireUnblockNudge(wasBlocked, separationStatus.blocked)) {
    pending.push({ id: `english-unblocked:${format(now, 'yyyy-MM-dd')}`, body: 'English unblocked — you can start now' })
  }

  for (const reminder of getUpcomingEventReminders(todayOccurrences, now, UPCOMING_EVENT_LEAD_MINUTES)) {
    pending.push({ id: reminder.id, body: `Soon: ${reminder.label}` })
  }

  const vapid = { subject: env.VAPID_SUBJECT, publicKey: env.VAPID_PUBLIC_KEY, privateKey: env.VAPID_PRIVATE_KEY }

  for (const reminder of pending) {
    if (await db.wasReminderSent(env.DB, reminder.id)) continue

    for (const subscription of subscriptions) {
      const result = await sendPush(subscription, { title: 'Sprachlabor', body: reminder.body }, vapid)
      if (result.gone) {
        await db.removeSubscription(env.DB, subscription.endpoint)
      }
    }
    await db.markReminderSent(env.DB, reminder.id)
  }

  await db.pruneSentReminders(env.DB, new Date(Date.now() - SENT_REMINDER_RETENTION_MS))
}
