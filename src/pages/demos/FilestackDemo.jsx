import { Link } from 'react-router-dom'
import FileStackLoader from '../../components/FileStackLoader.jsx'

export default function FilestackDemo() {
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

        {/* Main demo — dark stage */}
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

// Basic
<FileStackLoader />

// Custom
<FileStackLoader
  size="lg"           // "sm" | "md" | "lg"
  speed="normal"      // "slow" | "normal" | "fast"
  label="Uploading..."
/>

// No label
<FileStackLoader size="sm" speed="fast" label={null} />`}</pre>
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

        {/* CTA */}
        <div className="border-[3px] border-gold bg-gold/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-3xl text-gold">$9 USD</p>
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
