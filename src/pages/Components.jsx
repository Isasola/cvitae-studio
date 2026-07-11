import { Link } from 'react-router-dom'
import { useAdminProducts } from '../hooks/useAdminData.js'
import ProductCard from '../components/ProductCard.jsx'

function LiveProductCard({ title, tagline, price, demoPath, tags, preview }) {
  return (
    <article className="border-[3px] border-black bg-cream flex flex-col relative shadow-brutal transition-all hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] duration-100">
      <div className="border-b-[3px] border-black overflow-hidden" style={{ minHeight: 160 }}>
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
  const dbComponents = products.filter(p => p.category === 'component')

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

      {/* Productos con demo en vivo */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-display text-2xl tracking-widest">FEATURED</h2>
        <div className="flex-1 h-[3px] bg-black" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 mb-12">

        {/* GrowthLine */}
        <div className="border-[3px] border-black -mt-[3px] -mr-[3px]">
          <LiveProductCard
            title="Growth Line"
            tagline="SVG animado. Punto de luz viajero. Cero dependencias."
            price={9}
            demoPath="/demo/growth-line"
            tags={['SVG', 'Zero deps', 'React', 'HTML']}
            preview={
              <div className="w-full bg-black flex items-center justify-center p-8 min-h-[160px]">
                <GrowthLine className="w-full h-14" variant="hero" />
              </div>
            }
          />
        </div>

        {/* Neo Brutalism Kit */}
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

        {/* Productos de Supabase */}
        {dbComponents.map(product => (
          <div key={product.id} className="border-[3px] border-black -mt-[3px] -mr-[3px]">
            <ProductCard product={product} />
          </div>
        ))}

      </div>

      {dbComponents.length === 0 && (
        <div className="border-[3px] border-black/20 border-dashed p-8 text-center">
          <p className="font-display text-2xl text-black/30">MORE COMING SOON</p>
        </div>
      )}

    </div>
  )
}
