import { Link } from 'react-router-dom'
import LogoParticleLoader from '../../components/LogoParticleLoader.jsx'

export default function ParticleDemo() {
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

        {/* Main demo */}
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
              <LogoParticleLoader
                logoSrc="/logo-light.svg"
                width={200}
                height={52}
                particleSize={v.ps}
                autoPlay={true}
              />
              <code className="font-mono text-xs text-gold/40 text-center">{v.label}</code>
            </div>
          ))}
        </div>

        {/* Code snippet */}
        <div className="border-[3px] border-gold/20 bg-black mb-10 p-6">
          <p className="font-body text-xs tracking-widest text-gold/50 mb-4">USAGE</p>
          <pre className="font-mono text-xs text-cream/70 overflow-x-auto leading-relaxed">{`import LogoParticleLoader from './components/LogoParticleLoader'

// Basic — auto-loops
<LogoParticleLoader
  logoSrc="/your-logo.svg"
  width={420}
  height={110}
  particleSize={2}
  label="Loading..."
/>

// Static — no animation
<LogoParticleLoader
  logoSrc="/your-logo.png"
  width={300}
  height={80}
  autoPlay={false}
/>

// CORS note: use same-origin images or add crossorigin headers`}</pre>
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
              BUY ON WHATSAPP
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
