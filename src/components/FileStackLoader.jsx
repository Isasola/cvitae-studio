/**
 * FileStackLoader — Premium animated loader component
 * Inspired by Tetris/Dr. Mario: file icons fall and stack in columns
 *
 * Props:
 *   size:  "sm" | "md" | "lg"      (default: "md")
 *   speed: "slow" | "normal" | "fast" (default: "normal")
 *   label: string | null            (default: "Loading...")
 */

import { useEffect, useRef, useReducer, useCallback } from 'react'

// ─── SVG Icon Definitions ────────────────────────────────────────────────────

const FolderIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 10 C4 8.34 5.34 7 7 7 H16 L20 12 H33 C34.66 12 36 13.34 36 15 V31 C36 32.66 34.66 34 33 34 H7 C5.34 34 4 32.66 4 31 Z"
      fill="#C9A84C"
      stroke="#111111"
      strokeWidth="1.8"
    />
    <path
      d="M4 15 H36 V31 C36 32.66 34.66 34 33 34 H7 C5.34 34 4 32.66 4 31 Z"
      fill="#E4C26E"
      stroke="none"
    />
    {/* tab highlight */}
    <path d="M7 7 H16 L18 10 H7 Z" fill="#D4AE58" stroke="none" />
  </svg>
)

const DocumentIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 5 H26 L34 13 V35 C34 36.1 33.1 37 32 37 H8 C6.9 37 6 36.1 6 35 V7 C6 5.9 6.9 5 8 5 Z"
      fill="#F5F0E8"
      stroke="#111111"
      strokeWidth="1.8"
    />
    {/* dog-ear fold */}
    <path d="M26 5 L34 13 H28 C26.9 13 26 12.1 26 11 Z" fill="#C8C2B4" stroke="#111111" strokeWidth="1.2" />
    {/* text lines */}
    <line x1="12" y1="19" x2="28" y2="19" stroke="#9A9490" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="12" y1="24" x2="28" y2="24" stroke="#9A9490" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="12" y1="29" x2="22" y2="29" stroke="#9A9490" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const SpreadsheetIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="30" height="30" rx="3" fill="#C9A84C" stroke="#111111" strokeWidth="1.8" />
    {/* grid lines vertical */}
    <line x1="15" y1="5" x2="15" y2="35" stroke="#111111" strokeWidth="1.2" opacity="0.5" />
    <line x1="25" y1="5" x2="25" y2="35" stroke="#111111" strokeWidth="1.2" opacity="0.5" />
    {/* grid lines horizontal */}
    <line x1="5" y1="13" x2="35" y2="13" stroke="#111111" strokeWidth="1.2" opacity="0.5" />
    <line x1="5" y1="21" x2="35" y2="21" stroke="#111111" strokeWidth="1.2" opacity="0.5" />
    <line x1="5" y1="29" x2="35" y2="29" stroke="#111111" strokeWidth="1.2" opacity="0.5" />
    {/* header row fill */}
    <rect x="5" y="5" width="30" height="8" rx="3" fill="#9A7B33" stroke="none" />
    <rect x="5" y="9" width="30" height="4" fill="#9A7B33" stroke="none" />
    {/* data cells – small highlights */}
    <rect x="16" y="14" width="8" height="6" rx="0.5" fill="rgba(255,255,255,0.12)" />
    <rect x="6"  y="22" width="8" height="6" rx="0.5" fill="rgba(255,255,255,0.12)" />
    <rect x="26" y="22" width="8" height="6" rx="0.5" fill="rgba(255,255,255,0.12)" />
  </svg>
)

const ZipIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="28" height="32" rx="3" fill="#222222" stroke="#C9A84C" strokeWidth="1.8" />
    {/* zipper track */}
    <rect x="17" y="4" width="6" height="32" rx="1" fill="#1A1A1A" stroke="none" />
    {/* zipper teeth */}
    {[7, 11, 15, 19, 23, 27, 31].map((y) => (
      <rect key={y} x="16" y={y} width="8" height="2.5" rx="1" fill="#C9A84C" stroke="none" />
    ))}
    {/* pull tab */}
    <rect x="15" y="14" width="10" height="7" rx="2" fill="#C9A84C" stroke="#111111" strokeWidth="1.2" />
    <circle cx="20" cy="17.5" r="1.5" fill="#111111" />
  </svg>
)

const ImageIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="32" height="28" rx="3" fill="#2A2A2A" stroke="#F5F0E8" strokeWidth="1.8" />
    {/* mountains */}
    <path d="M4 28 L13 16 L20 24 L27 18 L36 28 Z" fill="#F5F0E8" opacity="0.5" />
    <path d="M4 34 H36 V28 L27 18 L20 24 L13 16 L4 28 Z" fill="#F5F0E8" opacity="0.3" />
    {/* sun */}
    <circle cx="29" cy="14" r="4" fill="#C9A84C" />
  </svg>
)

// ─── Piece type definitions ───────────────────────────────────────────────────

const PIECE_TYPES = [
  { id: 'folder',      Component: FolderIcon,      label: 'Folder',      weight: 3 },
  { id: 'document',    Component: DocumentIcon,    label: 'Document',    weight: 3 },
  { id: 'spreadsheet', Component: SpreadsheetIcon, label: 'Sheet',       weight: 2 },
  { id: 'zip',         Component: ZipIcon,         label: 'Archive',     weight: 2 },
  { id: 'image',       Component: ImageIcon,       label: 'Image',       weight: 2 },
]

// Weighted random pick
function pickPieceType(exclude = null) {
  const pool = PIECE_TYPES.filter(p => p.id !== exclude)
  const total = pool.reduce((acc, p) => acc + p.weight, 0)
  let r = Math.random() * total
  for (const p of pool) {
    r -= p.weight
    if (r <= 0) return p
  }
  return pool[pool.length - 1]
}

// ─── Size / Speed configs ─────────────────────────────────────────────────────

const SIZE_CONFIG = {
  sm: { iconSize: 22, cellSize: 30, cols: 4, rows: 5, gap: 3 },
  md: { iconSize: 32, cellSize: 42, cols: 5, rows: 6, gap: 4 },
  lg: { iconSize: 44, cellSize: 58, cols: 5, rows: 7, gap: 5 },
}

