// Pegá la URL de Lemon Squeezy cuando la tengas disponible
const LEMON_URL = 'https://cvitaestudio.lemonsqueezy.com/buy/empty-state-generator'

function buildReactCode(config) {
  return `import EmptyState from './EmptyState'

export default function MyPage() {
  return (
    <EmptyState
      type="${config.stateId}"
      style="${config.style}"
      title="${config.title}"
      description="${config.desc}"
      animation="${config.animationId}"
      button="${config.buttonId}"
      primaryColor="${config.primaryColor}"
    />
  )
}`
}

export default function ExportModal({ config, onClose }) {
  const code = buildReactCode(config)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-cream border-[3px] border-black shadow-brutal w-full max-w-lg mx-4 p-8 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-4xl tracking-widest">EXPORT CODE</h2>
            <p className="font-body text-sm text-black/60 mt-1">Unlock the full component + all 16 states</p>
          </div>
          <button
            onClick={onClose}
            className="border-[3px] border-black px-3 py-1 font-body font-bold text-sm hover:bg-black hover:text-cream transition-none"
          >
            ✕
          </button>
        </div>

        {/* Code preview bloqueado */}
        <div className="relative">
          <pre className="bg-black text-cream/40 font-mono text-xs p-4 overflow-hidden max-h-36 select-none" style={{ filter: 'blur(2px)' }}>
            {code}
          </pre>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="font-display text-2xl text-cream tracking-widest bg-black/80 px-4 py-1">LOCKED</span>
            <span className="font-body text-xs text-cream/70">Purchase to unlock the full code</span>
          </div>
        </div>

        {/* Precio */}
        <div className="flex items-center justify-between border-[3px] border-black p-4">
          <div>
            <p className="font-display text-2xl leading-none">EMPTY STATE GENERATOR</p>
            <p className="font-body text-xs text-black/60 mt-1">React · Vue · Next.js · HTML — 16 states</p>
          </div>
          <div className="border-[3px] border-black px-4 py-2 bg-gold shadow-brutal-sm flex-shrink-0">
            <span className="font-display text-3xl">$12</span>
            <span className="font-body text-xs font-bold ml-1">USD</span>
          </div>
        </div>

        {/* CTA */}
        <a
          href={LEMON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center py-4 bg-black text-cream border-[3px] border-black font-body font-bold text-sm tracking-widest shadow-brutal hover:bg-gold hover:text-black hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-100"
        >
          UNLOCK FOR $12 →
        </a>

        <p className="font-body text-xs text-black/40 text-center">
          Entregado por Lemon Squeezy. Pago seguro con tarjeta o PayPal.
        </p>
      </div>
    </div>
  )
}
