const ALLOWED_ORIGIN_PATTERN = /^https:\/\/([a-z0-9-]+\.)?sprachlabor\.pages\.dev$/

export function isAllowedOrigin(origin: string): boolean {
  return origin === 'http://localhost:5173' || ALLOWED_ORIGIN_PATTERN.test(origin)
}

export function corsHeaders(allowedOrigin: string | null): HeadersInit {
  return {
    'Access-Control-Allow-Origin': allowedOrigin ?? '',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}
