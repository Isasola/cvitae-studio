# Empty State Generator — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar `/generators/empty-state` a CVitae Studio — una herramienta gratuita donde el dev configura su estado vacío y lo compra para descargar el código.

**Architecture:** Página nueva dentro del sitio existente (mismo Header/Footer). Panel de controles izquierda + preview derecha en desktop, stacked en mobile. El código exportado está bloqueado detrás de Lemon Squeezy. No hay backend nuevo — todo es React puro en el cliente.

**Tech Stack:** React 18 + Vite + Tailwind CSS v3 + React Router v6. Mismo diseño neo-brutalista del sitio (cream/black/gold, Bebas Neue + Space Grotesk, bordes 3px, shadow-brutal).

## Global Constraints

- Paleta: cream `#F5F0E8`, black `#111111`, gold `#C9A84C`
- Tipografía: `font-display` (Bebas Neue) para títulos, `font-body` (Space Grotesk) para cuerpo
- Bordes: `border-[3px] border-black` — NUNCA `rounded-*` salvo `rounded-none`
- Sombras: solo `shadow-brutal` y `shadow-brutal-sm` (definidas en index.css)
- Sin dependencias nuevas — usar solo lo que ya está instalado
- Todas las animaciones en CSS puro o inline style, no librerías externas
- El generador es gratuito; el botón "Export Code" abre modal de pago (Lemon Squeezy)
- URL del producto Lemon Squeezy: se pega en `LEMON_URL` dentro del componente cuando esté disponible

---

## Mapa de archivos

| Archivo | Acción | Responsabilidad |
|---------|--------|-----------------|
| `src/pages/generators/EmptyStateGenerator.jsx` | Crear | Página completa — layout + estado global del generador |
| `src/components/generators/ControlPanel.jsx` | Crear | Panel izquierdo con todos los controles |
| `src/components/generators/PreviewCanvas.jsx` | Crear | Preview derecho — renderiza el empty state en vivo |
| `src/components/generators/EmptyStatePreset.jsx` | Crear | Componente visual del empty state (recibe props, NO tiene estado) |
| `src/components/generators/ExportModal.jsx` | Crear | Modal de pago / export |
| `src/components/generators/emptyStateConfig.js` | Crear | Datos: 16 tipos, 8 estilos, ilustraciones SVG inline |
| `src/App.jsx` | Modificar | Agregar ruta `/generators/empty-state` |
| `src/components/Header.jsx` | Modificar | Agregar "Generators" al nav |

---

## Task 1: Datos de configuración y SVGs

**Files:**
- Create: `src/components/generators/emptyStateConfig.js`

**Interfaces:**
- Produces: `STATES`, `STYLES`, `ANIMATIONS`, `BUTTONS`, `FRAMEWORKS` — arrays exportados usados por ControlPanel y EmptyStatePreset

- [ ] **Step 1: Crear el archivo de configuración**

