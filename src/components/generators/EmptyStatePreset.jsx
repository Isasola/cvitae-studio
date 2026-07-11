import EmptyStateScene from './EmptyStateScene.jsx'
import { BUTTONS } from './emptyStateConfig.js'

const STYLE_TOKENS = {
  minimal: {
    wrapper: 'bg-white border border-gray-200',
    title: 'text-gray-900 font-semibold',
    desc: 'text-gray-500',
    btn: 'bg-gray-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-700',
    btnOverride: false,
  },
  neobrutalism: {
    wrapper: 'bg-[#F5F0E8] border-[3px] border-black shadow-[6px_6px_0px_0px_#111111]',
    title: 'text-black font-display tracking-wider uppercase',
    desc: 'text-black/70 font-body',
    btn: 'bg-black text-[#F5F0E8] border-[3px] border-black px-4 py-2 text-sm font-bold tracking-wide shadow-[4px_4px_0px_0px_#C9A84C] hover:bg-[#C9A84C] hover:text-black',
    btnOverride: true,
  },
  glass: {
    wrapper: 'bg-white/20 backdrop-blur-md border border-white/40 shadow-lg',
    title: 'text-white font-semibold',
    desc: 'text-white/60',
    btn: 'bg-white/20 text-white border border-white/40 rounded-lg px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/30',
    btnOverride: false,
  },
  corporate: {
    wrapper: 'bg-gray-50 border border-gray-300',
    title: 'text-gray-800 font-bold',
    desc: 'text-gray-500 text-sm',
    btn: 'bg-blue-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-blue-700',
    btnOverride: true,
  },
  dark: {
    wrapper: 'bg-[#0f0f0f] border border-white/10',
    title: 'text-white font-semibold',
    desc: 'text-white/40',
    btn: 'bg-white/10 text-white border border-white/20 rounded-md px-4 py-2 text-sm hover:bg-white/20',
    btnOverride: false,
  },
  stripe: {
    wrapper: 'bg-white border border-[#e0e0e0] shadow-sm',
    title: 'text-[#30313d] font-semibold',
    desc: 'text-[#6b7280] text-sm',
    btn: 'bg-[#635bff] text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-[#5144e0]',
    btnOverride: true,
  },
  linear: {
    wrapper: 'bg-[#1a1a2e] border border-white/10',
    title: 'text-white font-medium',
    desc: 'text-white/40 text-sm',
    btn: 'bg-[#5e6ad2] text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-[#4f5bbf]',
    btnOverride: true,
  },
  vercel: {
    wrapper: 'bg-black border border-white/10',
    title: 'text-white font-semibold',
    desc: 'text-white/40 text-sm',
    btn: 'bg-white text-black rounded-md px-4 py-2 text-sm font-semibold hover:bg-white/90',
    btnOverride: false,
  },
}

const BUTTONS_MAP = Object.fromEntries(BUTTONS.map(b => [b.id, b.label]))

export default function EmptyStatePreset({ stateId, style = 'minimal', primaryColor, animationId = 'none', buttonId = 'retry', title, desc }) {
  const tokens = STYLE_TOKENS[style] || STYLE_TOKENS.minimal
  const btnStyle = (primaryColor && tokens.btnOverride)
    ? { backgroundColor: primaryColor, borderColor: primaryColor }
    : {}

  return (
    <div className={`flex flex-col items-center justify-center text-center p-10 gap-4 ${tokens.wrapper}`}>
      <EmptyStateScene stateId={stateId} primaryColor={primaryColor} style={style} />

      <h3 className={`text-xl ${tokens.title}`} style={primaryColor ? { color: primaryColor } : {}}>
        {title}
      </h3>

      <p className={`max-w-xs ${tokens.desc}`}>{desc}</p>

      {buttonId !== 'none' && (
        <button className={tokens.btn} style={btnStyle}>
          {BUTTONS_MAP[buttonId] || 'Try Again'}
        </button>
      )}
    </div>
  )
}
