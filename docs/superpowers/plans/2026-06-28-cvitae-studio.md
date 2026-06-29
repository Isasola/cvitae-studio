# CVitae Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete CVitae Studio website — storefront, services showcase, product catalog, and license page — deployable to studio.cvitae.lat via Netlify.

**Architecture:** React + Vite SPA with React Router. All product catalog data lives in `productsData.js` — pages are pure presentation. SVG assets (illustrations, icons, logo, favicon, OG image) are hand-crafted neo-brutalist files served from `/public/`. Fonts self-hosted in `/public/fonts/`.

**Tech Stack:** React 18, Vite 5, Tailwind CSS v3, React Router v6, no external icon or illustration libraries.

## Global Constraints

- Background: `#F5F0E8` (cream)
- Black: `#111111`
- Gold accent: `#C9A84C`
- Border rule: `border-[3px] border-[#111111]` on all cards, buttons, nav tabs — no exceptions
- Border-radius: max `2px` — never rounded-lg, rounded-full, etc.
- No soft shadows (`shadow-*` is banned except `shadow-none`)
- No decorative gradients
- No system emojis anywhere in the UI
- No external icon libraries (Heroicons, Lucide, etc.)
- No illustration libraries (unDraw, etc.)
- No CDN-loaded fonts — all fonts self-hosted in `/public/fonts/`
- Typography: headlines = Bebas Neue (all-caps), body = Space Grotesk
- WhatsApp CTA: `https://wa.me/595992954169`
- Email: `contacto@cvitae.lat`
- Services copy: Spanish. Product catalog copy: English.
- `productsData.js` is the ONLY source of truth for catalog — never hardcode products in pages

---

## File Map

| File | Responsibility |
|------|---------------|
| `package.json` | Dependencies: react, react-dom, react-router-dom, vite, tailwindcss, autoprefixer, postcss |
| `vite.config.js` | Vite config — no special plugins needed |
| `tailwind.config.js` | Custom colors, fonts, border widths |
| `index.html` | SEO meta tags, OG tags, font preloads, favicon |
| `netlify.toml` | SPA redirect rule |
| `src/index.css` | @font-face declarations, base body styles |
| `src/main.jsx` | React root mount |
| `src/App.jsx` | React Router routes |
| `src/data/productsData.js` | Product catalog array |
| `src/components/Icon.jsx` | `<Icon name="x" className="..." />` — fetches and inlines SVG from `/public/icons/` |
| `src/components/Header.jsx` | Fixed nav with logo + tabs |
| `src/components/Footer.jsx` | Two-column footer |
| `src/components/WhatsAppButton.jsx` | Fixed floating CTA |
| `src/components/ServiceCard.jsx` | Service card with SVG illustration |
| `src/components/ProductCard.jsx` | Product card with screenshot, price, buy/preview buttons |
| `src/pages/Home.jsx` | Hero + 5 service cards |
| `src/pages/Components.jsx` | Product grid filtered to category=component |
| `src/pages/Wrappers.jsx` | Product grid filtered to category=wrapper |
| `src/pages/License.jsx` | License page |
| `public/fonts/BebasNeue-Regular.woff2` | Self-hosted Bebas Neue |
| `public/fonts/SpaceGrotesk-Variable.woff2` | Self-hosted Space Grotesk |
| `public/icons/*.svg` | 18 hand-crafted neo-brutalist icons |
| `public/illustrations/*.svg` | 5 service illustrations |
| `public/logo.svg` | CVitae Studio logo |
| `public/favicon.svg` | Favicon |
| `public/og-image.svg` | 1200×630 OG image |

---

### Task 1: Project scaffold + Tailwind config

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `netlify.toml`
- Create: `src/main.jsx`
- Create: `src/index.css`
- Create: `src/App.jsx` (stub)

- [ ] **Step 1: Create the project directory and initialize**

