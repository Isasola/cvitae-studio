# CVitae Studio — Contexto del proyecto

## ¿Qué es esto?
Sitio web oficial de CVitae Studio — tienda de componentes UI y vitrina de servicios de desarrollo.
Deploy target: studio.cvitae.lat

## Repos relacionados
- Este repo: `Isasola/cvitae-studio` — el sitio web
- Producto #1: `Isasola/ops-console-ui` — fuente del OPS Console UI
- `isaso/file-stack-loader` — demo site del FileStack Loader
- `isaso/logo-particle-loader` — demo site del Logo Particle Loader

## Stack
React 18 + Vite 5 + Tailwind CSS v3 + React Router v6
Deploy: Netlify (build command: `npm run build`, publish dir: `dist`)

---

## Rutas del sitio

| Path | Página |
|------|--------|
| `/` | Home — servicios + hero |
| `/components` | Catálogo de componentes |
| `/wrappers` | Catálogo de wrappers & loaders |
| `/blog` | Blog index |
| `/blog/:slug` | Post individual |
| `/license` | Licencia |
| `/demo/filestack` | Demo live FileStack Loader (full-screen, sin nav) |
| `/demo/particle` | Demo live Logo Particle Loader (full-screen, sin nav) |
| `/admin` | Panel de admin (full-screen, sin nav) |

Las rutas `/admin` y `/demo/*` son full-screen — no comparten Header ni Footer con el resto del sitio.

---

## Componentes destacados

### FileStackLoader
`src/components/FileStackLoader.jsx`
Loader con Dr. Filo — personaje SVG original que tira archivos a una caja con trayectorias en arco.
Props: `size` ("sm"|"md"|"lg"), `speed` ("slow"|"normal"|"fast"), `label` (string|null)
Sin dependencias externas. CSS keyframes propios en `src/index.css`.

### LogoParticleLoader
`src/components/LogoParticleLoader.jsx`
Loader de canvas — explota el logo en partículas, desaparecen, y se reconstruyen lentamente.
Props: `logoSrc`, `width`, `height`, `particleSize` (default 2), `label`, `autoPlay` (default true)
Usa Canvas 2D con muestreo 4× de resolución para colores precisos.

### ServiceCard + overlays
`src/components/ServiceCard.jsx` mapea ilustraciones PNG a overlays animados.
Cada overlay es un componente en `src/components/overlays/` con CSS keyframes únicos (ej. `magnetPull_w1`).

### ProductCard
`src/components/ProductCard.jsx`
GIF on hover (screenshot siempre visible, GIF en capa encima). 
`demoUrl` que empieza con `/` → React Router `<Link>` (LIVE DEMO). URL externa → `<a target="_blank">` (PREVIEW).
`videoUrl` de YouTube → botón WATCH.

---

## Panel de admin

`/admin` — página full-screen, sin nav compartida.
- **Tab PRODUCTS**: editar todos los campos de cada producto. Auto-save a localStorage.
- **Tab BLOG**: crear/editar/eliminar posts. Contenido en Markdown.
- **Tab LOADER**: preview vivo de FileStackLoader en todos los tamaños y velocidades.
- **Botón EXPORT JS**: copia código listo para pegar en `src/data/productsData.js` o `blogData.js`.

Los cambios del admin se persisten en localStorage y se reflejan en vivo en las páginas públicas
vía hooks `useAdminProducts()` y `useAdminPosts()` (en `src/hooks/useAdminData.js`).
Para hacerlos permanentes: EXPORT JS → pegar en el archivo fuente → commit → push.

---

## Para agregar un nuevo producto

Editar `src/data/productsData.js`:

```js
{
  id: 'nombre-unico',
  name: 'Nombre del producto',
  category: 'component',   // 'component' | 'wrapper' | 'loader'
  tagline: 'Una línea corta en inglés.',
  description: 'Descripción de 1-2 oraciones en inglés.',
  price: 19,
  currency: 'USD',
  screenshot: '/products/nombre-screenshot.png',  // subir a public/products/
  gifUrl: '/products/nombre-demo.gif',            // null si no hay
  videoUrl: 'https://youtube.com/watch?v=...',    // null si no hay
  demoUrl: '/demo/nombre',                        // ruta interna o null
  buyUrl: 'https://cvitaestudio.lemonsqueezy.com/checkout/buy/XXX',
  tags: ['react', 'ui'],
  status: 'available',   // 'available' | 'coming_soon'
}
```

Assets en `public/products/`. Commit + push → Netlify redeploya automático.

---

## Blog

Posts en `src/data/blogData.js`. Campos: `slug`, `title`, `date`, `tags`, `excerpt`, `readTime`, `content` (Markdown), `link` (URL externa opcional).
Los posts también se pueden crear/editar desde `/admin` (Tab BLOG).
Idioma: inglés (para alcance global y SEO en inglés).

---

## Productos actuales

| Producto | Precio | demoUrl | buyUrl |
|---------|--------|---------|--------|
| OPS Console UI | $19 | null (pendiente) | null (pendiente) |
| FileStack Loader | $9 | /demo/filestack | null (pendiente) |
| Logo Particle Loader | $12 | /demo/particle | null (pendiente) |

---

## Lemon Squeezy — Setup

### Setup inicial
1. lemonsqueezy.com → crear store "CVitae Studio", moneda USD
2. Conectar cuenta de pago

### Por cada producto
1. Dashboard → Products → New Product → Digital/Software
2. Precio one-time, subir ZIP del componente, usar screenshot como cover
3. Publicar → Share → copiar checkout URL
4. Pegar en `productsData.js` → `buyUrl` → commit → push

### Qué incluir en cada ZIP

**OPS Console UI** (`ops-console.zip`): componente + README con props
**FileStack Loader** (`filestack-loader.zip`): `FileStackLoader.jsx` solo — sin dependencias externas
**Logo Particle Loader** (`logo-particle-loader.zip`): `LogoParticleLoader.jsx` solo — nota CORS para imágenes externas

Las imágenes de fondo (`bg-workshop.png`, `bg-circuit.png`) son solo para las páginas de demo en sus repos separados. Los compradores reciben solo el `.jsx`.

---

## Deploy en Netlify

### Primera vez
1. app.netlify.com → Add new site → Import from GitHub → `Isasola/cvitae-studio`
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

### Dominio personalizado
1. Netlify → Site settings → Domain management → Add custom domain → `studio.cvitae.lat`
2. En Namecheap Advanced DNS, agregar CNAME:
   - Host: `studio`
   - Value: `cvitae-studio-xxxx.netlify.app`
   - TTL: Automatic
3. Esperar 5-30 min → SSL auto-emitido

### Redeploy automático
Cada `git push` al branch `master` dispara un nuevo deploy. Sin pasos manuales.

---

## Variables de entorno
Por ahora ninguna. Cuando integres webhooks o analytics:
Netlify → Site settings → Environment variables

---

## Pendientes para próxima sesión
- [ ] Crear productos en Lemon Squeezy y pegar `buyUrl` en los 3 productos
- [ ] Agregar `videoUrl` al OPS Console después de grabar el video
- [ ] Screenshots para FileStack y Particle Loader (`/products/filestack-screenshot.png`, `/products/particle-screenshot.png`)
- [ ] Optimizar `ops-console-demo.gif` (2.2MB → <800KB via ezgif.com/optimize)
- [ ] Deploy en Netlify + configurar CNAME `studio` en Namecheap
- [ ] OG image: considerar convertir SVG a PNG (algunos scrapers no soportan SVG en og:image)
- [ ] Google Analytics GA4 — agregar en index.html cuando el sitio esté live
