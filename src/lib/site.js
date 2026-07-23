export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').trim().replace(/\/$/, '')

export function absoluteUrl(path = '/') {
  return SITE_URL ? new URL(path, `${SITE_URL}/`).toString() : null
}
