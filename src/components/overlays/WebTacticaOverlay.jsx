import { useEffect, useRef } from 'react'

// Wallets and cursors fly toward the magnet at top-center
// Positioned as % of image dimensions (1400x700 natural ratio ~2:1)
const ITEMS = [
  // left side wallets & cursors
  { id: 'w1', type: 'wallet', x: 12, y: 14, delay: 0 },
  { id: 'w2', type: 'wallet', x: 6,  y: 28, delay: 0.4 },
  { id: 'w3', type: 'wallet', x: 18, y: 38, delay: 0.8 },
  // right side wallets & cursors
  { id: 'w4', type: 'wallet', x: 80, y: 12, delay: 0.2 },
  { id: 'w5', type: 'wallet', x: 88, y: 26, delay: 0.6 },
  { id: 'w6', type: 'wallet', x: 74, y: 36, delay: 1.0 },
]

// Magnet center is ~50% x, ~4% y (top of image)
const MAGNET = { x: 50, y: 6 }

export default function WebTacticaOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {ITEMS.map(item => (
        <FloatingItem key={item.id} item={item} />
      ))}
    </div>
  )
}

function FloatingItem({ item }) {
  const dx = MAGNET.x - item.x
  const dy = MAGNET.y - item.y

  const style = {
    position: 'absolute',
    left: `${item.x}%`,
    top: `${item.y}%`,
    animation: `magnetPull_${item.id} 2.4s ${item.delay}s ease-in-out infinite`,
  }

  // Each item has a unique keyframe injected via a style tag
  const keyframes = `
    @keyframes magnetPull_${item.id} {
      0%   { transform: translate(0, 0) scale(1); opacity: 1; }
      60%  { transform: translate(${dx * 0.5}%, ${dy * 0.5}%) scale(0.85); opacity: 0.9; }
      85%  { transform: translate(${dx * 0.9}%, ${dy * 0.9}%) scale(0.5); opacity: 0.3; }
      86%  { transform: translate(0, 0) scale(0); opacity: 0; }
      100% { transform: translate(0, 0) scale(1); opacity: 1; }
    }
  `

  return (
    <>
      <style>{keyframes}</style>
      <div style={style}>
        <WalletSVG />
      </div>
    </>
  )
}

function WalletSVG() {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="4" width="20" height="13" rx="2" fill="#C9A84C" stroke="#111" strokeWidth="1.5"/>
      <path d="M1 7h20" stroke="#111" strokeWidth="1.5"/>
      <rect x="14" y="9" width="5" height="4" rx="1" fill="#111"/>
      <path d="M3 2h12a2 2 0 012 2H1a2 2 0 012-2z" fill="#C9A84C" stroke="#111" strokeWidth="1.5"/>
    </svg>
  )
}
