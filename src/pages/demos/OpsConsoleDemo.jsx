import { useState } from 'react'
import { Link } from 'react-router-dom'

// ── Datos simulados del panel ────────────────────────────────────────────────

const USERS = [
  { id: 1, name: 'Ana Torres',    role: 'Admin',  status: 'active',   last: '2 min ago' },
  { id: 2, name: 'Leo Martín',    role: 'Editor', status: 'active',   last: '1 hr ago'  },
  { id: 3, name: 'Sara Díaz',     role: 'Viewer', status: 'inactive', last: '3 days ago' },
  { id: 4, name: 'Marcos Gil',    role: 'Editor', status: 'active',   last: '15 min ago' },
]

const CONTENT = [
  { id: 1, title: 'Getting Started Guide', type: 'doc',  status: 'published', updated: 'today'      },
  { id: 2, title: 'API Reference v2',       type: 'doc',  status: 'draft',     updated: 'yesterday'  },
  { id: 3, title: 'Onboarding Flow',        type: 'page', status: 'published', updated: '2 days ago' },
  { id: 4, title: 'Changelog Q2',           type: 'doc',  status: 'archived',  updated: '1 week ago' },
]

const TOKENS = [
  { id: 1, name: 'Production API',   prefix: 'sk-prod-*****', created: 'Jan 12', used: '2 min ago',  active: true  },
  { id: 2, name: 'Dev Environment',  prefix: 'sk-dev-******', created: 'Feb 3',  used: '1 hr ago',   active: true  },
  { id: 3, name: 'Legacy Client',    prefix: 'sk-old-******', created: 'Aug 9',  used: '45 days ago',active: false },
]

const BRIEFS = [
  { id: 1, tag: 'SPRINT',   text: 'Deploy new auth flow by Friday — backend ready, waiting on UI.',    time: '09:14' },
  { id: 2, tag: 'ALERT',    text: 'Token sk-old revocado automáticamente por inactividad (+30 días).',  time: '08:52' },
  { id: 3, tag: 'INFO',     text: 'Leo publicó "API Reference v2 draft". Revisión pendiente.',          time: '08:31' },
  { id: 4, tag: 'SYSTEM',   text: 'Backup completado. 4 archivos archivados, 0 errores.',               time: 'Yesterday' },
]

const TABS = ['BRIEF ROOM', 'USERS', 'CONTENT', 'TOKENS']

// ── UI del panel simulado ────────────────────────────────────────────────────

function StatusDot({ active }) {
  return (
    <span className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: active ? '#4ade80' : '#6b7280' }} />
  )
}

function PanelBrief() {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
        <span className="font-mono text-xs text-white/30">SYSTEM LOG — {new Date().toLocaleDateString('en-US', {month:'short', day:'numeric'})}</span>
        <span className="font-mono text-xs text-green-400/60">● LIVE</span>
      </div>
      {BRIEFS.map(b => (
        <div key={b.id} className="flex items-start gap-3 px-5 py-3 border-b border-white/5 hover:bg-white/5 transition-colors">
          <span className={`px-2 py-0.5 font-mono text-[10px] font-bold flex-shrink-0 mt-0.5 ${
            b.tag === 'ALERT'  ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
            b.tag === 'SPRINT' ? 'bg-gold/20 text-gold border border-gold/30' :
            b.tag === 'INFO'   ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                                 'bg-white/10 text-white/40 border border-white/10'
          }`}>{b.tag}</span>
          <p className="font-mono text-xs text-white/60 leading-relaxed flex-1">{b.text}</p>
          <span className="font-mono text-[10px] text-white/20 flex-shrink-0">{b.time}</span>
        </div>
      ))}
    </div>
  )
}

function PanelUsers() {
  return (
    <div>
      <div className="grid grid-cols-4 px-5 py-2 border-b border-white/10">
        {['USER', 'ROLE', 'STATUS', 'LAST SEEN'].map(h => (
          <span key={h} className="font-mono text-[10px] text-white/30 tracking-wider">{h}</span>
        ))}
      </div>
      {USERS.map(u => (
        <div key={u.id} className="grid grid-cols-4 items-center px-5 py-3 border-b border-white/5 hover:bg-white/5 transition-colors">
          <span className="font-mono text-xs text-white/80">{u.name}</span>
          <span className="font-mono text-xs text-gold/70">{u.role}</span>
          <span className="flex items-center gap-1.5">
            <StatusDot active={u.status === 'active'} />
            <span className="font-mono text-[10px] text-white/40">{u.status}</span>
          </span>
          <span className="font-mono text-[10px] text-white/30">{u.last}</span>
        </div>
      ))}
    </div>
  )
}

