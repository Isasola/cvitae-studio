const KEYFRAMES = `
  @keyframes esScene_float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes esScene_floatR   { 0%,100%{transform:translateY(0) rotate(-8deg)} 50%{transform:translateY(-7px) rotate(8deg)} }
  @keyframes esScene_shake    { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-4px)} 40%{transform:translateX(4px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)} }
  @keyframes esScene_pulse    { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
  @keyframes esScene_spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes esScene_spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes esScene_draw     { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }
  @keyframes esScene_fallIn   { 0%{transform:translateY(-20px);opacity:0} 60%{opacity:1} 100%{transform:translateY(0);opacity:1} }
  @keyframes esScene_scanLR   { 0%,100%{transform:translateX(-16px)} 50%{transform:translateX(16px)} }
  @keyframes esScene_blink    { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes esScene_wifiOut  { 0%{opacity:0.8} 40%{opacity:0.8} 100%{opacity:0} }
  @keyframes esScene_jiggle   { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} }
  @keyframes esScene_dot1     { 0%,60%,100%{opacity:0.2;transform:scale(0.7)} 20%{opacity:1;transform:scale(1)} }
  @keyframes esScene_dot2     { 0%,20%,80%,100%{opacity:0.2;transform:scale(0.7)} 40%{opacity:1;transform:scale(1)} }
  @keyframes esScene_dot3     { 0%,40%,100%{opacity:0.2;transform:scale(0.7)} 60%{opacity:1;transform:scale(1)} }
  @keyframes esScene_crown    { 0%,100%{transform:translateY(6px);opacity:0} 40%,70%{transform:translateY(0);opacity:1} }
  @keyframes esScene_cardIn   { 0%{transform:translateX(44px);opacity:0} 30%{transform:translateX(0);opacity:1} 70%{transform:translateX(0);opacity:1} 100%{transform:translateX(-44px);opacity:0} }
  @keyframes esScene_boxLid   { 0%,60%{transform:rotateX(0deg)} 80%,100%{transform:rotateX(-35deg)} }
  @keyframes esScene_launch   { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(-56px);opacity:0} }
  @keyframes esScene_pulseSm  { 0%,100%{opacity:0.4} 50%{opacity:1} }
`

function SceneNoData({ color }) {
  return (
    <div style={{ position: 'relative', width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="54" height="46" viewBox="0 0 54 46" fill="none" style={{ position: 'absolute', bottom: 2 }}>
        <rect x="2" y="12" width="50" height="32" rx="3" stroke={color} strokeWidth="2.5" fill="none"/>
        <path d="M2 12 L14 2 H40 L52 12" stroke={color} strokeWidth="2.5" fill="none"/>
      </svg>
      <div style={{ position: 'absolute', top: 2, animation: 'esScene_fallIn 2.2s ease-in-out infinite' }}>
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
          <path d="M3 2H14L18 7V22C18 23.1 17.1 24 16 24H3C1.9 24 1 23.1 1 22V4C1 2.9 1.9 2 3 2Z" stroke={color} strokeWidth="2" fill="none"/>
          <path d="M14 2L18 7H15C14.4 7 14 6.6 14 6V2Z" stroke={color} strokeWidth="1.5" fill="none"/>
          <line x1="5" y1="12" x2="13" y2="12" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
          <line x1="5" y1="16" x2="13" y2="16" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}

function SceneSearchEmpty({ color }) {
  return (
    <div style={{ position: 'relative', width: 76, height: 76 }}>
      {[14, 26, 38, 50].map((y, i) => (
        <div key={i} style={{
          position: 'absolute', left: 8, right: 8, top: y, height: 6,
          background: color, opacity: 0.1, borderRadius: 2,
        }}/>
      ))}
      <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', animation: 'esScene_scanLR 2.2s ease-in-out infinite' }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
          <circle cx="10" cy="10" r="7"/>
          <line x1="21" y1="21" x2="15.5" y2="15.5"/>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', fontFamily: 'monospace', fontSize: 9, color, opacity: 0.5, whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>
        0 results
      </div>
    </div>
  )
}

function SceneError({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'esScene_shake 1.8s ease-in-out infinite', animationDelay: '1s' }}>
        <svg width="60" height="56" viewBox="0 0 60 56" fill="none">
          <path d="M30 4L56 52H4Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
          <line x1="30" y1="20" x2="30" y2="36" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="30" cy="44" r="2.5" fill={color} style={{ animation: 'esScene_pulseSm 1s ease-in-out infinite' }}/>
        </svg>
      </div>
    </div>
  )
}

function SceneGhost({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'esScene_float 2.8s ease-in-out infinite' }}>
        <svg width="50" height="62" viewBox="0 0 50 62" fill="none">
          <path d="M4 22C4 11 12 2 25 2C38 2 46 11 46 22V58L40 52L34 58L28 52L22 58L16 52L10 58V22Z" stroke={color} strokeWidth="2.5" fill="none"/>
          <circle cx="17" cy="24" r="4" fill={color}/>
          <circle cx="33" cy="24" r="4" fill={color}/>
          <div style={{ animation: 'esScene_scanLR 3.2s ease-in-out infinite', display: 'contents' }}>
            <circle cx="19" cy="24" r="1.8" fill="white"/>
            <circle cx="35" cy="24" r="1.8" fill="white"/>
          </div>
        </svg>
      </div>
    </div>
  )
}