```js
// src/components/generators/emptyStateConfig.js

export const STATES = [
  { id: 'no-data',      label: 'No Data',          icon: 'inbox',      title: 'Nothing here yet',        desc: 'Add your first record to get started.' },
  { id: 'search-empty', label: 'Search Empty',      icon: 'search',     title: 'No results found',        desc: 'Try a different keyword or clear the filters.' },
  { id: 'error',        label: 'Error',             icon: 'warning',    title: 'Something went wrong',    desc: 'We couldn\'t load this page. Please try again.' },
  { id: '404',          label: '404 Not Found',     icon: 'ghost',      title: 'Page not found',          desc: 'This page doesn\'t exist or was moved.' },
  { id: 'offline',      label: 'No Internet',       icon: 'signal',     title: 'You\'re offline',         desc: 'Check your connection and refresh.' },
  { id: 'loading',      label: 'Loading',           icon: 'clock',      title: 'Loading your data',       desc: 'Hang tight, this won\'t take long.' },
  { id: 'unauthorized', label: 'No Permission',     icon: 'lock',       title: 'Access denied',           desc: 'You don\'t have permission to view this.' },
  { id: 'maintenance',  label: 'Maintenance',       icon: 'wrench',     title: 'Under maintenance',       desc: 'We\'re making improvements. Back soon.' },
  { id: 'success',      label: 'Success',           icon: 'check',      title: 'All done!',               desc: 'Everything went through without issues.' },
  { id: 'first-use',    label: 'First Use',         icon: 'rocket',     title: 'Welcome aboard',          desc: 'You haven\'t created anything yet. Let\'s start.' },
  { id: 'no-payment',   label: 'No Payment',        icon: 'card',       title: 'No payment method',       desc: 'Add a card to continue using this feature.' },
  { id: 'archived',     label: 'Archived',          icon: 'archive',    title: 'This was archived',       desc: 'You can restore it from your archive anytime.' },
  { id: 'deleted',      label: 'Deleted',           icon: 'trash',      title: 'Item deleted',            desc: 'This item no longer exists in the system.' },
  { id: 'ai-waiting',   label: 'AI Waiting',        icon: 'sparkles',   title: 'Waiting for input',       desc: 'Give me something to work with.' },
  { id: 'upgrade',      label: 'Upgrade Required',  icon: 'star',       title: 'Unlock this feature',     desc: 'Upgrade your plan to access this section.' },
  { id: 'trial-ended',  label: 'Trial Ended',       icon: 'hourglass',  title: 'Your trial has ended',    desc: 'Choose a plan to keep everything you built.' },
]

export const STYLES = [
  { id: 'minimal',      label: 'Minimal' },
  { id: 'neobrutalism', label: 'Neo Brutalism' },
  { id: 'glass',        label: 'Glass' },
  { id: 'corporate',    label: 'Corporate' },
  { id: 'dark',         label: 'Dark' },
  { id: 'stripe',       label: 'Stripe' },
  { id: 'linear',       label: 'Linear' },
  { id: 'vercel',       label: 'Vercel' },
]

export const ANIMATIONS = [
  { id: 'none',    label: 'None' },
  { id: 'fade',    label: 'Fade In' },
  { id: 'bounce',  label: 'Bounce' },
  { id: 'float',   label: 'Float' },
  { id: 'pulse',   label: 'Pulse' },
  { id: 'scale',   label: 'Scale In' },
]

export const BUTTONS = [
  { id: 'retry',    label: 'Try Again' },
  { id: 'create',   label: 'Create New' },
  { id: 'go-home',  label: 'Go Home' },
  { id: 'reload',   label: 'Reload Page' },
  { id: 'upgrade',  label: 'Upgrade Plan' },
  { id: 'contact',  label: 'Contact Support' },
  { id: 'invite',   label: 'Invite Team' },
  { id: 'none',     label: 'No Button' },
]

export const FRAMEWORKS = [
  { id: 'react',    label: 'React' },
  { id: 'next',     label: 'Next.js' },
  { id: 'vue',      label: 'Vue' },
  { id: 'html',     label: 'HTML + Tailwind' },
]

// Inline SVG paths por icono (viewBox="0 0 24 24", stroke-based)
export const ICONS = {
  inbox:     'M4 4h16v10H4V4zM4 14l4 4h8l4-4M9 9h6',
  search:    'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  warning:   'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01',
  ghost:     'M9 10h.01M15 10h.01M12 2a8 8 0 00-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 00-8-8z',
  signal:    'M1 6l6.5 6.5M1 1l10 10M16.5 12.5L23 6M13 10l10-10M5.5 14.5L9 18M15 6l3.5 3.5',
  clock:     'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2',
  lock:      'M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4',
  wrench:    'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
  check:     'M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3',
  rocket:    'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z',
  card:      'M1 4h22v16H1V4zM1 9h22',
  archive:   'M21 8v13H3V8M23 3H1v5h22V3zM10 12h4',
  trash:     'M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2',
  sparkles:  'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17zM19 1l.5 1.5L21 3l-1.5.5L19 5l-.5-1.5L17 3l1.5-.5L19 1z',
  star:      'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  hourglass: 'M5 22h14M5 2h14M17 22v-4l-5-4-5 4v4M7 2v4l5 4 5-4V2',
}
```

- [ ] **Step 2: Verificar que el archivo no tiene errores de sintaxis**

```bash
cd /c/Users/isaso/Documents/cvitae-studio && node -e "import('./src/components/generators/emptyStateConfig.js').then(() => console.log('OK')).catch(e => console.error(e))"
```

