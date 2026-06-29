import ServiceCard from '../components/ServiceCard.jsx'

const SERVICES = [
  {
    illustration: 'web-tactica.svg',
    title: 'Desarrollo de páginas web tácticas',
    copy: 'No hacemos folletos digitales. Creamos terminales de conversión ultra rápidas que retienen atención en 1.5 segundos.',
  },
  {
    illustration: 'ia-web.svg',
    title: 'Integración de IA a páginas existentes',
    copy: 'Le inyectamos un cerebro a tu web actual. Conectamos modelos avanzados a tus formularios y flujos para que tu sitio trabaje solo, 24/7.',
    techBadges: ['Gemini API', 'Claude', 'AWS Bedrock'],
  },
  {
    illustration: 'admin-panel.svg',
    title: 'Admin panels y consolas de datos',
    copy: 'Centralizamos tu operación. Un solo lugar donde ves tus datos, facturación y flujos sin fricción.',
    clients: ['cvitae.lat', 'luminosapy.com'],
  },
  {
    illustration: 'componentes-ui.svg',
    title: 'Componentes UI y Wrappers premium',
    copy: 'Bloques de código limpio para developers y founders. Copiás, pegás, tenés interfaz premium funcionando.',
  },
  {
    illustration: 'loaders.svg',
    title: 'Loaders y micro-animaciones',
    copy: 'La cura para la ansiedad del usuario. Loaders que hacen que la espera se sienta como parte de la experiencia.',
  },
]

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="mb-20">
        <div className="border-[3px] border-black p-8 md:p-12">
          <p className="font-body text-sm font-bold tracking-[0.3em] mb-4 text-gold">CVITAE STUDIO</p>
          <h1 className="font-display text-7xl md:text-9xl leading-none tracking-tight mb-6">
            CÓDIGO QUE<br />
            VENDE.<br />
            <span className="text-gold">INTERFACES</span><br />
            QUE RETIENEN.
          </h1>
          <p className="font-body text-base md:text-lg max-w-xl leading-relaxed">
            Desarrollamos webs, admin panels y componentes UI con un objetivo: que cada píxel trabaje para tu negocio.
          </p>
          <div className="mt-8 flex flex-wrap gap-0">
            <a
              href="https://wa.me/595992954169"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-black text-cream border-[3px] border-black font-body font-bold text-sm tracking-wide hover:bg-gold hover:text-black transition-colors duration-100"
            >
              HABLEMOS AHORA
            </a>
            <a
              href="/components"
              className="-ml-[3px] px-6 py-4 bg-cream text-black border-[3px] border-black font-body font-bold text-sm tracking-wide hover:bg-black hover:text-cream transition-colors duration-100"
            >
              VER COMPONENTES
            </a>
          </div>
        </div>
      </section>

      {/* Section label */}
      <div className="flex items-center gap-3 mb-10">
        <h2 className="font-display text-2xl tracking-widest">SERVICIOS</h2>
        <div className="flex-1 h-[3px] bg-black" />
      </div>

      {/* Services grid — 5 cards, last one centered on its row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {SERVICES.map((service, i) => (
          <div
            key={service.title}
            className="border-b-[3px] border-r-[3px] border-black last:border-b-0 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r-[3px] lg:[&:nth-child(3n)]:border-r-0"
            style={
              SERVICES.length === 5 && i === 4
                ? { gridColumn: 'span 1 / span 1' }
                : {}
            }
          >
            <ServiceCard {...service} />
          </div>
        ))}
      </section>
    </div>
  )
}
