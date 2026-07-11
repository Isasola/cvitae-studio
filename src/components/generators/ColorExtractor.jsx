import { useState, useRef } from 'react'

function extractColors(imageFile, callback) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const MAX = 120
      const scale = Math.min(MAX / img.width, MAX / img.height, 1)
      canvas.width  = Math.round(img.width  * scale)
      canvas.height = Math.round(img.height * scale)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)

      const buckets = {}
      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3]
        if (a < 128) continue
        const r = data[i], g = data[i + 1], b = data[i + 2]
        const max = Math.max(r, g, b), min = Math.min(r, g, b)
        if (max > 230 && min > 200) continue  // casi blanco
        if (max < 40) continue                 // casi negro
        if (max - min < 20 && max < 180) continue // gris neutro
        const br = Math.round(r / 24) * 24
        const bg = Math.round(g / 24) * 24
        const bb = Math.round(b / 24) * 24
        const key = `${br},${bg},${bb}`
        buckets[key] = (buckets[key] || 0) + 1
      }

      const sorted = Object.entries(buckets).sort((a, b) => b[1] - a[1])

      const picked = []
      for (const [key] of sorted) {
        const [r, g, b] = key.split(',').map(Number)
        const tooClose = picked.some(([pr, pg, pb]) =>
          Math.sqrt((r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2) < 50
        )
        if (!tooClose) {
          picked.push([r, g, b])
          if (picked.length >= 6) break
        }
      }

      const hex = picked.map(([r, g, b]) =>
        '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
      )
      callback(hex.length ? hex : ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'])
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(imageFile)
}

export default function ColorExtractor({ onColorSelect }) {
  const [swatches, setSwatches] = useState([])
  const [loading, setLoading]   = useState(false)
  const [preview, setPreview]   = useState(null)
  const inputRef = useRef(null)

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    setPreview(URL.createObjectURL(file))
    extractColors(file, (colors) => {
      setSwatches(colors)
      setLoading(false)
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="w-full px-4 py-3 border-[3px] border-black bg-cream font-body font-bold text-xs tracking-widest hover:bg-black hover:text-cream transition-none flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="opacity-60">EXTRACTING COLORS...</span>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            {preview ? 'CHANGE SCREENSHOT' : 'SCAN YOUR APP'}
          </>
        )}
      </button>

      {preview && (
        <div className="border-[3px] border-black overflow-hidden" style={{ height: 60 }}>
          <img src={preview} alt="Screenshot" className="w-full h-full object-cover object-top" />
        </div>
      )}

      {swatches.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="font-body text-[10px] text-black/50 tracking-widest uppercase">Click a color to apply →</span>
          <div className="flex gap-0">
            {swatches.map((color) => (
              <button
                key={color}
                onClick={() => onColorSelect(color)}
                title={color}
                className="flex-1 border-[2px] border-black -ml-[2px] first:ml-0 transition-transform hover:scale-110 hover:z-10 relative"
                style={{ backgroundColor: color, height: 38 }}
              />
            ))}
          </div>
          <div className="flex gap-0">
            {swatches.map((color) => (
              <span key={color} className="flex-1 font-mono text-[8px] text-center text-black/40 truncate">
                {color}
              </span>
            ))}
          </div>
        </div>
      )}

      {!preview && (
        <p className="font-body text-xs text-black/40 leading-relaxed">
          Subí un screenshot de tu app — extraemos los colores reales automáticamente.
        </p>
      )}
    </div>
  )
}
