# CVitae Studio — Contexto del proyecto

## ¿Qué es esto?
Sitio web oficial de CVitae Studio — tienda de componentes UI y vitrina de servicios de desarrollo.
Deploy target: studio.cvitae.lat

## Repo relacionado
- Este repo: `Isasola/cvitae-studio` — el sitio web (lo que el cliente ve)
- Producto #1: `Isasola/ops-console-ui` — el código del componente que se vende

## Stack
React 18 + Vite 5 + Tailwind CSS v3 + React Router v6
Deploy: Netlify (conectar repo, build command: `npm run build`, publish dir: `dist`)

---

## Para agregar un nuevo producto al catálogo

Solo editás `src/data/productsData.js` — una entrada nueva en el array:

```js
{
  id: 'nombre-unico',
  name: 'Nombre del producto',
  category: 'component',   // 'component' o 'wrapper'
  tagline: 'Una línea corta en inglés.',
  description: 'Descripción de 1-2 oraciones en inglés.',
  price: 19,
  currency: 'USD',
  screenshot: '/products/nombre-screenshot.png',  // subir a public/products/
  gifUrl: '/products/nombre-demo.gif',            // null si no hay
  demoUrl: 'https://...',                         // null si no hay demo
  buyUrl: 'https://...',                          // link de Lemon Squeezy
  tags: ['react', 'ui'],
  status: 'available',                            // 'available' o 'coming_soon'
}
```

Los assets del producto van en `public/products/`.

---

## Lemon Squeezy — Setup completo

### 1. Crear cuenta
https://lemonsqueezy.com → Sign up → crear store con nombre "CVitae Studio"

### 2. Configurar el store
- Store name: CVitae Studio
- Store URL: cvitaestudio (o similar)
- Currency: USD
- Payout: conectar cuenta bancaria o PayPal

### 3. Crear el primer producto — OPS Console UI
- Dashboard → Products → New Product
- **Name:** OPS Console UI
- **Description:** Full-featured admin panel React component. Brief room, users, content, tokens — all in one dark terminal. Drop it into any project.
- **Price:** $19 USD (one-time, not subscription)
- **Product type:** Digital / Software
- **File to deliver:** subir `ops-console.zip` (el código del componente)
- **Cover image:** usar `ops-console-screenshot.png`
- Guardar y publicar

### 4. Obtener el buy link
- En el producto creado → Share → Copy checkout URL
- Formato: `https://cvitaestudio.lemonsqueezy.com/checkout/buy/XXXXXXXX`

### 5. Pegar el link en el código
Abrir `src/data/productsData.js` y reemplazar:
```js
buyUrl: null,
```
por:
```js
buyUrl: 'https://cvitaestudio.lemonsqueezy.com/checkout/buy/XXXXXXXX',
```
Guardar → commit → push → Netlify redeploya automático.

### 6. Webhooks (opcional pero recomendado)
Lemon Squeezy puede notificarte por email o webhook cuando alguien compra.
Settings → Webhooks → Add webhook → URL a tu endpoint (si querés automatizar algo después).

---

## Deploy en Netlify

### Primera vez
1. app.netlify.com → Add new site → Import from GitHub
2. Seleccionar repo `Isasola/cvitae-studio`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

### Dominio personalizado
1. En Netlify: Site settings → Domain management → Add custom domain → `studio.cvitae.lat`
2. Netlify te da un dominio tipo `cvitae-studio-xxxx.netlify.app`
3. En Namecheap: Advanced DNS → Add CNAME record:
   - Host: `studio`
   - Value: `cvitae-studio-xxxx.netlify.app`
   - TTL: Automatic
4. Esperar propagación (5-30 min) → Netlify detecta el dominio y emite SSL automático

### Redeploy automático
Cada `git push` al branch `master` dispara un nuevo deploy en Netlify. No necesitás hacer nada manual.

---

## Variables de entorno
Por ahora ninguna. Cuando integres Lemon Squeezy webhooks o analytics, se agregan en:
Netlify → Site settings → Environment variables

---

## Pendientes para próxima sesión
- [ ] Agregar `demoUrl` al ops-console cuando el demo esté online
- [ ] Agregar `buyUrl` al ops-console cuando esté en Lemon Squeezy
- [ ] Grabar GIF más corto del ops-console (el actual pesa 2.2MB — idealmente < 800KB)
- [ ] Optimizar el GIF con https://ezgif.com/optimize antes del deploy
- [ ] Producto #2: definir qué wrapper o loader vender primero
- [ ] OG image: considerar convertir el SVG a PNG real (algunos scrapers no soportan SVG en og:image)
- [ ] Google Analytics: agregar GA4 tag en index.html cuando el sitio esté live
