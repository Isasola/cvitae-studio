# CVitae Studio

**studio.cvitae.lat** — UI component store and services showcase by CVitae.

Neo-brutalist storefront selling premium React components, loaders, and wrappers. Built with React 18 + Vite 5 + Tailwind CSS 3.

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + React Router v6 |
| Build | Vite 5 |
| Styles | Tailwind CSS v3, custom utilities |
| Fonts | Bebas Neue + Space Grotesk (self-hosted woff2) |
| Deploy | Netlify (SPA redirect via netlify.toml) |
| Payments | Lemon Squeezy (digital product delivery) |

---

## Project structure

```
src/
  components/
    Header.jsx              Fixed nav with breathing logo
    Footer.jsx
    ServiceCard.jsx         Service cards with animated overlays
    ProductCard.jsx         Product cards (hover GIF, LIVE DEMO, WATCH, BUY)
    WhatsAppButton.jsx      Fixed WhatsApp CTA
    FileStackLoader.jsx     Dr. Filo loader component (also sold)
    LogoParticleLoader.jsx  Particle explosion loader (also sold)
    Icon.jsx                SVG icon loader with cache
    overlays/               Per-illustration CSS animation overlays
      WebTacticaOverlay.jsx
      IaWebOverlay.jsx
      AdminPanelOverlay.jsx
      ComponentesUIOverlay.jsx
      LoadersOverlay.jsx
  data/
    productsData.js         Product catalog (source of truth)
    blogData.js             Blog posts (source of truth)
  hooks/
    useAdminData.js         localStorage sync for admin panel
  pages/
    Home.jsx                Services + hero
    Components.jsx          Component catalog
    Wrappers.jsx            Wrappers & loaders catalog
    Blog.jsx                Blog index
    BlogPost.jsx            Blog post detail
    License.jsx             License page (ES + EN)
    Admin.jsx               Admin panel (products, blog, loader preview)
    demos/
      FilestackDemo.jsx     Full-screen demo for FileStack Loader
      ParticleDemo.jsx      Full-screen demo for Logo Particle Loader
public/
  fonts/                    BebasNeue-Regular.woff2, SpaceGrotesk-Variable.woff2
  icons/                    18 Tabler Icons SVGs
  illustrations/            5 AI-generated PNGs (service cards)
  products/                 Product screenshots and GIFs
  logo.svg / logo-light.svg / favicon.svg / og-image.svg
```

---

## Routes

| Path | Page |
|------|------|
| `/` | Home — services + hero |
| `/components` | Component catalog |
| `/wrappers` | Wrappers & Loaders catalog |
| `/blog` | Blog index |
| `/blog/:slug` | Blog post |
| `/license` | License |
| `/demo/filestack` | FileStack Loader live demo |
| `/demo/particle` | Logo Particle Loader live demo |
| `/admin` | Admin panel |

---

## Adding a new product

Edit `src/data/productsData.js`:

```js
{
  id: 'unique-id',
  name: 'Product Name',
  category: 'component',   // 'component' | 'wrapper' | 'loader'
  tagline: 'One line in English.',
  description: '1-2 sentences in English.',
  price: 19,
  currency: 'USD',
  screenshot: '/products/name-screenshot.png',  // place in public/products/
  gifUrl: '/products/name-demo.gif',            // null if none (shows on hover)
  videoUrl: 'https://youtube.com/watch?v=...',  // null if none
  demoUrl: '/demo/your-page',                   // internal route or null
  buyUrl: 'https://cvitaestudio.lemonsqueezy.com/checkout/buy/XXX',
  tags: ['react', 'ui'],
  status: 'available',   // 'available' | 'coming_soon'
}
```

Place assets in `public/products/`. Commit and push — Netlify redeploys automatically.

---

## Admin panel

Navigate to `/admin` to manage products and blog posts without touching code.

- **PRODUCTS tab** — Edit name, price, URLs, screenshot paths, tags, status. Changes auto-save to localStorage. Click EXPORT JS to copy the updated `productsData.js` content.
- **BLOG tab** — Create/edit/delete posts with Markdown content. EXPORT JS copies updated `blogData.js`.
- **LOADER tab** — Live preview of FileStackLoader component (all sizes and speeds).

**To make admin changes permanent:** Export JS → paste into the corresponding `src/data/` file → commit → push.

---

## Selling on Lemon Squeezy

### Setup (one-time)

1. Create account at lemonsqueezy.com
2. Create store: "CVitae Studio" — currency USD
3. Connect payout (bank account or PayPal)

### Adding a product

1. Dashboard → Products → New Product
2. Type: **Digital / Software**
3. Price: one-time (not subscription)
4. Upload the product ZIP file
5. Use the product screenshot as cover image
6. Publish → Share → Copy checkout URL
7. Paste URL into `productsData.js` → `buyUrl` field

### Current products

| Product | Price | Status |
|---------|-------|--------|
| OPS Console UI | $19 | buyUrl pending |
| FileStack Loader | $9 | buyUrl pending |
| Logo Particle Loader | $12 | buyUrl pending |

### What to include in each ZIP

**OPS Console UI** (`ops-console.zip`):
- `src/components/OpsConsole.jsx` + any sub-components
- `README.md` with installation and prop docs

**FileStack Loader** (`filestack-loader.zip`):
- `src/components/FileStackLoader.jsx` (single file, no dependencies)
- `README.md`

**Logo Particle Loader** (`logo-particle-loader.zip`):
- `src/components/LogoParticleLoader.jsx` (single file, no dependencies)
- `README.md` with CORS note for external images

---

## Deploy to Netlify

### First deploy

1. app.netlify.com → Add new site → Import from GitHub
2. Select repo: `Isasola/cvitae-studio`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

### Custom domain

1. Netlify → Site settings → Domain management → Add custom domain → `studio.cvitae.lat`
2. In Namecheap Advanced DNS, add CNAME:
   - Host: `studio`
   - Value: `cvitae-studio-xxxx.netlify.app`
   - TTL: Automatic
3. Wait 5–30 min → SSL auto-provisioned

### Auto-redeploy

Every `git push` to `master` triggers a new deploy. No manual steps needed.

---

## Pending before launch

- [ ] Optimize `ops-console-demo.gif` (2.2MB → <800KB via ezgif.com/optimize)
- [ ] Create Lemon Squeezy products and paste `buyUrl` for all 3 products
- [ ] Add `videoUrl` to OPS Console after recording screen video
- [ ] Add product screenshots for FileStack and Particle loaders (`/products/filestack-screenshot.png`, `/products/particle-screenshot.png`)
- [ ] Deploy to Netlify + configure CNAME
- [ ] Add Google Analytics GA4 after site is live

---

## Design system

| Token | Value |
|-------|-------|
| `cream` | `#F5F0E8` |
| `black` | `#111111` |
| `gold` | `#C9A84C` |
| Font display | Bebas Neue |
| Font body | Space Grotesk |
| Border | 3px solid black |
| Shadow | `.shadow-brutal` — `6px 6px 0 0 #111` |

---

## Related repos

| Repo | Purpose |
|------|---------|
| `Isasola/cvitae-studio` | This repo — the website |
| `Isasola/ops-console-ui` | OPS Console UI source |
| `isaso/file-stack-loader` | FileStack Loader demo site |
| `isaso/logo-particle-loader` | Logo Particle Loader demo site |
