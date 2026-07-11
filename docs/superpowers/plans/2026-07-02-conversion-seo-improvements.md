# CVitae Studio — Conversion & SEO Improvements

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mejorar conversión y SEO de cvitae-studio.netlify.app con mobile menu, sección de precios, fix de footer, y configuración de Google Analytics + Search Console.

**Architecture:** Cambios incrementales sobre la base existente. Cada tarea es independiente y no rompe las demás. No se toca lógica de Supabase ni el admin panel. Todo se prueba local con `npm run dev`.

**Tech Stack:** React 18, Vite 5, Tailwind CSS v3, React Router v6. No agregar dependencias nuevas.

## Global Constraints

- Estilos: cream `#F5F0E8`, black `#111111`, gold `#C9A84C`
- Fuentes: `font-display` (Bebas Neue), `font-body` (Space Grotesk)
- Borders: siempre `border-[3px] border-black`
- Hover: siempre `hover:translate-x-[4-6px] hover:translate-y-[4-6px]` + cambio de shadow
- `shadow-brutal` = `4px 4px 0px #111111`, `shadow-brutal-sm` = `2px 2px 0px #111111`
- Sin border-radius (estilo brutalista cuadrado)
- Repo: `C:\Users\isaso\Documents\cvitae-studio`
- **NO hacer push a GitHub** — solo trabajar local hasta tener todo listo

---

### Task 1: Fix Footer URL + shadow-brutal en Tailwind config

**Files:**
- Modify: `src/components/Footer.jsx`
- Modify: `tailwind.config.js`

**Interfaces:**
- Produce: clase `shadow-brutal` y `shadow-brutal-sm` disponibles globalmente en Tailwind

- [ ] **Step 1: Agregar shadow-brutal al tailwind.config.js**

Reemplazar el bloque `extend` en `tailwind.config.js`:

```js
extend: {
  colors: {
    cream: '#F5F0E8',
    black: '#111111',
    gold: '#C9A84C',
  },
  fontFamily: {
    display: ['Bebas Neue', 'sans-serif'],
    body: ['Space Grotesk', 'sans-serif'],
  },
  borderWidth: {
    3: '3px',
    4: '4px',
  },
  borderRadius: {
    DEFAULT: '2px',
    none: '0px',
    sm: '2px',
  },
  boxShadow: {
    brutal: '4px 4px 0px #111111',
    'brutal-sm': '2px 2px 0px #111111',
    'brutal-gold': '4px 4px 0px #C9A84C',
  },
},
```

- [ ] **Step 2: Fix URL en Footer.jsx**

En `src/components/Footer.jsx`, línea 42, cambiar:
```jsx
© CVitae Studio — studio.cvitae.lat
```
por:
```jsx
© CVitae Studio — cvitae-studio.netlify.app
```

- [ ] **Step 3: Verificar local**

Correr `npm run dev`, abrir `http://localhost:5173`, hacer scroll hasta el footer y verificar que dice `cvitae-studio.netlify.app`.

---

### Task 2: Mobile Menu (Hamburger)

**Files:**
- Modify: `src/components/Header.jsx`

**Interfaces:**
- Consumes: nada nuevo — solo clases Tailwind y React state
- Produces: header con menú hamburger funcional en mobile, mismo nav en desktop

- [ ] **Step 1: Reemplazar Header.jsx completo**

