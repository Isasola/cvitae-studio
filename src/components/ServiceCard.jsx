const WA_URL = 'https://wa.me/595992954169'

export default function ServiceCard({ illustration, title, copy, techBadges, clients }) {
  return (
    <article className="border-[3px] border-black bg-cream flex flex-col shadow-brutal transition-shadow hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] duration-100">
      <div className="border-b-[3px] border-black">
        <img
          src={`/illustrations/${illustration}`}
          alt={title}
          className="w-full block"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 gap-4">
        <h3 className="font-display text-3xl tracking-wide leading-none">{title.toUpperCase()}</h3>
        <p className="font-body text-sm leading-relaxed">{copy}</p>

        {techBadges && techBadges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techBadges.map(badge => (
              <span
                key={badge}
                className="font-body text-xs font-bold px-2 py-1 border-[2px] border-black bg-black text-cream"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {clients && clients.length > 0 && (
          <p className="font-body text-xs text-black/60">
            Clientes que usan esto:{' '}
            {clients.map((c, i) => (
              <span key={c}>
                <span className="font-semibold">{c}</span>
                {i < clients.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        )}

        <div className="mt-auto pt-2">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-black text-cream border-[3px] border-black font-body font-bold text-sm tracking-wide shadow-brutal-sm hover:bg-gold hover:text-black hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-100"
          >
            HABLEMOS POR WHATSAPP
          </a>
        </div>
      </div>
    </article>
  )
}
