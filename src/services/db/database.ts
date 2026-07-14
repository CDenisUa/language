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
      },
    })
  }
  return dbPromise
}
