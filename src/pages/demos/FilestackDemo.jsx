import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import FileStackLoader from '../../components/FileStackLoader.jsx'

export default function FilestackDemo() {
  const [boxLogoSrc, setBoxLogoSrc] = useState(null)
  const [speed, setSpeed]           = useState('normal')
  const [size, setSize]             = useState('lg')
  const [label, setLabel]           = useState('Organizing files...')
  const fileInputRef = useRef(null)

  function handleLogoUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setBoxLogoSrc(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-black text-cream">
      {/* Nav */}
      <div className="border-b-[3px] border-gold px-6 py-4 flex items-center justify-between">
        <Link to="/wrappers" className="font-body text-xs font-bold tracking-widest text-gold/60 hover:text-gold transition-colors">
          ← WRAPPERS & LOADERS
        </Link>
        <span className="font-body text-xs tracking-widest text-gold/40">LIVE DEMO</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="font-body text-xs font-bold tracking-[0.3em] text-gold mb-3">CVITAE STUDIO — LOADER</p>
          <h1 className="font-display text-6xl md:text-8xl leading-none mb-4">FILESTACK<br/>LOADER</h1>
          <p className="font-body text-base text-cream/60 max-w-lg">
            Dr. Filo — your robot archivist — tosses files into the stack box via arc trajectories.
            Folders land first. Files follow with names.
          </p>
        </div>

        {/* Demo estático original */}
        <div className="border-[3px] border-gold shadow-brutal-gold bg-black mb-10 flex flex-col items-center py-14 gap-8">
          <p className="font-body text-xs tracking-[0.3em] text-gold/40">INTERACTIVE DEMO</p>
          <div className="flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-16 flex-wrap">
            <div className="flex flex-col items-center gap-3">
              <FileStackLoader size="lg" speed="normal" label="Organizing files..." />
              <code className="font-mono text-xs text-gold/40">size="lg" speed="normal"</code>
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[3px] border-gold/30 mb-10">
          {[
            { size: 'sm', speed: 'fast',   label: 'Processing...' },
            { size: 'md', speed: 'normal', label: 'Loading...' },
            { size: 'lg', speed: 'slow',   label: 'Archiving...' },
          ].map((v, i) => (
            <div key={v.size} className={`flex flex-col items-center gap-4 p-8 bg-black ${i < 2 ? 'border-b-[2px] md:border-b-0 md:border-r-[2px] border-gold/20' : ''}`}>
              <FileStackLoader size={v.size} speed={v.speed} label={v.label} />
              <div className="text-center">
                <code className="font-mono text-xs text-gold/50 block">size="{v.size}"</code>
                <code className="font-mono text-xs text-gold/50 block">speed="{v.speed}"</code>
              </div>
            </div>
          ))}
        </div>

        {/* Code snippet */}
        <div className="border-[3px] border-gold/20 bg-black mb-10 p-6">
          <p className="font-body text-xs tracking-widest text-gold/50 mb-4">USAGE</p>
          <pre className="font-mono text-xs text-cream/70 overflow-x-auto leading-relaxed">{`import FileStackLoader from './components/FileStackLoader'

<FileStackLoader
  size="lg"           // "sm" | "md" | "lg"
  speed="normal"      // "slow" | "normal" | "fast"
  label="Uploading..."
/>`}</pre>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[3px] border-gold/20 mb-12">
          {[
            ['Zero dependencies', 'Pure React + CSS keyframes. No animation libraries.'],
            ['Arc trajectories', 'Files fly in realistic arcs — not straight lines.'],
            ['Logical sequence', 'Folder first, then docs, images, code. Makes sense.'],
            ['Original character', 'Dr. Filo is 100% original SVG — no licensing issues.'],
          ].map(([title, desc], i) => (
            <div key={title} className={`p-6 ${i % 2 === 0 ? 'border-r-[2px] border-gold/10' : ''} ${i < 2 ? 'border-b-[2px] border-gold/10' : ''}`}>
              <p className="font-display text-xl text-gold mb-1">{title}</p>
              <p className="font-body text-xs text-cream/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── WHO IS THIS FOR ────────────────────────────────────────────────── */}
        <div className="border-[3px] border-gold/30 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Para quién sí */}
            <div className="p-6 border-b-[3px] md:border-b-0 md:border-r-[3px] border-gold/20">
              <p className="font-display text-xl text-gold mb-4 tracking-widest">MADE FOR YOU IF...</p>
              {[
                'Trabajás con React, Next.js o Vue — con o sin IA',
                'Querés un loader original sin buscar en Google',
                'Tu proyecto tiene una carpeta /components',
                'Valorás componentes bien hechos que copias y pegas',
              ].map(t => (
                <div key={t} className="flex items-start gap-2 mb-2">
                  <span className="text-gold font-bold text-sm mt-0.5">✓</span>
                  <p className="font-body text-sm text-cream/70">{t}</p>
                </div>
              ))}
            </div>
            {/* Para quién no */}
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
                Es un componente React puro — no un plugin ni un widget. Si no usás JS moderno, este producto no es para vos.
              </p>
            </div>
          </div>
        </div>

        {/* ── HOW TO USE ──────────────────────────────────────────────────────── */}
        <div className="border-[3px] border-gold/20 mb-12">
          <div className="px-8 py-5 border-b-[3px] border-gold/20">
            <h2 className="font-display text-3xl text-gold tracking-widest leading-none">HOW TO USE IT</h2>
            <p className="font-body text-xs text-cream/40 mt-1">Tres pasos. Menos de 2 minutos — seas dev experimentado o estés empezando con IA.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                num: '01',
                title: 'COMPRÁS',
                body: 'Recibís un ZIP con el archivo FileStackLoader.jsx — el componente completo, listo para usar.',
                code: null,
              },
              {
                num: '02',
                title: 'COPIÁS',
                body: 'Extraés el archivo y lo copiás dentro de la carpeta components de tu proyecto.',
                code: 'tu-proyecto/\n  src/\n    components/\n      FileStackLoader.jsx  ← acá',
              },
              {
                num: '03',
                title: 'IMPORTÁS',
                body: 'Lo importás en tu página y lo usás. Tu IA lo adapta en segundos si necesitás cambios.',
                code: "import FileStackLoader\n  from './components/FileStackLoader'\n\n<FileStackLoader\n  size=\"lg\"\n  speed=\"normal\"\n  label=\"Uploading...\"\n/>",
              },
            ].map((step, i) => (
              <div key={step.num} className={`p-6 ${i < 2 ? 'border-b-[2px] md:border-b-0 md:border-r-[2px] border-gold/10' : ''}`}>
                <span className="font-display text-4xl text-gold/40 leading-none">{step.num}</span>
                <h3 className="font-display text-xl text-gold tracking-widest mt-1 mb-2">{step.title}</h3>
                <p className="font-body text-xs text-cream/50 leading-relaxed mb-3">{step.body}</p>
                {step.code && (
                  <pre className="font-mono text-[10px] text-gold/50 bg-white/5 p-3 leading-relaxed overflow-x-auto">{step.code}</pre>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── TRY IT — YOUR BRAND ─────────────────────────────────────────────── */}
        <div className="border-[3px] border-gold mb-12">
          <div className="border-b-[3px] border-gold px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-4xl text-gold leading-none">TRY IT — YOUR BRAND</h2>
              <p className="font-body text-xs text-cream/40 mt-1">
                Subí tu logo, ajustá la velocidad. Lo ves en acción antes de comprar.
              </p>
            </div>
            <span className="font-body text-xs text-gold/40 border-[2px] border-gold/40 px-3 py-1 flex-shrink-0">FREE PREVIEW</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Controles */}
            <div className="p-8 border-b-[3px] md:border-b-0 md:border-r-[3px] border-gold/30 flex flex-col gap-6">

              {/* Logo upload */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">01 — YOUR LOGO</p>
                <p className="font-body text-xs text-cream/30 mb-3 leading-relaxed">
                  Aparece dentro del cuadro receptor — tu producto recibiendo los uploads.
                </p>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border-[3px] border-gold/50 bg-black font-body font-bold text-xs tracking-widest text-gold/70 hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                  {boxLogoSrc ? 'CHANGE LOGO' : 'UPLOAD YOUR LOGO'}
                </button>
                {boxLogoSrc && (
                  <div className="mt-3 flex items-center gap-3">
                    <img src={boxLogoSrc} alt="Your logo" className="h-8 object-contain" />
                    <button onClick={() => setBoxLogoSrc(null)} className="font-body text-xs text-cream/30 hover:text-cream/60">
                      remove
                    </button>
                  </div>
                )}
              </div>

              {/* Speed */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">02 — SPEED</p>
                <div className="flex gap-0">
                  {['slow', 'normal', 'fast'].map(s => (
                    <button key={s} onClick={() => setSpeed(s)}
                      className={`flex-1 py-2 border-[2px] border-gold/40 -ml-[2px] first:ml-0 font-body text-xs font-bold tracking-wide transition-none
                        ${speed === s ? 'bg-gold text-black border-gold' : 'bg-black text-gold/60 hover:text-gold'}`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">03 — SIZE</p>
                <div className="flex gap-0">
                  {['sm', 'md', 'lg'].map(s => (
                    <button key={s} onClick={() => setSize(s)}
                      className={`flex-1 py-2 border-[2px] border-gold/40 -ml-[2px] first:ml-0 font-body text-xs font-bold tracking-wide transition-none
                        ${size === s ? 'bg-gold text-black border-gold' : 'bg-black text-gold/60 hover:text-gold'}`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Label */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">04 — LOADING TEXT</p>
                <input
                  type="text"
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  className="w-full px-3 py-2 bg-black border-[2px] border-gold/30 font-mono text-xs text-cream/70 focus:outline-none focus:border-gold"
                  placeholder="Uploading..."
                />
              </div>
            </div>

            {/* Preview en vivo */}
            <div className="p-8 flex flex-col items-center justify-center gap-6 bg-black min-h-[280px]">
              <p className="font-body text-xs tracking-widest text-gold/30">LIVE PREVIEW</p>
              <FileStackLoader size={size} speed={speed} label={label || null} boxLogoSrc={boxLogoSrc} />
              {boxLogoSrc && (
                <p className="font-body text-xs text-gold/30 text-center max-w-xs">
                  Tu logo en el cuadro receptor — sutil, profesional. Dr. Filo sigue trabajando.
                </p>
              )}
              {!boxLogoSrc && (
                <p className="font-body text-xs text-gold/20 text-center max-w-xs">
                  Subí tu logo para verlo integrado en la animación →
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-[3px] border-gold bg-gold/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-3xl text-gold">$12 USD</p>
            <p className="font-body text-sm text-cream/60 mt-1">One-time. Use in unlimited projects.</p>
          </div>
          <div className="flex gap-0">
            <a
              href="https://wa.me/595992954169"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gold text-black border-[3px] border-gold font-body font-bold text-sm tracking-wide hover:bg-cream transition-colors"
            >
              BUY NOW
            </a>
            <Link
              to="/wrappers"
              className="-ml-[3px] px-6 py-3 bg-black text-gold border-[3px] border-gold font-body font-bold text-sm tracking-wide hover:bg-gold/10 transition-colors"
            >
              BACK TO STORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
