/**
 * FileStackLoader — Premium animated loader
 * A robot archivist (Dr. Filo) tosses files into a stack box.
 * Files follow arc trajectories. Folders land first, then files enter them.
 */
import { useEffect, useRef, useReducer, useCallback, useState } from 'react'

// ── Dr. Filo — original robot archivist character ─────────────────────────
function DrFilo({ throwing, scale = 1 }) {
  return (
    <svg
      width={80 * scale}
      height={100 * scale}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Body */}
      <rect x="20" y="40" width="40" height="36" rx="4" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="2"/>
      {/* Chest panel */}
      <rect x="27" y="47" width="26" height="18" rx="2" fill="#111" stroke="#C9A84C" strokeWidth="1"/>
      {/* Chest lights */}
      <circle cx="33" cy="53" r="3" fill="#C9A84C" opacity="0.9"/>
      <circle cx="40" cy="53" r="3" fill={throwing ? '#F5F0E8' : '#333'}/>
      <circle cx="47" cy="53" r="3" fill="#C9A84C" opacity="0.6"/>
      {/* Chest bar */}
      <rect x="29" y="60" width="22" height="2" rx="1" fill="#C9A84C" opacity="0.4"/>

      {/* Head */}
      <rect x="22" y="14" width="36" height="28" rx="5" fill="#222" stroke="#C9A84C" strokeWidth="2"/>
      {/* Visor */}
      <rect x="26" y="19" width="28" height="14" rx="3" fill="#111" stroke="#C9A84C" strokeWidth="1"/>
      {/* Eyes */}
      <rect x="29" y="22" width="9" height="7" rx="1" fill={throwing ? '#C9A84C' : '#1A1A1A'} stroke="#C9A84C" strokeWidth="1"/>
      <rect x="42" y="22" width="9" height="7" rx="1" fill={throwing ? '#C9A84C' : '#1A1A1A'} stroke="#C9A84C" strokeWidth="1"/>
      {/* Eye pupils */}
      <rect x="32" y="24" width="3" height="3" rx="0.5" fill="#111"/>
      <rect x="45" y="24" width="3" height="3" rx="0.5" fill="#111"/>
      {/* Antenna */}
      <line x1="40" y1="14" x2="40" y2="6" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="40" cy="5" r="3" fill="#C9A84C"/>
      {/* Mouth — bar */}
      <rect x="31" y="35" width="18" height="3" rx="1.5" fill="#C9A84C" opacity="0.5"/>

      {/* Legs */}
      <rect x="24" y="75" width="12" height="18" rx="3" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1.5"/>
      <rect x="44" y="75" width="12" height="18" rx="3" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1.5"/>
      {/* Feet */}
      <rect x="21" y="90" width="18" height="7" rx="2" fill="#C9A84C"/>
      <rect x="41" y="90" width="18" height="7" rx="2" fill="#C9A84C"/>

      {/* Left arm (idle) */}
      <rect x="8" y="42" width="13" height="9" rx="3" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1.5"/>
      <rect x="5" y="49" width="9" height="8" rx="2" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1.2"/>

      {/* Right arm — raised when throwing */}
      <g style={{ transformOrigin: '60px 45px', transform: throwing ? 'rotate(-50deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>
        <rect x="59" y="42" width="13" height="9" rx="3" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1.5"/>
        <rect x="66" y="36" width="9" height="8" rx="2" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1.2"/>
      </g>
    </svg>
  )
}

// ── File icons ────────────────────────────────────────────────────────────
function FolderSVG({ size = 32, open = false }) {
  return (
    <svg width={size} height={size * 0.82} viewBox="0 0 40 33" fill="none">
      <path d="M2 7 C2 5.34 3.34 4 5 4 H14 L18 9 H35 C36.66 9 38 10.34 38 12 V29 C38 30.66 36.66 32 35 32 H5 C3.34 32 2 30.66 2 29Z" fill="#C9A84C" stroke="#111" strokeWidth="1.5"/>
      {open && <path d="M2 14 L38 14 V29 C38 30.66 36.66 32 35 32 H5 C3.34 32 2 30.66 2 29Z" fill="#E4C26E"/>}
    </svg>
  )
}

function DocSVG({ size = 28 }) {
  return (
    <svg width={size * 0.75} height={size} viewBox="0 0 30 38" fill="none">
      <path d="M4 2 H20 L28 10 V36 C28 37.1 27.1 38 26 38 H4 C2.9 38 2 37.1 2 36 V4 C2 2.9 2.9 2 4 2Z" fill="#F5F0E8" stroke="#111" strokeWidth="1.5"/>
      <path d="M20 2 L28 10 H22 C20.9 10 20 9.1 20 8Z" fill="#C8C2B4" stroke="#111" strokeWidth="1.2"/>
      <line x1="7" y1="16" x2="23" y2="16" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="7" y1="21" x2="23" y2="21" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="7" y1="26" x2="16" y2="26" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ImgSVG({ size = 28 }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 36 27" fill="none">
      <rect x="1" y="1" width="34" height="25" rx="3" fill="#2A2A2A" stroke="#F5F0E8" strokeWidth="1.5"/>
      <path d="M1 20 L10 12 L17 18 L23 13 L35 20Z" fill="#F5F0E8" opacity="0.35"/>
      <circle cx="28" cy="8" r="4" fill="#C9A84C"/>
    </svg>
  )
}

function ZipSVG({ size = 26 }) {
  return (
    <svg width={size * 0.75} height={size} viewBox="0 0 28 36" fill="none">
      <rect x="2" y="1" width="24" height="34" rx="3" fill="#222" stroke="#C9A84C" strokeWidth="1.5"/>
      <rect x="12" y="1" width="4" height="34" rx="1" fill="#1A1A1A"/>
      {[4, 9, 14, 19, 24, 29].map(y => (
        <rect key={y} x="11" y={y} width="6" height="3" rx="1" fill="#C9A84C"/>
      ))}
      <rect x="10" y="13" width="8" height="6" rx="2" fill="#C9A84C" stroke="#111" strokeWidth="1"/>
    </svg>
  )
}

function CodeSVG({ size = 28 }) {
  return (
    <svg width={size * 0.75} height={size} viewBox="0 0 30 38" fill="none">
      <path d="M4 2 H20 L28 10 V36 C28 37.1 27.1 38 26 38 H4 C2.9 38 2 37.1 2 36 V4 C2 2.9 2.9 2 4 2Z" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1.5"/>
      <path d="M20 2 L28 10 H22 C20.9 10 20 9.1 20 8Z" fill="#C9A84C" opacity="0.5"/>
      <text x="5" y="22" fill="#C9A84C" fontSize="7" fontFamily="monospace">{'</>'}</text>
      <line x1="5" y1="26" x2="20" y2="26" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="5" y1="30" x2="14" y2="30" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  )
}

// ── Stack box ─────────────────────────────────────────────────────────────
function StackBox({ width, height }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      {/* Box body */}
      <rect x="2" y="2" width={width-4} height={height-4} rx="4" fill="#111" stroke="#C9A84C" strokeWidth="2.5"/>
      {/* Top opening — dashed */}
      <line x1="2" y1="2" x2={width-2} y2="2" stroke="#C9A84C" strokeWidth="2" strokeDasharray="5 4"/>
      {/* Inner shadow line */}
      <rect x="6" y="6" width={width-12} height="4" rx="1" fill="#C9A84C" opacity="0.08"/>
      {/* Label plate */}
      <rect x={width/2-28} y={height-22} width="56" height="14" rx="2" fill="#C9A84C" opacity="0.15" stroke="#C9A84C" strokeWidth="1"/>
      <text x={width/2} y={height-11} fill="#C9A84C" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.7">ARCHIVE</text>
    </svg>
  )
}

// ── Arc trajectory helper ─────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t }

function easeInCubic(t) { return t * t * t }

function arcPosition(t, x1, y1, x2, y2, arcHeight) {
  const x = lerp(x1, x2, t)
  const yLinear = lerp(y1, y2, t)
  const yArc = -arcHeight * 4 * t * (1 - t)
  return { x, y: yLinear + yArc }
}

// ── Piece sequence — each entry describes a throw ─────────────────────────
const SEQUENCE = [
  { type: 'folder', label: 'Folder',   slot: 0 },
  { type: 'doc',    label: 'Report.doc', slot: 1 },
  { type: 'img',    label: 'cover.jpg',  slot: 2 },
  { type: 'code',   label: 'index.js',   slot: 1 },
  { type: 'zip',    label: 'assets.zip', slot: 2 },
  { type: 'doc',    label: 'notes.txt',  slot: 1 },
]

const ICON_COMPONENTS = {
  folder: FolderSVG,
  doc:    DocSVG,
  img:    ImgSVG,
  zip:    ZipSVG,
  code:   CodeSVG,
}

// ── Size configs ──────────────────────────────────────────────────────────
const SIZE = {
  sm: { characterScale: 0.7, boxW: 120, boxH: 80,  slotH: 20, iconSize: 18, label: 10 },
  md: { characterScale: 1.0, boxW: 160, boxH: 110, slotH: 26, iconSize: 26, label: 12 },
  lg: { characterScale: 1.3, boxW: 200, boxH: 140, slotH: 32, iconSize: 32, label: 13 },
}

const SPEED = {
  slow:   { throwMs: 1400, pauseMs: 900 },
  normal: { throwMs: 900,  pauseMs: 600 },
  fast:   { throwMs: 550,  pauseMs: 350 },
}

// ── Main component ────────────────────────────────────────────────────────
export default function FileStackLoader({
  size = 'md',
  speed = 'normal',
  label = 'Loading...',
  boxLogoSrc = null,
}) {
  const cfg   = SIZE[size]   || SIZE.md
  const timing = SPEED[speed] || SPEED.normal

  const [stackedItems, setStackedItems]   = useState([])
  const [throwing, setThrowing]           = useState(false)
  const [currentItem, setCurrentItem]     = useState(null) // { type, x, y, progress 0–1 }
  const [label2, setLabel2]               = useState(label)

  const seqIdxRef  = useRef(0)
  const rafRef     = useRef(null)
  const startRef   = useRef(null)
  const timerRef   = useRef(null)
  const mountedRef = useRef(true)

  // Box sits to the right of character
  const charW  = 80 * cfg.characterScale
  const boxX   = charW + 16
  const totalW = boxX + cfg.boxW + 12

  // Dr. Filo throw origin (right hand tip)
  const throwOriginX = charW - 4
  const throwOriginY = 40 * cfg.characterScale

  // Box landing zone (top center of box opening)
  const landX = boxX + cfg.boxW / 2
  const landY = 8

  function nextThrow() {
    if (!mountedRef.current) return
    const entry = SEQUENCE[seqIdxRef.current % SEQUENCE.length]
    seqIdxRef.current++

    setThrowing(true)
    setLabel2(entry.label)
    startRef.current = null

    function animate(ts) {
      if (!mountedRef.current) return
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / timing.throwMs, 1)
      const eased = easeInCubic(progress)

      const pos = arcPosition(eased, throwOriginX, throwOriginY, landX, landY, 60 * cfg.characterScale)
      setCurrentItem({ type: entry.type, x: pos.x, y: pos.y, progress })

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        // Land
        setCurrentItem(null)
        setThrowing(false)
        setStackedItems(prev => {
          const next = [...prev, { type: entry.type, slot: entry.slot, id: `${entry.type}-${Date.now()}` }]
          // Reset after SEQUENCE fills up
          if (next.length >= SEQUENCE.length) {
            timerRef.current = setTimeout(() => {
              if (mountedRef.current) {
                setStackedItems([])
                seqIdxRef.current = 0
              }
            }, timing.pauseMs * 3)
            return next
          }
          return next
        })

        timerRef.current = setTimeout(() => {
          if (mountedRef.current) nextThrow()
        }, timing.pauseMs)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    mountedRef.current = true
    timerRef.current = setTimeout(nextThrow, 400)
    return () => {
      mountedRef.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Stack layout inside the box
  const stackRows = []
  for (let i = 0; i < stackedItems.length; i++) {
    const item = stackedItems[i]
    const row  = stackedItems.length - 1 - i
    const yPos = cfg.boxH - 14 - row * cfg.slotH
    stackRows.push({ ...item, yPos })
  }

  const Icon = currentItem ? ICON_COMPONENTS[currentItem.type] : null

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', gap: 8 }}>
      <div style={{ position: 'relative', width: totalW, height: Math.max(100 * cfg.characterScale, cfg.boxH + 20) }}>

        {/* Dr. Filo */}
        <div style={{ position: 'absolute', left: 0, bottom: 0 }}>
          <DrFilo throwing={throwing} scale={cfg.characterScale} />
        </div>

        {/* Stack box */}
        <div style={{ position: 'absolute', left: boxX, top: 10 }}>
          <StackBox width={cfg.boxW} height={cfg.boxH} />

          {/* Logo overlay dentro del box */}
          {boxLogoSrc && (
            <img
              src={boxLogoSrc}
              alt="Brand logo"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: cfg.boxW * 0.55,
                maxHeight: cfg.boxH * 0.4,
                objectFit: 'contain',
                opacity: 0.25,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Stacked items inside box */}
          {stackRows.map(item => {
            const ItemIcon = ICON_COMPONENTS[item.type]
            return (
              <div key={item.id} style={{
                position: 'absolute',
                left: cfg.boxW / 2 - cfg.iconSize / 2 + (item.slot - 1) * cfg.iconSize * 0.9,
                top: item.yPos,
                animation: 'slotIn 0.25s ease-out forwards',
                opacity: 0,
              }}>
                {ItemIcon && <ItemIcon size={cfg.iconSize} open={item.type === 'folder'} />}
              </div>
            )
          })}
        </div>

        {/* Flying item */}
        {Icon && currentItem && (
          <div style={{
            position: 'absolute',
            left: currentItem.x - cfg.iconSize / 2,
            top: currentItem.y - cfg.iconSize / 2,
            transform: `rotate(${currentItem.progress * 180}deg)`,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 2px 6px rgba(201,168,76,0.5))',
          }}>
            <Icon size={cfg.iconSize} />
          </div>
        )}
      </div>

      {/* Label */}
      {label !== null && (
        <span style={{
          color: '#C9A84C',
          fontFamily: 'monospace',
          fontSize: cfg.label,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          opacity: 0.8,
          animation: 'labelPulse 2s ease-in-out infinite',
        }}>
          {label2}
        </span>
      )}
    </div>
  )
}