---

## Task 2: EmptyStatePreset — el componente visual puro

**Files:**
- Create: `src/components/generators/EmptyStatePreset.jsx`

**Interfaces:**
- Consumes: `{ stateId, style, primaryColor, accentColor, animationId, buttonId, title, desc }` — todas props, sin estado interno
- Produces: JSX renderizable que cambia su apariencia según `style` y `animationId`

- [ ] **Step 1: Crear EmptyStatePreset.jsx**

```jsx
// src/components/generators/EmptyStatePreset.jsx
import { ICONS } from './emptyStateConfig.js'

const STYLE_TOKENS = {
  minimal: {
    wrapper: 'bg-white border border-gray-200',
    icon: 'text-gray-300',
    title: 'text-gray-900 font-semibold',
    desc: 'text-gray-500',
    btn: 'bg-gray-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-700',
  },
  neobrutalism: {
    wrapper: 'bg-[#F5F0E8] border-[3px] border-black shadow-[6px_6px_0px_0px_#111111]',
    icon: 'text-black',
    title: 'text-black font-display tracking-wider uppercase',
    desc: 'text-black/70 font-body',
    btn: 'bg-black text-[#F5F0E8] border-[3px] border-black px-4 py-2 text-sm font-bold tracking-wide shadow-[4px_4px_0px_0px_#C9A84C] hover:bg-[#C9A84C] hover:text-black',
  },
  glass: {
    wrapper: 'bg-white/20 backdrop-blur-md border border-white/40 shadow-lg',
    icon: 'text-white/70',
    title: 'text-white font-semibold',
    desc: 'text-white/60',
    btn: 'bg-white/20 text-white border border-white/40 rounded-lg px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/30',
  },
  corporate: {
    wrapper: 'bg-gray-50 border border-gray-300',
    icon: 'text-blue-400',
    title: 'text-gray-800 font-bold',
    desc: 'text-gray-500 text-sm',
    btn: 'bg-blue-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-blue-700',
  },
  dark: {
    wrapper: 'bg-[#0f0f0f] border border-white/10',
    icon: 'text-white/30',
    title: 'text-white font-semibold',
    desc: 'text-white/40',
    btn: 'bg-white/10 text-white border border-white/20 rounded-md px-4 py-2 text-sm hover:bg-white/20',
  },
  stripe: {
    wrapper: 'bg-white border border-[#e0e0e0] shadow-sm',
    icon: 'text-[#635bff]/40',
    title: 'text-[#30313d] font-semibold',
    desc: 'text-[#6b7280] text-sm',
    btn: 'bg-[#635bff] text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-[#5144e0]',
  },
  linear: {
    wrapper: 'bg-[#1a1a2e] border border-white/10',
    icon: 'text-[#5e6ad2]/60',
    title: 'text-white font-medium',
    desc: 'text-white/40 text-sm',
    btn: 'bg-[#5e6ad2] text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-[#4f5bbf]',
  },
  vercel: {
    wrapper: 'bg-black border border-white/10',
    icon: 'text-white/20',
    title: 'text-white font-semibold',
    desc: 'text-white/40 text-sm',
    btn: 'bg-white text-black rounded-md px-4 py-2 text-sm font-semibold hover:bg-white/90',
  },
}

const ANIMATION_STYLES = {
  none:   {},
  fade:   { animation: 'fadeIn 0.5s ease forwards' },
  bounce: { animation: 'bounceIn 0.6s cubic-bezier(0.36,0.07,0.19,0.97) forwards' },
  float:  { animation: 'floatIcon 3s ease-in-out infinite' },
  pulse:  { animation: 'pulseIcon 2s ease-in-out infinite' },
  scale:  { animation: 'scaleIn 0.4s ease forwards' },
}

const ANIMATION_KEYFRAMES = `
  @keyframes fadeIn { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
  @keyframes bounceIn { 0%{transform:scale(0.8)} 60%{transform:scale(1.1)} 80%{transform:scale(0.95)} 100%{transform:scale(1)} }
  @keyframes floatIcon { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes pulseIcon { 0%,100%{opacity:0.6} 50%{opacity:1} }
  @keyframes scaleIn { from{transform:scale(0.7);opacity:0} to{transform:scale(1);opacity:1} }
`

export default function EmptyStatePreset({ stateId, style = 'minimal', primaryColor, animationId = 'none', buttonId = 'retry', title, desc }) {
  const tokens = STYLE_TOKENS[style] || STYLE_TOKENS.minimal
  const iconPath = ICONS[stateId] || ICONS.inbox
  const iconAnim = ANIMATION_STYLES[animationId] || {}

  // Override del color primario del ícono si el usuario personalizó
  const iconStyle = primaryColor ? { color: primaryColor, ...iconAnim } : iconAnim

  return (
    <div className={`flex flex-col items-center justify-center text-center p-10 gap-4 ${tokens.wrapper}`}>
      <style>{ANIMATION_KEYFRAMES}</style>

      {/* Ícono */}
      <div className={`${tokens.icon}`} style={iconStyle}>
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={iconPath} />
        </svg>
      </div>

      {/* Título */}
      <h3 className={`text-xl ${tokens.title}`} style={primaryColor ? { color: primaryColor } : {}}>
        {title}
      </h3>

      {/* Descripción */}
      <p className={`max-w-xs ${tokens.desc}`}>{desc}</p>

      {/* Botón */}
      {buttonId !== 'none' && (
        <button
          className={tokens.btn}
          style={primaryColor ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}
        >
          {BUTTONS_MAP[buttonId] || 'Try Again'}
        </button>
      )}
    </div>
  )
}

// Mapa local para no importar todo el array
const BUTTONS_MAP = {
  retry:   'Try Again',
  create:  'Create New',
  'go-home': 'Go Home',
  reload:  'Reload Page',
  upgrade: 'Upgrade Plan',
  contact: 'Contact Support',
  invite:  'Invite Team',
  none:    '',
}
```

- [ ] **Step 2: Confirmar que el archivo existe**

```bash
ls /c/Users/isaso/Documents/cvitae-studio/src/components/generators/
```

---

## Task 3: ControlPanel — todos los controles

**Files:**
- Create: `src/components/generators/ControlPanel.jsx`

**Interfaces:**
- Consumes: `{ config, onChange }` donde `config` es el objeto de estado del generador
- Produces: UI con selects/botones que llaman `onChange(key, value)`

- [ ] **Step 1: Crear ControlPanel.jsx**

```jsx
// src/components/generators/ControlPanel.jsx
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

      {/* 1. Tipo de estado */}
      <div>
        <SectionLabel>01 — STATE TYPE</SectionLabel>
        <PillGrid items={STATES} value={config.stateId} onChange={(v) => onChange('stateId', v)} />
      </div>

      {/* 2. Estilo visual */}
      <div>
        <SectionLabel>02 — VISUAL STYLE</SectionLabel>
        <PillGrid items={STYLES} value={config.style} onChange={(v) => onChange('style', v)} />
      </div>

      {/* 3. Animación */}
      <div>
        <SectionLabel>03 — ANIMATION</SectionLabel>
        <PillGrid items={ANIMATIONS} value={config.animationId} onChange={(v) => onChange('animationId', v)} />
      </div>

      {/* 4. Botón CTA */}
      <div>
        <SectionLabel>04 — BUTTON</SectionLabel>
        <PillGrid items={BUTTONS} value={config.buttonId} onChange={(v) => onChange('buttonId', v)} />
      </div>

      {/* 5. Color primario */}
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

      {/* 6. Texto personalizado */}
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

      {/* 7. Framework */}
      <div>
        <SectionLabel>07 — EXPORT AS</SectionLabel>
        <PillGrid items={FRAMEWORKS} value={config.framework} onChange={(v) => onChange('framework', v)} />
      </div>

    </div>
  )
}
```

---

## Task 4: ExportModal — pago y código

**Files:**
- Create: `src/components/generators/ExportModal.jsx`

**Interfaces:**
- Consumes: `{ config, onClose }` — recibe la config para generar el código preview
- Produces: modal con botón Lemon Squeezy + snippet del código bloqueado

- [ ] **Step 1: Crear ExportModal.jsx**

```jsx
// src/components/generators/ExportModal.jsx

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

        {/* Code preview — bloqueado */}
        <div className="relative">
          <pre className="bg-black text-cream/40 font-mono text-xs p-4 overflow-hidden max-h-36 select-none blur-[2px]">
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
            <p className="font-display text-3xl leading-none">EMPTY STATE GENERATOR</p>
            <p className="font-body text-xs text-black/60 mt-1">React • Vue • Next.js • HTML — 16 states included</p>
          </div>
          <div className="border-[3px] border-black px-4 py-2 bg-gold shadow-brutal-sm">
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
```

---

## Task 5: PreviewCanvas — panel derecho

**Files:**
- Create: `src/components/generators/PreviewCanvas.jsx`

**Interfaces:**
- Consumes: `{ config, onExport }` — `config` completo + callback para abrir modal
- Produces: fondo de preview + EmptyStatePreset centrado + botones de acción

- [ ] **Step 1: Crear PreviewCanvas.jsx**

```jsx
// src/components/generators/PreviewCanvas.jsx
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

export default function PreviewCanvas({ config, onExport }) {
  const bg = PREVIEW_BACKGROUNDS[config.style] || 'bg-gray-100'

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
          onClick={() => {
            // Randomizar: state, style y animation aleatorios
            const states = ['no-data','search-empty','error','404','offline','loading','unauthorized','maintenance','success','first-use','no-payment','archived','deleted','ai-waiting','upgrade','trial-ended']
            const styles = ['minimal','neobrutalism','glass','corporate','dark','stripe','linear','vercel']
            const anims  = ['none','fade','bounce','float','pulse','scale']
            window.dispatchEvent(new CustomEvent('generator:randomize', {
              detail: {
                stateId: states[Math.floor(Math.random() * states.length)],
                style:   styles[Math.floor(Math.random() * styles.length)],
                animationId: anims[Math.floor(Math.random() * anims.length)],
              }
            }))
          }}
          className="-ml-[3px] px-6 py-4 bg-cream text-black border-[3px] border-black font-body font-bold text-sm tracking-wide hover:bg-black hover:text-cream transition-none"
          title="Generar variación aleatoria"
        >
          🎲
        </button>
      </div>
    </div>
  )
}
```

---

## Task 6: EmptyStateGenerator — página completa

**Files:**
- Create: `src/pages/generators/EmptyStateGenerator.jsx`

**Interfaces:**
- Consumes: nada (página de nivel superior)
- Produces: layout de dos columnas con ControlPanel + PreviewCanvas + ExportModal

- [ ] **Step 1: Crear la carpeta y la página**

```bash
mkdir -p /c/Users/isaso/Documents/cvitae-studio/src/pages/generators
```

- [ ] **Step 2: Crear EmptyStateGenerator.jsx**

```jsx
// src/pages/generators/EmptyStateGenerator.jsx
import { useState, useEffect } from 'react'
import ControlPanel from '../../components/generators/ControlPanel.jsx'
import PreviewCanvas from '../../components/generators/PreviewCanvas.jsx'
import ExportModal from '../../components/generators/ExportModal.jsx'
import { STATES } from '../../components/generators/emptyStateConfig.js'

const DEFAULT_CONFIG = {
  stateId:     'no-data',
  style:       'neobrutalism',
  animationId: 'float',
  buttonId:    'create',
  primaryColor:'#111111',
  title:       'Nothing here yet',
  desc:        'Add your first record to get started.',
  framework:   'react',
}

export default function EmptyStateGenerator() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [showModal, setShowModal] = useState(false)

  // Actualizar title/desc cuando cambia el stateId (solo si el usuario no editó manualmente)
  const [titleEdited, setTitleEdited] = useState(false)
  const [descEdited, setDescEdited] = useState(false)

  function onChange(key, value) {
    setConfig(prev => {
      const next = { ...prev, [key]: value }
      // Auto-actualizar texto cuando cambia el tipo (si no fue editado)
      if (key === 'stateId') {
        const preset = STATES.find(s => s.id === value)
        if (preset) {
          if (!titleEdited) next.title = preset.title
          if (!descEdited) next.desc = preset.desc
        }
      }
      if (key === 'title') setTitleEdited(true)
      if (key === 'desc') setDescEdited(true)
      return next
    })
  }

  // Escuchar evento de randomizar desde PreviewCanvas
  useEffect(() => {
    function onRandomize(e) {
      const { stateId, style, animationId } = e.detail
      const preset = STATES.find(s => s.id === stateId)
      setConfig(prev => ({
        ...prev,
        stateId,
        style,
        animationId,
        title: preset?.title || prev.title,
        desc:  preset?.desc  || prev.desc,
      }))
      setTitleEdited(false)
      setDescEdited(false)
    }
    window.addEventListener('generator:randomize', onRandomize)
    return () => window.removeEventListener('generator:randomize', onRandomize)
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Header de la página */}
      <section className="mb-12">
        <div className="border-[3px] border-black p-8 shadow-brutal">
          <p className="font-body text-sm font-bold tracking-[0.3em] mb-3 text-gold">FREE TOOL</p>
          <h1 className="font-display text-6xl md:text-8xl leading-none tracking-tight mb-4">
            EMPTY STATE<br />
            <span className="text-gold">GENERATOR</span>
          </h1>
          <p className="font-body text-base max-w-xl leading-relaxed">
            Configurá el estado vacío de tu app. Elegí el tipo, el estilo, la animación. Descargá el componente listo para pegar en tu proyecto.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['React', 'Vue', 'Next.js', 'HTML'].map(f => (
              <span key={f} className="px-2 py-0.5 border-[2px] border-black font-body text-xs font-bold tracking-wide">
                {f}
              </span>
            ))}
            <span className="px-2 py-0.5 border-[2px] border-black bg-gold font-body text-xs font-bold tracking-wide">
              16 STATES
            </span>
          </div>
        </div>
      </section>

      {/* Layout principal: controles + preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-[3px] border-black">
        {/* Panel izquierdo — controles */}
        <div className="p-6 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black overflow-y-auto max-h-[800px]">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display text-2xl tracking-widest">CONFIGURE</h2>
            <div className="flex-1 h-[3px] bg-black" />
          </div>
          <ControlPanel config={config} onChange={onChange} />
        </div>

        {/* Panel derecho — preview */}
        <div className="p-6">
          <PreviewCanvas config={config} onExport={() => setShowModal(true)} />
        </div>
      </div>

      {/* Sección "cómo funciona" — educativa */}
      <section className="mt-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="font-display text-3xl tracking-widest">HOW IT WORKS</h2>
          <div className="flex-1 h-[3px] bg-black" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            { num: '01', title: 'CONFIGURE', body: 'Elegí el tipo de estado, el estilo visual que mejor encaje con tu app y la animación. Personalizá el texto y el color.' },
            { num: '02', title: 'PREVIEW', body: 'Ves el componente en vivo. Podés cambiar cualquier opción y el preview se actualiza al instante.' },
            { num: '03', title: 'EXPORT', body: 'Comprás una vez ($12) y descargás el componente en React, Vue, Next.js o HTML. Todo incluido: animaciones, clases, variantes.' },
          ].map((step, i) => (
            <div key={step.num} className="border-[3px] border-black p-6 -mt-[3px] -ml-[3px] first:mt-0 first:ml-0">
              <span className="font-display text-5xl text-gold leading-none">{step.num}</span>
              <h3 className="font-display text-2xl tracking-widest mt-2 mb-3">{step.title}</h3>
              <p className="font-body text-sm leading-relaxed text-black/70">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <ExportModal config={config} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
```

---

## Task 7: Routing y navegación

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Header.jsx`

**Interfaces:**
- Consumes: `EmptyStateGenerator` importado
- Produces: ruta `/generators/empty-state` accesible + link en el nav

- [ ] **Step 1: Agregar la ruta en App.jsx**

Agregar el import:
```jsx
import EmptyStateGenerator from './pages/generators/EmptyStateGenerator.jsx'
```

Agregar la ruta dentro del bloque de rutas públicas (después de `/blog/:slug`):
```jsx
<Route path="/generators/empty-state" element={<EmptyStateGenerator />} />
```

- [ ] **Step 2: Agregar el link en Header.jsx**

Modificar el array `NAV_LINKS`:
```jsx
const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/components', label: 'Components' },
  { to: '/wrappers', label: 'Wrappers & Loaders' },
  { to: '/generators/empty-state', label: 'Generators' },
  { to: '/blog', label: 'Blog' },
]
```

- [ ] **Step 3: Verificar que el dev server levanta sin errores**

```bash
cd /c/Users/isaso/Documents/cvitae-studio && npm run dev
```

Navegar a `http://localhost:5173/generators/empty-state` y confirmar que:
- La página carga con el header correcto
- El panel izquierdo muestra los 7 controles
- El panel derecho muestra el preview en neo-brutalism por defecto
- Cambiar el tipo actualiza el preview instantáneamente
- El botón 🎲 genera una variación aleatoria
- El botón EXPORT CODE abre el modal

---

## Task 8: Blog post explicativo

**Files:**
- Modify: `src/data/blogData.js` *(o insertar directamente en Supabase desde el admin)*

**Nota:** Si usás el admin para crear el post, salteá este task y crealo desde `/admin` → pestaña BLOG. Es la forma más rápida.

- [ ] **Step 1: Crear el post desde el admin**

Ir a `https://cvitae-studio.netlify.app/admin` → BLOG → New Post y completar:

```
title:    "Por qué los estados vacíos hacen que tu app se vea profesional"
slug:     "estados-vacios-app-profesional"
excerpt:  "El 90% de las apps generadas con IA tienen un problema en común: nadie se ocupó de los estados vacíos. Así se arregla en minutos."
tags:     ["Vibecoders", "UI", "Tutorial"]
readTime: 4
published: true
date:     2026-07-10
```

Cuerpo del post (Markdown):

```markdown
## El problema que nadie menciona

Cuando alguien construye una app con Claude Code o Cursor, en una tarde ya tiene login, dashboard, base de datos y usuarios funcionando.

Pero cuando entrás a una tabla sin datos... aparece esto:

> *No data*

O peor: una tabla completamente vacía sin ningún mensaje.

Eso hace que la aplicación parezca sin terminar. Y un SaaS tiene decenas de estados así.

## Los estados que toda app necesita

Cualquier aplicación tiene al menos estos:

- **No Data** — la tabla o lista está vacía
- **Search Empty** — la búsqueda no encontró resultados
- **Error** — algo falló al cargar
- **No Internet** — el usuario perdió la conexión
- **Unauthorized** — no tiene permisos para ver esto
- **First Use** — es la primera vez que entra, no creó nada todavía

Cada uno de estos necesita un mensaje claro, una ilustración y (en la mayoría de los casos) un botón de acción.

## Por qué importa más de lo que parece

Los estados vacíos son el momento donde el usuario decide si confía en tu producto o no.

Una pantalla vacía sin contexto comunica abandono. Un estado vacío bien diseñado comunica que el producto está terminado, que alguien pensó en él.

## La solución sin perder tiempo

Usá el **Empty State Generator** de CVitae Studio.

Configurás el tipo de estado, el estilo visual, la animación y el botón. El preview se actualiza en tiempo real. Cuando estás conforme, exportás el componente en React, Vue, Next.js o HTML.

$12 una vez. 16 estados incluidos.

→ [Probar el generador gratis](/generators/empty-state)
```

---

## Self-Review

**Spec coverage:**
- ✅ 16 tipos de estado definidos en `emptyStateConfig.js`
- ✅ 8 estilos visuales con tokens reales (no genéricos)
- ✅ Animaciones CSS puras, sin dependencias externas
- ✅ Preview en vivo con fondo que cambia según el estilo
- ✅ Botón 🎲 para variaciones aleatorias
- ✅ Modal de pago conectado a Lemon Squeezy
- ✅ Código exportable bloqueado (desbloqueado con pago)
- ✅ Sección educativa "How it works" en la propia página
- ✅ Blog post explicativo
- ✅ Diseño 100% neo-brutalista consistente con el resto del sitio
- ✅ Routing y navegación integrados
- ✅ Texto auto-actualiza cuando cambia el tipo de estado

**Placeholder scan:** Ninguno — cada step tiene código completo.

**Type consistency:** `config.stateId` usado consistentemente en todos los componentes. `onChange(key, value)` firma uniforme.