```bash
cd /c/Users/isaso/Documents
mkdir cvitae-studio
cd cvitae-studio
git init
```

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "cvitae-studio",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.10",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 3: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 4: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
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
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Create `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 6: Create `netlify.toml`**

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- [ ] **Step 7: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <title>CVitae Studio — Components, Wrappers &amp; Digital Services</title>
    <meta name="description" content="Premium UI components and digital development services. Componentes premium y servicios de desarrollo digital." />

    <!-- OG -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://studio.cvitae.lat" />
    <meta property="og:title" content="CVitae Studio — Components, Wrappers &amp; Digital Services" />
    <meta property="og:description" content="Premium UI components and digital development services. Componentes premium y servicios de desarrollo digital." />
    <meta property="og:image" content="https://studio.cvitae.lat/og-image.svg" />

    <!-- Font preloads -->
    <link rel="preload" href="/fonts/BebasNeue-Regular.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/SpaceGrotesk-Variable.woff2" as="font" type="font/woff2" crossorigin />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Create `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'Bebas Neue';
  src: url('/fonts/BebasNeue-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

* {
  box-sizing: border-box;
}

body {
  background-color: #F5F0E8;
  color: #111111;
  font-family: 'Space Grotesk', sans-serif;
  margin: 0;
  padding: 0;
}
```

- [ ] **Step 9: Create `src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 10: Create stub `src/App.jsx`**

```jsx
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import Home from './pages/Home.jsx'
import Components from './pages/Components.jsx'
import Wrappers from './pages/Wrappers.jsx'
import License from './pages/License.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />
      <main className="flex-1 pt-[72px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/wrappers" element={<Wrappers />} />
          <Route path="/license" element={<License />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
```

- [ ] **Step 11: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 12: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite starts on `http://localhost:5173`. Browser shows blank cream page (stubs not implemented yet). No console errors about missing modules.

- [ ] **Step 13: Commit**

```bash
git add .
git commit -m "feat: scaffold project — vite, tailwind, react router, fonts preload"
```

---

### Task 2: Self-hosted fonts

**Files:**
- Create: `public/fonts/BebasNeue-Regular.woff2`
- Create: `public/fonts/SpaceGrotesk-Variable.woff2`

**Interfaces:**
- Produces: font files loaded by `@font-face` in `index.css` (Task 1)

- [ ] **Step 1: Download Bebas Neue**

Download from Google Fonts static CDN (direct file, no JS):
```
https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXooxW5rygbi49c.woff2
```
Save as `public/fonts/BebasNeue-Regular.woff2`.

Or use curl:
```bash
mkdir -p public/fonts
curl -L "https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXooxW5rygbi49c.woff2" -o public/fonts/BebasNeue-Regular.woff2
```

- [ ] **Step 2: Download Space Grotesk Variable**

```bash
curl -L "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mF71Q-gowFR-0.woff2" -o public/fonts/SpaceGrotesk-Variable.woff2
```

- [ ] **Step 3: Verify fonts load in browser**

Run `npm run dev`, open `http://localhost:5173`. In DevTools → Network → filter "woff2" — both font files should load with status 200.

- [ ] **Step 4: Commit**

```bash
git add public/fonts/
git commit -m "feat: add self-hosted Bebas Neue and Space Grotesk fonts"
```

---

### Task 3: Icon SVG set (18 icons)

**Files:**
- Create: `public/icons/code.svg`
- Create: `public/icons/brain.svg`
- Create: `public/icons/gear.svg`
- Create: `public/icons/arrow.svg`
- Create: `public/icons/star.svg`
- Create: `public/icons/wallet.svg`
- Create: `public/icons/clock.svg`
- Create: `public/icons/check.svg`
- Create: `public/icons/user.svg`
- Create: `public/icons/monitor.svg`
- Create: `public/icons/folder.svg`
- Create: `public/icons/bolt.svg`
- Create: `public/icons/search.svg`
- Create: `public/icons/mail.svg`
- Create: `public/icons/whatsapp.svg`
- Create: `public/icons/gemini.svg`
- Create: `public/icons/claude.svg`
- Create: `public/icons/aws.svg`
- Create: `src/components/Icon.jsx`

**Interfaces:**
- Produces: `<Icon name="gear" className="w-6 h-6" />` — used by Header, ServiceCard, Footer, WhatsAppButton

All SVGs: `viewBox="0 0 24 24"`, `fill="none"`, strokes use `currentColor`, `stroke-width="2.5"` (heavier than default for neo-brutalist feel), no external references.

- [ ] **Step 1: Create `public/icons/code.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <polyline points="16 18 22 12 16 6"/>
  <polyline points="8 6 2 12 8 18"/>
</svg>
```

- [ ] **Step 2: Create `public/icons/brain.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="4" y="3" width="16" height="18" rx="0"/>
  <line x1="4" y1="8" x2="20" y2="8"/>
  <line x1="4" y1="13" x2="20" y2="13"/>
  <line x1="4" y1="18" x2="14" y2="18"/>
  <line x1="9" y1="3" x2="9" y2="8"/>
  <line x1="15" y1="13" x2="15" y2="18"/>
</svg>
```

- [ ] **Step 3: Create `public/icons/gear.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="9" y="9" width="6" height="6"/>
  <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
</svg>
```

- [ ] **Step 4: Create `public/icons/arrow.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <line x1="5" y1="12" x2="19" y2="12"/>
  <polyline points="12 5 19 12 12 19"/>
</svg>
```

- [ ] **Step 5: Create `public/icons/star.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
</svg>
```

- [ ] **Step 6: Create `public/icons/wallet.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="2" y="6" width="20" height="14"/>
  <path d="M16 14a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/>
  <line x1="2" y1="10" x2="22" y2="10"/>
</svg>
```

- [ ] **Step 7: Create `public/icons/clock.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="3" y="3" width="18" height="18"/>
  <polyline points="12 7 12 12 16 14"/>
</svg>
```

- [ ] **Step 8: Create `public/icons/check.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <polyline points="20 6 9 17 4 12"/>
</svg>
```

- [ ] **Step 9: Create `public/icons/user.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="7" y="2" width="10" height="10"/>
  <path d="M3 22v-2a8 8 0 0 1 18 0v2"/>
</svg>
```

- [ ] **Step 10: Create `public/icons/monitor.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="2" y="3" width="20" height="14"/>
  <line x1="8" y1="21" x2="16" y2="21"/>
  <line x1="12" y1="17" x2="12" y2="21"/>
</svg>
```

- [ ] **Step 11: Create `public/icons/folder.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <path d="M22 19H2V5h8l2 3h10v11z"/>
</svg>
```

- [ ] **Step 12: Create `public/icons/bolt.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
</svg>
```

- [ ] **Step 13: Create `public/icons/search.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="3" y="3" width="12" height="12"/>
  <line x1="13" y1="13" x2="21" y2="21"/>
</svg>
```

- [ ] **Step 14: Create `public/icons/mail.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="2" y="4" width="20" height="16"/>
  <polyline points="2 4 12 13 22 4"/>
</svg>
```

- [ ] **Step 15: Create `public/icons/whatsapp.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="3" y="3" width="18" height="18"/>
  <path d="M8 12h.01M12 12h.01M16 12h.01"/>
  <path d="M6 20l2-4"/>
</svg>
```

- [ ] **Step 16: Create `public/icons/gemini.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <polygon points="12 2 16 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 8 9 12 2"/>
  <line x1="12" y1="2" x2="12" y2="22"/>
</svg>
```

- [ ] **Step 17: Create `public/icons/claude.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="3" y="3" width="18" height="18"/>
  <path d="M8 12 Q12 7 16 12 Q12 17 8 12"/>
</svg>
```

- [ ] **Step 18: Create `public/icons/aws.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="2" y="7" width="20" height="10"/>
  <line x1="6" y1="7" x2="6" y2="17"/>
  <line x1="12" y1="7" x2="12" y2="17"/>
  <line x1="18" y1="7" x2="18" y2="17"/>
  <line x1="2" y1="12" x2="22" y2="12"/>
</svg>
```

- [ ] **Step 19: Create `src/components/Icon.jsx`**

```jsx
import { useState, useEffect } from 'react'

const cache = {}

export default function Icon({ name, className = 'w-5 h-5' }) {
  const [svg, setSvg] = useState(cache[name] || null)

  useEffect(() => {
    if (cache[name]) {
      setSvg(cache[name])
      return
    }
    fetch(`/icons/${name}.svg`)
      .then(r => r.text())
      .then(text => {
        cache[name] = text
        setSvg(text)
      })
  }, [name])

  if (!svg) return <span className={className} />
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
```

- [ ] **Step 20: Commit**

```bash
git add public/icons/ src/components/Icon.jsx
git commit -m "feat: add 18 neo-brutalist SVG icons and Icon component"
```

---

### Task 4: Logo, favicon, and OG image SVGs

**Files:**
- Create: `public/logo.svg`
- Create: `public/favicon.svg`
- Create: `public/og-image.svg`

**Interfaces:**
- `logo.svg` consumed by `Header.jsx` (Task 6)
- `favicon.svg` referenced in `index.html` (Task 1)
- `og-image.svg` referenced in `index.html` OG meta tag (Task 1)

- [ ] **Step 1: Create `public/logo.svg`**

The logo is the text "CVitae" in condensed block letters + "STUDIO" as a smaller tag below, with a thick bracket `[` on the left. Black on transparent. Sized for header use (fits in ~160px wide).

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 52" fill="none">
  <!-- Left bracket -->
  <rect x="4" y="4" width="6" height="44" fill="#111111"/>
  <rect x="4" y="4" width="20" height="6" fill="#111111"/>
  <rect x="4" y="42" width="20" height="6" fill="#111111"/>
  <!-- CVITAE text block -->
  <text x="32" y="34" font-family="'Bebas Neue', sans-serif" font-size="34" font-weight="400" fill="#111111" letter-spacing="1">CVITAE</text>
  <!-- STUDIO tag -->
  <rect x="33" y="38" width="64" height="11" fill="#C9A84C"/>
  <text x="37" y="47" font-family="'Space Grotesk', sans-serif" font-size="9" font-weight="700" fill="#111111" letter-spacing="2">STUDIO</text>
</svg>
```

- [ ] **Step 2: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#111111"/>
  <rect x="4" y="4" width="3" height="24" fill="#C9A84C"/>
  <rect x="4" y="4" width="10" height="3" fill="#C9A84C"/>
  <rect x="4" y="25" width="10" height="3" fill="#C9A84C"/>
  <text x="11" y="22" font-family="'Bebas Neue', sans-serif" font-size="17" fill="#F5F0E8">CS</text>
</svg>
```

- [ ] **Step 3: Create `public/og-image.svg`**

1200×630 static OG image. Cream background, thick black border frame, big headline, gold accent block, studio label.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" fill="none">
  <!-- Background -->
  <rect width="1200" height="630" fill="#F5F0E8"/>
  <!-- Outer border frame -->
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#111111" stroke-width="6"/>
  <!-- Gold accent bar left -->
  <rect x="20" y="20" width="12" height="590" fill="#C9A84C"/>
  <!-- Top decorative stripe -->
  <rect x="32" y="20" width="1148" height="12" fill="#111111"/>
  <!-- Main headline -->
  <text x="80" y="260" font-family="'Bebas Neue', sans-serif" font-size="160" fill="#111111" letter-spacing="-2">CVITAE STUDIO</text>
  <!-- Subline -->
  <text x="82" y="330" font-family="'Space Grotesk', sans-serif" font-size="32" fill="#111111" letter-spacing="1">Components · Wrappers · Digital Services</text>
  <!-- Bottom tag -->
  <rect x="80" y="470" width="280" height="52" fill="#C9A84C"/>
  <rect x="80" y="470" width="280" height="52" fill="none" stroke="#111111" stroke-width="4"/>
  <text x="100" y="505" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#111111">studio.cvitae.lat</text>
  <!-- Decorative corner marks -->
  <rect x="1120" y="560" width="40" height="6" fill="#111111"/>
  <rect x="1154" y="526" width="6" height="40" fill="#111111"/>
</svg>
```

- [ ] **Step 4: Commit**

```bash
git add public/logo.svg public/favicon.svg public/og-image.svg
git commit -m "feat: add logo, favicon and OG image SVGs"
```

---

### Task 5: Service illustration SVGs (5 files)

**Files:**
- Create: `public/illustrations/web-tactica.svg`
- Create: `public/illustrations/ia-web.svg`
- Create: `public/illustrations/admin-panel.svg`
- Create: `public/illustrations/componentes-ui.svg`
- Create: `public/illustrations/loaders.svg`

All SVGs: `viewBox="0 0 400 280"`, cream/gold/black palette, neo-brutalist style (thick strokes, geometric shapes, no soft curves).

- [ ] **Step 1: Create `public/illustrations/web-tactica.svg`**

Building with industrial chimneys on the roof, a giant gold magnet attracting mouse cursors, flow arrows with labels.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" fill="none">
  <!-- Background -->
  <rect width="400" height="280" fill="#F5F0E8"/>
  <!-- Building body -->
  <rect x="120" y="100" width="160" height="140" fill="#F5F0E8" stroke="#111111" stroke-width="3"/>
  <!-- Building windows -->
  <rect x="135" y="115" width="30" height="25" fill="#111111"/>
  <rect x="175" y="115" width="30" height="25" fill="#111111"/>
  <rect x="235" y="115" width="30" height="25" fill="#111111"/>
  <rect x="135" y="155" width="30" height="25" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
  <rect x="175" y="155" width="30" height="25" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
  <rect x="235" y="155" width="30" height="25" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
  <!-- Door -->
  <rect x="183" y="210" width="34" height="30" fill="#111111"/>
  <!-- Chimneys -->
  <rect x="140" y="68" width="18" height="34" fill="#111111"/>
  <rect x="175" y="55" width="18" height="47" fill="#111111"/>
  <rect x="245" y="72" width="18" height="30" fill="#111111"/>
  <!-- Chimney smoke (geometric) -->
  <rect x="142" y="56" width="14" height="10" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
  <rect x="177" y="42" width="14" height="10" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
  <!-- Gold magnet on roof -->
  <rect x="178" y="78" width="44" height="22" fill="#C9A84C" stroke="#111111" stroke-width="3"/>
  <text x="182" y="94" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="#111111">MAGNET</text>
  <!-- Magnet arc -->
  <path d="M178 78 Q200 54 222 78" stroke="#111111" stroke-width="3" fill="none"/>
  <!-- Mouse cursors being attracted -->
  <polygon points="42,40 42,62 48,56 54,68 58,66 52,54 60,54" fill="#111111" transform="rotate(30, 50, 54)"/>
  <polygon points="342,30 342,52 348,46 354,58 358,56 352,44 360,44" fill="#111111" transform="rotate(-20, 350, 44)"/>
  <polygon points="30,140 30,162 36,156 42,168 46,166 40,154 48,154" fill="#111111" transform="rotate(10, 38, 154)"/>
  <!-- Attraction lines -->
  <line x1="72" y1="52" x2="178" y2="85" stroke="#111111" stroke-width="2" stroke-dasharray="4,3"/>
  <line x1="322" y1="42" x2="222" y2="83" stroke="#111111" stroke-width="2" stroke-dasharray="4,3"/>
  <!-- Flow labels strip -->
  <rect x="10" y="230" width="380" height="36" fill="#111111"/>
  <text x="20" y="253" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="600" fill="#F5F0E8">Usuario aburrido  →  Tu web  →  Cliente con billetera abierta</text>
</svg>
```

- [ ] **Step 2: Create `public/illustrations/ia-web.svg`**

Old webpage with exposed cables at the borders; a chrome connection port in the center where a floating block with a cybernetic eye and gold gears plugs in.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" fill="none">
  <!-- Background -->
  <rect width="400" height="280" fill="#F5F0E8"/>
  <!-- Old browser chrome -->
  <rect x="60" y="30" width="280" height="200" fill="#F5F0E8" stroke="#111111" stroke-width="3"/>
  <rect x="60" y="30" width="280" height="30" fill="#111111"/>
  <rect x="70" y="38" width="120" height="14" fill="#F5F0E8" stroke="#111111" stroke-width="1"/>
  <!-- Browser dots -->
  <rect x="74" y="42" width="8" height="8" fill="#C9A84C"/>
  <rect x="86" y="42" width="8" height="8" fill="#C9A84C"/>
  <rect x="98" y="42" width="8" height="8" fill="#C9A84C"/>
  <!-- Exposed cables at borders -->
  <line x1="60" y1="80" x2="30" y2="80" stroke="#111111" stroke-width="3"/>
  <line x1="30" y1="80" x2="30" y2="120" stroke="#111111" stroke-width="3"/>
  <line x1="60" y1="120" x2="20" y2="120" stroke="#111111" stroke-width="3"/>
  <line x1="340" y1="90" x2="370" y2="90" stroke="#111111" stroke-width="3"/>
  <line x1="370" y1="90" x2="370" y2="140" stroke="#111111" stroke-width="3"/>
  <line x1="60" y1="180" x2="30" y2="180" stroke="#111111" stroke-width="3"/>
  <!-- Cable ends (exposed wires) -->
  <rect x="22" y="76" width="8" height="4" fill="#C9A84C"/>
  <rect x="12" y="116" width="8" height="4" fill="#C9A84C"/>
  <rect x="370" y="138" width="8" height="4" fill="#C9A84C"/>
  <rect x="22" y="176" width="8" height="4" fill="#C9A84C"/>
  <!-- Connection port in center of page -->
  <rect x="158" y="105" width="84" height="60" fill="#111111" stroke="#111111" stroke-width="3"/>
  <rect x="166" y="113" width="68" height="44" fill="#F5F0E8"/>
  <!-- Port pins -->
  <rect x="174" y="125" width="6" height="20" fill="#111111"/>
  <rect x="186" y="125" width="6" height="20" fill="#111111"/>
  <rect x="198" y="125" width="6" height="20" fill="#111111"/>
  <rect x="210" y="125" width="6" height="20" fill="#111111"/>
  <!-- Floating AI block -->
  <rect x="258" y="68" width="90" height="80" fill="#C9A84C" stroke="#111111" stroke-width="3"/>
  <!-- Cybernetic eye -->
  <rect x="275" y="82" width="56" height="36" fill="#111111"/>
  <rect x="285" y="88" width="36" height="24" fill="#F5F0E8"/>
  <rect x="293" y="94" width="20" height="12" fill="#111111"/>
  <rect x="298" y="97" width="10" height="6" fill="#C9A84C"/>
  <!-- Gears -->
  <rect x="270" y="120" width="16" height="16" fill="#F5F0E8" stroke="#111111" stroke-width="2"/>
  <rect x="273" y="117" width="10" height="4" fill="#F5F0E8" stroke="#111111" stroke-width="1"/>
  <rect x="273" y="135" width="10" height="4" fill="#F5F0E8" stroke="#111111" stroke-width="1"/>
  <rect x="266" y="123" width="4" height="10" fill="#F5F0E8" stroke="#111111" stroke-width="1"/>
  <rect x="286" y="123" width="4" height="10" fill="#F5F0E8" stroke="#111111" stroke-width="1"/>
  <!-- Connection line from block to port -->
  <line x1="258" y1="110" x2="242" y2="135" stroke="#111111" stroke-width="3"/>
  <!-- Plug symbol -->
  <rect x="236" y="130" width="20" height="14" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
</svg>
```

- [ ] **Step 3: Create `public/illustrations/admin-panel.svg`**

Giant pipe dropping crumpled papers and broken tables; the pipe feeds into a processing machine; clean screen with gold bar charts comes out the other side.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" fill="none">
  <!-- Background -->
  <rect width="400" height="280" fill="#F5F0E8"/>
  <!-- Input pipe (left side) -->
  <rect x="30" y="20" width="40" height="130" fill="#111111"/>
  <rect x="20" y="20" width="60" height="16" fill="#111111"/>
  <!-- Falling papers from pipe (chaotic, rotated rectangles) -->
  <rect x="38" y="155" width="28" height="20" fill="#F5F0E8" stroke="#111111" stroke-width="2" transform="rotate(-15, 52, 165)"/>
  <rect x="35" y="180" width="22" height="16" fill="#F5F0E8" stroke="#111111" stroke-width="2" transform="rotate(10, 46, 188)"/>
  <rect x="42" y="200" width="26" height="18" fill="#F5F0E8" stroke="#111111" stroke-width="2" transform="rotate(-8, 55, 209)"/>
  <!-- Broken table symbol -->
  <rect x="28" y="166" width="40" height="4" fill="#111111" transform="rotate(5, 48, 168)"/>
  <rect x="30" y="170" width="4" height="12" fill="#111111" transform="rotate(5, 32, 176)"/>
  <rect x="60" y="168" width="4" height="12" fill="#111111" transform="rotate(-8, 62, 174)"/>
  <!-- Machine / processor -->
  <rect x="120" y="130" width="160" height="100" fill="#111111"/>
  <rect x="128" y="138" width="144" height="84" fill="#F5F0E8" stroke="#111111" stroke-width="2"/>
  <!-- Machine knobs -->
  <rect x="132" y="142" width="14" height="14" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
  <rect x="152" y="142" width="14" height="14" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
  <rect x="172" y="142" width="14" height="14" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
  <!-- Progress bar inside machine -->
  <rect x="132" y="166" width="136" height="10" fill="#111111" stroke="#111111" stroke-width="1"/>
  <rect x="132" y="166" width="96" height="10" fill="#C9A84C"/>
  <!-- Machine label -->
  <text x="148" y="198" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="#111111">PROCESANDO</text>
  <!-- Connector pipe from input to machine -->
  <rect x="70" y="180" width="50" height="20" fill="#111111"/>
  <!-- Output screen (right side) -->
  <rect x="290" y="80" width="90" height="130" fill="#F5F0E8" stroke="#111111" stroke-width="3"/>
  <rect x="290" y="80" width="90" height="24" fill="#111111"/>
  <rect x="296" y="86" width="40" height="12" fill="#C9A84C"/>
  <!-- Gold bar charts on screen -->
  <rect x="298" y="180" width="14" height="20" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
  <rect x="316" y="165" width="14" height="35" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
  <rect x="334" y="150" width="14" height="50" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
  <rect x="352" y="140" width="14" height="60" fill="#C9A84C" stroke="#111111" stroke-width="2"/>
  <!-- Connector pipe from machine to screen -->
  <rect x="280" y="175" width="14" height="20" fill="#111111"/>
  <!-- Screen stand -->
  <rect x="327" y="210" width="16" height="16" fill="#111111"/>
  <rect x="310" y="224" width="50" height="8" fill="#111111"/>
</svg>
```

- [ ] **Step 4: Create `public/illustrations/componentes-ui.svg`**

Metallic LEGO-style block with laser-etched gold code lines on the sides, snapping into a dark screen.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" fill="none">
  <!-- Background -->
  <rect width="400" height="280" fill="#F5F0E8"/>
  <!-- Dark screen / target -->
  <rect x="220" y="50" width="150" height="190" fill="#111111" stroke="#111111" stroke-width="3"/>
  <!-- Screen scanlines -->
  <line x1="226" y1="80" x2="364" y2="80" stroke="#F5F0E8" stroke-width="1" opacity="0.3"/>
  <line x1="226" y1="100" x2="364" y2="100" stroke="#F5F0E8" stroke-width="1" opacity="0.3"/>
  <line x1="226" y1="120" x2="364" y2="120" stroke="#F5F0E8" stroke-width="1" opacity="0.3"/>
  <!-- Empty slot in screen (where block snaps) -->
  <rect x="232" y="130" width="130" height="80" fill="#F5F0E8" stroke="#C9A84C" stroke-width="3" stroke-dasharray="6,3"/>
  <text x="254" y="178" font-family="'Space Grotesk', sans-serif" font-size="11" fill="#111111" font-weight="600">[ SLOT ]</text>
  <!-- LEGO/metallic block -->
  <rect x="30" y="80" width="150" height="120" fill="#C9A84C" stroke="#111111" stroke-width="3"/>
  <!-- Block top studs -->
  <rect x="52" y="66" width="24" height="16" fill="#C9A84C" stroke="#111111" stroke-width="3"/>
  <rect x="90" y="66" width="24" height="16" fill="#C9A84C" stroke="#111111" stroke-width="3"/>
  <rect x="128" y="66" width="24" height="16" fill="#C9A84C" stroke="#111111" stroke-width="3"/>
  <!-- Laser etched code lines on block face -->
  <line x1="46" y1="104" x2="164" y2="104" stroke="#111111" stroke-width="2"/>
  <text x="48" y="102" font-family="'Space Grotesk', sans-serif" font-size="9" fill="#111111" font-weight="700">const block = {'{'}  </text>
  <line x1="46" y1="120" x2="164" y2="120" stroke="#111111" stroke-width="1"/>
  <text x="56" y="118" font-family="'Space Grotesk', sans-serif" font-size="9" fill="#111111">  style: premium</text>
  <line x1="46" y1="136" x2="164" y2="136" stroke="#111111" stroke-width="1"/>
  <text x="56" y="134" font-family="'Space Grotesk', sans-serif" font-size="9" fill="#111111">  copy: true</text>
  <line x1="46" y1="152" x2="164" y2="152" stroke="#111111" stroke-width="1"/>
  <text x="48" y="150" font-family="'Space Grotesk', sans-serif" font-size="9" fill="#111111">{'}'}</text>
  <!-- Snap arrow -->
  <line x1="182" y1="140" x2="228" y2="170" stroke="#111111" stroke-width="3"/>
  <polygon points="228,170 216,162 220,175" fill="#111111"/>
</svg>
```

- [ ] **Step 5: Create `public/illustrations/loaders.svg`**

Twisted hourglass where sand grains transform into stars and abstract figures as they fall.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" fill="none">
  <!-- Background -->
  <rect width="400" height="280" fill="#F5F0E8"/>
  <!-- Hourglass outer frame (tilted) -->
  <g transform="rotate(-8, 200, 140)">
    <!-- Top cap -->
    <rect x="130" y="28" width="140" height="16" fill="#111111"/>
    <!-- Bottom cap -->
    <rect x="130" y="238" width="140" height="16" fill="#111111"/>
    <!-- Top half of hourglass -->
    <path d="M130 44 L200 140 L270 44 Z" fill="#F5F0E8" stroke="#111111" stroke-width="3"/>
    <!-- Bottom half of hourglass -->
    <path d="M130 238 L200 142 L270 238 Z" fill="#F5F0E8" stroke="#111111" stroke-width="3"/>
    <!-- Sand (top, settling) -->
    <path d="M142 44 L200 130 L258 44 Z" fill="#C9A84C" opacity="0.6"/>
    <!-- Waist connection -->
    <rect x="193" y="136" width="14" height="10" fill="#111111"/>
  </g>
  <!-- Falling grains transforming into stars (outside hourglass) -->
  <!-- Grain 1 — small square -->
  <rect x="192" y="155" width="6" height="6" fill="#C9A84C" stroke="#111111" stroke-width="1"/>
  <!-- Grain 2 — mid transform, 4-point star -->
  <polygon points="196,168 198,174 204,172 198,178 196,184 194,178 188,172 194,174" fill="#C9A84C" stroke="#111111" stroke-width="1"/>
  <!-- Grain 3 — full star -->
  <polygon points="200,192 203,200 211,200 205,205 207,213 200,208 193,213 195,205 189,200 197,200" fill="#C9A84C" stroke="#111111" stroke-width="1.5"/>
  <!-- Abstract figure (grain fully transformed) -->
  <rect x="185" y="220" width="10" height="14" fill="#111111"/>
  <rect x="183" y="215" width="14" height="6" fill="#111111"/>
  <rect x="183" y="234" width="6" height="10" fill="#C9A84C" stroke="#111111" stroke-width="1"/>
  <rect x="191" y="234" width="6" height="10" fill="#C9A84C" stroke="#111111" stroke-width="1"/>
  <!-- Sparkle accents -->
  <line x1="220" y1="175" x2="230" y2="165" stroke="#C9A84C" stroke-width="2"/>
  <line x1="230" y1="175" x2="220" y2="165" stroke="#C9A84C" stroke-width="2"/>
  <line x1="168" y1="200" x2="178" y2="190" stroke="#C9A84C" stroke-width="2"/>
  <line x1="178" y1="200" x2="168" y2="190" stroke="#C9A84C" stroke-width="2"/>
  <!-- Label -->
  <rect x="10" y="240" width="130" height="28" fill="#111111"/>
  <text x="18" y="259" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="#F5F0E8">LA ESPERA ≠ VACÍO</text>
</svg>
```

- [ ] **Step 6: Commit**

```bash
git add public/illustrations/
git commit -m "feat: add 5 neo-brutalist service illustration SVGs"
```

---

### Task 6: Header and WhatsApp floating button

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/WhatsAppButton.jsx`

**Interfaces:**
- Consumes: `Icon` from `./Icon.jsx` (Task 3), `NavLink` from `react-router-dom`
- Produces: `<Header />`, `<WhatsAppButton />` — used by `App.jsx` (Task 1)

- [ ] **Step 1: Create `src/components/Header.jsx`**

```jsx
import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/components', label: 'Components' },
  { to: '/wrappers', label: 'Wrappers & Loaders' },
]

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream border-b-[3px] border-black">
      <div className="max-w-6xl mx-auto px-4 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0">
          <img src="/logo.svg" alt="CVitae Studio" className="h-10" />
        </NavLink>

        {/* Nav tabs */}
        <nav className="flex items-center gap-0">
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
```

- [ ] **Step 2: Create `src/components/WhatsAppButton.jsx`**

```jsx
const WA_URL = 'https://wa.me/595992954169'