function SceneOffline({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 6 }}>
      <svg width="62" height="50" viewBox="0 0 62 50" fill="none">
        <path d="M4 32C4 15 14 4 31 4C48 4 58 15 58 32" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"
          style={{ animation: 'esScene_wifiOut 2s ease-in-out infinite', animationDelay: '0s' }}/>
        <path d="M12 36C12 24 20 15 31 15C42 15 50 24 50 36" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"
          style={{ animation: 'esScene_wifiOut 2s ease-in-out infinite', animationDelay: '0.35s' }}/>
        <path d="M20 40C20 33 25 28 31 28C37 28 42 33 42 40" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"
          style={{ animation: 'esScene_wifiOut 2s ease-in-out infinite', animationDelay: '0.7s' }}/>
        <circle cx="31" cy="46" r="3.5" fill={color}/>
        <line x1="6" y1="6" x2="56" y2="46" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    </div>
  )
}

function SceneLoading({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
        <circle cx="29" cy="29" r="25" stroke={color} strokeWidth="2.5" fill="none" opacity="0.2"/>
        <circle cx="29" cy="29" r="25" stroke={color} strokeWidth="2.5" fill="none"
          strokeDasharray="35 125" strokeLinecap="round"
          style={{ animation: 'esScene_spin 1.2s linear infinite', transformOrigin: '29px 29px' }}/>
        <line x1="29" y1="29" x2="29" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round"
          style={{ animation: 'esScene_spin 8s linear infinite', transformOrigin: '29px 29px' }}/>
        <line x1="29" y1="29" x2="42" y2="29" stroke={color} strokeWidth="2" strokeLinecap="round"
          style={{ animation: 'esScene_spin 1.2s linear infinite', transformOrigin: '29px 29px' }}/>
        <circle cx="29" cy="29" r="3" fill={color}/>
      </svg>
    </div>
  )
}

function SceneUnauthorized({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'esScene_jiggle 2s ease-in-out infinite' }}>
        <svg width="46" height="58" viewBox="0 0 46 58" fill="none">
          <path d="M8 24V16C8 7 38 7 38 16V24" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"
            style={{ animation: 'esScene_float 2s ease-in-out infinite', transformOrigin: '23px 15px' }}/>
          <rect x="2" y="24" width="42" height="32" rx="4" stroke={color} strokeWidth="2.5" fill="none"/>
          <circle cx="23" cy="36" r="5" stroke={color} strokeWidth="2" fill="none"/>
          <line x1="23" y1="41" x2="23" y2="48" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}

