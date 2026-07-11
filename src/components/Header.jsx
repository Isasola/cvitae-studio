import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/components', label: 'Components' },
  { to: '/wrappers', label: 'Wrappers & Loaders' },
  { to: '/generators/empty-state', label: 'Generators' },
  { to: '/blog', label: 'Blog' },
]

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream border-b-[3px] border-black">
      <div className="max-w-6xl mx-auto px-4 h-[72px] flex items-center justify-between">
        <NavLink to="/" className="flex-shrink-0">
          <img
            src="/logo.svg"
            alt="CVitae Studio"
            className="h-10"
            style={{ animation: 'logoBreathe 4s ease-in-out infinite' }}
          />
          <style>{`
            @keyframes logoBreathe {
              0%, 100% { transform: scale(1) translateY(0px); filter: drop-shadow(0 0 0px rgba(201,168,76,0)); }
              50%       { transform: scale(1.04) translateY(-1px); filter: drop-shadow(0 0 6px rgba(201,168,76,0.5)); }
            }
          `}</style>
        </NavLink>

        <nav className="flex items-center">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `px-4 py-2 border-[3px] border-black font-body font-semibold text-sm tracking-wide -ml-[3px] first:ml-0 transition-none ${
                  isActive
                    ? 'bg-black text-cream'
                    : 'bg-cream text-black hover:bg-black hover:text-cream'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
