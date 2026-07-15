/// <reference types="node" />
import '@testing-library/jest-dom/vitest'
// jsdom doesn't implement IndexedDB at all — polyfill it globally for tests.
import 'fake-indexeddb/auto'
import { Blob as NodeBlob, File as NodeFile } from 'node:buffer'

// jsdom's own Blob/File classes don't survive Node's `structuredClone` (it silently drops
// their byte content to `{}`), which fake-indexeddb uses to clone values on `put()`. Node's
// native Blob/File do round-trip correctly and are what real IndexedDB stores in production
// anyway, so swap them in globally rather than special-casing every test that touches audio.
Object.defineProperty(globalThis, 'Blob', {
  value: NodeBlob,
  configurable: true,
  writable: true,
})
Object.defineProperty(globalThis, 'File', {
  value: NodeFile,
  configurable: true,
  writable: true,
})

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

// jsdom doesn't implement the Web Speech API either — stub just enough of
// SpeechSynthesisUtterance for code under test to construct one and read
// `.text`/`.lang` back. Actual speech output is mocked per-test.
if (!('SpeechSynthesisUtterance' in globalThis)) {
  class MockSpeechSynthesisUtterance {
    text: string
    lang = ''

    constructor(text = '') {
      this.text = text
    }
  }

  Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', {
    value: MockSpeechSynthesisUtterance,
    configurable: true,
    writable: true,
  })
}
