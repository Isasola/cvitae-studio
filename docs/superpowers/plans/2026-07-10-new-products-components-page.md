# New Products + Components Page Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar dos productos nuevos (GrowthLine + Neo Brutalism Kit) con páginas de demo interactivas, y mejorar la página /components para que muestre los componentes en vivo en lugar de imágenes estáticas.

**Architecture:** GrowthLine se reescribe de TSX+Framer Motion a JSX+SVG puro (sin nuevas dependencias). Neo Brutalism Kit es una demo page que muestra los propios componentes del sitio en vivo con controles interactivos. La página /components recibe una sección hero con el GrowthLine corriendo en vivo y las cards pasan a mostrar el componente animado como preview.

**Tech Stack:** React 18 + Vite + Tailwind CSS v3. SVG animations nativas (`<animate>`, `<animateMotion>`). Sin dependencias nuevas.

## Global Constraints

- Paleta: cream `#F5F0E8`, black `#111111`, gold `#C9A84C`
- Tipografía: `font-display` (Bebas Neue) para títulos, `font-body` (Space Grotesk) para cuerpo
- Bordes: `border-[3px] border-black`, sin `rounded-*`
- Demos de productos: misma estructura que FilestackDemo y ParticleDemo — fondo negro, bordes gold
- Sin dependencias nuevas — todo SVG nativo o CSS

---

## Mapa de archivos

| Archivo | Acción | Responsabilidad |
|---------|--------|-----------------|
| `src/components/GrowthLine.jsx` | Crear | GrowthLine reescrito en JSX puro, sin TypeScript ni Framer Motion |
| `src/pages/demos/GrowthLineDemo.jsx` | Crear | Demo page completa con preview interactivo + who is it for + how to use |
| `src/pages/demos/NeoBrutalismDemo.jsx` | Crear | Demo page del kit: paleta, tipografía, botones, cards, inputs en vivo |
| `src/pages/Components.jsx` | Modificar | Sección hero con GrowthLine en vivo + descripción del kit |
| `src/App.jsx` | Modificar | Rutas `/demo/growth-line` y `/demo/neo-brutalism` |

---

## Task 1: GrowthLine.jsx — SVG puro sin dependencias

**Files:**
- Create: `src/components/GrowthLine.jsx`

**Interfaces:**
- Consumes: `{ variant, className, color, glowColor }` — todas opcionales
- Produces: SVG animado, funciona en cualquier contenedor con width/height definido

- [ ] **Step 1: Crear GrowthLine.jsx**

```jsx
// src/components/GrowthLine.jsx
// Adaptado de cvitae-unified/src/components/cv/visuals.tsx
// Reescrito en JSX puro — sin TypeScript, sin Framer Motion

let _uid = 0

export default function GrowthLine({
  className = '',
  variant = 'decorative',   // 'decorative' | 'score' | 'hero'
  color = '#C9A84C',
  glowColor = '#e8d080',
}) {
  // uid único por instancia usando módulo counter (SSR-safe en Vite)
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
```

- [ ] **Step 2: Verificar que el archivo existe**

```bash
ls /c/Users/isaso/Documents/cvitae-studio/src/components/GrowthLine.jsx
```

---

## Task 2: GrowthLineDemo.jsx — página de demo completa

**Files:**
- Create: `src/pages/demos/GrowthLineDemo.jsx`

**Interfaces:**
- Consumes: `GrowthLine` importado
- Produces: demo page dark con preview interactivo, controles, who is it for, how to use

- [ ] **Step 1: Crear GrowthLineDemo.jsx**