export default function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gold border-[3px] border-black flex items-center justify-center hover:bg-black hover:text-cream transition-colors duration-100"
    >
      {/* Inline WhatsApp SVG icon */}
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        <rect x="3" y="3" width="18" height="18"/>
        <path d="M8 12h.01M12 12h.01M16 12h.01"/>
        <path d="M6 20l2-4"/>
      </svg>
    </a>
  )
}
```

- [ ] **Step 3: Verify in dev server**

Run `npm run dev`. Navigate to `http://localhost:5173`. Verify:
- Header is fixed at top, cream background, 3px black bottom border
- Logo image renders (may be broken if logo.svg not complete — OK for now)
- Three nav tabs render with 3px black borders, no gap, no border-radius
- Clicking a tab changes its background to black + cream text
- WhatsApp button appears bottom-right, gold, square

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.jsx src/components/WhatsAppButton.jsx
git commit -m "feat: add Header nav and WhatsApp floating button"
```

---

### Task 7: Footer

**Files:**
- Create: `src/components/Footer.jsx`

**Interfaces:**
- Consumes: `NavLink` from `react-router-dom`
- Produces: `<Footer />` — used by `App.jsx` (Task 1)

- [ ] **Step 1: Create `src/components/Footer.jsx`**

```jsx
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-black bg-cream mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 gap-8 md:grid-cols-2">
        {/* Internal links */}
        <div>
          <p className="font-display text-xl tracking-widest mb-4">NAVEGACIÓN</p>
          <nav className="flex flex-col gap-2">
            <NavLink to="/" className="font-body text-sm font-medium text-black hover:text-gold transition-colors">Home</NavLink>
            <NavLink to="/components" className="font-body text-sm font-medium text-black hover:text-gold transition-colors">Components</NavLink>
            <NavLink to="/wrappers" className="font-body text-sm font-medium text-black hover:text-gold transition-colors">Wrappers & Loaders</NavLink>
            <NavLink to="/license" className="font-body text-sm font-medium text-black hover:text-gold transition-colors">License</NavLink>
          </nav>
        </div>

        {/* Contact */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: add Footer component"
```

---

### Task 8: `productsData.js` + `ServiceCard` + `ProductCard`

**Files:**
- Create: `src/data/productsData.js`
- Create: `src/components/ServiceCard.jsx`
- Create: `src/components/ProductCard.jsx`

**Interfaces:**
- `productsData.js` exports: `export const products` — array of product objects (schema in spec)
- `ServiceCard` props: `{ illustration, title, copy, techBadges?, clients? }`
- `ProductCard` props: `{ product }` where `product` matches the `productsData.js` schema

- [ ] **Step 1: Create `src/data/productsData.js`**

```js
export const products = [
  {
    id: 'ops-console',
    name: 'OPS Console UI',
    category: 'component',
    tagline: 'Your ops. One screen.',
    description:
      'A full-featured admin panel React component. Brief room, users, content, tokens — all in one dark terminal. Drop it into any project.',
    price: 19,
    currency: 'USD',
    screenshot: '/products/ops-console-screenshot.png',
    gifUrl: '/products/ops-console-demo.gif',
    demoUrl: null,
    buyUrl: null,
    tags: ['admin', 'dashboard', 'react'],
    status: 'available',
  },
]
```

- [ ] **Step 2: Create `src/components/ServiceCard.jsx`**

```jsx
const WA_URL = 'https://wa.me/595992954169'

export default function ServiceCard({ illustration, title, copy, techBadges, clients }) {
  return (
    <article className="border-[3px] border-black bg-cream flex flex-col">
      {/* Illustration */}
      <div className="border-b-[3px] border-black">
        <img
          src={`/illustrations/${illustration}`}
          alt={title}
          className="w-full block"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <h3 className="font-display text-3xl tracking-wide leading-none">{title.toUpperCase()}</h3>
        <p className="font-body text-sm leading-relaxed">{copy}</p>

        {/* Tech badges */}
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

        {/* Clients */}
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

        {/* CTA */}
        <div className="mt-auto pt-2">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-black text-cream border-[3px] border-black font-body font-bold text-sm tracking-wide hover:bg-gold hover:text-black transition-colors duration-100"
          >
            HABLEMOS POR WHATSAPP
          </a>
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Create `src/components/ProductCard.jsx`**

```jsx
export default function ProductCard({ product }) {
  const { name, tagline, description, price, currency, screenshot, demoUrl, buyUrl, status } = product
  const isComingSoon = status === 'coming_soon'

  return (
    <article className="border-[3px] border-black bg-cream flex flex-col relative">
      {/* Coming soon overlay */}
      {isComingSoon && (
        <div className="absolute inset-0 z-10 bg-cream/90 border-[3px] border-black flex items-center justify-center">
          <span className="font-display text-4xl tracking-widest">COMING SOON</span>
        </div>
      )}

      {/* Screenshot */}
      <div className="border-b-[3px] border-black bg-black/5 aspect-video overflow-hidden flex items-center justify-center">
        {screenshot ? (
          <img src={screenshot} alt={name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-5xl text-black/20">PREVIEW</span>
          </div>
        )}
      </div>

      {/* Content */}
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

        {/* Buttons */}
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
```

- [ ] **Step 4: Commit**

```bash
git add src/data/productsData.js src/components/ServiceCard.jsx src/components/ProductCard.jsx
git commit -m "feat: add productsData, ServiceCard and ProductCard components"
```

---

### Task 9: Home page

**Files:**
- Create: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `ServiceCard` from `../components/ServiceCard.jsx` (Task 8)
- Produces: `<Home />` — mounted at route `/` in `App.jsx` (Task 1)

- [ ] **Step 1: Create `src/pages/Home.jsx`**

```jsx
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

      {/* Services section label */}
      <div className="flex items-center gap-0 mb-10">
        <div className="w-4 h-[3px] bg-black mr-3" />
        <h2 className="font-display text-2xl tracking-widest">SERVICIOS</h2>
        <div className="flex-1 h-[3px] bg-black ml-3" />
      </div>

      {/* Services grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 -mb-[3px]">
        {SERVICES.map((service, i) => (
          <div
            key={service.title}
            className={`-mt-[3px] -mr-[3px] ${
              SERVICES.length % 3 !== 0 && i === SERVICES.length - 1
                ? 'md:col-start-1 lg:col-start-2'
                : ''
            }`}
          >
            <ServiceCard {...service} />
          </div>
        ))}
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verify in dev server**

Run `npm run dev`. Open `http://localhost:5173`. Verify:
- Hero section with giant Bebas Neue headline renders
- Gold accent color on "INTERFACES" and the studio label
- Two CTA buttons with correct borders, no rounded corners
- 5 service cards render in a grid
- SVG illustrations load (check DevTools Network tab)
- Cards have 3px black borders

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: add Home page with hero and services grid"
```

---

### Task 10: Components and Wrappers pages

**Files:**
- Create: `src/pages/Components.jsx`
- Create: `src/pages/Wrappers.jsx`

**Interfaces:**
- Consumes: `products` from `../data/productsData.js` (Task 8), `ProductCard` from `../components/ProductCard.jsx` (Task 8)
- Produces: `<Components />` at `/components`, `<Wrappers />` at `/wrappers`

- [ ] **Step 1: Create `src/pages/Components.jsx`**

```jsx
import { products } from '../data/productsData.js'
import ProductCard from '../components/ProductCard.jsx'

const components = products.filter(p => p.category === 'component')

export default function Components() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Page header */}
      <div className="border-[3px] border-black p-6 md:p-8 mb-12">
        <p className="font-body text-sm font-bold tracking-[0.3em] mb-2 text-gold">CVITAE STUDIO</p>
        <h1 className="font-display text-6xl md:text-8xl leading-none">COMPONENTS</h1>
        <p className="font-body text-base mt-4 max-w-lg">
          Drop-in React components. Buy once, use in any project. No subscriptions, no lock-in.
        </p>
      </div>

      {/* Product grid */}
      {components.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {components.map(product => (
            <div key={product.id} className="-mt-[3px] -mr-[3px]">
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
```

- [ ] **Step 2: Create `src/pages/Wrappers.jsx`**

```jsx
import { products } from '../data/productsData.js'
import ProductCard from '../components/ProductCard.jsx'

const wrappers = products.filter(p => p.category === 'wrapper')

export default function Wrappers() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Page header */}
      <div className="border-[3px] border-black p-6 md:p-8 mb-12">
        <p className="font-body text-sm font-bold tracking-[0.3em] mb-2 text-gold">CVITAE STUDIO</p>
        <h1 className="font-display text-6xl md:text-8xl leading-none">WRAPPERS<br />&amp; LOADERS</h1>
        <p className="font-body text-base mt-4 max-w-lg">
          Animation wrappers and loaders that make waiting feel like part of the experience.
        </p>
      </div>

      {/* Product grid or coming soon */}
      {wrappers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {wrappers.map(product => (
            <div key={product.id} className="-mt-[3px] -mr-[3px]">
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
```

- [ ] **Step 3: Verify in dev server**

Navigate to `/components` and `/wrappers`. Verify:
- `/components` shows the OPS Console card with placeholder screenshot area
- `/wrappers` shows the "Coming soon" state with WhatsApp CTA
- Page headers render in Bebas Neue at correct sizes
- Gold accent on studio label

- [ ] **Step 4: Commit**

```bash
git add src/pages/Components.jsx src/pages/Wrappers.jsx
git commit -m "feat: add Components and Wrappers catalog pages"
```

---

### Task 11: License page

**Files:**
- Create: `src/pages/License.jsx`

**Interfaces:**
- Produces: `<License />` at `/license`

- [ ] **Step 1: Create `src/pages/License.jsx`**

```jsx
export default function License() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="border-[3px] border-black p-6 md:p-8 mb-12">
        <h1 className="font-display text-6xl md:text-8xl leading-none">LICENCIA</h1>
        <p className="font-body text-sm font-bold tracking-[0.3em] mt-2 text-gold">LICENSE / CVITAE STUDIO</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Allowed */}
        <section className="border-[3px] border-black p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-5 bg-gold border-[2px] border-black flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="square">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className="font-display text-3xl tracking-wide">LO QUE PODÉS HACER</h2>
          </div>
          <p className="font-body text-base leading-relaxed mb-3">
            Usá estos componentes en tus proyectos propios o en proyectos para clientes. Sin límite de proyectos, sin royalties, sin drama.
          </p>
          <p className="font-body text-sm text-black/60 leading-relaxed">
            <em>You can use these components in your own projects or in client work. Unlimited projects, no royalties, no drama.</em>
          </p>
        </section>

        {/* Not allowed */}
        <section className="border-[3px] border-black p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-5 bg-black border-[2px] border-black flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#F5F0E8" strokeWidth="3" strokeLinecap="square">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
            <h2 className="font-display text-3xl tracking-wide">LO QUE NO PODÉS HACER</h2>
          </div>
          <p className="font-body text-base leading-relaxed mb-3">
            No podés revender este pack como si fuera tuyo. No podés incluirlo dentro de otra librería o producto que vendas. El código es para construir, no para reempaquetar.
          </p>
          <p className="font-body text-sm text-black/60 leading-relaxed">
            <em>You can't resell this pack as your own product. You can't bundle it inside another library or product you sell. The code is for building, not for repackaging.</em>
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
            className="inline-block px-5 py-3 bg-gold text-black border-[3px] border-gold font-body font-bold text-sm tracking-wide hover:bg-cream transition-colors duration-100"
          >
            ESCRIBINOS POR WHATSAPP
          </a>
        </section>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Navigate to `/license`. Verify:
- Two rule sections render with check/cross icons
- Black section at bottom with gold WhatsApp CTA
- All text in correct fonts, no emojis

- [ ] **Step 3: Commit**

```bash
git add src/pages/License.jsx
git commit -m "feat: add License page"
```

---

### Task 12: Production build verification + git remote

**Files:**
- No new files

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: `dist/` folder created. No build errors. Output shows JS/CSS bundle sizes.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Open `http://localhost:4173`. Verify all 4 routes work, no broken assets, fonts load correctly.

- [ ] **Step 3: Create GitHub repo and push**

```bash
gh repo create cvitae-studio --public --description "CVitae Studio — studio.cvitae.lat"
git remote add origin https://github.com/Isasola/cvitae-studio.git
git push -u origin main
```

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "chore: production build verified, ready for Netlify deploy"
git push
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| React + Vite + Tailwind stack | Task 1 |
| Self-hosted fonts (Bebas Neue, Space Grotesk) | Task 2 |
| 18 custom SVG icons + Icon component | Task 3 |
| logo.svg, favicon.svg, og-image.svg | Task 4 |
| 5 service illustration SVGs | Task 5 |
| Header with nav tabs | Task 6 |
| WhatsApp floating button | Task 6 |
| Footer two-column | Task 7 |
| productsData.js schema | Task 8 |
| ServiceCard component | Task 8 |
| ProductCard component with buy/preview | Task 8 |
| Home page with hero + 5 services | Task 9 |
| Components page filtered by category | Task 10 |
| Wrappers page with coming-soon state | Task 10 |
| License page bilingual | Task 11 |
| SEO meta tags in index.html | Task 1 |
| netlify.toml SPA redirect | Task 1 |
| Neo-brutalist design constraints enforced globally | tailwind.config.js Task 1 |
| No emojis, no external icon/illustration libs | All tasks — enforced by structure |
| Language split (ES services / EN products) | Task 9, Task 10 |

All spec requirements covered. No placeholders in code. Types/names consistent across tasks.