function PanelContent() {
  return (
    <div>
      <div className="grid grid-cols-4 px-5 py-2 border-b border-white/10">
        {['TITLE', 'TYPE', 'STATUS', 'UPDATED'].map(h => (
          <span key={h} className="font-mono text-[10px] text-white/30 tracking-wider">{h}</span>
        ))}
      </div>
      {CONTENT.map(c => (
        <div key={c.id} className="grid grid-cols-4 items-center px-5 py-3 border-b border-white/5 hover:bg-white/5 transition-colors">
          <span className="font-mono text-xs text-white/80 truncate pr-2">{c.title}</span>
          <span className="font-mono text-xs text-white/40 uppercase">{c.type}</span>
          <span className={`font-mono text-[10px] px-2 py-0.5 w-fit ${
            c.status === 'published' ? 'bg-green-500/20 text-green-400' :
            c.status === 'draft'     ? 'bg-yellow-500/20 text-yellow-400' :
                                       'bg-white/10 text-white/30'
          }`}>{c.status}</span>
          <span className="font-mono text-[10px] text-white/30">{c.updated}</span>
        </div>
      ))}
    </div>
  )
}

function PanelTokens() {
  return (
    <div>
      <div className="grid grid-cols-4 px-5 py-2 border-b border-white/10">
        {['TOKEN NAME', 'PREFIX', 'LAST USED', 'STATUS'].map(h => (
          <span key={h} className="font-mono text-[10px] text-white/30 tracking-wider">{h}</span>
        ))}
      </div>
      {TOKENS.map(t => (
        <div key={t.id} className="grid grid-cols-4 items-center px-5 py-3 border-b border-white/5 hover:bg-white/5 transition-colors">
          <span className="font-mono text-xs text-white/80">{t.name}</span>
          <span className="font-mono text-xs text-gold/60">{t.prefix}</span>
          <span className="font-mono text-[10px] text-white/30">{t.used}</span>
          <span className="flex items-center gap-1.5">
            <StatusDot active={t.active} />
            <span className="font-mono text-[10px] text-white/40">{t.active ? 'active' : 'revoked'}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

function OpsConsolePanel({ activeTab, onTabChange }) {
  return (
    <div className="border-[3px] border-gold/50 bg-[#0d0d0d] flex flex-col" style={{ fontFamily: 'monospace' }}>
      {/* Topbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b-[2px] border-white/10 bg-black/40">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-xs text-white/30">OPS CONSOLE — v1.0</span>
        </div>
        <span className="font-mono text-[10px] text-gold/50">● CONNECTED</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {TABS.map((tab, i) => (
          <button key={tab} onClick={() => onTabChange(i)}
            className={`px-5 py-2.5 font-mono text-xs tracking-widest transition-none border-r border-white/10 last:border-r-0
              ${activeTab === i
                ? 'bg-gold/10 text-gold border-b-[2px] border-b-gold'
                : 'text-white/30 hover:text-white/60 hover:bg-white/5'
              }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="overflow-auto" style={{ minHeight: 220 }}>
        {activeTab === 0 && <PanelBrief />}
        {activeTab === 1 && <PanelUsers />}
        {activeTab === 2 && <PanelContent />}
        {activeTab === 3 && <PanelTokens />}
      </div>

      {/* Statusbar */}
      <div className="flex items-center gap-4 px-5 py-2 border-t border-white/10 bg-black/40">
        <span className="font-mono text-[10px] text-white/20">4 modules loaded</span>
        <span className="font-mono text-[10px] text-white/10">|</span>
        <span className="font-mono text-[10px] text-green-400/40">no errors</span>
        <span className="font-mono text-[10px] text-white/10 ml-auto">React 18 + Tailwind</span>
      </div>
    </div>
  )
}

// ── Página de demo ────────────────────────────────────────────────────────────

export default function OpsConsoleDemo() {
  const [activeTab, setActiveTab] = useState(0)

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
          <h1 className="font-display text-6xl md:text-8xl leading-none mb-4">OPS<br/>CONSOLE UI</h1>
          <p className="font-body text-base text-cream/60 max-w-lg">
            Panel de control completo en un solo componente React. Brief room, usuarios, contenido y tokens — todo en una terminal dark. Drop-in en cualquier proyecto.
          </p>
          <div className="flex flex-wrap gap-0 mt-4">
            {['React 18', 'Tailwind', 'Zero deps', '4 módulos', 'Dark terminal'].map(tag => (
              <span key={tag} className="-ml-[2px] first:ml-0 px-3 py-1 border-[2px] border-gold/40 font-body text-xs font-bold tracking-wide text-gold/70">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Demo interactivo principal */}
        <div className="border-[3px] border-gold shadow-brutal-gold mb-10">
          <div className="px-6 pt-6 pb-3 bg-black/20">
            <p className="font-body text-xs tracking-[0.3em] text-gold/40">INTERACTIVE DEMO — CLICK THE TABS</p>
          </div>
          <OpsConsolePanel activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[3px] border-gold/20 mb-12">
          {[
            {
              icon: '◈',
              title: 'BRIEF ROOM',
              desc: 'Log de sistema en vivo. Alertas, sprints, cambios de estado. El equipo ve todo en un lugar.',
            },
            {
              icon: '◉',
              title: 'USERS',
              desc: 'Lista de usuarios con roles, estado activo/inactivo y última actividad. Sin librerías de tablas.',
            },
            {
              icon: '◌',
              title: 'CONTENT',
              desc: 'Gestión de docs y páginas con estados published / draft / archived. Filtrable y ordenable.',
            },
            {
              icon: '◎',
              title: 'TOKENS',
              desc: 'Gestión de API keys con prefijo enmascarado, fecha de creación y botón de revocación.',
            },
          ].map(({ icon, title, desc }, i) => (
            <div key={title} className={`p-6 ${i % 2 === 0 ? 'border-r-[2px] border-gold/10' : ''} ${i < 2 ? 'border-b-[2px] border-gold/10' : ''}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xl text-gold">{icon}</span>
                <p className="font-display text-xl text-gold tracking-widest">{title}</p>
              </div>
              <p className="font-body text-xs text-cream/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Screenshot real */}
        <div className="border-[3px] border-gold/20 mb-12">
          <div className="px-6 py-3 border-b-[2px] border-gold/10">
            <p className="font-body text-xs tracking-widest text-gold/30">PRODUCT SCREENSHOT</p>
          </div>
          <div className="p-4 bg-black/20">
            <img
              src="/products/ops-console-screenshot.png"
              alt="OPS Console UI screenshot"
              className="w-full border-[2px] border-white/10"
              loading="lazy"
            />
          </div>
        </div>

        {/* Who is it for */}
        <div className="border-[3px] border-gold/30 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-6 border-b-[3px] md:border-b-0 md:border-r-[3px] border-gold/20">
              <p className="font-display text-xl text-gold mb-4 tracking-widest">MADE FOR YOU IF...</p>
              {[
                'Tu app necesita un panel de admin básico rápido',
                'Trabajás con React + Tailwind — con o sin IA',
                'Querés un dashboard que se vea profesional desde el día 1',
                'Preferís una base funcional a construir desde cero',
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
                'Proyectos sin entorno React + Tailwind',
                'Constructores no-code o low-code',
              ].map(t => (
                <div key={t} className="flex items-start gap-2 mb-2">
                  <span className="text-cream/30 font-bold text-sm mt-0.5">✗</span>
                  <p className="font-body text-sm text-cream/30">{t}</p>
                </div>
              ))}
              <p className="font-body text-xs text-cream/20 mt-4 leading-relaxed">
                Es un componente React puro. Si tu proyecto tiene Tailwind, lo pegás y funciona.
              </p>
            </div>
          </div>
        </div>

        {/* How to use */}
        <div className="border-[3px] border-gold/20 mb-12">
          <div className="px-8 py-5 border-b-[3px] border-gold/20">
            <h2 className="font-display text-3xl text-gold tracking-widest leading-none">HOW TO USE IT</h2>
            <p className="font-body text-xs text-cream/40 mt-1">Tres pasos. Panel funcionando en menos de 5 minutos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                num: '01', title: 'COMPRÁS',
                body: 'Recibís un ZIP con OpsConsole.jsx y sus sub-componentes — todo listo para pegar.',
                code: null,
              },
              {
                num: '02', title: 'COPIÁS',
                body: 'Copiás la carpeta OpsConsole/ dentro de tu /components. Sin instalar nada.',
                code: 'tu-proyecto/\n  src/\n    components/\n      OpsConsole/\n        index.jsx  ← acá',
              },
              {
                num: '03', title: 'CONECTÁS',
                body: 'Reemplazás los datos mockeados con tu API o Supabase. Tu IA conecta los endpoints en minutos.',
                code: "import OpsConsole\n  from './components/OpsConsole'\n\n<OpsConsole\n  users={yourUsers}\n  content={yourContent}\n  tokens={yourTokens}\n/>",
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
