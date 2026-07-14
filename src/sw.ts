/// <reference lib="webworker" />
// Core
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare const self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')))

interface PushPayload {
  title?: string
  body?: string
}

function parsePushPayload(event: PushEvent): PushPayload {
  if (!event.data) return {}
  try {
    return event.data.json() as PushPayload
  } catch {
    return { body: event.data.text() }
  }
}

self.addEventListener('push', (event: PushEvent) => {
  const { title, body } = parsePushPayload(event)
  event.waitUntil(
    self.registration.showNotification(title ?? 'Sprachlabor', {
      body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
    }),
  )
})

self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close()
  event.waitUntil(self.clients.openWindow('/'))
})

self.skipWaiting()
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(self.clients.claim())
})
