import { useState } from 'react'
import { useAdminProducts, useAdminPosts, useExport } from '../hooks/useAdminData.js'
import FileStackLoader from '../components/FileStackLoader.jsx'

// ── tiny reusable field ──────────────────────────────────────────────────────
function Field({ label, value, onChange, type = 'text', mono = false }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-body text-xs font-bold tracking-widest uppercase text-black/50">{label}</span>
      <input
        type={type}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        className={`border-[2px] border-black px-3 py-2 bg-cream font-body text-sm focus:outline-none focus:border-gold ${mono ? 'font-mono' : ''}`}
      />
    </label>
  )
}

function TextArea({ label, value, onChange, rows = 4, mono = false }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-body text-xs font-bold tracking-widest uppercase text-black/50">{label}</span>
      <textarea
        value={value ?? ''}
        rows={rows}
        onChange={e => onChange(e.target.value)}
        className={`border-[2px] border-black px-3 py-2 bg-cream font-body text-sm focus:outline-none focus:border-gold resize-y ${mono ? 'font-mono text-xs' : ''}`}
      />
    </label>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-body text-xs font-bold tracking-widest uppercase text-black/50">{label}</span>
      <select
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        className="border-[2px] border-black px-3 py-2 bg-cream font-body text-sm focus:outline-none focus:border-gold"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  )
}

