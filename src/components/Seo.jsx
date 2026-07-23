import { useEffect } from 'react'
import { absoluteUrl } from '../lib/site.js'

function setMeta(selector, attrs) {
  let node = document.head.querySelector(selector)
  if (!node) { node = document.createElement('meta'); document.head.appendChild(node) }
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value))
}

export default function Seo({ title, description, path, image = '/og-image.svg', robots = 'index,follow', jsonLd = [] }) {
  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[name="robots"]', { name: 'robots', content: robots })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    const canonical = absoluteUrl(path)
    const imageUrl = absoluteUrl(image)
    document.head.querySelectorAll('[data-route-seo]').forEach(node => node.remove())
    if (canonical) {
      const link = document.createElement('link'); link.rel = 'canonical'; link.href = canonical; link.dataset.routeSeo = 'true'; document.head.appendChild(link)
      setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    }
    if (imageUrl) setMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl })
    jsonLd.forEach(data => {
      const script = document.createElement('script'); script.type = 'application/ld+json'; script.dataset.routeSeo = 'true'; script.textContent = JSON.stringify(data); document.head.appendChild(script)
    })
  }, [title, description, path, image, robots, jsonLd])
  return null
}
