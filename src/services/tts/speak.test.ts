// Core
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
// Services
import { isSpeechSynthesisSupported, speak } from '@/services/tts/speak'

describe('speak', () => {
  const originalSpeechSynthesis = (window as { speechSynthesis?: unknown }).speechSynthesis

  afterEach(() => {
    Object.defineProperty(window, 'speechSynthesis', {
      value: originalSpeechSynthesis,
      configurable: true,
      writable: true,
    })
  })

  it('reports unsupported when window.speechSynthesis is missing', () => {
    delete (window as { speechSynthesis?: unknown }).speechSynthesis

    expect(isSpeechSynthesisSupported()).toBe(false)
    expect(() => speak('Hallo', 'de-DE')).not.toThrow()
  })

  describe('when speechSynthesis is available', () => {
    let cancel: ReturnType<typeof vi.fn>
    let speakSpy: ReturnType<typeof vi.fn>

    beforeEach(() => {
      cancel = vi.fn()
      speakSpy = vi.fn()
      Object.defineProperty(window, 'speechSynthesis', {
        value: { cancel, speak: speakSpy },
        configurable: true,
        writable: true,
      })
    })

    it('speaks the given text in the given language', () => {
      speak('Erdapfel', 'de-AT')

      expect(cancel).toHaveBeenCalledOnce()
      expect(speakSpy).toHaveBeenCalledOnce()
      const utterance = speakSpy.mock.calls[0][0] as SpeechSynthesisUtterance
      expect(utterance.text).toBe('Erdapfel')
      expect(utterance.lang).toBe('de-AT')
    })

    it('does not speak empty text', () => {
      speak('   ', 'de-DE')

      expect(speakSpy).not.toHaveBeenCalled()
    })
  })
})
