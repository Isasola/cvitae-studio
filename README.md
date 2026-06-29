# CVitae Studio

**studio.cvitae.lat** — UI component store and services showcase by CVitae.

Neo-brutalist storefront selling premium React components, loaders, and wrappers. Built with React 18 + Vite 5 + Tailwind CSS 3 + Supabase.

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + React Router v6 |
| Build | Vite 5 |
| Styles | Tailwind CSS v3, custom utilities |
| Fonts | Bebas Neue + Space Grotesk (self-hosted woff2) |
| Database + Storage | Supabase (PostgreSQL + Storage) |
| Deploy | Netlify (SPA redirect via netlify.toml) |
| Payments | Lemon Squeezy (digital product delivery) |

---

## Environment variables

Required in `.env.local` (dev) and Netlify → Site settings → Environment variables (prod):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_ADMIN_PASSWORD=your_secure_password
```

See `.env.example` for the template.

---

## Supabase setup (run once)

1. Create a project at supabase.com
2. Go to **SQL Editor** → paste the full contents of `supabase-schema.sql` → **Run**
   - Creates tables: `products`, `posts`, `page_views`, `sales`, `waitlist`
   - Creates storage bucket `products` (public)
   - Seeds the 3 initial products and 3 blog posts
3. If the storage bucket step errors, create it manually: Storage → New bucket → name `products` → Public ✓

---

## Admin panel

Navigate to `/admin` — protected by `VITE_ADMIN_PASSWORD`.

| Tab | What it does |
|-----|-------------|
| **DASHBOARD** | KPIs (product count, post count, views, revenue), log sales manually |
| **PRODUCTS** | Add/edit products, upload screenshot + GIF to Supabase Storage, set buyUrl, demoUrl, videoUrl |
| **BLOG** | Create/edit/delete posts, toggle Published/Draft, Markdown editor |
| **LOADERS** | Live preview of FileStackLoader and LogoParticleLoader |

Changes publish **instantly** — no deploy needed.

---

## Adding a product (from the admin)

1. `/admin` → PRODUCTS → + NEW PRODUCT
2. Fill in: ID (slug), name, price, category, description
3. Upload screenshot and GIF using the upload buttons (files go to Supabase Storage)
4. Paste Lemon Squeezy checkout URL into **Buy URL**
5. Set demo route (e.g. `/demo/filestack`) or external URL in **Demo URL**
6. Save → live immediately

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
| `/demo/filestack` | FileStack Loader live demo (full-screen) |
| `/demo/particle` | Logo Particle Loader live demo (full-screen) |
| `/admin` | Admin panel (full-screen, password protected) |

---

## Project structure

```
src/
  components/
    Header.jsx              Nav with breathing logo
    Footer.jsx
    ServiceCard.jsx         Service cards with animated overlays
    ProductCard.jsx         Hover GIF, LIVE DEMO, WATCH, BUY
    WhatsAppButton.jsx      Fixed WhatsApp CTA
    FileStackLoader.jsx     Dr. Filo loader (also sold as product)
    LogoParticleLoader.jsx  Particle explosion loader (also sold)
    overlays/               Per-illustration CSS animation overlays
  data/
    productsData.js         Fallback product data (Supabase is primary)
    blogData.js             Fallback blog data
  hooks/
    useAdminData.js         Re-exports from useSupabaseData
    useSupabaseData.js      useProducts, usePosts, uploadMedia, fetchStats, addSale
  lib/
    supabase.js             Supabase client (reads from VITE_ env vars)
  pages/
    Admin.jsx               Admin panel
    Blog.jsx                Blog index
    BlogPost.jsx            Blog post detail
    Components.jsx          Component catalog
    Wrappers.jsx            Wrappers & Loaders catalog
    demos/
      FilestackDemo.jsx     FileStack Loader live demo page
      ParticleDemo.jsx      Logo Particle Loader live demo page
public/
  fonts/                    BebasNeue-Regular.woff2, SpaceGrotesk-Variable.woff2
  icons/                    18 Tabler Icons SVGs
  illustrations/            5 AI-generated service card PNGs
  products/                 Local fallback assets (ops-console screenshot + gif)
  logo.svg / logo-light.svg / favicon.svg
supabase-schema.sql         Full DB schema — run this in Supabase SQL Editor
```

---

## Selling on Lemon Squeezy

### One-time setup
1. lemonsqueezy.com → create store "CVitae Studio" → currency USD
2. Connect payout (bank or PayPal)

### Per product
1. Dashboard → Products → New Product → Digital/Software
2. One-time price, upload product ZIP, use screenshot as cover
3. Publish → Share → copy checkout URL
4. Paste URL in `/admin` → PRODUCTS → edit product → **Buy URL** → Save

### What to include in each ZIP

**OPS Console UI** — `OpsConsole.jsx` + sub-components + README with props
**FileStack Loader** — `FileStackLoader.jsx` (single file, zero dependencies) + README
**Logo Particle Loader** — `LogoParticleLoader.jsx` (single file, zero dependencies) + README with CORS note

The background images (`bg-workshop.png`, `bg-circuit.png`) are for the demo sites only — buyers get the `.jsx` file only.

---

## Current products

| Product | Price | Demo | Buy URL |
|---------|-------|------|---------|
| OPS Console UI | $19 | — | pending |
| FileStack Loader | $9 | `/demo/filestack` | pending |
| Logo Particle Loader | $12 | `/demo/particle` | pending |

---

## Deploy to Netlify

### First deploy
1. app.netlify.com → Add new site → Import from GitHub → `Isasola/cvitae-studio`
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_ADMIN_PASSWORD)
5. Deploy

### Custom domain
1. Netlify → Site settings → Domain management → Add custom domain → `studio.cvitae.lat`
2. Namecheap Advanced DNS → add CNAME: Host `studio`, Value `cvitae-studio-xxxx.netlify.app`
3. Wait 5–30 min → SSL auto-provisioned

### Auto-redeploy
Every `git push` to `master` triggers a new deploy. Content changes (products, blog) go through Supabase and are instant — no deploy needed.

---

## Pending before launch

- [ ] Run `supabase-schema.sql` in Supabase SQL Editor
- [ ] Add env vars in Netlify (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_ADMIN_PASSWORD)
- [ ] Configure CNAME `studio` in Namecheap → Netlify domain
- [ ] Create Lemon Squeezy products → paste `buy_url` for all 3 from `/admin`
- [ ] Upload screenshots for FileStack and Particle loaders from `/admin`
- [ ] Record product videos → add `video_url` from `/admin`
- [ ] Optimize `ops-console-demo.gif` (2.2MB → <800KB via ezgif.com/optimize)

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
