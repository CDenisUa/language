/**
 * Cloudflare Workers have no "local machine timezone" — Date's local-time getters
 * (getHours, getDay, etc.) always behave as UTC. The client's scheduler logic
 * (expandOccurrences, getEnglishSeparationStatus) is written against those same
 * local-time getters and is correct there only because the browser's local
 * timezone already matches the user. To reuse that logic unchanged here, this
 * produces a Date whose local-time getters read as wall-clock time in `timeZone`,
 * so every occurrence/status computed from it lines up with what the user
 * actually intends by "09:00" — comparisons stay internally consistent as long
 * as every "now" fed into that logic goes through this same conversion.
 */
export function zonedNow(timeZone: string, at: Date = new Date()): Date {
  return new Date(at.toLocaleString('en-US', { timeZone }))
}