```jsx
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/components', label: 'Components' },
  { to: '/wrappers', label: 'Wrappers & Loaders' },
  { to: '/blog', label: 'Blog' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream border-b-[3px] border-black">
      <div className="max-w-6xl mx-auto px-4 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0" onClick={() => setOpen(false)}>
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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `px-4 py-2 border-[3px] border-black font-body font-semibold text-sm tracking-wide -ml-[3px] first:ml-0 transition-none ${
                  isActive ? 'bg-black text-cream' : 'bg-cream text-black hover:bg-black hover:text-cream'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 border-[3px] border-black bg-cream hover:bg-black hover:text-cream transition-colors duration-100 gap-[5px]"
          onClick={() => setOpen(o => !o)}
          aria-label="Menú"
        >
          <span className={`block w-5 h-[2px] bg-current transition-all duration-100 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-[2px] bg-current transition-all duration-100 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[2px] bg-current transition-all duration-100 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu drawer */}
      {open && (
        <nav className="md:hidden border-t-[3px] border-black bg-cream">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block w-full px-6 py-4 border-b-[3px] border-black font-display text-2xl tracking-widest transition-none ${
                  isActive ? 'bg-black text-cream' : 'bg-cream text-black hover:bg-black hover:text-cream'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Verificar en mobile**

Correr `npm run dev`, abrir DevTools → Toggle device toolbar (Ctrl+Shift+M), seleccionar iPhone SE. Verificar:
- Botón hamburger visible
- Al hacer clic se abre el menú con los 4 links
- Al hacer clic en un link navega y cierra el menú
- En desktop (>768px) el hamburger desaparece y aparece el nav horizontal normal

---

### Task 3: Sección de Precios en Home

**Files:**
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: clases Tailwind (`shadow-brutal`, `shadow-brutal-gold` definidas en Task 1)
- Produces: sección `/` con tres tarjetas de precios en guaraníes, hover effect brutalista

- [ ] **Step 1: Agregar sección PRECIOS al final de Home.jsx**

En `src/pages/Home.jsx`, después del cierre de la sección de servicios (`</section>`) y antes del `</div>` final, agregar:

```jsx
{/* Pricing divider */}
<div className="flex items-center gap-3 mt-20 mb-10">
  <h2 className="font-display text-2xl tracking-widest">SERVICIOS WEB</h2>
  <div className="flex-1 h-[3px] bg-black" />
</div>

{/* Pricing section */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-20">

  {/* Tier 1 — Presencia */}
  <div className="border-[3px] border-black p-8 bg-cream shadow-brutal transition-all duration-100 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] group cursor-default">
    <p className="font-body text-xs font-bold tracking-[0.3em] text-gold mb-3">NIVEL 01</p>
    <h3 className="font-display text-5xl leading-none mb-4">PRESENCIA<br />BÁSICA</h3>
    <p className="font-body text-sm leading-relaxed text-black/70 mb-6">
      Tu negocio en internet. Diseño propio, rápido y sin plantillas genéricas. Listo para mostrar quién sos y qué hacés.
    </p>
    <ul className="font-body text-sm flex flex-col gap-2 mb-8">
      <li className="flex items-start gap-2"><span className="text-gold font-bold">→</span> Hasta 5 secciones</li>
      <li className="flex items-start gap-2"><span className="text-gold font-bold">→</span> Formulario de contacto</li>
      <li className="flex items-start gap-2"><span className="text-gold font-bold">→</span> Diseño responsive</li>
      <li className="flex items-start gap-2"><span className="text-gold font-bold">→</span> Entrega en 7 días</li>
    </ul>
    <div className="border-t-[3px] border-black pt-4 flex items-end justify-between">
      <div>
        <p className="font-display text-5xl leading-none">500.000</p>
        <p className="font-body text-xs font-bold tracking-widest text-black/60">GUARANÍES</p>
      </div>
      <a
        href="https://wa.me/595992954169?text=Hola,%20me%20interesa%20el%20servicio%20Presencia%20Básica"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-3 bg-black text-cream border-[3px] border-black font-body font-bold text-sm tracking-wide shadow-brutal-sm hover:bg-gold hover:text-black hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-100"
      >
        CONSULTÁ
      </a>
    </div>
  </div>

  {/* Tier 2 — Con Admin */}
  <div className="border-[3px] border-black -ml-[3px] p-8 bg-black text-cream shadow-brutal-gold transition-all duration-100 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-default">
    <p className="font-body text-xs font-bold tracking-[0.3em] text-gold mb-3">NIVEL 02 — MÁS POPULAR</p>
    <h3 className="font-display text-5xl leading-none mb-4 text-cream">CON PANEL<br />ADMIN</h3>
    <p className="font-body text-sm leading-relaxed text-cream/70 mb-6">
      Todo lo anterior más un panel para que vos mismo edites el contenido, productos o datos sin tocar código.
    </p>
    <ul className="font-body text-sm flex flex-col gap-2 mb-8 text-cream">
      <li className="flex items-start gap-2"><span className="text-gold font-bold">→</span> Todo del nivel anterior</li>
      <li className="flex items-start gap-2"><span className="text-gold font-bold">→</span> Panel de administración</li>
      <li className="flex items-start gap-2"><span className="text-gold font-bold">→</span> Gestión de contenido</li>
      <li className="flex items-start gap-2"><span className="text-gold font-bold">→</span> Entrega en 14 días</li>
    </ul>
    <div className="border-t-[3px] border-cream/30 pt-4 flex items-end justify-between">
      <div>
        <p className="font-display text-5xl leading-none text-gold">1.200.000</p>
        <p className="font-body text-xs font-bold tracking-widest text-cream/60">GUARANÍES</p>
      </div>
      <a
        href="https://wa.me/595992954169?text=Hola,%20me%20interesa%20el%20servicio%20Con%20Panel%20Admin"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-3 bg-gold text-black border-[3px] border-gold font-body font-bold text-sm tracking-wide hover:bg-cream hover:border-cream transition-all duration-100"
      >
        CONSULTÁ
      </a>
    </div>
  </div>

  {/* Tier 3 — Con IA */}
  <div className="border-[3px] border-black -ml-[3px] p-8 bg-cream shadow-brutal transition-all duration-100 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-default">
    <p className="font-body text-xs font-bold tracking-[0.3em] text-gold mb-3">NIVEL 03</p>
    <h3 className="font-display text-5xl leading-none mb-4">CON IA Y<br />FUNCIONES<br />AVANZADAS</h3>
    <p className="font-body text-sm leading-relaxed text-black/70 mb-6">
      Tu sitio trabaja solo. Integraciones de IA, automatizaciones y funciones que hacen que tu web convierta mientras dormís.
    </p>
    <ul className="font-body text-sm flex flex-col gap-2 mb-8">
      <li className="flex items-start gap-2"><span className="text-gold font-bold">→</span> Todo del nivel anterior</li>
      <li className="flex items-start gap-2"><span className="text-gold font-bold">→</span> Integración de IA</li>
      <li className="flex items-start gap-2"><span className="text-gold font-bold">→</span> Automatizaciones</li>
      <li className="flex items-start gap-2"><span className="text-gold font-bold">→</span> Plazo a coordinar</li>
    </ul>
    <div className="border-t-[3px] border-black pt-4 flex items-end justify-between">
      <div>
        <p className="font-display text-5xl leading-none">2.500.000</p>
        <p className="font-body text-xs font-bold tracking-widest text-black/60">GUARANÍES</p>
      </div>
      <a
        href="https://wa.me/595992954169?text=Hola,%20me%20interesa%20el%20servicio%20Con%20IA%20y%20Funciones%20Avanzadas"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-3 bg-black text-cream border-[3px] border-black font-body font-bold text-sm tracking-wide shadow-brutal-sm hover:bg-gold hover:text-black hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-100"
      >
        CONSULTÁ
      </a>
    </div>
  </div>

</section>
```

- [ ] **Step 2: Verificar visual**

Correr `npm run dev`, abrir `http://localhost:5173`. Verificar:
- Tres tarjetas visibles en desktop
- En mobile apilan verticalmente
- El tier 2 (negro) se destaca visualmente
- Hover en cada tarjeta hace translate + pierde shadow
- Botón CONSULTÁ abre WhatsApp con mensaje pre-cargado

---

### Task 4: Google Analytics + Search Console

**Files:**
- Modify: `index.html`

**Interfaces:**
- Produce: GA4 tracking activo, meta tag de verificación para Search Console

> **Nota:** Para este task necesitás dos cosas de Google:
> 1. **GA4 Measurement ID** — desde Google Analytics → Admin → Data Streams → tu stream → Measurement ID (formato `G-XXXXXXXXXX`)
> 2. **Search Console verification token** — desde Google Search Console → Add property → HTML tag → el contenido del `content=""` attribute

- [ ] **Step 1: Agregar GA4 y Search Console a index.html**

En `index.html`, dentro de `<head>`, después de la línea del OG image y antes de los font preloads, agregar:

```html
<!-- Google Search Console verification -->
<meta name="google-site-verification" content="REEMPLAZAR_CON_TU_TOKEN" />

<!-- Google Analytics GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=REEMPLAZAR_CON_TU_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'REEMPLAZAR_CON_TU_ID');
</script>
```

- [ ] **Step 2: Reemplazar los placeholders**

Una vez que tengas el Measurement ID de GA4 y el token de Search Console, reemplazás los tres `REEMPLAZAR_CON_TU_...` con los valores reales.

- [ ] **Step 3: Verificar que no rompe nada**

Correr `npm run dev` y verificar que la página carga sin errores en consola. GA4 no trackea en localhost por defecto — eso es normal.

---

## Notas de ejecución

- Tasks 1, 2, 3 son independientes entre sí (salvo que Task 3 usa `shadow-brutal` definida en Task 1 — hacer Task 1 primero)
- Task 4 requiere que el usuario tenga los tokens de Google antes de completarla
- No hay tests unitarios en este proyecto — verificación es visual en browser
- **NO hacer commit ni push** hasta que el usuario lo indique explícitamente
