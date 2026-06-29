import { useEffect, useRef, useCallback } from 'react'

/**
 * LogoParticleLoader — premium canvas particle effect
 *
 * Phases:
 *   assembled  → short pause
 *   exploding  → particles scatter in random directions, fade out completely
 *   hidden     → brief blackout pause
 *   assembling → particles fade in from random positions, slowly converge to origin
 */
export default function LogoParticleLoader({
  logoSrc,
  width = 420,
  height = 110,
  particleSize = 2,
  label,
  autoPlay = true,
}) {
  const canvasRef = useRef(null)
  const stateRef  = useRef({
    particles:    [],
    animFrameId:  null,
    phaseTimer:   null,
    running:      false,
    phase:        'assembled',
    frameCount:   0,
  })

  // ── Sample logo pixels at 4× internal resolution for crisp small particles ──
  const buildParticles = useCallback((img, cw, ch, pSize) => {
    const scale = 4
    const sw = cw * scale
    const sh = ch * scale

    const off = document.createElement('canvas')
    off.width  = sw
    off.height = sh
    const ctx  = off.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, sw, sh)

    const { data } = ctx.getImageData(0, 0, sw, sh)
    const step     = pSize * scale
    const particles = []

    for (let y = 0; y < sh; y += step) {
      for (let x = 0; x < sw; x += step) {
        // Average the block for anti-aliased color
        let r = 0, g = 0, b = 0, a = 0, n = 0
        for (let dy = 0; dy < step && y + dy < sh; dy++) {
          for (let dx = 0; dx < step && x + dx < sw; dx++) {
            const i = ((y + dy) * sw + (x + dx)) * 4
            r += data[i]; g += data[i+1]; b += data[i+2]; a += data[i+3]
            n++
          }
        }
        r /= n; g /= n; b /= n; a /= n

        if (a < 20) continue

        const ox = (x / scale) + pSize / 2
        const oy = (y / scale) + pSize / 2

        // Each particle gets a unique random direction for explosion
        const angle  = Math.random() * Math.PI * 2
        const thrust = 4 + Math.random() * 14   // varied distances
        particles.push({
          x: ox, y: oy,
          originX: ox, originY: oy,
          // explode target — fly far off in random direction
          explodeX: ox + Math.cos(angle) * thrust * (cw / 3),
          explodeY: oy + Math.sin(angle) * thrust * (ch / 2),
          // assemble: spawn from random position around canvas
          spawnX: (Math.random() - 0.5) * cw * 3 + cw / 2,
          spawnY: (Math.random() - 0.5) * ch * 3 + ch / 2,
          color: `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`,
          alpha: 1,
          size:  pSize,
        })
      }
    }
    return particles
  }, [])

  // ── Render a single frame ────────────────────────────────────────────────────
  const tick = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !stateRef.current.running) return

    const ctx    = canvas.getContext('2d')
    const { particles, phase } = stateRef.current

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let doneCount = 0

    for (const p of particles) {
      if (phase === 'exploding') {
        // lerp toward explode target, fade out
        p.x     += (p.explodeX - p.x) * 0.07
        p.y     += (p.explodeY - p.y) * 0.07
        p.alpha  = Math.max(0, p.alpha - 0.045)
        if (p.alpha <= 0) doneCount++
      } else if (phase === 'assembling') {
        // start from spawnX/spawnY, lerp to origin, fade in
        p.alpha = Math.min(1, p.alpha + 0.018)   // slow fade-in
        // spring speed is slower than explosion
        const spring = 0.055 + Math.random() * 0.025
        p.x += (p.originX - p.x) * spring
        p.y += (p.originY - p.y) * spring
        const close = Math.abs(p.originX - p.x) < 0.6 && Math.abs(p.originY - p.y) < 0.6
        if (close && p.alpha >= 0.99) doneCount++
      } else {
        // assembled — just draw
        doneCount++
      }

      if (p.alpha <= 0) continue
      ctx.globalAlpha = p.alpha
      ctx.fillStyle   = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 0.52, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalAlpha = 1

    const allDone = doneCount === particles.length

    if (phase === 'exploding' && allDone) {
      // All faded out → brief pause → start assembling from spawn positions
      stateRef.current.phase = 'hidden'
      for (const p of particles) {
        p.x     = p.spawnX
        p.y     = p.spawnY
        p.alpha = 0
      }
      stateRef.current.phaseTimer = setTimeout(() => {
        if (!stateRef.current.running) return
        stateRef.current.phase = 'assembling'
      }, 220)
    } else if (phase === 'assembling' && allDone) {
      // Snap exact, then pause before next explode
      for (const p of particles) {
        p.x = p.originX; p.y = p.originY; p.alpha = 1
      }
      stateRef.current.phase = 'assembled'
      stateRef.current.phaseTimer = setTimeout(() => {
        if (!stateRef.current.running) return
        // Regenerate random directions for next explosion
        const cw = canvas.width, ch = canvas.height
        for (const p of particles) {
          const angle  = Math.random() * Math.PI * 2
          const thrust = 4 + Math.random() * 14
          p.explodeX = p.originX + Math.cos(angle) * thrust * (cw / 3)
          p.explodeY = p.originY + Math.sin(angle) * thrust * (ch / 2)
          p.spawnX   = (Math.random() - 0.5) * cw * 3 + cw / 2
          p.spawnY   = (Math.random() - 0.5) * ch * 3 + ch / 2
          p.alpha    = 1
        }
        stateRef.current.phase = 'exploding'
      }, 1200)
    }

    stateRef.current.animFrameId = requestAnimationFrame(tick)
  }, [])

  // ── Draw static (no animation) ───────────────────────────────────────────────
  const drawStatic = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const p of stateRef.current.particles) {
      ctx.globalAlpha = 1
      ctx.fillStyle   = p.color
      ctx.beginPath()
      ctx.arc(p.originX, p.originY, p.size * 0.52, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }, [])

  const stopLoop = useCallback(() => {
    stateRef.current.running = false
    if (stateRef.current.animFrameId) {
      cancelAnimationFrame(stateRef.current.animFrameId)
      stateRef.current.animFrameId = null
    }
    if (stateRef.current.phaseTimer) {
      clearTimeout(stateRef.current.phaseTimer)
      stateRef.current.phaseTimer = null
    }
  }, [])

  const startLoop = useCallback(() => {
    stateRef.current.running = true
    stateRef.current.phase   = 'assembled'
    drawStatic()
    // Short pause then explode for first time
    stateRef.current.phaseTimer = setTimeout(() => {
      if (!stateRef.current.running) return
      const canvas = canvasRef.current
      const cw = canvas?.width ?? 420, ch = canvas?.height ?? 110
      for (const p of stateRef.current.particles) {
        const angle  = Math.random() * Math.PI * 2
        const thrust = 4 + Math.random() * 14
        p.explodeX = p.originX + Math.cos(angle) * thrust * (cw / 3)
        p.explodeY = p.originY + Math.sin(angle) * thrust * (ch / 2)
        p.spawnX   = (Math.random() - 0.5) * cw * 3 + cw / 2
        p.spawnY   = (Math.random() - 0.5) * ch * 3 + ch / 2
        p.alpha    = 1
      }
      stateRef.current.phase = 'exploding'
      stateRef.current.animFrameId = requestAnimationFrame(tick)
    }, 800)
  }, [drawStatic, tick])

  // ── Load image ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!logoSrc) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      stateRef.current.particles = buildParticles(img, width, height, particleSize)
      if (autoPlay) startLoop()
      else drawStatic()
    }
    img.onerror = () => console.error('[LogoParticleLoader] Failed to load:', logoSrc)
    img.src = logoSrc
    return () => stopLoop()
  }, [logoSrc, width, height, particleSize, autoPlay, buildParticles, startLoop, stopLoop, drawStatic])

  useEffect(() => {
    if (!stateRef.current.particles.length) return
    if (autoPlay) {
      if (!stateRef.current.running) {
        for (const p of stateRef.current.particles) {
          p.x = p.originX; p.y = p.originY; p.alpha = 1
        }
        stateRef.current.phase = 'assembled'
        startLoop()
      }
    } else {
      stopLoop()
      drawStatic()
    }
  }, [autoPlay, startLoop, stopLoop, drawStatic])

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ display: 'block' }}
      />
      {label && (
        <span style={{
          color: '#C9A84C', fontFamily: 'monospace', fontSize: 11,
          letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.75,
          animation: 'particleLabelPulse 2.4s ease-in-out infinite',
        }}>
          {label}
        </span>
      )}
    </div>
  )
}