```jsx
// src/pages/demos/GrowthLineDemo.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import GrowthLine from '../../components/GrowthLine.jsx'

const PRESETS = [
  { label: 'Gold (default)', color: '#C9A84C', glow: '#e8d080' },
  { label: 'Purple',         color: '#8b5cf6', glow: '#c4b5fd' },
  { label: 'Cyan',           color: '#06b6d4', glow: '#a5f3fc' },
  { label: 'Rose',           color: '#f43f5e', glow: '#fda4af' },
  { label: 'Emerald',        color: '#10b981', glow: '#6ee7b7' },
  { label: 'Orange',         color: '#f97316', glow: '#fdba74' },
]

export default function GrowthLineDemo() {
  const [variant, setVariant]     = useState('hero')
  const [presetIdx, setPresetIdx] = useState(0)
  const [customColor, setCustomColor] = useState('')
  const [bgDark, setBgDark]       = useState(true)

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
            {['Zero dependencies', 'Pure SVG', 'React + HTML', 'Customizable'].map((tag, i) => (
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
            <div key={v.id} className={`p-6 bg-black cursor-pointer transition-colors ${variant === v.id ? 'bg-gold/10' : 'hover:bg-white/5'} ${i < 2 ? 'border-b-[2px] md:border-b-0 md:border-r-[2px] border-gold/20' : ''}`}
              onClick={() => setVariant(v.id)}>
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
                  {['decorative','score','hero'].map(v => (
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
                      className={`px-3 py-1.5 border-[2px] border-gold/30 -ml-[2px] first:ml-0 -mt-[2px] first-of-line:mt-0 font-body text-xs font-semibold transition-none
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
                  {[
                    { label: 'Dark', dark: true },
                    { label: 'Light', dark: false },
                  ].map(b => (
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
                {/* Simula contexto de uso */}
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

        {/* Usos reales */}
        <div className="border-[3px] border-gold/20 mb-12">
          <div className="px-8 py-5 border-b-[3px] border-gold/20">
            <h2 className="font-display text-3xl text-gold tracking-widest">WHERE TO USE IT</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              { title: 'Separador de sección', desc: 'Entre el hero y la siguiente sección. Reemplaza el `<hr>` aburrido.' },
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

        {/* How to use */}
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
                code: 'import GrowthLine\n  from \'./components/GrowthLine\'\n\n// Como separador de sección:\n<GrowthLine\n  className="w-full h-12"\n  variant="decorative"\n  color="#your-color"\n/>',
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
```

---

## Task 3: NeoBrutalismDemo.jsx — kit en vivo

**Files:**
- Create: `src/pages/demos/NeoBrutalismDemo.jsx`

**Interfaces:**
- Consumes: nada externo — muestra los componentes del propio sitio como demo
- Produces: demo page con paleta, tipografía, botones, cards, inputs — todo interactivo

- [ ] **Step 1: Crear NeoBrutalismDemo.jsx**

```jsx
// src/pages/demos/NeoBrutalismDemo.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

// ── Componentes del kit mostrados en vivo ────────────────────────────────────

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

// ── Página ───────────────────────────────────────────────────────────────────

export default function NeoBrutalismDemo() {
  const [btnSize, setBtnSize]       = useState('md')
  const [btnShadow, setBtnShadow]   = useState(true)
  const [customPrimary, setCustomPrimary] = useState('#111111')
  const [customAccent, setCustomAccent]   = useState('#C9A84C')

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
            {['Tailwind v3', 'Bebas Neue', 'Space Grotesk', 'React', 'Cream / Black / Gold'].map((tag, i) => (
              <span key={tag} className="-ml-[2px] first:ml-0 px-3 py-1 border-[2px] border-gold/40 font-body text-xs font-bold tracking-wide text-gold/70">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* LIVE SHOWCASE — los componentes corriendo */}
        <div className="border-[3px] border-gold shadow-brutal-gold bg-[#F5F0E8] mb-10">
          <div className="px-6 pt-6 pb-2 border-b-[3px] border-black/20">
            <p className="font-body text-xs tracking-[0.3em] text-black/40">LIVE COMPONENT SHOWCASE</p>
          </div>

          <div className="p-8 flex flex-col gap-10">
            {/* Paleta */}
            <div>
              <p className="font-display text-xl tracking-widest mb-4">COLOR SYSTEM</p>
              <div className="flex gap-0">
                {[
                  { name: 'CREAM',  hex: '#F5F0E8', txt: '#111111' },
                  { name: 'BLACK',  hex: '#111111', txt: '#F5F0E8' },
                  { name: 'GOLD',   hex: '#C9A84C', txt: '#111111' },
                  { name: 'GOLD+',  hex: '#e6cf8a', txt: '#111111' },
                ].map((c, i) => (
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
              <div className="flex flex-wrap gap-0 items-start">
                <div className="border-[3px] border-black -ml-[3px] first:ml-0 p-4 bg-cream flex gap-3 flex-wrap">
                  <NeoButton variant="primary" size={btnSize} shadow={btnShadow}>PRIMARY</NeoButton>
                  <NeoButton variant="secondary" size={btnSize} shadow={btnShadow}>SECONDARY</NeoButton>
                  <NeoButton variant="gold" size={btnSize} shadow={btnShadow}>GOLD CTA</NeoButton>
                  <NeoButton variant="ghost" size={btnSize} shadow={false}>GHOST</NeoButton>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div>
              <p className="font-display text-xl tracking-widest text-black mb-4">CARDS</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <NeoCard title="FEATURE CARD" tag="NEW" body="Un bloque de contenido con borde, sombra brutal y tag opcional. Hover lo desliza." />
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

        {/* TRY IT — controles interactivos */}
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
                  {['sm','md','lg'].map(s => (
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

        {/* What's included */}
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

        {/* How to use */}
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
              { num: '04', title: 'USÁS', body: 'Copiás los componentes en tu /components. Tu IA los extiende y adapta.', code: 'import { NeoButton, NeoCard }\n  from \'./components/kit\'\n\n<NeoButton variant="gold">\n  GET STARTED\n</NeoButton>' },
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
```

---

## Task 4: Mejorar Components.jsx con preview en vivo

**Files:**
- Modify: `src/pages/Components.jsx`

**Interfaces:**
- Consumes: `GrowthLine` importado
- Produces: sección hero con GrowthLine en vivo + dos cards directas para los productos nuevos (sin Supabase, hardcodeadas hasta que se agreguen desde el admin)

- [ ] **Step 1: Reemplazar Components.jsx completo**

```jsx
// src/pages/Components.jsx
import { Link } from 'react-router-dom'
import { useAdminProducts } from '../hooks/useAdminData.js'
import ProductCard from '../components/ProductCard.jsx'
import GrowthLine from '../components/GrowthLine.jsx'

// Cards directas para los dos nuevos productos (con demo en vivo en la card)
function LiveProductCard({ title, tagline, price, demoPath, tags, preview }) {
  return (
    <article className="border-[3px] border-black bg-cream flex flex-col relative shadow-brutal transition-all hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] duration-100">
      {/* Preview en vivo */}
      <div className="border-b-[3px] border-black bg-black/5 overflow-hidden" style={{ minHeight: 160 }}>
        {preview}
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-3xl leading-none">{title.toUpperCase()}</h3>
            <p className="font-body text-sm text-black/70 mt-1">{tagline}</p>
          </div>
          <div className="flex-shrink-0 border-[3px] border-black px-3 py-1 bg-gold shadow-brutal-sm">
            <span className="font-display text-2xl">${price}</span>
            <span className="font-body text-xs font-bold ml-1">USD</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-0">
          {tags.map(t => (
            <span key={t} className="-ml-[2px] first:ml-0 px-2 py-0.5 border-[2px] border-black font-body text-[10px] font-bold tracking-wide">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-0 mt-auto pt-2">
          <Link
            to={demoPath}
            className="flex-1 text-center py-3 bg-black text-cream border-[3px] border-black font-body font-bold text-sm tracking-wide shadow-brutal-sm hover:bg-gold hover:text-black hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-100"
          >
            LIVE DEMO →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function Components() {
  const { products } = useAdminProducts()
  const components = products.filter(p => p.category === 'component')

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Hero */}
      <div className="border-[3px] border-black p-6 md:p-8 mb-4">
        <p className="font-body text-sm font-bold tracking-[0.3em] mb-2 text-gold">CVITAE STUDIO</p>
        <h1 className="font-display text-6xl md:text-8xl leading-none">COMPONENTS</h1>
        <p className="font-body text-base mt-4 max-w-lg text-black/70">
          Drop-in React components. Buy once, use in any project. No subscriptions, no lock-in.
        </p>
      </div>

      {/* GrowthLine decorativa en vivo */}
      <div className="mb-12 border-[3px] border-black border-t-0 px-8 py-4 bg-black">
        <GrowthLine className="w-full h-10" variant="hero" />
      </div>

      {/* Productos nuevos con demo en vivo */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-display text-2xl tracking-widest">FEATURED</h2>
        <div className="flex-1 h-[3px] bg-black" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 mb-12">

        {/* GrowthLine card con preview en vivo */}
        <div className="border-[3px] border-black -mt-[3px] -mr-[3px]">
          <LiveProductCard
            title="Growth Line"
            tagline="SVG animado. Punto de luz viajero. Cero dependencias."
            price={9}
            demoPath="/demo/growth-line"
            tags={['SVG', 'Zero deps', 'React', 'HTML']}
            preview={
              <div className="w-full h-full bg-black flex items-center justify-center p-8 min-h-[160px]">
                <GrowthLine className="w-full h-14" variant="hero" />
              </div>
            }
          />
        </div>

        {/* Neo Brutalism Kit card con preview en vivo */}
        <div className="border-[3px] border-black -mt-[3px] -mr-[3px]">
          <LiveProductCard
            title="Neo Brutalism Kit"
            tagline="Tailwind config + fuentes + componentes. El estilo de CVitae Studio."
            price={19}
            demoPath="/demo/neo-brutalism"
            tags={['Tailwind v3', 'React', 'Fuentes', '8 componentes']}
            preview={
              <div className="w-full bg-[#F5F0E8] p-6 min-h-[160px] flex flex-col gap-3">
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-black text-cream border-[3px] border-black font-body font-bold text-xs shadow-brutal-sm">PRIMARY</button>
                  <button className="px-4 py-2 bg-gold text-black border-[3px] border-black font-body font-bold text-xs shadow-brutal-sm">GOLD</button>
                </div>
                <div className="border-[3px] border-black bg-cream p-3 shadow-brutal-sm">
                  <p className="font-display text-xl leading-none">FEATURE CARD</p>
                  <p className="font-body text-xs text-black/60 mt-1">Border + shadow brutal + hover</p>
                </div>
              </div>
            }
          />
        </div>

        {/* OPS Console — de Supabase si existe */}
        {components.map(product => (
          <div key={product.id} className="border-[3px] border-black -mt-[3px] -mr-[3px]">
            <ProductCard product={product} />
          </div>
        ))}

      </div>

      {/* Mensaje si no hay más productos */}
      {components.length === 0 && (
        <div className="border-[3px] border-black/20 border-dashed p-8 text-center">
          <p className="font-display text-2xl text-black/30">MORE COMING SOON</p>
        </div>
      )}

    </div>
  )
}
```

---

## Task 5: Routing — agregar las dos rutas nuevas

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Agregar imports y rutas**

Agregar imports:
```jsx
import GrowthLineDemo from './pages/demos/GrowthLineDemo.jsx'
import NeoBrutalismDemo from './pages/demos/NeoBrutalismDemo.jsx'
```

Agregar rutas dentro del bloque full-screen (junto a `/demo/filestack` y `/demo/particle`):
```jsx
<Route path="/demo/growth-line"   element={<GrowthLineDemo />} />
<Route path="/demo/neo-brutalism" element={<NeoBrutalismDemo />} />
```

---

## Task 6: Build final

- [ ] **Step 1: Build sin errores**

```bash
cd /c/Users/isaso/Documents/cvitae-studio && npm run build 2>&1 | tail -8
```
Esperado: `✓ built in X.XXs`

- [ ] **Step 2: Probar en dev**

```bash
npm run dev
```

Verificar:
- `/components` — GrowthLine corriendo en vivo en el hero oscuro + cards de nuevos productos con previews animados
- `/demo/growth-line` — demo interactiva, cambiar color/variante/fondo en tiempo real
- `/demo/neo-brutalism` — showcase completo de componentes + controles de botón

---

## Self-Review

**Spec coverage:**
- ✅ GrowthLine convertido a JSX puro sin TypeScript ni Framer Motion
- ✅ Demo page GrowthLine: preview en vivo, controles de color/variante/fondo, TRY IT, who is it for, how to use
- ✅ Demo page Neo Brutalism Kit: todos los componentes corriendo en vivo, controles interactivos, what's included, how to use
- ✅ Página /components: GrowthLine en vivo en hero oscuro, cards con preview animado real
- ✅ Rutas `/demo/growth-line` y `/demo/neo-brutalism` full-screen (sin Header/Footer)
- ✅ Sin dependencias nuevas

**Placeholder scan:** Ninguno.
**Type consistency:** `GrowthLine` exportado default, importado correcto en GrowthLineDemo, Components y App.
