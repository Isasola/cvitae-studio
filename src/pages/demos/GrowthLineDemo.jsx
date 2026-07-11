import { useState } from 'react'
import { Link } from 'react-router-dom'
import GrowthLine from '../../components/GrowthLine.jsx'

const PRESETS = [
  { label: 'Gold',    color: '#C9A84C', glow: '#e8d080' },
  { label: 'Purple',  color: '#8b5cf6', glow: '#c4b5fd' },
  { label: 'Cyan',    color: '#06b6d4', glow: '#a5f3fc' },
  { label: 'Rose',    color: '#f43f5e', glow: '#fda4af' },
  { label: 'Emerald', color: '#10b981', glow: '#6ee7b7' },
  { label: 'Orange',  color: '#f97316', glow: '#fdba74' },
]

export default function GrowthLineDemo() {
  const [variant, setVariant]         = useState('hero')
  const [presetIdx, setPresetIdx]     = useState(0)
  const [customColor, setCustomColor] = useState('')
  const [bgDark, setBgDark]           = useState(true)

  const preset = PRESETS[presetIdx]
  const color  = customColor || preset.color
  const glow   = customColor || preset.glow

  return (
    <div className="min-h-screen bg-black text-cream">
      {/* Nav */}
      <div className="border-b-[3px] border-gold px-6 py-4 flex items-center justify-between">
        <Link to="/components" className="font-body text-xs font-bold tracking-widest text-gold/60 hover:text-gold transition-colors">
          ← COMPONENTS
        </Link>
        <span className="font-body text-xs tracking-widest text-gold/40">LIVE DEMO</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="font-body text-xs font-bold tracking-[0.3em] text-gold mb-3">CVITAE STUDIO — COMPONENT</p>
          <h1 className="font-display text-6xl md:text-8xl leading-none mb-4">GROWTH<br/>LINE</h1>
          <p className="font-body text-base text-cream/60 max-w-lg">
            Una línea SVG orgánica con un punto de luz que la recorre en loop. Sin librerías.
            Funciona en cualquier fondo — dark, light, glass.
          </p>
          <div className="flex flex-wrap gap-0 mt-4">
            {['Zero dependencies', 'Pure SVG', 'React + HTML', 'Customizable'].map((tag) => (
              <span key={tag} className="-ml-[2px] first:ml-0 px-3 py-1 border-[2px] border-gold/40 font-body text-xs font-bold tracking-wide text-gold/70">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Demo principal */}
        <div className="border-[3px] border-gold shadow-brutal-gold bg-black mb-10">
          <div className="px-6 pt-6 pb-2">
            <p className="font-body text-xs tracking-[0.3em] text-gold/40">LIVE PREVIEW</p>
          </div>
          <div
            className="mx-6 mb-6 border-[2px] border-gold/20 flex items-center justify-center p-8 transition-colors duration-300"
            style={{ backgroundColor: bgDark ? '#0a0a0a' : '#f5f5f5' }}
          >
            <GrowthLine
              className="w-full"
              style={{ height: variant === 'hero' ? 80 : 60 }}
              variant={variant}
              color={color}
              glowColor={glow}
            />
          </div>
        </div>

        {/* Variantes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[3px] border-gold/30 mb-10">
          {[
            { id: 'decorative', label: 'Decorative', desc: 'Separador de sección. Línea fina, semitransparente.' },
            { id: 'score',      label: 'Score',      desc: 'Con punto pulsante al final. Para métricas o KPIs.' },
            { id: 'hero',       label: 'Hero',       desc: 'Spot más grande, más brillo. Para headers y heros.' },
          ].map((v, i) => (
            <div
              key={v.id}
              className={`p-6 bg-black cursor-pointer transition-colors ${variant === v.id ? 'bg-gold/10' : 'hover:bg-white/5'} ${i < 2 ? 'border-b-[2px] md:border-b-0 md:border-r-[2px] border-gold/20' : ''}`}
              onClick={() => setVariant(v.id)}
            >
              <div className="mb-3">
                <GrowthLine className="w-full h-8" variant={v.id} color={color} glowColor={glow} />
              </div>
              <p className="font-display text-lg text-gold">{v.label}</p>
              <p className="font-body text-xs text-cream/40 mt-1">{v.desc}</p>
              {variant === v.id && (
                <span className="inline-block mt-2 font-body text-[10px] font-bold tracking-widest text-gold border-[1px] border-gold px-2 py-0.5">SELECTED</span>
              )}
            </div>
          ))}
        </div>

        {/* TRY IT — YOUR BRAND */}
        <div className="border-[3px] border-gold mb-12">
          <div className="border-b-[3px] border-gold px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-4xl text-gold leading-none">TRY IT — YOUR BRAND</h2>
              <p className="font-body text-xs text-cream/40 mt-1">Cambiá el color, el fondo, la variante. Lo ves en tiempo real.</p>
            </div>
            <span className="font-body text-xs text-gold/40 border-[2px] border-gold/40 px-3 py-1 flex-shrink-0">FREE PREVIEW</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Controles */}
            <div className="p-8 border-b-[3px] md:border-b-0 md:border-r-[3px] border-gold/30 flex flex-col gap-6">

              {/* Variante */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">01 — VARIANT</p>
                <div className="flex gap-0">
                  {['decorative', 'score', 'hero'].map(v => (
                    <button key={v} onClick={() => setVariant(v)}
                      className={`flex-1 py-2 border-[2px] border-gold/40 -ml-[2px] first:ml-0 font-body text-xs font-bold tracking-wide transition-none capitalize
                        ${variant === v ? 'bg-gold text-black border-gold' : 'bg-black text-gold/60 hover:text-gold'}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Presets de color */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">02 — COLOR PRESET</p>
                <div className="flex gap-0 flex-wrap">
                  {PRESETS.map((p, i) => (
                    <button key={p.label} onClick={() => { setPresetIdx(i); setCustomColor('') }}
                      className={`px-3 py-1.5 border-[2px] border-gold/30 -ml-[2px] first:ml-0 font-body text-xs font-semibold transition-none
                        ${presetIdx === i && !customColor ? 'bg-gold/20 border-gold text-gold' : 'bg-black text-gold/50 hover:text-gold'}`}>
                      <span className="inline-block w-3 h-3 rounded-full mr-1.5 align-middle" style={{ background: p.color }} />
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color personalizado */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">03 — CUSTOM COLOR</p>
                <div className="flex items-center gap-3">
                  <input type="color" value={customColor || preset.color}
                    onChange={e => setCustomColor(e.target.value)}
                    className="w-12 h-10 border-[2px] border-gold/40 cursor-pointer bg-black p-0.5" />
                  <input type="text" value={customColor || preset.color}
                    onChange={e => setCustomColor(e.target.value)}
                    className="flex-1 px-3 py-2 bg-black border-[2px] border-gold/30 font-mono text-xs text-cream/70 focus:outline-none focus:border-gold uppercase" />
                  {customColor && (
                    <button onClick={() => setCustomColor('')}
                      className="font-body text-xs text-gold/40 hover:text-gold">reset</button>
                  )}
                </div>
              </div>

              {/* Fondo */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">04 — BACKGROUND</p>
                <div className="flex gap-0">
                  {[{ label: 'Dark', dark: true }, { label: 'Light', dark: false }].map(b => (
                    <button key={b.label} onClick={() => setBgDark(b.dark)}
                      className={`flex-1 py-2 border-[2px] border-gold/40 -ml-[2px] first:ml-0 font-body text-xs font-bold tracking-wide transition-none
                        ${bgDark === b.dark ? 'bg-gold text-black border-gold' : 'bg-black text-gold/60 hover:text-gold'}`}>
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview en vivo */}
            <div className="p-8 flex flex-col gap-4 items-center justify-center">
              <p className="font-body text-xs tracking-widest text-gold/30">LIVE PREVIEW</p>
              <div className="w-full border-[2px] border-gold/20 p-6 flex flex-col gap-4 transition-colors duration-300"
                style={{ backgroundColor: bgDark ? '#0a0a0a' : '#f5f5f5' }}>
                <GrowthLine className="w-full h-16" variant={variant} color={color} glowColor={glow} />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-3 w-24 rounded-sm" style={{ background: bgDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                    <div className="h-2 w-16 rounded-sm mt-1.5" style={{ background: bgDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }} />
                  </div>
                  <div className="h-8 w-20 rounded-sm" style={{ background: color, opacity: 0.25 }} />
                </div>
              </div>
              <p className="font-body text-xs text-gold/30 text-center">
                Así se ve en una sección real de tu app
              </p>
            </div>
          </div>
        </div>

        {/* WHERE TO USE IT */}
        <div className="border-[3px] border-gold/20 mb-12">
          <div className="px-8 py-5 border-b-[3px] border-gold/20">
            <h2 className="font-display text-3xl text-gold tracking-widest">WHERE TO USE IT</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              { title: 'Separador de sección', desc: 'Entre el hero y la siguiente sección. Reemplaza el <hr> aburrido.' },
              { title: 'Header de dashboard', desc: 'Debajo del nombre de la app. Da sensación de "sistema vivo".' },
              { title: 'Card de métricas', desc: 'Debajo de un número KPI. "Tu empleabilidad subió un 12%."' },
              { title: 'Footer decorativo', desc: 'Borde superior del footer. Cierra la página con movimiento.' },
              { title: 'SaaS / fintech', desc: 'En cualquier pantalla que muestre crecimiento, progreso o tendencias.' },
              { title: 'Portfolio / landing', desc: 'Elemento ambient que hace que la página se sienta diseñada.' },
            ].map(({ title, desc }, i) => (
              <div key={title} className={`p-5 ${i % 2 === 0 ? 'border-r-[2px] border-gold/10' : ''} ${i < 4 ? 'border-b-[2px] border-gold/10' : ''}`}>
                <p className="font-display text-lg text-gold">{title}</p>
                <p className="font-body text-xs text-cream/40 mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who is it for */}
        <div className="border-[3px] border-gold/30 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-6 border-b-[3px] md:border-b-0 md:border-r-[3px] border-gold/20">
              <p className="font-display text-xl text-gold mb-4 tracking-widest">MADE FOR YOU IF...</p>
              {[
                'Trabajás con React, Next.js o Vue — con o sin IA',
                'Querés un elemento visual que nadie más tiene',
                'Tu app necesita sentirse "viva", no estática',
                'Tu proyecto tiene una carpeta /components',
              ].map(t => (
                <div key={t} className="flex items-start gap-2 mb-2">
                  <span className="text-gold font-bold text-sm mt-0.5">✓</span>
                  <p className="font-body text-sm text-cream/70">{t}</p>
                </div>
              ))}
            </div>
            <div className="p-6">
              <p className="font-display text-xl text-cream/30 mb-4 tracking-widest">NOT COMPATIBLE WITH</p>
              {[
                'WordPress, Shopify, Squarespace, Wix',
                'Constructores no-code o low-code',
                'Proyectos sin entorno JavaScript moderno',
              ].map(t => (
                <div key={t} className="flex items-start gap-2 mb-2">
                  <span className="text-cream/30 font-bold text-sm mt-0.5">✗</span>
                  <p className="font-body text-sm text-cream/30">{t}</p>
                </div>
              ))}
              <p className="font-body text-xs text-cream/20 mt-4 leading-relaxed">
                SVG puro — cero dependencias. Si usás React, Next.js o Vue, funciona sin instalar nada extra.
              </p>
            </div>
          </div>
        </div>

        {/* HOW TO USE IT */}
        <div className="border-[3px] border-gold/20 mb-12">
          <div className="px-8 py-5 border-b-[3px] border-gold/20">
            <h2 className="font-display text-3xl text-gold tracking-widest leading-none">HOW TO USE IT</h2>
            <p className="font-body text-xs text-cream/40 mt-1">Tres pasos. Menos de 2 minutos — seas dev o vibecoder.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                num: '01', title: 'COMPRÁS',
                body: 'Recibís un ZIP con GrowthLine.jsx — el componente completo, sin dependencias externas.',
                code: null,
              },
              {
                num: '02', title: 'COPIÁS',
                body: 'Copiás el archivo en tu carpeta components. Listo.',
                code: 'tu-proyecto/\n  src/\n    components/\n      GrowthLine.jsx  ← acá',
              },
              {
                num: '03', title: 'USÁS',
                body: 'Lo importás donde lo necesitás. Podés pedirle a tu IA que lo adapte a tu paleta.',
                code: "import GrowthLine\n  from './components/GrowthLine'\n\n// Separador de sección:\n<GrowthLine\n  className=\"w-full h-12\"\n  variant=\"decorative\"\n  color=\"#your-color\"\n/>",
              },
            ].map((step, i) => (
              <div key={step.num} className={`p-6 ${i < 2 ? 'border-b-[2px] md:border-b-0 md:border-r-[2px] border-gold/10' : ''}`}>
                <span className="font-display text-4xl text-gold/40">{step.num}</span>
                <h3 className="font-display text-xl text-gold tracking-widest mt-1 mb-2">{step.title}</h3>
                <p className="font-body text-xs text-cream/50 leading-relaxed mb-3">{step.body}</p>
                {step.code && (
                  <pre className="font-mono text-[10px] text-gold/50 bg-white/5 p-3 leading-relaxed overflow-x-auto">{step.code}</pre>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-[3px] border-gold bg-gold/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-3xl text-gold">$9 USD</p>
            <p className="font-body text-sm text-cream/60 mt-1">One-time. Use in unlimited projects.</p>
          </div>
          <div className="flex gap-0">
            <a href="https://wa.me/595992954169" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 bg-gold text-black border-[3px] border-gold font-body font-bold text-sm tracking-wide hover:bg-cream transition-colors">
              BUY NOW
            </a>
            <Link to="/components"
              className="-ml-[3px] px-6 py-3 bg-black text-gold border-[3px] border-gold font-body font-bold text-sm tracking-wide hover:bg-gold/10 transition-colors">
              BACK TO STORE
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
