import { products } from '../data/productsData.js'
import ProductCard from '../components/ProductCard.jsx'

const components = products.filter(p => p.category === 'component')

export default function Components() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="border-[3px] border-black p-6 md:p-8 mb-12">
        <p className="font-body text-sm font-bold tracking-[0.3em] mb-2 text-gold">CVITAE STUDIO</p>
        <h1 className="font-display text-6xl md:text-8xl leading-none">COMPONENTS</h1>
        <p className="font-body text-base mt-4 max-w-lg">
          Drop-in React components. Buy once, use in any project. No subscriptions, no lock-in.
        </p>
      </div>

      {components.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {components.map(product => (
            <div key={product.id} className="border-[3px] border-black -mt-[3px] -mr-[3px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="border-[3px] border-black p-12 text-center">
          <p className="font-display text-4xl">COMING SOON</p>
          <p className="font-body text-sm mt-3">Products loading. Check back soon.</p>
        </div>
      )}
    </div>
  )
}
