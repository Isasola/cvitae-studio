// Files/folders tumble chaotically INTO the funnel (top-left of image)
// Gears on the machine body rotate slowly
// Matches the gold+black illustration style — no emojis

const FILES = [
  { id: 'f1', x: 8,  y: 2,  rot: -15, delay: 0,   dur: 2.0, type: 'folder' },
  { id: 'f2', x: 20, y: 0,  rot:  20, delay: 0.5, dur: 2.3, type: 'doc'    },
  { id: 'f3', x: 14, y: 5,  rot: -30, delay: 1.0, dur: 1.9, type: 'sheet'  },
  { id: 'f4', x: 28, y: 1,  rot:  10, delay: 1.5, dur: 2.1, type: 'folder' },
  { id: 'f5', x: 4,  y: 8,  rot: -45, delay: 0.8, dur: 2.4, type: 'doc'    },
  { id: 'f6', x: 32, y: 6,  rot:  25, delay: 1.2, dur: 1.8, type: 'sheet'  },
]

// Funnel mouth is approx at 28% x, 40% y
const FUNNEL = { x: 20, y: 38 }

export default function AdminPanelOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes fallFunnel_f1 { 0%{transform:translate(0,0) rotate(-15deg) scale(1);opacity:1} 75%{transform:translate(${FUNNEL.x-8}%,${FUNNEL.y-2}%) rotate(30deg) scale(0.5);opacity:0.6} 90%{transform:translate(${FUNNEL.x-5}%,${FUNNEL.y+4}%) rotate(60deg) scale(0.15);opacity:0} 91%{transform:translate(0,0) rotate(-15deg) scale(0);opacity:0} 100%{transform:translate(0,0) rotate(-15deg) scale(1);opacity:1} }
        @keyframes fallFunnel_f2 { 0%{transform:translate(0,0) rotate(20deg) scale(1);opacity:1} 75%{transform:translate(${FUNNEL.x-20}%,${FUNNEL.y-2}%) rotate(-20deg) scale(0.5);opacity:0.6} 90%{transform:translate(${FUNNEL.x-18}%,${FUNNEL.y+4}%) rotate(-50deg) scale(0.15);opacity:0} 91%{transform:translate(0,0) rotate(20deg) scale(0);opacity:0} 100%{transform:translate(0,0) rotate(20deg) scale(1);opacity:1} }
        @keyframes fallFunnel_f3 { 0%{transform:translate(0,0) rotate(-30deg) scale(1);opacity:1} 75%{transform:translate(${FUNNEL.x-14}%,${FUNNEL.y-5}%) rotate(40deg) scale(0.5);opacity:0.6} 90%{transform:translate(${FUNNEL.x-11}%,${FUNNEL.y+4}%) rotate(70deg) scale(0.15);opacity:0} 91%{transform:translate(0,0) rotate(-30deg) scale(0);opacity:0} 100%{transform:translate(0,0) rotate(-30deg) scale(1);opacity:1} }
        @keyframes fallFunnel_f4 { 0%{transform:translate(0,0) rotate(10deg) scale(1);opacity:1} 75%{transform:translate(${FUNNEL.x-28}%,${FUNNEL.y-1}%) rotate(-30deg) scale(0.5);opacity:0.6} 90%{transform:translate(${FUNNEL.x-24}%,${FUNNEL.y+4}%) rotate(-55deg) scale(0.15);opacity:0} 91%{transform:translate(0,0) rotate(10deg) scale(0);opacity:0} 100%{transform:translate(0,0) rotate(10deg) scale(1);opacity:1} }
        @keyframes fallFunnel_f5 { 0%{transform:translate(0,0) rotate(-45deg) scale(1);opacity:1} 75%{transform:translate(${FUNNEL.x-4}%,${FUNNEL.y-8}%) rotate(20deg) scale(0.5);opacity:0.6} 90%{transform:translate(${FUNNEL.x-2}%,${FUNNEL.y+4}%) rotate(45deg) scale(0.15);opacity:0} 91%{transform:translate(0,0) rotate(-45deg) scale(0);opacity:0} 100%{transform:translate(0,0) rotate(-45deg) scale(1);opacity:1} }
        @keyframes fallFunnel_f6 { 0%{transform:translate(0,0) rotate(25deg) scale(1);opacity:1} 75%{transform:translate(${FUNNEL.x-32}%,${FUNNEL.y-6}%) rotate(-40deg) scale(0.5);opacity:0.6} 90%{transform:translate(${FUNNEL.x-28}%,${FUNNEL.y+4}%) rotate(-65deg) scale(0.15);opacity:0} 91%{transform:translate(0,0) rotate(25deg) scale(0);opacity:0} 100%{transform:translate(0,0) rotate(25deg) scale(1);opacity:1} }
        @keyframes gearCW  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes gearCCW { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
      `}</style>

      {FILES.map(f => (
        <div key={f.id} style={{
          position: 'absolute',
          left: `${f.x}%`,
          top: `${f.y}%`,
          animation: `fallFunnel_${f.id} ${f.dur}s ${f.delay}s ease-in infinite`,
          transformOrigin: 'center',
        }}>
          {f.type === 'folder' && <FolderSVG />}
          {f.type === 'doc'    && <DocSVG />}
          {f.type === 'sheet'  && <SheetSVG />}
        </div>
      ))}

      {/* Gear 1 — big gear on machine ~28% x, 66% y */}
      <div style={{
        position: 'absolute', left: '24%', top: '62%',
        width: '9%', aspectRatio: '1',
        animation: 'gearCW 5s linear infinite',
        transformOrigin: 'center',
        opacity: 0.22,
      }}>
        <GearSVG />
      </div>

      {/* Gear 2 — smaller, meshing right ~33% x, 70% y */}
      <div style={{
        position: 'absolute', left: '31.5%', top: '68%',
        width: '6%', aspectRatio: '1',
        animation: 'gearCCW 3.3s linear infinite',
        transformOrigin: 'center',
        opacity: 0.22,
      }}>
        <GearSVG />
      </div>
    </div>
  )
}

function FolderSVG() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
      <path d="M1 3a1 1 0 011-1h5l2 2h9a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V3z" fill="#C9A84C" stroke="#111" strokeWidth="1.2"/>
    </svg>
  )
}

function DocSVG() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <rect x="1" y="1" width="14" height="18" rx="1" fill="#F5F0E8" stroke="#111" strokeWidth="1.2"/>
      <path d="M4 6h8M4 9h8M4 12h5" stroke="#111" strokeWidth="1" strokeLinecap="round"/>
      <path d="M10 1v4h4" fill="#C9A84C" stroke="#111" strokeWidth="1"/>
    </svg>
  )
}

function SheetSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="16" height="16" rx="1" fill="#F5F0E8" stroke="#111" strokeWidth="1.2"/>
      <path d="M1 6h16M1 11h16M7 1v16" stroke="#111" strokeWidth="1"/>
      <rect x="8" y="7" width="4" height="3" fill="#C9A84C" opacity="0.8"/>
    </svg>
  )
}

function GearSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
      <circle cx="12" cy="12" r="3" fill="#C9A84C"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="#C9A84C" strokeWidth="1.5"/>
    </svg>
  )
}
