import '@testing-library/jest-dom/vitest'
// jsdom doesn't implement IndexedDB at all — polyfill it globally for tests.
import 'fake-indexeddb/auto'

// Node's own built-in `localStorage` (Web Storage API) shadows jsdom's window.localStorage
// in this Node/vitest combo, and is non-functional without a `--localstorage-file` path.
// Replace it with a working in-memory Storage so zustand's `persist` middleware has
// something real to read/write during tests.
class MemoryStorage implements Storage {
  private store = new Map<string, string>()

  get length() {
    return this.store.size
  }

  clear() {
    this.store.clear()
  }

  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null
  }

  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null
  }

  removeItem(key: string) {
    this.store.delete(key)
  }

  setItem(key: string, value: string) {
    this.store.set(key, String(value))
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: new MemoryStorage(),
  configurable: true,
  writable: true,
})
