import { useState, useEffect } from 'react'

const cache = {}

export default function Icon({ name, className = 'w-5 h-5' }) {
  const [svg, setSvg] = useState(cache[name] || null)

  useEffect(() => {
    if (cache[name]) {
      setSvg(cache[name])
      return
    }
    fetch(`/icons/${name}.svg`)
      .then(r => r.text())
      .then(text => {
        cache[name] = text
        setSvg(text)
      })
  }, [name])

  if (!svg) return <span className={className} />
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
