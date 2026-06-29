import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-black bg-cream mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 gap-8">
        <div>
          <p className="font-display text-xl tracking-widest mb-4">NAVEGACIÓN</p>
          <nav className="flex flex-col gap-2">
            <NavLink to="/" className="font-body text-sm font-medium text-black hover:text-gold transition-colors">Home</NavLink>
            <NavLink to="/components" className="font-body text-sm font-medium text-black hover:text-gold transition-colors">Components</NavLink>
            <NavLink to="/wrappers" className="font-body text-sm font-medium text-black hover:text-gold transition-colors">Wrappers & Loaders</NavLink>
            <NavLink to="/license" className="font-body text-sm font-medium text-black hover:text-gold transition-colors">License</NavLink>
          </nav>
        </div>

        <div>
          <p className="font-display text-xl tracking-widest mb-4">CONTACTO</p>
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/595992954169"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-medium text-black hover:text-gold transition-colors"
            >
              WhatsApp: +595 992 954169
            </a>
            <a
              href="mailto:contacto@cvitae.lat"
              className="font-body text-sm font-medium text-black hover:text-gold transition-colors"
            >
              contacto@cvitae.lat
            </a>
          </div>
        </div>
      </div>

      <div className="border-t-[3px] border-black px-4 py-4 max-w-6xl mx-auto">
        <p className="font-body text-xs text-black/60">
          © CVitae Studio — studio.cvitae.lat
        </p>
      </div>
    </footer>
  )
}
