import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import LogoParticleLoader from '../../components/LogoParticleLoader.jsx'

export default function ParticleDemo() {
  const [userLogoSrc, setUserLogoSrc]   = useState(null)
  const [particleSize, setParticleSize] = useState(2)
  const [canvasW, setCanvasW]           = useState(340)
  const [canvasH, setCanvasH]           = useState(90)
  const [loaderKey, setLoaderKey]       = useState(0)
  const fileInputRef = useRef(null)

  function handleLogoUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setUserLogoSrc(ev.target.result)
      setLoaderKey(k => k + 1)
    }
    reader.readAsDataURL(file)
  }

  const activeLogo = userLogoSrc || '/logo-light.svg'

  const particleDescriptions = {
    1: 'Ultra fine — máximo detalle',
    2: 'Default — el balance perfecto',
    3: 'Bold — impacto visual fuerte',
    4: 'Extra bold — para logos grandes',
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
          <h1 className="font-display text-6xl md:text-8xl leading-none mb-4">LOGO<br/>PARTICLE<br/>LOADER</h1>
          <p className="font-body text-base text-cream/60 max-w-lg">
            Your logo — any PNG or SVG — explodes into particles, disappears, and slowly rebuilds itself.
            Canvas 2D. Zero dependencies.
          </p>
        </div>

        {/* Demo original */}
        <div className="border-[3px] border-gold shadow-brutal-gold bg-black mb-10 flex flex-col items-center py-14 px-8 gap-8">
          <p className="font-body text-xs tracking-[0.3em] text-gold/40">LIVE DEMO — CVITAE STUDIO LOGO</p>
          <LogoParticleLoader
            logoSrc="/logo-light.svg"
            width={420}
            height={110}
            particleSize={2}
            label="Loading..."
            autoPlay={true}
          />
          <p className="font-body text-xs text-cream/30 text-center max-w-xs">
            Watch the logo explode, vanish, then reconstruct particle by particle
          </p>
        </div>

        {/* Size variants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[3px] border-gold/30 mb-10">
          {[
            { ps: 1, label: 'particleSize={1} — ultra fine' },
            { ps: 2, label: 'particleSize={2} — default' },
            { ps: 3, label: 'particleSize={3} — bold' },
          ].map((v, i) => (
            <div key={v.ps} className={`flex flex-col items-center gap-4 p-8 bg-black ${i < 2 ? 'border-b-[2px] md:border-b-0 md:border-r-[2px] border-gold/20' : ''}`}>
              <LogoParticleLoader logoSrc="/logo-light.svg" width={200} height={52} particleSize={v.ps} autoPlay={true} />
              <code className="font-mono text-xs text-gold/40 text-center">{v.label}</code>
            </div>
          ))}
        </div>

        {/* Code snippet */}
        <div className="border-[3px] border-gold/20 bg-black mb-10 p-6">
          <p className="font-body text-xs tracking-widest text-gold/50 mb-4">USAGE</p>
          <pre className="font-mono text-xs text-cream/70 overflow-x-auto leading-relaxed">{`import LogoParticleLoader from './components/LogoParticleLoader'

<LogoParticleLoader
  logoSrc="/your-logo.svg"    // PNG or SVG
  width={420}
  height={110}
  particleSize={2}            // 1 = ultra fine, 3 = bold
  label="Loading..."
/>`}</pre>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[3px] border-gold/20 mb-12">
          {[
            ['Any logo', 'PNG or SVG. Your brand, any color, any shape.'],
            ['Canvas 2D', 'Samples every pixel. Renders as crisp circles at any size.'],
            ['Disappears completely', 'Particles fade out before rebuilding — not just blur.'],
            ['Slow reassembly', 'Rebuild is intentionally slower than explosion — feels premium.'],
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
            <div className="p-6 border-b-[3px] md:border-b-0 md:border-r-[3px] border-gold/20">
              <p className="font-display text-xl text-gold mb-4 tracking-widest">MADE FOR YOU IF...</p>
              {[
                'Trabajás con React, Next.js o Vue — con o sin IA',
                'Querés una pantalla de carga con tu propio logo',
                'Buscás diferenciarte sin animaciones genéricas',
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
                Usa Canvas API nativa del browser. Requiere React, Next.js o Vue. No funciona en builders sin código.
              </p>
            </div>
          </div>
        </div>

        {/* ── HOW TO USE ──────────────────────────────────────────────────────── */}
        <div className="border-[3px] border-gold/20 mb-12">
          <div className="px-8 py-5 border-b-[3px] border-gold/20">
            <h2 className="font-display text-3xl text-gold tracking-widest leading-none">HOW TO USE IT</h2>
            <p className="font-body text-xs text-cream/40 mt-1">Tres pasos. Tu logo en producción en menos de 2 minutos — seas dev o vibecoder.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                num: '01',
                title: 'COMPRÁS',
                body: 'Recibís un ZIP con LogoParticleLoader.jsx — el componente completo, Canvas 2D incluido, cero dependencias.',
                code: null,
              },
              {
                num: '02',
                title: 'COPIÁS',
                body: 'Extraés el archivo y lo copiás en tu carpeta components. Después copiás tu logo en /public.',
                code: 'tu-proyecto/\n  public/\n    mi-logo.svg  ← acá\n  src/\n    components/\n      LogoParticleLoader.jsx',
              },
              {
                num: '03',
                title: 'IMPORTÁS',
                body: 'Apuntás logoSrc a tu logo. Podés pedirle a tu IA que ajuste velocidad o tamaño de partícula.',
                code: "import LogoParticleLoader\n  from './components/LogoParticleLoader'\n\n<LogoParticleLoader\n  logoSrc=\"/mi-logo.svg\"\n  width={420}\n  height={110}\n  particleSize={2}\n/>",
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

        {/* ── TRY IT — YOUR LOGO ──────────────────────────────────────────────── */}
        <div className="border-[3px] border-gold mb-12">
          <div className="border-b-[3px] border-gold px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-4xl text-gold leading-none">TRY IT — YOUR LOGO</h2>
              <p className="font-body text-xs text-cream/40 mt-1">
                Subí tu logo PNG o SVG. Lo ves explotando en partículas antes de comprar.
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
                  PNG o SVG. Blanco sobre fondo oscuro funciona mejor. Tu logo se convierte en partículas.
                </p>
                <input ref={fileInputRef} type="file" accept="image/png,image/svg+xml,image/jpeg" className="hidden" onChange={handleLogoUpload} />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border-[3px] border-gold/50 bg-black font-body font-bold text-xs tracking-widest text-gold/70 hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                  {userLogoSrc ? 'CHANGE LOGO' : 'UPLOAD YOUR LOGO'}
                </button>
                {!userLogoSrc && (
                  <p className="font-body text-xs text-cream/20 mt-2">
                    Sin logo — usando el nuestro como demo
                  </p>
                )}
                {userLogoSrc && (
                  <div className="mt-3 flex items-center gap-3">
                    <img src={userLogoSrc} alt="Your logo" className="h-8 object-contain" style={{ filter: 'invert(1) brightness(0.8)' }} />
                    <button
                      onClick={() => { setUserLogoSrc(null); setLoaderKey(k => k + 1) }}
                      className="font-body text-xs text-cream/30 hover:text-cream/60"
                    >
                      remove
                    </button>
                  </div>
                )}
              </div>

              {/* Particle Size */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">02 — PARTICLE SIZE</p>
                <div className="flex gap-0">
                  {[1, 2, 3, 4].map(ps => (
                    <button key={ps}
                      onClick={() => { setParticleSize(ps); setLoaderKey(k => k + 1) }}
                      className={`flex-1 py-2 border-[2px] border-gold/40 -ml-[2px] first:ml-0 font-mono text-xs font-bold transition-none
                        ${particleSize === ps ? 'bg-gold text-black border-gold' : 'bg-black text-gold/60 hover:text-gold'}`}
                    >
                      {ps}
                    </button>
                  ))}
                </div>
                <p className="font-body text-xs text-cream/30 mt-2">{particleDescriptions[particleSize]}</p>
              </div>

              {/* Canvas size */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">03 — CANVAS SIZE</p>
                <div className="flex gap-0">
                  {[
                    { label: 'SM', w: 200, h: 60 },
                    { label: 'MD', w: 340, h: 90 },
                    { label: 'LG', w: 420, h: 110 },
                  ].map(s => (
                    <button key={s.label}
                      onClick={() => { setCanvasW(s.w); setCanvasH(s.h); setLoaderKey(k => k + 1) }}
                      className={`flex-1 py-2 border-[2px] border-gold/40 -ml-[2px] first:ml-0 font-body text-xs font-bold tracking-wide transition-none
                        ${canvasW === s.w ? 'bg-gold text-black border-gold' : 'bg-black text-gold/60 hover:text-gold'}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview en vivo */}
            <div className="p-8 flex flex-col items-center justify-center gap-6 bg-black min-h-[280px]">
              <p className="font-body text-xs tracking-widest text-gold/30">LIVE PREVIEW</p>
              <LogoParticleLoader
                key={loaderKey}
                logoSrc={activeLogo}
                width={canvasW}
                height={canvasH}
                particleSize={particleSize}
                label="Loading..."
                autoPlay={true}
              />
              {userLogoSrc && (
                <p className="font-body text-xs text-gold/30 text-center max-w-xs">
                  Eso es tu logo. Explotando en partículas. Así se ve en tu app.
                </p>
              )}
              {!userLogoSrc && (
                <p className="font-body text-xs text-gold/20 text-center max-w-xs">
                  Subí tu logo para ver el efecto con tu marca →
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
