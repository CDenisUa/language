// Core
import { afterEach, describe, expect, it, vi } from 'vitest'
// Services
import { isSpeechRecognitionSupported, startRecognition } from '@/services/speechRecognition/speechRecognition'

class MockSpeechRecognition implements SpeechRecognition {
  lang = ''
  continuous = false
  interimResults = false
  onresult: ((event: SpeechRecognitionEvent) => void) | null = null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null = null
  onend: (() => void) | null = null
  start = vi.fn()
  stop = vi.fn()
  abort = vi.fn()
  addEventListener = vi.fn()
  removeEventListener = vi.fn()
  dispatchEvent = vi.fn(() => true)

  emitResult(transcript: string) {
    this.onresult?.({
      resultIndex: 0,
      results: { length: 1, 0: { length: 1, 0: { transcript } } },
    } as unknown as SpeechRecognitionEvent)
  }
}

describe('speechRecognition', () => {
  afterEach(() => {
    delete (window as { SpeechRecognition?: unknown }).SpeechRecognition
    delete (window as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
  })

  it('reports unsupported when neither constructor exists on window', () => {
    expect(isSpeechRecognitionSupported()).toBe(false)
    expect(startRecognition('de-DE', () => {})).toBeNull()
  })

  it('starts recognition and forwards recognized transcripts', () => {
    let instance: MockSpeechRecognition | undefined
    window.SpeechRecognition = vi.fn(function SpeechRecognitionMock() {
      instance = new MockSpeechRecognition()
      return instance
    }) as unknown as SpeechRecognitionConstructor

    expect(isSpeechRecognitionSupported()).toBe(true)

    const onResult = vi.fn()
    const handle = startRecognition('de-DE', onResult)

    expect(instance!.start).toHaveBeenCalled()
    expect(instance!.lang).toBe('de-DE')
    expect(instance!.continuous).toBe(true)

    instance!.emitResult('Guten Tag')
    expect(onResult).toHaveBeenCalledWith('Guten Tag')

    handle!.stop()
    expect(instance!.stop).toHaveBeenCalled()
  })

  it('falls back to webkitSpeechRecognition when SpeechRecognition is absent', () => {
    window.webkitSpeechRecognition = vi.fn(
      function WebkitSpeechRecognitionMock() {
        return new MockSpeechRecognition()
      },
    ) as unknown as SpeechRecognitionConstructor

    expect(isSpeechRecognitionSupported()).toBe(true)
  })
})
