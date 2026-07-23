import { trackView } from '../hooks/useSupabaseData.js'

export function trackEvent(event, details = {}) {
  window.dispatchEvent(new CustomEvent('cvitae:analytics', { detail: { event, ...details } }))
  trackView(`event:${event}${details.projectType ? `:${details.projectType}` : ''}`).catch(() => {})
}
