export default function ProductCard({ product }) {
  const { name, tagline, description, price, currency, screenshot, demoUrl, buyUrl, status } = product
  const isComingSoon = status === 'coming_soon'

  return (
    <article className="border-[3px] border-black bg-cream flex flex-col relative">
      {isComingSoon && (
        <div className="absolute inset-0 z-10 bg-cream/90 border-[3px] border-black flex items-center justify-center">
          <span className="font-display text-4xl tracking-widest">COMING SOON</span>
        </div>
      )}

      <div className="border-b-[3px] border-black bg-black/5 aspect-video overflow-hidden flex items-center justify-center">
        {screenshot ? (
          <img src={screenshot} alt={name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-5xl text-black/20">PREVIEW</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-3xl leading-none">{name.toUpperCase()}</h3>
            <p className="font-body text-sm text-black/70 mt-1">{tagline}</p>
          </div>
          <div className="flex-shrink-0 border-[3px] border-black px-3 py-1 bg-gold">
            <span className="font-display text-2xl">${price}</span>
            <span className="font-body text-xs font-bold ml-1">{currency}</span>
          </div>
        </div>

        <p className="font-body text-sm leading-relaxed">{description}</p>

        <div className="flex gap-0 mt-auto pt-2">
          {buyUrl ? (
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3 bg-black text-cream border-[3px] border-black font-body font-bold text-sm tracking-wide hover:bg-gold hover:text-black transition-colors duration-100"
            >
              BUY — ${price}
            </a>
          ) : (
            <button
              disabled
              className="flex-1 py-3 bg-black/40 text-cream border-[3px] border-black font-body font-bold text-sm tracking-wide cursor-not-allowed"
            >
              BUY — ${price}
            </button>
          )}

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="-ml-[3px] flex-1 text-center py-3 bg-cream text-black border-[3px] border-black font-body font-bold text-sm tracking-wide hover:bg-black hover:text-cream transition-colors duration-100"
            >
              PREVIEW
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