function SceneMaintenance({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'esScene_spinSlow 4s linear infinite', transformOrigin: 'center' }}>
        <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        </svg>
      </div>
    </div>
  )
}

function SceneSuccess({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 5, height: 5,
          borderRadius: '50%',
          background: color,
          transform: `rotate(${angle}deg) translateY(-30px)`,
          animation: 'esScene_pulse 1.8s ease-in-out infinite',
          animationDelay: `${i * 0.1}s`,
          opacity: 0.5,
        }}/>
      ))}
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="21" stroke={color} strokeWidth="2.5" fill="none"/>
        <path d="M13 25L21 33L37 17" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="60" strokeDashoffset="0"
          style={{ animation: 'esScene_draw 0.7s ease-out forwards' }}/>
      </svg>
    </div>
  )
}

function SceneFirstUse({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ animation: 'esScene_float 2.4s ease-in-out infinite' }}>
        <svg width="42" height="62" viewBox="0 0 42 62" fill="none">
          <path d="M21 4C21 4 34 15 34 32L21 44L8 32C8 15 21 4 21 4Z" stroke={color} strokeWidth="2.5" fill="none"/>
          <circle cx="21" cy="26" r="5" stroke={color} strokeWidth="2" fill="none"/>
          <path d="M8 32L3 44L12 41" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none"/>
          <path d="M34 32L39 44L30 41" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none"/>
          <path d="M15 44C15 44 18 52 21 57C24 52 27 44 27 44" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"
            style={{ animation: 'esScene_pulseSm 0.6s ease-in-out infinite' }} opacity="0.7"/>
        </svg>
      </div>
    </div>
  )
}

function SceneNoPayment({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ animation: 'esScene_cardIn 3.2s ease-in-out infinite' }}>
        <svg width="60" height="42" viewBox="0 0 60 42" fill="none">
          <rect x="2" y="2" width="56" height="38" rx="4" stroke={color} strokeWidth="2.5" fill="none"/>
          <line x1="2" y1="12" x2="58" y2="12" stroke={color} strokeWidth="2.5"/>
          <line x1="18" y1="22" x2="28" y2="34" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="28" y1="22" x2="18" y2="34" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="34" y="22" width="16" height="10" rx="2" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}

function SceneArchived({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 2 }}>
      <svg width="62" height="56" viewBox="0 0 62 56" fill="none">
        <rect x="4" y="22" width="54" height="30" rx="3" stroke={color} strokeWidth="2.5" fill="none"/>
        <path d="M4 22L4 8L58 8L58 22" stroke={color} strokeWidth="2.5" fill="none"
          style={{ animation: 'esScene_boxLid 3s ease-in-out infinite', transformOrigin: '31px 22px' }}/>
        <rect x="20" y="18" width="22" height="8" rx="2" fill={color} opacity="0.3"
          style={{ animation: 'esScene_pulse 3s ease-in-out infinite' }}/>
        <line x1="20" y1="18" x2="42" y2="18" stroke={color} strokeWidth="1.2" opacity="0.5"/>
        <line x1="20" y1="26" x2="42" y2="26" stroke={color} strokeWidth="1.2" opacity="0.5"/>
      </svg>
    </div>
  )
}

