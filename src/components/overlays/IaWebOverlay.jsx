// The eye in the center of the brain pulses/glows
// The USB cable connecting brain to monitor sways slightly
export default function IaWebOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes eyePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.7; }
        }
        @keyframes eyeGlow {
          0%, 100% { box-shadow: 0 0 0px 0px rgba(255,255,255,0); }
          50% { box-shadow: 0 0 12px 6px rgba(255,255,255,0.9); }
        }
        @keyframes cableSway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes brainPulse {
          0%, 100% { transform: scale(1) translateY(0px); }
          50% { transform: scale(1.015) translateY(-3px); }
        }
      `}</style>

      {/* Brain subtle float */}
      <div style={{
        position: 'absolute',
        left: '27%', top: '2%',
        width: '46%', height: '42%',
        animation: 'brainPulse 3s ease-in-out infinite',
      }} />

      {/* Eye glow — positioned over the eye in the brain center */}
      <div style={{
        position: 'absolute',
        left: '47.5%', top: '14%',
        width: '5%',
        aspectRatio: '1',
        borderRadius: '50%',
        background: 'white',
        animation: 'eyePulse 2s ease-in-out infinite, eyeGlow 2s ease-in-out infinite',
      }} />

      {/* Cable sway origin — the cable connects brain (~50% x, 42% y) to monitor top */}
      <div style={{
        position: 'absolute',
        left: '48%', top: '38%',
        width: '4%', height: '20%',
        transformOrigin: 'top center',
        animation: 'cableSway 2.5s ease-in-out infinite',
        background: 'transparent',
        // Just a visual pulse on the cable path
        borderLeft: '3px solid rgba(201,168,76,0.0)',
      }} />
    </div>
  )
}
