import EmptyStatePreset from './EmptyStatePreset.jsx'

const PREVIEW_BACKGROUNDS = {
  minimal:      'bg-gray-100',
  neobrutalism: 'bg-[#F5F0E8]',
  glass:        'bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400',
  corporate:    'bg-gray-50',
  dark:         'bg-[#111111]',
  stripe:       'bg-white',
  linear:       'bg-[#0f0f1a]',
  vercel:       'bg-[#0a0a0a]',
}

const ALL_STATE_IDS = ['no-data','search-empty','error','404','offline','loading','unauthorized','maintenance','success','first-use','no-payment','archived','deleted','ai-waiting','upgrade','trial-ended']
const ALL_STYLE_IDS = ['minimal','neobrutalism','glass','corporate','dark','stripe','linear','vercel']
const ALL_ANIM_IDS  = ['none','fade','bounce','float','pulse','scale']

export default function PreviewCanvas({ config, onExport }) {
  const bg = PREVIEW_BACKGROUNDS[config.style] || 'bg-gray-100'

  function handleRandomize() {
    const stateId    = ALL_STATE_IDS[Math.floor(Math.random() * ALL_STATE_IDS.length)]
    const style      = ALL_STYLE_IDS[Math.floor(Math.random() * ALL_STYLE_IDS.length)]
    const animationId = ALL_ANIM_IDS[Math.floor(Math.random() * ALL_ANIM_IDS.length)]
    window.dispatchEvent(new CustomEvent('generator:randomize', { detail: { stateId, style, animationId } }))
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Label */}
      <div className="flex items-center gap-3">
        <span className="font-display text-base tracking-widest text-black/50">LIVE PREVIEW</span>
        <div className="flex-1 h-[2px] bg-black/10" />
        <span className="font-body text-xs text-black/40 uppercase tracking-widest">
          {config.stateId} / {config.style}
        </span>
      </div>

      {/* Canvas */}
      <div className={`flex-1 min-h-[320px] flex items-center justify-center border-[3px] border-black ${bg}`}>
        <div className="w-full max-w-sm">
          <EmptyStatePreset
            stateId={config.stateId}
            style={config.style}
            primaryColor={config.primaryColor}
            animationId={config.animationId}
            buttonId={config.buttonId}
            title={config.title}
            desc={config.desc}
          />
        </div>
      </div>

      {/* Acciones */}
      <div className="flex gap-0">
        <button
          onClick={onExport}
          className="flex-1 py-4 bg-black text-cream border-[3px] border-black font-body font-bold text-sm tracking-widest shadow-brutal hover:bg-gold hover:text-black hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-100"
        >
          EXPORT CODE →
        </button>
        <button
          onClick={handleRandomize}
          title="Variación aleatoria"
          className="-ml-[3px] px-6 py-4 bg-cream text-black border-[3px] border-black font-body font-bold text-sm tracking-wide hover:bg-black hover:text-cream transition-none"
        >
          🎲
        </button>
      </div>
    </div>
  )
}
