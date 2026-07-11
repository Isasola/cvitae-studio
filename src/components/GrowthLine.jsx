let _uid = 0

export default function GrowthLine({
  className = '',
  style,
  variant = 'decorative',
  color = '#C9A84C',
  glowColor = '#e8d080',
}) {
  const uid = `gl${++_uid}`
  const d = 'M 8 92 C 70 88, 110 70, 150 75 S 250 95, 310 60 S 420 25, 480 35 S 580 70, 640 28 S 760 8, 792 14'
  const sw = variant === 'hero' ? 3 : variant === 'score' ? 2.5 : 1.5
  const glowDash = variant === 'hero' ? '200 960' : '150 960'
  const dur = variant === 'hero' ? '4s' : '3.5s'

  return (
    <svg
      viewBox="0 0 800 100"
      preserveAspectRatio="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`cg-${uid}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"   stopColor={color}     stopOpacity="0" />
          <stop offset="20%"  stopColor={color}     stopOpacity={variant === 'decorative' ? '0.5' : '0.85'} />
          <stop offset="80%"  stopColor={glowColor} stopOpacity={variant === 'decorative' ? '0.85' : '1'} />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
        </linearGradient>
        <filter id={`gf-${uid}`} x="-30%" y="-400%" width="160%" height="900%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Línea base — respira */}
      <path
        d={d}
        fill="none"
        stroke={`url(#cg-${uid})`}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="opacity"
          values="0.45;0.9;0.45"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Spot viajero con glow */}
      <path
        d={d}
        fill="none"
        stroke={glowColor}
        strokeWidth={variant === 'hero' ? 7 : variant === 'score' ? 5 : 3.5}
        strokeLinecap="round"
        strokeDasharray={glowDash}
        filter={`url(#gf-${uid})`}
      >
        <animate
          attributeName="stroke-dashoffset"
          from="1110"
          to="-150"
          dur={dur}
          repeatCount="indefinite"
          calcMode="linear"
        />
        <animate
          attributeName="opacity"
          values="0;0.95;0.95;0"
          keyTimes="0;0.04;0.96;1"
          dur={dur}
          repeatCount="indefinite"
          calcMode="linear"
        />
      </path>

      {/* Círculo pulsante al final (score + hero) */}
      {(variant === 'score' || variant === 'hero') && (
        <circle cx="792" cy="14" r="4" fill={glowColor}>
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          <animate attributeName="r"       values="3;5;3"     dur="2s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  )
}