const SPEED_CONFIG = {
  slow:   { fallMs: 1400, spawnIntervalMs: 900,  flashMs: 900,  pauseMs: 600 },
  normal: { fallMs: 900,  spawnIntervalMs: 600,  flashMs: 700,  pauseMs: 400 },
  fast:   { fallMs: 520,  spawnIntervalMs: 350,  flashMs: 500,  pauseMs: 200 },
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

const SPAWN   = 'SPAWN'
const LAND    = 'LAND'
const FLASH   = 'FLASH'
const RESET   = 'RESET'
const TICK    = 'TICK'

function makeInitialState(cols, rows) {
  return {
    // grid[col][row] = piece type id | null
    grid: Array.from({ length: cols }, () => Array(rows).fill(null)),
    // active falling piece per column: { col, type, row (current target landing row), animKey }
    fallers: [],
    // columnHeights[col] = number of stacked pieces (from bottom)
    columnHeights: Array(cols).fill(0),
    isFlashing: false,
    animKey: 0,
    phase: 'running', // 'running' | 'flashing' | 'resetting'
  }
}

function reducer(state, action) {
  switch (action.type) {
    case SPAWN: {
      const { col, pieceType } = action
      // already has a faller in this col? skip
      if (state.fallers.some(f => f.col === col)) return state
      // column full? skip
      if (state.columnHeights[col] >= state.grid[0].length) return state
      const landingRow = state.grid[0].length - 1 - state.columnHeights[col]
      return {
        ...state,
        fallers: [...state.fallers, {
          col,
          type: pieceType,
          landingRow,
          animKey: state.animKey + 1,
          phase: 'falling',
        }],
        animKey: state.animKey + 1,
      }
    }

    case LAND: {
      const { col } = action
      const faller = state.fallers.find(f => f.col === col)
      if (!faller) return state

      const newGrid = state.grid.map(c => [...c])
      const newHeights = [...state.columnHeights]
      const row = faller.landingRow

      newGrid[col][row] = faller.type
      newHeights[col] += 1

      const newFallers = state.fallers.filter(f => f.col !== col)
      const allFull = newHeights.every((h, i) => h >= state.grid[0].length)

      return {
        ...state,
        grid: newGrid,
        columnHeights: newHeights,
        fallers: newFallers,
        phase: allFull ? 'flashing' : 'running',
      }
    }

    case FLASH: {
      return { ...state, isFlashing: true, phase: 'flashing' }
    }

    case RESET: {
      return {
        ...makeInitialState(state.grid.length, state.grid[0].length),
        animKey: state.animKey + 100,
        phase: 'running',
      }
    }

    default:
      return state
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FileStackLoader({
  size = 'md',
  speed = 'normal',
  label = 'Loading...',
}) {
  const { iconSize, cellSize, cols, rows, gap } = SIZE_CONFIG[size] || SIZE_CONFIG.md
  const { fallMs, spawnIntervalMs, flashMs, pauseMs } = SPEED_CONFIG[speed] || SPEED_CONFIG.normal

  const [state, dispatch] = useReducer(reducer, null, () => makeInitialState(cols, rows))
  const stateRef = useRef(state)
  stateRef.current = state

  // ── Spawn loop ──────────────────────────────────────────────────────────────
  const spawnTimerRef = useRef(null)
  const flashTimerRef = useRef(null)

  const scheduleNextSpawn = useCallback(() => {
    clearTimeout(spawnTimerRef.current)
    spawnTimerRef.current = setTimeout(() => {
      const s = stateRef.current
      if (s.phase !== 'running') return

      // Pick a column that isn't full and doesn't have a faller
      const available = []
      for (let c = 0; c < cols; c++) {
        const height = s.columnHeights[c]
        const hasFaller = s.fallers.some(f => f.col === c)
        if (height < rows && !hasFaller) available.push(c)
      }

      if (available.length > 0) {
        // pick randomly, weighted toward emptier columns
        const col = available[Math.floor(Math.random() * available.length)]
        // don't repeat same type as neighbor columns
        const leftType  = col > 0      ? s.columnHeights[col - 1] > 0 ? s.grid[col - 1][rows - s.columnHeights[col - 1]] : null : null
        const rightType = col < cols-1 ? s.columnHeights[col + 1] > 0 ? s.grid[col + 1][rows - s.columnHeights[col + 1]] : null : null
        const exclude = leftType === rightType ? leftType : null
        const pieceType = pickPieceType(exclude)
        dispatch({ type: SPAWN, col, pieceType })
      }

      scheduleNextSpawn()
    }, spawnIntervalMs + Math.random() * (spawnIntervalMs * 0.4))
  }, [cols, rows, spawnIntervalMs])

  // ── Flash + reset when full ─────────────────────────────────────────────────
  useEffect(() => {
    if (state.phase === 'flashing') {
      clearTimeout(flashTimerRef.current)
      flashTimerRef.current = setTimeout(() => {
        dispatch({ type: RESET })
        // restart spawning after pause
        setTimeout(scheduleNextSpawn, pauseMs)
      }, flashMs + pauseMs)
    }
  }, [state.phase, flashMs, pauseMs, scheduleNextSpawn])

  // ── Mount / unmount ─────────────────────────────────────────────────────────
  useEffect(() => {
    scheduleNextSpawn()
    return () => {
      clearTimeout(spawnTimerRef.current)
      clearTimeout(flashTimerRef.current)
    }
  }, [scheduleNextSpawn])

  // ── Dimensions ──────────────────────────────────────────────────────────────
  const totalWidth  = cols * cellSize + (cols - 1) * gap
  const totalHeight = rows * cellSize + (rows - 1) * gap
  const cellStep = cellSize + gap

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="inline-flex flex-col items-center select-none"
      role="status"
      aria-label={label || 'Loading'}
    >
      {/* ── Loader stage ─────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          width: totalWidth,
          height: totalHeight,
          borderRadius: 6,
        }}
      >
        {/* Column track guides (very subtle) */}
        {Array.from({ length: cols }).map((_, c) => (
          <div
            key={c}
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: c * cellStep,
              width: cellSize,
              background: 'rgba(255,255,255,0.015)',
              borderRadius: 3,
            }}
          />
        ))}

        {/* ── Stacked pieces (grid) ─────────────────────────────────────── */}
        {state.grid.map((column, c) =>
          column.map((typeId, r) => {
            if (!typeId) return null
            const pieceType = PIECE_TYPES.find(p => p.id === typeId)
            if (!pieceType) return null
            const { Component } = pieceType
            const x = c * cellStep
            const y = r * cellStep
            return (
              <div
                key={`${c}-${r}-${state.animKey}`}
                className="absolute flex items-center justify-center"
                style={{
                  left: x,
                  top: y,
                  width: cellSize,
                  height: cellSize,
                  animation: state.phase === 'flashing'
                    ? `stack-flash ${flashMs}ms ease-in-out forwards`
                    : `slot-fill 0.5s ease-out forwards`,
                }}
              >
                <Component size={iconSize} />
              </div>
            )
          })
        )}

        {/* ── Falling pieces ────────────────────────────────────────────── */}
        {state.fallers.map((faller) => {
          const pieceType = PIECE_TYPES.find(p => p.id === faller.type.id)
          if (!pieceType) return null
          const { Component } = pieceType
          const x = faller.col * cellStep
          const targetY = faller.landingRow * cellStep
          // fall distance = from -cellSize (above viewport) to targetY
          const fallDistance = targetY + cellSize

          return (
            <FallingPiece
              key={`faller-${faller.col}-${faller.animKey}`}
              col={faller.col}
              x={x}
              targetY={targetY}
              fallDistance={fallDistance}
              cellSize={cellSize}
              iconSize={iconSize}
              fallMs={fallMs}
              Component={Component}
              onLanded={() => dispatch({ type: LAND, col: faller.col })}
            />
          )
        })}
      </div>

      {/* ── Label ─────────────────────────────────────────────────────────── */}
      {label && (
        <div
          className="mt-3 text-center font-mono animate-label-pulse"
          style={{
            color: 'rgba(201,168,76,0.85)',
            fontSize: size === 'sm' ? 10 : size === 'lg' ? 14 : 12,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}

// ─── FallingPiece sub-component ───────────────────────────────────────────────
// Handles the fall animation for a single piece and calls onLanded when done.

function FallingPiece({ x, targetY, fallDistance, cellSize, iconSize, fallMs, Component, onLanded }) {
  const ref = useRef(null)
  const calledRef = useRef(false)

  useEffect(() => {
    calledRef.current = false
    const timer = setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true
        onLanded()
      }
    }, fallMs + 20) // slight buffer for animation completion
    return () => clearTimeout(timer)
  }, [fallMs, onLanded])

  return (
    <div
      ref={ref}
      className="absolute flex items-center justify-center"
      style={{
        left: x,
        top: -cellSize,
        width: cellSize,
        height: cellSize,
        '--fall-distance': `${fallDistance}px`,
        '--fall-duration': `${fallMs}ms`,
        animation: `piece-spawn 0.15s ease-out, fall-gravity ${fallMs}ms cubic-bezier(0.42, 0, 0.58, 1) 0.1s forwards`,
        zIndex: 10,
      }}
    >
      <Component size={iconSize} />
      {/* subtle shadow under falling piece */}
      <div
        style={{
          position: 'absolute',
          bottom: -2,
          left: '15%',
          width: '70%',
          height: 3,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.4)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  )
}
