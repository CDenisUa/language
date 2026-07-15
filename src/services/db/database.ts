// Core
import { openDB } from 'idb'
import type { IDBPDatabase } from 'idb'
// Consts
import { DB_NAME, DB_VERSION } from '@/services/db/schema'
// Types
import type { SprachlaborDBSchema } from '@/services/db/schema'

let dbPromise: Promise<IDBPDatabase<SprachlaborDBSchema>> | null = null

export function getDatabase(): Promise<IDBPDatabase<SprachlaborDBSchema>> {
  if (!dbPromise) {
    dbPromise = openDB<SprachlaborDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('words')) {
          const wordsStore = db.createObjectStore('words', { keyPath: 'id' })
          wordsStore.createIndex('by-language', 'language')
        }
        if (!db.objectStoreNames.contains('scheduleEvents')) {
          db.createObjectStore('scheduleEvents', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('shadowingTracks')) {
          const shadowingTracksStore = db.createObjectStore('shadowingTracks', { keyPath: 'id' })
          shadowingTracksStore.createIndex('by-language', 'language')
        }
        if (!db.objectStoreNames.contains('shadowingSessions')) {
          const shadowingSessionsStore = db.createObjectStore('shadowingSessions', { keyPath: 'id' })
          shadowingSessionsStore.createIndex('by-track', 'trackId')
        }
        if (!db.objectStoreNames.contains('errorJournalEntries')) {
          const errorJournalStore = db.createObjectStore('errorJournalEntries', { keyPath: 'id' })
          errorJournalStore.createIndex('by-language', 'language')
        }
        if (!db.objectStoreNames.contains('vocabularyStudySessions')) {
          const vocabularyStudySessionsStore = db.createObjectStore('vocabularyStudySessions', { keyPath: 'id' })
          vocabularyStudySessionsStore.createIndex('by-language', 'language')
        }
        if (!db.objectStoreNames.contains('grammarProgress')) {
          const grammarProgressStore = db.createObjectStore('grammarProgress', { keyPath: 'id' })
          grammarProgressStore.createIndex('by-topic', 'topicId')
        }
        if (!db.objectStoreNames.contains('grammarTopicReviews')) {
          db.createObjectStore('grammarTopicReviews', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('knownWords')) {
          const knownWordsStore = db.createObjectStore('knownWords', { keyPath: 'id' })
          knownWordsStore.createIndex('by-language', 'language')
        }
      },
    })
  }
  return dbPromise
}
