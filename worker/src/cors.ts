const ALLOWED_ORIGIN_PATTERN = /^https:\/\/([a-z0-9-]+\.)?sprachlabor\.pages\.dev$/
const LOCAL_ORIGINS = new Set(['http://localhost:5173', 'http://localhost:4173'])

export function isAllowedOrigin(origin: string): boolean {
  return LOCAL_ORIGINS.has(origin) || ALLOWED_ORIGIN_PATTERN.test(origin)
}

export function corsHeaders(allowedOrigin: string | null): HeadersInit {
  return {
    'Access-Control-Allow-Origin': allowedOrigin ?? '',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}
