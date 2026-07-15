export function getEngVidSearchUrl(topicTitle: string): string {
  return `https://www.engvid.com/?s=${encodeURIComponent(topicTitle)}`
}