function SceneDeleted({ color }) {
  return (
    <div style={{ width: 76, height: 76, position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <svg width="46" height="44" viewBox="0 0 46 44" fill="none" style={{ position: 'absolute', bottom: 0 }}>
        <path d="M6 12L40 12L36 42H10Z" stroke={color} strokeWidth="2.5" fill="none"/>
        <line x1="2" y1="12" x2="44" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="6" x2="30" y2="6" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="20" x2="16" y2="36" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <line x1="23" y1="20" x2="23" y2="36" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <line x1="30" y1="20" x2="30" y2="36" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
      <div style={{ position: 'absolute', top: 0, animation: 'esScene_floatR 2.2s ease-in-out infinite' }}>
        <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
          <path d="M3 2H16L21 8V28C21 29.1 20.1 30 19 30H3C1.9 30 1 29.1 1 28V4C1 2.9 1.9 2 3 2Z" stroke={color} strokeWidth="2" fill="none"/>
          <path d="M16 2L21 8H18C16.9 8 16 7.1 16 6V2Z" stroke={color} strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
    </div>
  )
}

function SceneAIWaiting({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <svg width="46" height="32" viewBox="0 0 46 32" fill="none">
        <rect x="2" y="2" width="42" height="28" rx="4" stroke={color} strokeWidth="2" fill="none"/>
        <text x="9" y="21" fill={color} fontSize="12" fontFamily="monospace" fontWeight="bold" opacity="0.85">AI</text>
        <line x1="30" y1="8" x2="30" y2="22" stroke={color} strokeWidth="2.2" strokeLinecap="round"
          style={{ animation: 'esScene_blink 1s step-start infinite' }}/>
      </svg>
      <div style={{ display: 'flex', gap: 7 }}>
        {[
          'esScene_dot1 1.5s ease-in-out infinite',
          'esScene_dot2 1.5s ease-in-out infinite',
          'esScene_dot3 1.5s ease-in-out infinite',
        ].map((anim, i) => (
          <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: color, animation: anim }}/>
        ))}
      </div>
    </div>
  )
}

function SceneUpgrade({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <svg width="38" height="22" viewBox="0 0 38 22" fill="none"
        style={{ position: 'absolute', top: 2, animation: 'esScene_crown 2.6s ease-in-out infinite' }}>
        <path d="M2 20L8 6L19 14L30 2L36 14L38 20Z" stroke={color} strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
        <line x1="2" y1="20" x2="36" y2="20" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
      <div style={{ animation: 'esScene_pulse 1.8s ease-in-out infinite', marginTop: 14 }}>
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>
    </div>
  )
}

function SceneTrialEnded({ color }) {
  return (
    <div style={{ width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="44" height="66" viewBox="0 0 44 66" fill="none">
        <line x1="2" y1="4" x2="42" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="2" y1="62" x2="42" y2="62" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M4 4L40 4L22 33L40 62L4 62L22 33Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
        <path d="M10 10L22 26L34 10Z" fill={color} opacity="0.25"/>
        <path d="M10 56L22 40L34 56Z" fill={color} opacity="0.55"/>
        <circle cx="22" cy="33" r="2.5" fill={color} style={{ animation: 'esScene_pulseSm 1.1s ease-in-out infinite' }}/>
      </svg>
    </div>
  )
}

const SCENE_MAP = {
  'no-data':      SceneNoData,
  'search-empty': SceneSearchEmpty,
  'error':        SceneError,
  '404':          SceneGhost,
  'offline':      SceneOffline,
  'loading':      SceneLoading,
  'unauthorized': SceneUnauthorized,
  'maintenance':  SceneMaintenance,
  'success':      SceneSuccess,
  'first-use':    SceneFirstUse,
  'no-payment':   SceneNoPayment,
  'archived':     SceneArchived,
  'deleted':      SceneDeleted,
  'ai-waiting':   SceneAIWaiting,
  'upgrade':      SceneUpgrade,
  'trial-ended':  SceneTrialEnded,
}

export default function EmptyStateScene({ stateId, primaryColor, style }) {
  const darkStyles = ['dark', 'vercel', 'linear', 'glass']
  const fallback = darkStyles.includes(style) ? '#ffffff' : '#111111'
  const color = (primaryColor && primaryColor !== '#111111') ? primaryColor : fallback
  const Scene = SCENE_MAP[stateId] || SceneNoData

  return (
    <>
      <style>{KEYFRAMES}</style>
      <Scene color={color} />
    </>
  )
}
