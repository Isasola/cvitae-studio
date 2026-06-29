// Stars rain down from the neck of the hourglass toward the people below
// A few stars orbit/twinkle independently

const RAIN_STARS = [
  { id: 's1', x: 44, startY: 42, delay: 0,    dur: 1.6 },
  { id: 's2', x: 50, startY: 42, delay: 0.3,  dur: 1.8 },
  { id: 's3', x: 47, startY: 44, delay: 0.7,  dur: 1.5 },
  { id: 's4', x: 53, startY: 43, delay: 1.1,  dur: 1.9 },
  { id: 's5', x: 41, startY: 45, delay: 1.4,  dur: 1.7 },
  { id: 's6', x: 56, startY: 42, delay: 0.9,  dur: 1.6 },
]

// Static stars in the bottom chamber that twinkle
const TWINKLE_STARS = [
  { id: 't1', x: 36, y: 60, delay: 0    },
  { id: 't2', x: 58, y: 55, delay: 0.4  },
  { id: 't3', x: 44, y: 72, delay: 0.8  },
  { id: 't4', x: 62, y: 68, delay: 1.2  },
  { id: 't5', x: 38, y: 78, delay: 1.6  },
  { id: 't6', x: 55, y: 80, delay: 0.6  },
]

export default function LoadersOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes starRain {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          80%  { transform: translateY(30%) scale(0.6); opacity: 0.7; }
          100% { transform: translateY(38%) scale(0.2); opacity: 0; }
        }
        @keyframes starTwinkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
          50% { transform: scale(1.5) rotate(20deg); opacity: 0.4; }
        }
      `}</style>

      {/* Stars falling from neck */}
      {RAIN_STARS.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`,
          top: `${s.startY}%`,
          animation: `starRain ${s.dur}s ${s.delay}s ease-in infinite`,
        }}>
          <StarSVG size={10} />
        </div>
      ))}

      {/* Static twinkling stars in bottom chamber */}
      {TWINKLE_STARS.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`,
          top: `${s.y}%`,
          animation: `starTwinkle 1.8s ${s.delay}s ease-in-out infinite`,
        }}>
          <StarSVG size={8} />
        </div>
      ))}
    </div>
  )
}

function StarSVG({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#C9A84C">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  )
}
