// Lego block flies toward the screen slot from left
// Terminal lines blink one by one (LOADING MODULE, VALIDATING, etc.)

const TERMINAL_LINES = [
  { id: 'l1', text: '> LOADING MODULE...', top: '20%', delay: 0 },
  { id: 'l2', text: '> VALIDATING...',     top: '28%', delay: 0.6 },
  { id: 'l3', text: '> DEPENDENCIES OK',   top: '36%', delay: 1.2 },
  { id: 'l4', text: '> COMPATIBILITY OK',  top: '44%', delay: 1.8 },
  { id: 'l5', text: '> INTEGRATING...',    top: '52%', delay: 2.4 },
  { id: 'l6', text: '> OPTIMIZING...',     top: '60%', delay: 3.0 },
  { id: 'l7', text: '> DONE.',             top: '68%', delay: 3.6 },
]

export default function ComponentesUIOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes legoFly {
          0%   { transform: translateX(0) scale(1); opacity: 1; }
          55%  { transform: translateX(18%) scale(0.9); opacity: 1; }
          75%  { transform: translateX(30%) scale(0.75); opacity: 0.6; }
          90%  { transform: translateX(38%) scale(0.4); opacity: 0; }
          91%  { transform: translateX(0) scale(0); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes termBlink {
          0%, 100% { opacity: 1; }
          45%, 55% { opacity: 0; }
        }
        @keyframes sparkBurst {
          0%   { transform: scale(0); opacity: 1; }
          50%  { transform: scale(1.4); opacity: 0.8; }
          100% { transform: scale(0); opacity: 0; }
        }
      `}</style>

      {/* Lego flies right toward slot at ~62% x */}
      <div style={{
        position: 'absolute',
        left: '5%', top: '30%',
        width: '22%',
        animation: 'legoFly 2.8s ease-in-out infinite',
      }}>
        {/* Subtle gold shimmer bar over lego */}
        <div style={{
          width: '100%', height: '3px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)',
          marginBottom: 4,
          animation: 'termBlink 2.8s 1.4s ease-in-out infinite',
        }}/>
      </div>

      {/* Spark burst at slot entry ~63% x, 48% y */}
      <div style={{
        position: 'absolute',
        left: '60%', top: '38%',
        width: '6%',
        aspectRatio: '1',
        animation: 'sparkBurst 2.8s 1.8s ease-out infinite',
      }}>
        <SparkSVG />
      </div>

      {/* Terminal lines blinking */}
      {TERMINAL_LINES.map(line => (
        <div key={line.id} style={{
          position: 'absolute',
          left: '56%',
          top: line.top,
          fontSize: '0.55vw',
          fontFamily: 'monospace',
          color: '#C9A84C',
          letterSpacing: '0.05em',
          animation: `termBlink 1.6s ${line.delay}s ease-in-out infinite`,
          textShadow: '0 0 6px rgba(201,168,76,0.8)',
        }}>
          {line.text}
        </div>
      ))}
    </div>
  )
}

function SparkSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
      <line x1="12" y1="2"  x2="12" y2="6"  stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="18" x2="12" y2="22" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      <line x1="2"  y1="12" x2="6"  y2="12" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="12" x2="22" y2="12" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      <line x1="4.9"  y1="4.9"  x2="7.8"  y2="7.8"  stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16.2" y1="16.2" x2="19.1" y2="19.1" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      <line x1="19.1" y1="4.9"  x2="16.2" y2="7.8"  stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      <line x1="7.8"  y1="16.2" x2="4.9"  y2="19.1" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
