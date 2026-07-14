// Core
import type { StoreNames, StoreValue } from 'idb'
// Services
import { getDatabase } from '@/services/db/database'
// Types
import type { SprachlaborDBSchema } from '@/services/db/schema'

type SyncableRecord = { id: string; createdAt: string; updatedAt: string }

/** Plain `Omit` collapses a union to its shared keys — this distributes over each member instead. */
type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never

export function createRepository<StoreName extends StoreNames<SprachlaborDBSchema>>(
  storeName: StoreName,
) {
  type Value = StoreValue<SprachlaborDBSchema, StoreName> & SyncableRecord

  return {
    async getAll(): Promise<Value[]> {
      const db = await getDatabase()
      return db.getAll(storeName) as Promise<Value[]>
    },

    async getById(id: string): Promise<Value | undefined> {
      const db = await getDatabase()
      return db.get(storeName, id) as Promise<Value | undefined>
    },

    async put(value: Value): Promise<void> {
      const db = await getDatabase()
      await db.put(storeName, value)
    },

    async remove(id: string): Promise<void> {
      const db = await getDatabase()
      await db.delete(storeName, id)
    },

    async clear(): Promise<void> {
      const db = await getDatabase()
      await db.clear(storeName)
    },

    /** Stamps id/createdAt/updatedAt per the local-first sync convention (see DECISIONS.md). */
    async save(
      input: DistributiveOmit<Value, 'id' | 'createdAt' | 'updatedAt'> & { id?: string },
    ): Promise<Value> {
      const db = await getDatabase()
      const now = new Date().toISOString()
      const existing = input.id ? ((await db.get(storeName, input.id)) as Value | undefined) : undefined

      // Distributive types resolve at call sites, not inside a still-generic function body —
      // this is structurally safe (input's discriminant plus stamped fields always form a valid
      // Value member), TS just can't prove it while `Value` is generic here.
      const record = {
        ...input,
        id: input.id ?? crypto.randomUUID(),
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      } as unknown as Value

      await db.put(storeName, record)
      return record
    },
  }
}
