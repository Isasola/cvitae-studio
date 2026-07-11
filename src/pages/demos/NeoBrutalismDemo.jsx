import { useState } from 'react'
import { Link } from 'react-router-dom'

function NeoButton({ variant = 'primary', size = 'md', children, shadow = true }) {
  const base = 'font-body font-bold tracking-wide border-[3px] border-black transition-all duration-100 cursor-pointer'
  const sizes = { sm: 'px-4 py-2 text-xs', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' }
  const variants = {
    primary:   `bg-black text-cream ${shadow ? 'shadow-brutal hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]' : ''}`,
    secondary: `bg-cream text-black ${shadow ? 'shadow-brutal hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]' : ''}`,
    gold:      `bg-gold text-black ${shadow ? 'shadow-brutal hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]' : ''}`,
    ghost:     'bg-transparent text-black hover:bg-black hover:text-cream',
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]}`}>
      {children}
    </button>
  )
}

function NeoCard({ title, body, tag }) {
  return (
    <div className="border-[3px] border-black bg-cream shadow-brutal p-6 flex flex-col gap-3">
      {tag && <span className="self-start px-2 py-0.5 border-[2px] border-black font-body text-xs font-bold tracking-wide">{tag}</span>}
      <h3 className="font-display text-2xl tracking-wide">{title}</h3>
      <p className="font-body text-sm text-black/70 leading-relaxed">{body}</p>
    </div>
  )
}

function NeoInput({ placeholder, label }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-body text-xs font-bold tracking-widest">{label}</label>}
      <input
        className="px-4 py-3 border-[3px] border-black bg-cream font-body text-sm focus:outline-none focus:bg-black focus:text-cream placeholder:text-black/30"
        placeholder={placeholder}
      />
    </div>
  )
}

function NeoBadge({ children, variant = 'default' }) {
  const v = {
    default: 'border-black text-black',
    gold:    'border-gold text-gold bg-gold/10',
    alert:   'border-black bg-black text-cream',
  }
  return (
    <span className={`px-2 py-0.5 border-[2px] font-body text-xs font-bold tracking-wide ${v[variant]}`}>
      {children}
    </span>
  )
}

export default function NeoBrutalismDemo() {
  const [btnSize, setBtnSize]     = useState('md')
  const [btnShadow, setBtnShadow] = useState(true)

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
          <p className="font-body text-xs font-bold tracking-[0.3em] text-gold mb-3">CVITAE STUDIO — KIT</p>
          <h1 className="font-display text-6xl md:text-8xl leading-none mb-4">NEO<br/>BRUTALISM<br/><span className="text-gold">STARTER KIT</span></h1>
          <p className="font-body text-base text-cream/60 max-w-lg">
            El sistema visual completo de CVitae Studio. Tailwind config, fuentes, colores, sombras y componentes base — listos para tu proyecto.
          </p>
          <div className="flex flex-wrap gap-0 mt-4">
            {['Tailwind v3', 'Bebas Neue', 'Space Grotesk', 'React', 'Cream / Black / Gold'].map((tag) => (
              <span key={tag} className="-ml-[2px] first:ml-0 px-3 py-1 border-[2px] border-gold/40 font-body text-xs font-bold tracking-wide text-gold/70">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* LIVE SHOWCASE */}
        <div className="border-[3px] border-gold shadow-brutal-gold bg-[#F5F0E8] mb-10">
          <div className="px-6 pt-6 pb-2 border-b-[3px] border-black/20">
            <p className="font-body text-xs tracking-[0.3em] text-black/40">LIVE COMPONENT SHOWCASE</p>
          </div>

          <div className="p-8 flex flex-col gap-10">
            {/* Paleta */}
            <div>
              <p className="font-display text-xl tracking-widest text-black mb-4">COLOR SYSTEM</p>
              <div className="flex gap-0">
                {[
                  { name: 'CREAM',  hex: '#F5F0E8', txt: '#111111' },
                  { name: 'BLACK',  hex: '#111111', txt: '#F5F0E8' },
                  { name: 'GOLD',   hex: '#C9A84C', txt: '#111111' },
                  { name: 'GOLD+',  hex: '#e6cf8a', txt: '#111111' },
                ].map((c) => (
                  <div key={c.name} className="flex-1 border-[3px] border-black -ml-[3px] first:ml-0 p-4 flex flex-col justify-between" style={{ backgroundColor: c.hex, minHeight: 80 }}>
                    <span className="font-display text-sm tracking-widest" style={{ color: c.txt }}>{c.name}</span>
                    <span className="font-mono text-xs" style={{ color: c.txt, opacity: 0.7 }}>{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tipografía */}
            <div>
              <p className="font-display text-xl tracking-widest text-black mb-4">TYPOGRAPHY</p>
              <div className="border-[3px] border-black p-6 bg-cream flex flex-col gap-3">
                <p className="font-display text-6xl text-black leading-none">BEBAS NEUE</p>
                <p className="font-body text-base text-black/70">Space Grotesk — cuerpo, labels, botones, código</p>
                <p className="font-body text-sm font-bold tracking-[0.3em] text-gold">TRACKING WIDE — UPPERCASE LABELS</p>
              </div>
            </div>

            {/* Botones */}
            <div>
              <p className="font-display text-xl tracking-widest text-black mb-4">BUTTONS</p>
              <div className="border-[3px] border-black p-4 bg-cream flex gap-3 flex-wrap">
                <NeoButton variant="primary" size={btnSize} shadow={btnShadow}>PRIMARY</NeoButton>
                <NeoButton variant="secondary" size={btnSize} shadow={btnShadow}>SECONDARY</NeoButton>
                <NeoButton variant="gold" size={btnSize} shadow={btnShadow}>GOLD CTA</NeoButton>
                <NeoButton variant="ghost" size={btnSize} shadow={false}>GHOST</NeoButton>
              </div>
            </div>

            {/* Cards */}
            <div>
              <p className="font-display text-xl tracking-widest text-black mb-4">CARDS</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <NeoCard title="FEATURE CARD" tag="NEW" body="Un bloque de contenido con borde, sombra brutal y tag opcional." />
                <div className="border-[3px] border-black -ml-[3px] bg-black p-6 flex flex-col gap-3">
                  <span className="self-start px-2 py-0.5 border-[2px] border-gold font-body text-xs font-bold tracking-wide text-gold">DARK</span>
                  <h3 className="font-display text-2xl text-cream tracking-wide">DARK CARD</h3>
                  <p className="font-body text-sm text-cream/50 leading-relaxed">Variante oscura. Mismo sistema, fondo black.</p>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <p className="font-display text-xl tracking-widest text-black mb-4">INPUTS</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NeoInput label="YOUR NAME" placeholder="John Doe" />
                <NeoInput label="EMAIL" placeholder="john@company.com" />
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="font-display text-xl tracking-widest text-black mb-4">BADGES</p>
              <div className="flex gap-3 flex-wrap">
                <NeoBadge>DEFAULT</NeoBadge>
                <NeoBadge variant="gold">GOLD</NeoBadge>
                <NeoBadge variant="alert">ALERT</NeoBadge>
              </div>
            </div>

            {/* Sombras */}
            <div>
              <p className="font-display text-xl tracking-widest text-black mb-4">SHADOWS</p>
              <div className="flex gap-8 flex-wrap">
                <div className="w-28 h-16 border-[3px] border-black bg-cream shadow-brutal flex items-center justify-center">
                  <span className="font-body text-xs font-bold">brutal</span>
                </div>
                <div className="w-28 h-16 border-[3px] border-black bg-cream shadow-brutal-sm flex items-center justify-center">
                  <span className="font-body text-xs font-bold">brutal-sm</span>
                </div>
                <div className="w-28 h-16 border-[3px] border-black bg-cream shadow-brutal-gold flex items-center justify-center">
                  <span className="font-body text-xs font-bold">brutal-gold</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOMIZE IT */}
        <div className="border-[3px] border-gold mb-12">
          <div className="border-b-[3px] border-gold px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-4xl text-gold leading-none">CUSTOMIZE IT</h2>
              <p className="font-body text-xs text-cream/40 mt-1">Ajustá los controles, ve los cambios en vivo.</p>
            </div>
            <span className="font-body text-xs text-gold/40 border-[2px] border-gold/40 px-3 py-1 flex-shrink-0">FREE PREVIEW</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Controles */}
            <div className="p-8 border-b-[3px] md:border-b-0 md:border-r-[3px] border-gold/30 flex flex-col gap-6">
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">01 — BUTTON SIZE</p>
                <div className="flex gap-0">
                  {['sm', 'md', 'lg'].map(s => (
                    <button key={s} onClick={() => setBtnSize(s)}
                      className={`flex-1 py-2 border-[2px] border-gold/40 -ml-[2px] first:ml-0 font-body text-xs font-bold tracking-wide transition-none uppercase
                        ${btnSize === s ? 'bg-gold text-black border-gold' : 'bg-black text-gold/60 hover:text-gold'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">02 — SHADOW</p>
                <div className="flex gap-0">
                  {[{ label: 'On', val: true }, { label: 'Off', val: false }].map(s => (
                    <button key={String(s.val)} onClick={() => setBtnShadow(s.val)}
                      className={`flex-1 py-2 border-[2px] border-gold/40 -ml-[2px] first:ml-0 font-body text-xs font-bold tracking-wide transition-none
                        ${btnShadow === s.val ? 'bg-gold text-black border-gold' : 'bg-black text-gold/60 hover:text-gold'}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Preview */}
            <div className="p-8 bg-[#F5F0E8] flex flex-col items-center justify-center gap-4">
              <p className="font-body text-xs tracking-widest text-black/30">PREVIEW</p>
              <div className="flex gap-3 flex-wrap justify-center">
                <NeoButton variant="primary" size={btnSize} shadow={btnShadow}>BUY NOW</NeoButton>
                <NeoButton variant="gold" size={btnSize} shadow={btnShadow}>GET STARTED</NeoButton>
                <NeoButton variant="ghost" size={btnSize} shadow={false}>LEARN MORE</NeoButton>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT'S INCLUDED */}
        <div className="border-[3px] border-gold/20 mb-12">
          <div className="px-8 py-5 border-b-[3px] border-gold/20">
            <h2 className="font-display text-3xl text-gold tracking-widest">WHAT'S INCLUDED</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              ['tailwind.config.js', 'Paleta completa, fuentes, borderWidth, borderRadius, shadows personalizadas'],
              ['index.css', 'Fuentes self-hosted (Bebas Neue + Space Grotesk), keyframes, clases shadow-brutal'],
              ['Button.jsx', '4 variantes, 3 tamaños, shadow-brutal con hover desplazamiento'],
              ['Card.jsx', 'Con y sin tag, variante dark, hover effect'],
              ['Input.jsx', 'Con label, estado focus invertido (cream → black)'],
              ['Badge.jsx', '3 variantes: default, gold, alert'],
              ['SectionDivider.jsx', 'Separador de sección estilo neo-brutalista con label opcional'],
              ['fonts/', 'Archivos .woff2 de Bebas Neue y Space Grotesk para self-hosting'],
            ].map(([title, desc], i) => (
              <div key={title} className={`p-5 flex gap-3 ${i % 2 === 0 ? 'border-r-[2px] border-gold/10' : ''} ${i < 6 ? 'border-b-[2px] border-gold/10' : ''}`}>
                <span className="text-gold font-bold text-sm mt-0.5 flex-shrink-0">→</span>
                <div>
                  <p className="font-mono text-sm text-gold">{title}</p>
                  <p className="font-body text-xs text-cream/40 mt-0.5 leading-relaxed">{desc}</p>
                </div>
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
                'Querés este estilo pero no querés configurarlo desde cero',
                'Trabajás con React + Tailwind — con o sin IA',
                'Arrancás un proyecto nuevo y querés base sólida rápido',
                'Tu IA (Cursor, Claude) puede extender el kit solo',
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
                'Proyectos sin Tailwind CSS',
                'Frameworks sin soporte JSX (PHP, Django templates, etc.)',
              ].map(t => (
                <div key={t} className="flex items-start gap-2 mb-2">
                  <span className="text-cream/30 font-bold text-sm mt-0.5">✗</span>
                  <p className="font-body text-sm text-cream/30">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HOW TO USE IT */}
        <div className="border-[3px] border-gold/20 mb-12">
          <div className="px-8 py-5 border-b-[3px] border-gold/20">
            <h2 className="font-display text-3xl text-gold tracking-widest leading-none">HOW TO USE IT</h2>
            <p className="font-body text-xs text-cream/40 mt-1">Cuatro pasos. Tu proyecto con este estilo en 5 minutos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              { num: '01', title: 'COMPRÁS', body: 'Recibís un ZIP con todos los archivos listos.', code: null },
              { num: '02', title: 'CONFIGURÁS TAILWIND', body: 'Reemplazás (o mezclás) tu tailwind.config.js con el del kit.', code: '// tailwind.config.js ya incluido\n// con colores, fuentes y shadows' },
              { num: '03', title: 'COPIÁS FUENTES', body: 'Copiás la carpeta fonts/ en tu /public y el CSS de @font-face ya viene listo.', code: 'public/\n  fonts/\n    BebasNeue-Regular.woff2\n    SpaceGrotesk-Variable.woff2' },
              { num: '04', title: 'USÁS', body: 'Copiás los componentes en tu /components. Tu IA los extiende y adapta.', code: "import { NeoButton, NeoCard }\n  from './components/kit'\n\n<NeoButton variant=\"gold\">\n  GET STARTED\n</NeoButton>" },
            ].map((step, i) => (
              <div key={step.num} className={`p-6 ${i % 2 === 0 ? 'border-r-[2px] border-gold/10' : ''} ${i < 2 ? 'border-b-[2px] border-gold/10' : ''}`}>
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
            <p className="font-display text-3xl text-gold">$19 USD</p>
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
