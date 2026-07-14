// Core
import { buildPushPayload } from '@block65/webcrypto-web-push'
// Types
import type { PushSubscription as WebPushSubscription, VapidKeys } from '@block65/webcrypto-web-push'
import type { StoredSubscription } from './db'

export interface PushMessage {
  title: string
  body: string
}

export interface SendPushResult {
  ok: boolean
  gone: boolean
}

/** `gone` means the push service reports the subscription is expired/revoked (404/410) — caller should delete it. */
export async function sendPush(subscription: StoredSubscription, message: PushMessage, vapid: VapidKeys): Promise<SendPushResult> {
  const webPushSubscription: WebPushSubscription = {
    endpoint: subscription.endpoint,
    expirationTime: null,
    keys: { p256dh: subscription.p256dh, auth: subscription.auth },
  }

  const payload = await buildPushPayload(
    { data: JSON.stringify(message), options: { ttl: 60 * 60 } },
    webPushSubscription,
    vapid,
  )

  const response = await fetch(subscription.endpoint, payload)
  return { ok: response.ok, gone: response.status === 404 || response.status === 410 }
}
