# CVitae Studio — Design Spec
**Date:** 2026-06-28  
**Status:** Approved  
**Deploy target:** studio.cvitae.lat (Netlify)

---

## Overview

CVitae Studio is a separate website from cvitae.lat — the official storefront and services showcase for the studio. It sells digital UI products (components, wrappers) and offers custom development services. Stack: React + Vite + Tailwind CSS.

**Language split:** Spanish for services copy, English for product catalog (international dev audience).

---

## Architecture

**Approach:** Single-page app with React Router. `productsData.js` is the single source of truth for the product catalog. Pages are pure presentation — they render whatever is in the data file. Adding a new product = one entry in `productsData.js`.

**Repository:** `cvitae-studio` — separate repo from `ops-console-ui`. Products are sold from this storefront; their source code lives in their own repos.

---

## File Structure

```
cvitae-studio/
├── public/
│   ├── illustrations/
│   │   ├── web-tactica.svg
│   │   ├── ia-web.svg
│   │   ├── admin-panel.svg
│   │   ├── componentes-ui.svg
│   │   └── loaders.svg
│   ├── icons/
│   │   ├── code.svg
│   │   ├── brain.svg
│   │   ├── gear.svg
│   │   ├── arrow.svg
│   │   ├── star.svg
│   │   ├── wallet.svg
│   │   ├── clock.svg
│   │   ├── check.svg
│   │   ├── user.svg
│   │   ├── monitor.svg
│   │   ├── folder.svg
│   │   ├── bolt.svg
│   │   ├── search.svg
│   │   ├── mail.svg
│   │   ├── whatsapp.svg
│   │   ├── gemini.svg
│   │   ├── claude.svg
│   │   └── aws.svg
│   ├── fonts/
│   │   ├── BebasNeue-Regular.woff2
│   │   └── SpaceGrotesk-Variable.woff2
│   ├── products/
│   │   └── (screenshots and GIFs added by user later)
│   ├── logo.svg
│   ├── favicon.svg
│   └── og-image.svg            ← 1200×630, static OG image, neo-brutalist style
├── src/
│   ├── data/
│   │   └── productsData.js
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── WhatsAppButton.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── ProductCard.jsx
│   │   └── Icon.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Components.jsx
│   │   ├── Wrappers.jsx
│   │   └── License.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── netlify.toml
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Data Schema — `productsData.js`

```js
{
  id: "ops-console",
  name: "OPS Console UI",
  category: "component",        // "component" | "wrapper"
  tagline: "Your ops. One screen.",
  description: "Full-featured admin panel component...",
  price: 19,
  currency: "USD",
  screenshot: "/products/ops-console-screenshot.png",   // user adds later
  gifUrl: "/products/ops-console-demo.gif",             // user adds later, nullable
  demoUrl: null,                                         // user adds later
  buyUrl: null,                                          // Lemon Squeezy, user adds later
  tags: ["admin", "dashboard", "react"],
  status: "available"           // "available" | "coming_soon"
}
```

---

## Visual Design System

**Background:** Cream `#F5F0E8`  
**Black:** `#111111`  
**Gold accent:** `#C9A84C`  
**Aesthetic:** Neo-brutalism — thick black borders (3–4px), no soft shadows, no decorative gradients, no border-radius above 2px  

**Typography (self-hosted, no CDN):**
- Headlines/titles: `Bebas Neue` — condensed, all-caps, stamped feel
- Body/prices/descriptions: `Space Grotesk` — geometric with intentional quirks

**Borders:** `border-[3px] border-black` everywhere. Cards, buttons, inputs, nav tabs.

**Buttons:**
- Primary CTA (WhatsApp/buy): black background, cream text, black border
- Secondary (preview): cream background, black text, black border
- Active nav tab: black background, cream text
- Inactive nav tab: cream background, black text, black border

**No:** emojis, icon libraries (Heroicons/Lucide/etc.), illustration libraries (unDraw/etc.), CDN-loaded fonts, soft gradients, soft shadows, border-radius > 2px.

---

## Pages

### Home (`/`)
- Hero: Bebas Neue headline 3 lines, all-caps, Space Grotesk subline
- 5 service cards in responsive grid (1 col mobile, 2 col tablet, 3 col desktop — last row centered)
- Each ServiceCard: full-width SVG illustration, title, copy, WhatsApp CTA button

**Services:**
1. **Desarrollo de páginas web tácticas** — `illustrations/web-tactica.svg` — CTA: WhatsApp
2. **Integración de IA a páginas existentes** — `illustrations/ia-web.svg` — tech badges: Gemini, Claude, AWS — CTA: WhatsApp
3. **Admin panels y consolas de datos** — `illustrations/admin-panel.svg` — clients: cvitae.lat, luminosapy.com — CTA: WhatsApp
4. **Componentes UI y Wrappers premium** — `illustrations/componentes-ui.svg` — CTA: WhatsApp
5. **Loaders y micro-animaciones** — `illustrations/loaders.svg` — CTA: WhatsApp

### Components (`/components`)
- Grid of `ProductCard` filtered by `category === "component"`
- English copy throughout
- Each card: screenshot placeholder → user replaces; name; tagline; price `$19 USD`; two buttons: `BUY — $19` (black) and `PREVIEW` (cream) — preview hidden if `demoUrl` is null; `buyUrl` null shows `COMING SOON` disabled state

### Wrappers & Loaders (`/wrappers`)
- Same structure as Components, filtered by `category === "wrapper"`
- All current items show `coming_soon` state — "Coming soon" overlay on card
- Structure is complete and ready for real products

### License (`/license`)
- No legal blocks — short paragraphs, CVitae Studio tone
- Bilingual (Spanish primary, English secondary)
- Rules:
  - Use in your own or client projects: allowed
  - Resell the pack or include in another library: not allowed

---

## Global Components

**Header:** Fixed top, cream background, 3px bottom border. Logo SVG left. Nav tabs right: Home | Components | Wrappers & Loaders. Active tab = black fill.

**Footer:** 3px top border. Two columns: internal links | contact (WhatsApp number, contacto@cvitae.lat). No newsletter. Same cream background.

**WhatsAppButton:** Fixed bottom-right. Square, gold background, black border 3px, custom WhatsApp SVG icon. Links to `https://wa.me/595992954169`.

**Icon:** `<Icon name="gear" />` loads `/public/icons/gear.svg` as inline SVG. Used throughout — never system emojis, never icon libraries.

---

## SEO

- `index.html` title: `CVitae Studio — Components, Wrappers & Digital Services`
- Meta description (bilingual): `Premium UI components and digital development services. Componentes premium y servicios de desarrollo digital.`
- OG title, OG description, OG image (`/og-image.svg`), OG url (`https://studio.cvitae.lat`)
- No sitemap in v1 — basic meta tags only

---

## Netlify Config

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

User configures CNAME in Namecheap: `studio` → Netlify domain after deploy.

---

## Assets Generated by Claude

All SVG assets are hand-crafted neo-brutalist (no libraries, no clipart):
- 5 service illustrations in `/public/illustrations/`
- 18 icons in `/public/icons/`
- `logo.svg`
- `favicon.svg`
- `og-image.svg`

---

## User Tasks (post-build)

1. Upload ops-console screenshot to `/public/products/ops-console-screenshot.png`
2. Upload ops-console GIF to `/public/products/ops-console-demo.gif`
3. Create Lemon Squeezy account → generate buy link → add to `productsData.js` `buyUrl`
4. Create site on Netlify, connect `cvitae-studio` repo
5. Configure CNAME in Namecheap: `studio` → Netlify domain
6. Review services copy and adjust tone if needed
