export interface RecognitionHandle {
  stop: () => void
}

function getRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null
}

export function isSpeechRecognitionSupported(): boolean {
  return getRecognitionConstructor() !== null
}

/**
 * Starts live, continuous recognition for real-time shadowing feedback — not a scoring
 * mechanism, `onResult` is only ever surfaced to the user as "here's what was heard" (see
 * DECISIONS.md: no transcript-based accuracy scoring). Unsupported browsers (Safari/iOS) get
 * `null` back and must degrade to self-rating only.
 */
export function startRecognition(lang: string, onResult: (transcript: string) => void): RecognitionHandle | null {
  const RecognitionCtor = getRecognitionConstructor()
  if (!RecognitionCtor) return null

  const recognition = new RecognitionCtor()
  recognition.lang = lang
  recognition.continuous = true
  recognition.interimResults = true

  recognition.onresult = (event) => {
    let transcript = ''
    for (let i = 0; i < event.results.length; i += 1) {
      transcript += `${event.results[i][0].transcript} `
    }
    onResult(transcript.trim())
  }

  // Some browsers end recognition on silence even in continuous mode — restart to keep
  // listening for the duration of playback rather than surfacing a false "unsupported" state.
  recognition.onend = () => {
    try {
      recognition.start()
    } catch {
      // Already stopped intentionally via the returned handle — ignore.
    }
  }

  recognition.start()

  return {
    stop: () => {
      recognition.onend = null
      recognition.stop()
    },
  }
}