// ── Product editor card ──────────────────────────────────────────────────────
function ProductEditor({ product, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false)
  const f = (field) => (val) => onUpdate(product.id, { [field]: val })

  return (
    <div className="border-[3px] border-black bg-cream shadow-brutal-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 hover:bg-black/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {product.screenshot && (
            <img src={product.screenshot} alt="" className="w-12 h-8 object-cover border-[2px] border-black" />
          )}
          <div className="text-left">
            <p className="font-display text-xl tracking-wide">{product.name.toUpperCase()}</p>
            <p className="font-body text-xs text-black/50">{product.category} · ${product.price} {product.currency} · {product.status}</p>
          </div>
        </div>
        <span className="font-display text-2xl">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="border-t-[3px] border-black p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Name" value={product.name} onChange={f('name')} />
          <Field label="Tagline" value={product.tagline} onChange={f('tagline')} />
          <TextArea label="Description" value={product.description} onChange={f('description')} rows={3} />

          <div className="grid grid-cols-2 gap-3">
            <Field label="Price" value={product.price} onChange={v => f('price')(Number(v))} type="number" />
            <Select label="Currency" value={product.currency} onChange={f('currency')} options={[
              { value: 'USD', label: 'USD' },
              { value: 'EUR', label: 'EUR' },
            ]} />
          </div>

          <Select label="Category" value={product.category} onChange={f('category')} options={[
            { value: 'component', label: 'Component' },
            { value: 'wrapper',   label: 'Wrapper' },
            { value: 'loader',    label: 'Loader' },
          ]} />

          <Select label="Status" value={product.status} onChange={f('status')} options={[
            { value: 'available',   label: 'Available' },
            { value: 'coming_soon', label: 'Coming Soon' },
          ]} />

          <Field label="Screenshot path (e.g. /products/name.png)" value={product.screenshot} onChange={f('screenshot')} mono />
          <Field label="GIF path (e.g. /products/name.gif)" value={product.gifUrl} onChange={f('gifUrl')} mono />
          <Field label="Video URL (YouTube)" value={product.videoUrl} onChange={f('videoUrl')} mono />
          <Field label="Demo URL" value={product.demoUrl} onChange={f('demoUrl')} mono />
          <Field label="Buy URL (Lemon Squeezy)" value={product.buyUrl} onChange={f('buyUrl')} mono />

          <div className="md:col-span-2">
            <Field label="Tags (comma separated)" value={Array.isArray(product.tags) ? product.tags.join(', ') : ''} onChange={v => f('tags')(v.split(',').map(t => t.trim()).filter(Boolean))} />
          </div>

          {/* Live preview */}
          {product.screenshot && (
            <div className="md:col-span-2 border-[2px] border-black/20 p-3">
              <p className="font-body text-xs text-black/40 mb-2 uppercase tracking-widest">Preview</p>
              <div className="relative group inline-block">
                <img src={product.screenshot} alt="" className="h-24 object-cover border border-black/10" />
                {product.gifUrl && (
                  <img src={product.gifUrl} alt="gif" className="h-24 object-cover border border-black/10 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                <p className="font-body text-xs text-black/40 mt-1">Hover to see GIF</p>
              </div>
            </div>
          )}

          <div className="md:col-span-2 flex justify-end pt-2">
            <button
              onClick={() => onDelete(product.id)}
              className="font-body text-xs font-bold px-4 py-2 border-[2px] border-black text-black hover:bg-black hover:text-cream transition-colors"
            >
              DELETE PRODUCT
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Blog post editor card ────────────────────────────────────────────────────
function PostEditor({ post, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false)
  const f = (field) => (val) => onUpdate(post.slug, { [field]: val })

  return (
    <div className="border-[3px] border-black bg-cream shadow-brutal-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 hover:bg-black/5 transition-colors text-left"
      >
        <div>
          <p className="font-display text-xl tracking-wide">{post.title.toUpperCase()}</p>
          <p className="font-body text-xs text-black/50">{post.date} · {post.readTime} min · {post.tags?.join(', ')}</p>
        </div>
        <span className="font-display text-2xl flex-shrink-0 ml-4">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="border-t-[3px] border-black p-5 flex flex-col gap-4">
          <Field label="Title" value={post.title} onChange={f('title')} />
          <Field label="Slug (URL)" value={post.slug} onChange={f('slug')} mono />
          <Field label="Date (YYYY-MM-DD)" value={post.date} onChange={f('date')} />
          <Field label="Read time (minutes)" value={post.readTime} onChange={v => f('readTime')(Number(v))} type="number" />
          <Field label="Tags (comma separated)" value={Array.isArray(post.tags) ? post.tags.join(', ') : ''} onChange={v => f('tags')(v.split(',').map(t => t.trim()).filter(Boolean))} />
          <TextArea label="Excerpt" value={post.excerpt} onChange={f('excerpt')} rows={2} />
          <Field label="Link (external article URL, optional)" value={post.link} onChange={f('link')} mono />
          <TextArea label="Content (Markdown supported)" value={post.content} onChange={f('content')} rows={16} mono />

          <div className="flex justify-end pt-2">
            <button
              onClick={() => onDelete(post.slug)}
              className="font-body text-xs font-bold px-4 py-2 border-[2px] border-black text-black hover:bg-black hover:text-cream transition-colors"
            >
              DELETE POST
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── New product template ─────────────────────────────────────────────────────
function newProduct(id) {
  return {
    id,
    name: 'New Product',
    category: 'component',
    tagline: '',
    description: '',
    price: 19,
    currency: 'USD',
    screenshot: null,
    gifUrl: null,
    videoUrl: null,
    demoUrl: null,
    buyUrl: null,
    tags: [],
    status: 'coming_soon',
  }
}

function newPost() {
  const slug = `new-post-${Date.now()}`
  return {
    slug,
    title: 'New Post',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    excerpt: '',
    readTime: 5,
    link: null,
    content: '',
  }
}

// ── Admin page ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [tab, setTab] = useState('products')
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(null)

  const { products, update: updateProduct, add: addProduct, remove: removeProduct, reset: resetProducts } = useAdminProducts()
  const { posts, update: updatePost, add: addPost, remove: removePost, reset: resetPosts } = useAdminPosts()
  const { exportData } = useExport(products, posts)

  function handleExport(type) {
    const { productsCode, postsCode } = exportData()
    const text = type === 'products' ? productsCode : postsCode
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  function handleSave() {
    setSaving(true)
    setTimeout(() => setSaving(false), 1800)
  }

  return (
    <div className="min-h-screen bg-black text-cream">
      {/* Header */}
      <div className="border-b-[3px] border-gold px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="CVitae Studio" className="h-8 invert" />
          <span className="font-display text-2xl tracking-widest text-gold">ADMIN</span>
        </div>
        <a href="/" className="font-body text-xs font-bold tracking-wide text-gold/60 hover:text-gold transition-colors">
          ← BACK TO SITE
        </a>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Tabs */}
        <div className="flex mb-8">
          {['products', 'blog', 'loader'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 border-[3px] border-gold font-display text-lg tracking-widest -ml-[3px] first:ml-0 transition-colors ${
                tab === t ? 'bg-gold text-black' : 'bg-black text-gold hover:bg-gold/10'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* PRODUCTS tab */}
        {tab === 'products' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-body text-sm text-cream/50">{products.length} product{products.length !== 1 ? 's' : ''}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => { handleExport('products'); handleSave() }}
                  className="font-body text-xs font-bold px-4 py-2 border-[2px] border-gold text-gold hover:bg-gold hover:text-black transition-colors"
                >
                  {copied === 'products' ? '✓ COPIED' : 'EXPORT JS'}
                </button>
                <button
                  onClick={() => addProduct(newProduct(`product-${Date.now()}`))}
                  className="font-body text-xs font-bold px-4 py-2 bg-gold text-black border-[2px] border-gold hover:bg-gold/80 transition-colors"
                >
                  + ADD PRODUCT
                </button>
              </div>
            </div>

            {saving && (
              <div className="flex items-center justify-center py-6 bg-black/50 border-[2px] border-gold/30">
                <FileStackLoader size="sm" speed="fast" label="Saving..." />
              </div>
            )}

            {products.map(p => (
              <ProductEditor
                key={p.id}
                product={p}
                onUpdate={updateProduct}
                onDelete={removeProduct}
              />
            ))}

            <div className="mt-4 p-4 border-[2px] border-gold/20 bg-gold/5">
              <p className="font-body text-xs text-gold/60 mb-2">
                Changes are saved automatically to localStorage. To make them permanent, click EXPORT JS, then paste the output into <code className="font-mono bg-black px-1">src/data/productsData.js</code>
              </p>
              <button onClick={resetProducts} className="font-body text-xs text-gold/40 hover:text-gold underline transition-colors">
                Reset to defaults
              </button>
            </div>
          </div>
        )}

        {/* BLOG tab */}
        {tab === 'blog' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-body text-sm text-cream/50">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => { handleExport('posts'); handleSave() }}
                  className="font-body text-xs font-bold px-4 py-2 border-[2px] border-gold text-gold hover:bg-gold hover:text-black transition-colors"
                >
                  {copied === 'posts' ? '✓ COPIED' : 'EXPORT JS'}
                </button>
                <button
                  onClick={() => addPost(newPost())}
                  className="font-body text-xs font-bold px-4 py-2 bg-gold text-black border-[2px] border-gold hover:bg-gold/80 transition-colors"
                >
                  + NEW POST
                </button>
              </div>
            </div>

            {saving && (
              <div className="flex items-center justify-center py-6 bg-black/50 border-[2px] border-gold/30">
                <FileStackLoader size="sm" speed="fast" label="Saving..." />
              </div>
            )}

            {[...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).map(p => (
              <PostEditor
                key={p.slug}
                post={p}
                onUpdate={updatePost}
                onDelete={removePost}
              />
            ))}

            <div className="mt-4 p-4 border-[2px] border-gold/20 bg-gold/5">
              <p className="font-body text-xs text-gold/60 mb-2">
                Changes are saved automatically to localStorage. To make them permanent, click EXPORT JS, then paste into <code className="font-mono bg-black px-1">src/data/blogData.js</code>
              </p>
              <button onClick={resetPosts} className="font-body text-xs text-gold/40 hover:text-gold underline transition-colors">
                Reset to defaults
              </button>
            </div>
          </div>
        )}

        {/* LOADER tab — FileStackLoader live demo */}
        {tab === 'loader' && (
          <div className="flex flex-col items-center gap-10 py-10">
            <p className="font-display text-3xl tracking-widest text-gold">FILESTACK LOADER</p>
            <p className="font-body text-sm text-cream/50 text-center max-w-md">
              This is the FileStackLoader component — built by CVitae Studio. Drop it into any project.
            </p>

            <div className="grid grid-cols-3 gap-8">
              {(['sm', 'md', 'lg']).map(size => (
                <div key={size} className="flex flex-col items-center gap-3">
                  <FileStackLoader size={size} speed="normal" label="Loading..." />
                  <span className="font-mono text-xs text-gold/50">size="{size}"</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8">
              {(['slow', 'normal', 'fast']).map(speed => (
                <div key={speed} className="flex flex-col items-center gap-3">
                  <FileStackLoader size="md" speed={speed} label={speed} />
                  <span className="font-mono text-xs text-gold/50">speed="{speed}"</span>
                </div>
              ))}
            </div>

            <div className="border-[2px] border-gold/30 p-6 w-full max-w-lg bg-gold/5">
              <p className="font-body text-xs text-gold/60 mb-3 uppercase tracking-widest">Usage</p>
              <pre className="font-mono text-xs text-cream/80 overflow-x-auto">{`import FileStackLoader from './components/FileStackLoader'

<FileStackLoader
  size="md"       // "sm" | "md" | "lg"
  speed="normal"  // "slow" | "normal" | "fast"
  label="Loading..."
/>`}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
