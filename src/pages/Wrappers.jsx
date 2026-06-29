import { useAdminProducts } from '../hooks/useAdminData.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Wrappers() {
  const { products } = useAdminProducts()
  const wrappers = products.filter(p => p.category === 'wrapper' || p.category === 'loader')
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="border-[3px] border-black p-6 md:p-8 mb-12">
        <p className="font-body text-sm font-bold tracking-[0.3em] mb-2 text-gold">CVITAE STUDIO</p>
        <h1 className="font-display text-6xl md:text-8xl leading-none">WRAPPERS<br />&amp; LOADERS</h1>
        <p className="font-body text-base mt-4 max-w-lg">
          Animation wrappers and loaders that make waiting feel like part of the experience.
        </p>
      </div>

      {wrappers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {wrappers.map(product => (
            <div key={product.id} className="border-[3px] border-black -mt-[3px] -mr-[3px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="border-[3px] border-black p-12 text-center">
          <p className="font-display text-4xl">COMING SOON</p>
          <p className="font-body text-sm mt-3">
            Loaders and animation wrappers landing soon.
          </p>
          <a
            href="https://wa.me/595992954169"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-5 py-3 bg-black text-cream border-[3px] border-black font-body font-bold text-sm tracking-wide hover:bg-gold hover:text-black transition-colors duration-100"
          >
            GET NOTIFIED
          </a>
        </div>
      )}
    </div>
  )
}
