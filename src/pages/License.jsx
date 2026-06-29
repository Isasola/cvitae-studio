export default function License() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="border-[3px] border-black p-6 md:p-8 mb-12">
        <h1 className="font-display text-6xl md:text-8xl leading-none">LICENCIA</h1>
        <p className="font-body text-sm font-bold tracking-[0.3em] mt-2 text-gold">LICENSE / CVITAE STUDIO</p>
      </div>

      <div className="flex flex-col gap-0">
        {/* Allowed */}
        <section className="border-[3px] border-black p-6 -mb-[3px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-gold border-[2px] border-black flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="square">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className="font-display text-3xl tracking-wide">LO QUE PODÉS HACER</h2>
          </div>
          <p className="font-body text-base leading-relaxed mb-3">
            Usá estos componentes en tus proyectos propios o en proyectos para clientes. Sin límite de proyectos, sin royalties, sin drama.
          </p>
          <p className="font-body text-sm text-black/60 leading-relaxed italic">
            You can use these components in your own projects or in client work. Unlimited projects, no royalties, no drama.
          </p>
        </section>

        {/* Not allowed */}
        <section className="border-[3px] border-black p-6 -mb-[3px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-black border-[2px] border-black flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#F5F0E8" strokeWidth="3" strokeLinecap="square">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
            <h2 className="font-display text-3xl tracking-wide">LO QUE NO PODÉS HACER</h2>
          </div>
          <p className="font-body text-base leading-relaxed mb-3">
            No podés revender este pack como si fuera tuyo. No podés incluirlo dentro de otra librería o producto que vendas. El código es para construir, no para reempaquetar.
          </p>
          <p className="font-body text-sm text-black/60 leading-relaxed italic">
            You can't resell this pack as your own product. You can't bundle it inside another library or product you sell. The code is for building, not for repackaging.
          </p>
        </section>

        {/* Questions */}
        <section className="border-[3px] border-black p-6 bg-black text-cream">
          <h2 className="font-display text-3xl tracking-wide mb-3">¿DUDAS?</h2>
          <p className="font-body text-base leading-relaxed mb-4">
            Si tenés un caso de uso raro o querés una licencia comercial extendida, hablemos directo. Sin abogados de por medio.
          </p>
          <a
            href="https://wa.me/595992954169"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-3 bg-gold text-black border-[3px] border-gold font-body font-bold text-sm tracking-wide hover:bg-cream hover:border-cream transition-colors duration-100"
          >
            ESCRIBINOS POR WHATSAPP
          </a>
        </section>
      </div>
    </div>
  )
}
