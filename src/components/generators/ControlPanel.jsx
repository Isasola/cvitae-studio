import { STATES, STYLES, ANIMATIONS, BUTTONS, FRAMEWORKS } from './emptyStateConfig.js'

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="font-display text-base tracking-widest">{children}</span>
      <div className="flex-1 h-[2px] bg-black/20" />
    </div>
  )
}

function PillGrid({ items, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-0">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`px-3 py-1.5 border-[2px] border-black -mt-[2px] -ml-[2px] font-body text-xs font-semibold tracking-wide transition-none
            ${value === item.id ? 'bg-black text-cream' : 'bg-cream text-black hover:bg-black/10'}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default function ControlPanel({ config, onChange }) {
  return (
    <div className="flex flex-col gap-6 font-body">

      <div>
        <SectionLabel>01 — STATE TYPE</SectionLabel>
        <PillGrid items={STATES} value={config.stateId} onChange={(v) => onChange('stateId', v)} />
      </div>

      <div>
        <SectionLabel>02 — VISUAL STYLE</SectionLabel>
        <PillGrid items={STYLES} value={config.style} onChange={(v) => onChange('style', v)} />
      </div>

      <div>
        <SectionLabel>03 — ANIMATION</SectionLabel>
        <PillGrid items={ANIMATIONS} value={config.animationId} onChange={(v) => onChange('animationId', v)} />
      </div>

      <div>
        <SectionLabel>04 — BUTTON</SectionLabel>
        <PillGrid items={BUTTONS} value={config.buttonId} onChange={(v) => onChange('buttonId', v)} />
      </div>

      <div>
        <SectionLabel>05 — PRIMARY COLOR</SectionLabel>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.primaryColor}
            onChange={(e) => onChange('primaryColor', e.target.value)}
            className="w-12 h-10 border-[3px] border-black cursor-pointer bg-cream p-0.5"
          />
          <input
            type="text"
            value={config.primaryColor}
            onChange={(e) => onChange('primaryColor', e.target.value)}
            className="flex-1 px-3 py-2 border-[3px] border-black bg-cream font-body text-sm font-semibold tracking-widest uppercase focus:outline-none focus:bg-black focus:text-cream"
          />
        </div>
      </div>

      <div>
        <SectionLabel>06 — CUSTOM TEXT</SectionLabel>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={config.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Title"
            className="px-3 py-2 border-[3px] border-black bg-cream font-body text-sm font-semibold focus:outline-none focus:bg-black focus:text-cream placeholder:text-black/30"
          />
          <input
            type="text"
            value={config.desc}
            onChange={(e) => onChange('desc', e.target.value)}
            placeholder="Description"
            className="px-3 py-2 border-[3px] border-black bg-cream font-body text-sm focus:outline-none focus:bg-black focus:text-cream placeholder:text-black/30"
          />
        </div>
      </div>

      <div>
        <SectionLabel>07 — EXPORT AS</SectionLabel>
        <PillGrid items={FRAMEWORKS} value={config.framework} onChange={(v) => onChange('framework', v)} />
      </div>

    </div>
  )
}
