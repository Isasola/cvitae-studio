import { useState, useRef, useCallback } from 'react'
import { useProducts, usePosts, uploadMedia, fetchStats, addSale } from '../hooks/useSupabaseData.js'
import { products as defaultProducts } from '../data/productsData.js'
import FileStackLoader from '../components/FileStackLoader.jsx'
import LogoParticleLoader from '../components/LogoParticleLoader.jsx'

// ── Auth ─────────────────────────────────────────────────────────────────────

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD ?? 'cvitae2024'

function LoginScreen({ onLogin }) {
  const [pass, setPass]   = useState('')
  const [err, setErr]     = useState(false)
  const [shake, setShake] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (pass === ADMIN_PASS) {
      onLogin()
    } else {
      setErr(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }`}</style>

      <div
        className="border-[3px] border-gold p-10 w-full max-w-sm bg-black"
        style={{ boxShadow: '8px 8px 0 0 #C9A84C', animation: shake ? 'shake 0.4s ease' : 'none' }}
      >
        <div className="mb-8 text-center">
          <p className="font-body text-xs tracking-[0.4em] text-gold/60 mb-2">CVITAE STUDIO</p>
          <h1 className="font-display text-5xl text-cream tracking-widest">ADMIN</h1>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-body text-xs tracking-widest text-gold/60 uppercase">Password</label>
            <input
              type="password"
              value={pass}
              onChange={e => { setPass(e.target.value); setErr(false) }}
              autoFocus
              className="border-[3px] bg-black text-cream border-gold px-4 py-3 font-body text-base focus:outline-none focus:border-cream tracking-widest"
              placeholder="••••••••"
            />
            {err && <p className="font-body text-xs text-red-400 mt-1">Contraseña incorrecta</p>}
          </div>

          <button
            type="submit"
            className="mt-2 py-3 bg-gold text-black border-[3px] border-gold font-body font-bold text-sm tracking-[0.2em] hover:bg-cream hover:border-cream transition-colors duration-100"
            style={{ boxShadow: '4px 4px 0 0 #F5F0E8' }}
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Reusable UI primitives (neo-brutal dark theme) ────────────────────────────

function BField({ label, value, onChange, type = 'text', mono = false, placeholder = '' }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-gold/60">{label}</span>
      <input
        type={type}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`border-[2px] border-gold/30 bg-black/60 text-cream px-3 py-2 font-body text-sm focus:outline-none focus:border-gold transition-colors ${mono ? 'font-mono text-xs' : ''}`}
      />
    </label>
  )
}

function BArea({ label, value, onChange, rows = 5, mono = false, placeholder = '' }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-gold/60">{label}</span>
      <textarea
        value={value ?? ''}
        rows={rows}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`border-[2px] border-gold/30 bg-black/60 text-cream px-3 py-2 font-body text-sm focus:outline-none focus:border-gold transition-colors resize-y ${mono ? 'font-mono text-xs' : ''}`}
      />
    </label>
  )
}

function BSelect({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-gold/60">{label}</span>
      <select
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        className="border-[2px] border-gold/30 bg-black text-cream px-3 py-2 font-body text-sm focus:outline-none focus:border-gold transition-colors"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  )
}

function BBtn({ children, onClick, variant = 'primary', size = 'md', disabled = false, type = 'button' }) {
  const base = 'font-body font-bold tracking-[0.15em] border-[2px] transition-all duration-100 disabled:opacity-40 disabled:cursor-not-allowed'
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-5 py-2.5 text-xs', lg: 'px-6 py-3 text-sm' }
  const variants = {
    primary:   'bg-gold text-black border-gold hover:bg-cream hover:border-cream',
    secondary: 'bg-transparent text-gold border-gold hover:bg-gold hover:text-black',
    danger:    'bg-transparent text-red-400 border-red-400 hover:bg-red-400 hover:text-black',
    ghost:     'bg-transparent text-cream/60 border-cream/20 hover:text-cream hover:border-cream/60',
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
      style={variant === 'primary' ? { boxShadow: '3px 3px 0 0 #F5F0E8' } : {}}
    >
      {children}
    </button>
  )
}

function Badge({ text, color = 'gold' }) {
  const colors = {
    gold:  'border-gold/50 text-gold',
    green: 'border-green-500/50 text-green-400',
    red:   'border-red-500/50 text-red-400',
    gray:  'border-cream/20 text-cream/40',
  }
  return (
    <span className={`border-[1.5px] px-2 py-0.5 font-body text-[10px] font-bold tracking-widest uppercase ${colors[color]}`}>
      {text}
    </span>
  )
}

function Saving({ show }) {
  if (!show) return null
  return (
    <span className="font-body text-xs text-gold/70 tracking-widest animate-pulse">SAVING…</span>
  )
}

// ── Media upload field ────────────────────────────────────────────────────────

function MediaUpload({ label, value, onChange, accept = 'image/*' }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview]     = useState(null)
  const fileRef = useRef()

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)

    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)

    const { url, error } = await uploadMedia(file)
    setUploading(false)

    if (error) {
      alert('Upload error: ' + error)
      setPreview(null)
    } else {
      onChange(url)
    }
  }

  const displayUrl = preview || value

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-gold/60">{label}</span>

      <div className="flex gap-2 items-start">
        {/* Preview box */}
        <div
          className="w-24 h-16 border-[2px] border-gold/20 bg-black/40 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer hover:border-gold/60 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <span className="font-body text-[9px] text-gold/60 text-center">UPLOADING…</span>
          ) : displayUrl ? (
            <img src={displayUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="font-body text-[9px] text-gold/40 text-center px-1">CLICK<br/>TO UPLOAD</span>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          <input
            type="text"
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            placeholder="URL or upload →"
            className="border-[2px] border-gold/30 bg-black/60 text-cream px-3 py-2 font-body text-xs focus:outline-none focus:border-gold w-full font-mono"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="self-start border-[2px] border-gold/40 text-gold/70 px-3 py-1 font-body text-[10px] font-bold tracking-widest hover:border-gold hover:text-gold transition-colors disabled:opacity-40"
          >
            {uploading ? 'UPLOADING…' : 'UPLOAD FILE'}
          </button>
        </div>
      </div>

      <input ref={fileRef} type="file" accept={accept} className="hidden" onChange={handleFile} />
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function QuickDeliver({ products }) {
  const [selectedId, setSelectedId] = useState('')
  const [channel, setChannel]       = useState('whatsapp')
  const [copied, setCopied]         = useState(false)

  const product = (products ?? []).find(p => p.id === selectedId)

  function buildMessage() {
    if (!product) return ''
    const lines = [
      `Hola! Aquí está tu copia de ${product.name} 🎉`,
      ``,
      product.download_url
        ? `📦 Descarga: ${product.download_url}`
        : `📦 Te envío el archivo en un momento.`,
      ``,
      `Instrucciones rápidas:`,
      `• Descomprime el ZIP y copia la carpeta del componente a tu proyecto`,
      `• Instala dependencias si las hay (ver README incluido)`,
      `• Licencia: uso ilimitado en tus proyectos`,
      ``,
      `Cualquier duda estoy aquí. Gracias por tu compra!`,
      `— CVitae Studio | studio.cvitae.lat`,
    ]
    return lines.join('\n')
  }

  function copy() {
    const msg = buildMessage()
    if (!msg) return
    navigator.clipboard.writeText(msg)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const msg = buildMessage()

  return (
    <div className="border-[2px] border-gold/30 p-6 space-y-4">
      <p className="font-body text-[10px] tracking-[0.2em] text-gold/50">QUICK DELIVER</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <BSelect
          label="Product"
          value={selectedId}
          onChange={setSelectedId}
          options={[{ value: '', label: 'Select product…' }, ...(products ?? []).map(p => ({ value: p.id, label: p.name }))]}
        />
        <BSelect
          label="Channel"
          value={channel}
          onChange={setChannel}
          options={[{ value: 'whatsapp', label: 'WhatsApp' }, { value: 'email', label: 'Email' }]}
        />
      </div>

      {product && !product.download_url && (
        <p className="font-body text-xs text-yellow-400/80">
          Este producto no tiene Download URL — ve a PRODUCTS y agrega el link de descarga.
        </p>
      )}

      {msg && (
        <div className="space-y-2">
          <pre className="font-mono text-xs text-cream/60 bg-black/40 border-[2px] border-gold/20 p-4 whitespace-pre-wrap leading-relaxed">{msg}</pre>
          <div className="flex gap-2">
            <BBtn onClick={copy}>
              {copied ? 'COPIADO ✓' : 'COPIAR MENSAJE'}
            </BBtn>
            {channel === 'whatsapp' && product && (
              <a
                href={`https://wa.me/595992954169?text=${encodeURIComponent(msg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-body font-bold tracking-[0.15em] border-[2px] border-gold/40 text-gold/70 hover:border-gold hover:text-gold transition-colors"
              >
                ABRIR EN WHATSAPP
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Dashboard() {
  const [stats, setStats]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [addingMode, setAddingMode] = useState(false)
  const [sale, setSale]       = useState({ product_id: '', amount: '', channel: 'whatsapp', note: '' })
  const [saved, setSaved]     = useState(false)

  useState(() => {
    fetchStats().then(s => { setStats(s); setLoading(false) })
  })

  async function saveSale() {
    if (!sale.amount) return
    const err = await addSale({ ...sale, amount: Number(sale.amount) })
    if (!err) {
      setSaved(true)
      setSale({ product_id: '', amount: '', channel: 'whatsapp', note: '' })
      setAddingMode(false)
      setTimeout(() => setSaved(false), 2000)
      fetchStats().then(setStats)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <FileStackLoader size="sm" speed="fast" label="Loading stats..." />
    </div>
  )

  const { productCount, postCount, totalViews, viewsThisWeek, totalRevenue, revenueThisMonth, recentSales, products } = stats || {}

  return (
    <div className="space-y-8">
      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {[
          { label: 'PRODUCTS',    value: productCount ?? 0,  unit: '',  color: 'gold' },
          { label: 'BLOG POSTS',  value: postCount ?? 0,     unit: '',  color: 'cream' },
          { label: 'TOTAL VIEWS', value: totalViews ?? 0,    unit: '',  color: 'cream' },
          { label: 'THIS WEEK',   value: viewsThisWeek ?? 0, unit: 'views', color: 'gold' },
        ].map((k, i) => (
          <div key={k.label} className={`border-[2px] border-gold/30 p-5 -ml-[2px] ${i === 0 ? 'ml-0' : ''}`}>
            <p className="font-body text-[10px] tracking-[0.2em] text-gold/50 mb-2">{k.label}</p>
            <p className={`font-display text-4xl ${k.color === 'gold' ? 'text-gold' : 'text-cream'}`}>{k.value}</p>
            {k.unit && <p className="font-body text-xs text-cream/30 mt-0.5">{k.unit}</p>}
          </div>
        ))}
      </div>

      {/* Revenue */}
      <div className="border-[2px] border-gold/30 p-6">
        <p className="font-body text-[10px] tracking-[0.2em] text-gold/50 mb-4">REVENUE</p>
        <div className="flex gap-8 flex-wrap">
          <div>
            <p className="font-body text-xs text-cream/40 mb-1">All time</p>
            <p className="font-display text-5xl text-gold">${(totalRevenue ?? 0).toFixed(0)}</p>
          </div>
          <div>
            <p className="font-body text-xs text-cream/40 mb-1">This month</p>
            <p className="font-display text-5xl text-cream">${(revenueThisMonth ?? 0).toFixed(0)}</p>
          </div>
        </div>
      </div>

      {/* Log sale */}
      <div className="border-[2px] border-gold/30 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-body text-[10px] tracking-[0.2em] text-gold/50">LOG A SALE</p>
          {saved && <span className="font-body text-xs text-green-400 tracking-widest">SAVED ✓</span>}
        </div>

        {addingMode ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <BSelect
              label="Product"
              value={sale.product_id}
              onChange={v => setSale(s => ({ ...s, product_id: v }))}
              options={[{ value: '', label: 'Select product…' }, ...(products ?? []).map(p => ({ value: p.id, label: p.name }))]}
            />
            <BField label="Amount (USD)" value={sale.amount} onChange={v => setSale(s => ({ ...s, amount: v }))} type="number" />
            <BSelect
              label="Channel"
              value={sale.channel}
              onChange={v => setSale(s => ({ ...s, channel: v }))}
              options={[{ value: 'whatsapp', label: 'WhatsApp' }, { value: 'lemon', label: 'Lemon Squeezy' }, { value: 'other', label: 'Other' }]}
            />
            <BField label="Note" value={sale.note} onChange={v => setSale(s => ({ ...s, note: v }))} placeholder="Optional" />
            <div className="flex gap-2 md:col-span-4">
              <BBtn onClick={saveSale}>SAVE SALE</BBtn>
              <BBtn variant="ghost" onClick={() => setAddingMode(false)}>CANCEL</BBtn>
            </div>
          </div>
        ) : (
          <BBtn onClick={() => setAddingMode(true)}>+ ADD SALE</BBtn>
        )}
      </div>

      {/* Quick deliver */}
      <QuickDeliver products={products} />

      {/* Recent sales */}
      {recentSales?.length > 0 && (
        <div className="border-[2px] border-gold/30">
          <div className="px-5 py-3 border-b border-gold/20">
            <p className="font-body text-[10px] tracking-[0.2em] text-gold/50">RECENT SALES</p>
          </div>
          {recentSales.map(s => (
            <div key={s.id} className="flex items-center justify-between px-5 py-3 border-b border-gold/10 last:border-0">
              <div className="flex items-center gap-4">
                <Badge text={s.channel} color="gold" />
                <span className="font-body text-sm text-cream/70">{s.product_id || 'Unknown product'}</span>
                {s.note && <span className="font-body text-xs text-cream/30">{s.note}</span>}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-body text-xs text-cream/30">{s.created_at?.slice(0, 10)}</span>
                <span className="font-display text-xl text-gold">${s.amount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Product Editor ────────────────────────────────────────────────────────────

function ProductForm({ product, onSave, onDelete, onCancel }) {
  const [p, setP]       = useState(product)
  const [saving, setSaving] = useState(false)

  const f = field => val => setP(prev => ({ ...prev, [field]: val }))

  async function save() {
    setSaving(true)
    const err = await onSave(p)
    setSaving(false)
    if (err) alert('Error saving: ' + err.message)
  }

  return (
    <div className="border-[2px] border-gold bg-black p-6 space-y-5" style={{ boxShadow: '4px 4px 0 0 #C9A84C' }}>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-gold tracking-widest">{p.name || 'NEW PRODUCT'}</h3>
        <div className="flex gap-2">
          <Saving show={saving} />
          <BBtn onClick={save} disabled={saving}>SAVE</BBtn>
          <BBtn variant="ghost" onClick={onCancel}>CANCEL</BBtn>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BField label="ID (slug)" value={p.id} onChange={f('id')} mono placeholder="my-product" />
        <BField label="Name" value={p.name} onChange={f('name')} />
        <BField label="Tagline" value={p.tagline} onChange={f('tagline')} placeholder="One sharp line" />
        <div className="flex gap-3">
          <div className="flex-1">
            <BField label="Price (USD)" value={p.price} onChange={v => f('price')(Number(v))} type="number" />
          </div>
          <div className="flex-1">
            <BSelect
              label="Status"
              value={p.status}
              onChange={f('status')}
              options={[
                { value: 'available',   label: 'Available' },
                { value: 'coming_soon', label: 'Coming Soon' },
              ]}
            />
          </div>
        </div>
        <BSelect
          label="Category"
          value={p.category}
          onChange={f('category')}
          options={[
            { value: 'component', label: 'Component' },
            { value: 'wrapper',   label: 'Wrapper' },
            { value: 'loader',    label: 'Loader' },
          ]}
        />
        <BField label="Tags (comma separated)" value={(p.tags ?? []).join(', ')} onChange={v => f('tags')(v.split(',').map(t => t.trim()).filter(Boolean))} />
      </div>

      <BArea label="Description" value={p.description} onChange={f('description')} rows={3} />

      {/* Media */}
      <div className="border-t border-gold/20 pt-5 space-y-4">
        <p className="font-body text-[10px] tracking-[0.2em] text-gold/50">MEDIA</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MediaUpload label="Screenshot (shown by default)" value={p.screenshot} onChange={f('screenshot')} />
          <MediaUpload label="GIF (shown on hover)" value={p.gifUrl} onChange={f('gifUrl')} accept="image/gif,image/*" />
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-gold/20 pt-5 space-y-4">
        <p className="font-body text-[10px] tracking-[0.2em] text-gold/50">LINKS</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BField label="Buy URL (Lemon Squeezy)" value={p.buyUrl} onChange={f('buyUrl')} mono placeholder="https://…/checkout/buy/XXX" />
          <BField label="Demo URL" value={p.demoUrl} onChange={f('demoUrl')} mono placeholder="/demo/filestack or https://…" />
          <BField label="YouTube URL" value={p.videoUrl} onChange={f('videoUrl')} mono placeholder="https://youtube.com/watch?v=…" />
          <BField label="Download URL (entrega manual)" value={p.downloadUrl} onChange={f('downloadUrl')} mono placeholder="https://drive.google.com/… o GitHub Release" />
        </div>
      </div>

      {onDelete && (
        <div className="border-t border-red-900/30 pt-4 flex justify-end">
          <BBtn variant="danger" size="sm" onClick={() => { if (confirm('Delete this product?')) onDelete(p.id) }}>
            DELETE PRODUCT
          </BBtn>
        </div>
      )}
    </div>
  )
}

function ProductsTab() {
  const { products, loading, upsert, remove } = useProducts()
  const [editing, setEditing] = useState(null) // null | 'new' | product.id
  const [saved, setSaved]     = useState('')
  const [seeding, setSeeding] = useState(false)

  async function handleSave(product) {
    const err = await upsert(product)
    if (!err) {
      setSaved(product.name)
      setEditing(null)
      setTimeout(() => setSaved(''), 2500)
    }
    return err
  }

  async function handleDelete(id) {
    await remove(id)
    setEditing(null)
  }

  async function seedDefaults() {
    if (!confirm('Insertar los 3 productos por defecto en Supabase?')) return
    setSeeding(true)
    for (const p of defaultProducts) {
      await upsert({ ...p, sortOrder: p.sortOrder ?? 0 })
    }
    setSeeding(false)
    setSaved('Productos importados')
    setTimeout(() => setSaved(''), 2500)
  }

  const newBlank = {
    id: '', name: '', category: 'component', tagline: '', description: '',
    price: 0, currency: 'USD', screenshot: '', gifUrl: null, videoUrl: null,
    demoUrl: null, buyUrl: null, downloadUrl: null, tags: [], status: 'available', sortOrder: 0,
  }

  if (loading) return <div className="py-16 text-center"><FileStackLoader size="sm" speed="fast" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-body text-xs tracking-[0.2em] text-gold/50">{products.length} PRODUCTS</p>
        <div className="flex items-center gap-3">
          {saved && <span className="font-body text-xs text-green-400">"{saved}" ✓</span>}
          {products.length === 0 && !editing && (
            <BBtn variant="secondary" onClick={seedDefaults} disabled={seeding}>
              {seeding ? 'IMPORTING…' : '↓ IMPORT DEFAULT PRODUCTS'}
            </BBtn>
          )}
          {editing !== 'new' && <BBtn onClick={() => setEditing('new')}>+ NEW PRODUCT</BBtn>}
        </div>
      </div>

      {editing === 'new' && (
        <ProductForm
          product={newBlank}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {products.map(product => (
        editing === product.id ? (
          <ProductForm
            key={product.id}
            product={product}
            onSave={handleSave}
            onDelete={handleDelete}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <div
            key={product.id}
            className="border-[2px] border-gold/20 p-4 flex items-center gap-4 hover:border-gold/50 transition-colors cursor-pointer group"
            onClick={() => setEditing(product.id)}
          >
            {/* Preview thumbnail */}
            <div className="w-20 h-14 border-[2px] border-gold/20 overflow-hidden flex-shrink-0 bg-black/60">
              {product.screenshot ? (
                <img
                  src={product.screenshot}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-body text-[8px] text-gold/20">NO IMG</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-display text-xl text-cream tracking-widest truncate">{product.name}</span>
                <Badge
                  text={product.status === 'available' ? 'LIVE' : 'SOON'}
                  color={product.status === 'available' ? 'green' : 'gray'}
                />
                <Badge text={product.category} color="gold" />
              </div>
              <p className="font-body text-xs text-cream/40 truncate">{product.tagline}</p>
            </div>

            <div className="flex-shrink-0 flex items-center gap-4">
              <span className="font-display text-2xl text-gold">${product.price}</span>
              {product.buyUrl
                ? <Badge text="BUY LINK ✓" color="green" />
                : <Badge text="NO BUY LINK" color="red" />
              }
              <span className="font-body text-xs text-gold/40 group-hover:text-gold transition-colors">EDIT →</span>
            </div>
          </div>
        )
      ))}
    </div>
  )
}

// ── Blog Editor ───────────────────────────────────────────────────────────────

function PostForm({ post, onSave, onDelete, onCancel }) {
  const [p, setP]         = useState(post)
  const [saving, setSaving] = useState(false)
  const f = field => val => setP(prev => ({ ...prev, [field]: val }))

  async function save() {
    setSaving(true)
    const err = await onSave(p)
    setSaving(false)
    if (err) alert('Error: ' + err.message)
  }

  return (
    <div className="border-[2px] border-gold bg-black p-6 space-y-5" style={{ boxShadow: '4px 4px 0 0 #C9A84C' }}>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-gold tracking-widest">{p.title || 'NEW POST'}</h3>
        <div className="flex items-center gap-3">
          <Saving show={saving} />
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="font-body text-xs text-cream/50">Published</span>
            <div
              className={`w-10 h-5 border-[2px] relative transition-colors ${p.published ? 'border-gold bg-gold/20' : 'border-cream/20 bg-transparent'}`}
              onClick={() => f('published')(!p.published)}
            >
              <div className={`absolute top-0.5 w-3 h-3 bg-current transition-all ${p.published ? 'left-5 text-gold' : 'left-0.5 text-cream/20'}`} />
            </div>
          </label>
          <BBtn onClick={save} disabled={saving}>SAVE</BBtn>
          <BBtn variant="ghost" onClick={onCancel}>CANCEL</BBtn>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BField label="Title" value={p.title} onChange={f('title')} />
        <BField label="Slug (URL)" value={p.slug} onChange={f('slug')} mono placeholder="my-post-slug" />
        <BField label="Tags (comma separated)" value={(p.tags ?? []).join(', ')} onChange={v => f('tags')(v.split(',').map(t => t.trim()).filter(Boolean))} />
        <BField label="Read time (minutes)" value={p.readTime} onChange={v => f('readTime')(Number(v))} type="number" />
        <BField label="External link (optional)" value={p.link} onChange={f('link')} mono placeholder="https://…" />
      </div>

      <BArea label="Excerpt (shown in card)" value={p.excerpt} onChange={f('excerpt')} rows={2} />
      <BArea label="Content (Markdown)" value={p.content} onChange={f('content')} rows={14} mono />

      {onDelete && (
        <div className="border-t border-red-900/30 pt-4 flex justify-end">
          <BBtn variant="danger" size="sm" onClick={() => { if (confirm('Delete this post?')) onDelete(p.id) }}>
            DELETE POST
          </BBtn>
        </div>
      )}
    </div>
  )
}

function BlogTab() {
  const { posts, loading, upsert, remove } = usePosts()
  const [editing, setEditing] = useState(null)
  const [saved, setSaved]     = useState('')

  async function handleSave(post) {
    const err = await upsert(post)
    if (!err) {
      setSaved(post.title)
      setEditing(null)
      setTimeout(() => setSaved(''), 2500)
    }
    return err
  }

  async function handleDelete(id) {
    await remove(id)
    setEditing(null)
  }

  const newBlank = {
    id: null, slug: '', title: '', excerpt: '', content: '',
    tags: [], readTime: 3, published: true, link: null,
  }

  if (loading) return <div className="py-16 text-center"><FileStackLoader size="sm" speed="fast" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-body text-xs tracking-[0.2em] text-gold/50">{posts.length} POSTS</p>
        <div className="flex items-center gap-3">
          {saved && <span className="font-body text-xs text-green-400">"{saved}" SAVED ✓</span>}
          {editing !== 'new' && <BBtn onClick={() => setEditing('new')}>+ NEW POST</BBtn>}
        </div>
      </div>

      {editing === 'new' && (
        <PostForm
          post={newBlank}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {posts.map(post => (
        editing === post.id ? (
          <PostForm
            key={post.id}
            post={post}
            onSave={handleSave}
            onDelete={handleDelete}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <div
            key={post.id}
            className="border-[2px] border-gold/20 p-4 flex items-center gap-4 hover:border-gold/50 transition-colors cursor-pointer group"
            onClick={() => setEditing(post.id)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-display text-xl text-cream tracking-widest truncate">{post.title}</span>
                <Badge text={post.published ? 'PUBLISHED' : 'DRAFT'} color={post.published ? 'green' : 'gray'} />
                {post.tags?.slice(0, 2).map(t => <Badge key={t} text={t} color="gold" />)}
              </div>
              <p className="font-body text-xs text-cream/40 truncate">{post.excerpt}</p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-4">
              <span className="font-body text-xs text-cream/30">{post.date}</span>
              <span className="font-body text-xs text-gold/40 group-hover:text-gold transition-colors">EDIT →</span>
            </div>
          </div>
        )
      ))}
    </div>
  )
}

// ── Loaders Preview tab ───────────────────────────────────────────────────────

function LoadersTab() {
  return (
    <div className="space-y-10">
      <div>
        <p className="font-body text-[10px] tracking-[0.2em] text-gold/50 mb-6">FILESTACK LOADER — ALL VARIANTS</p>
        <div className="grid grid-cols-3 gap-0 border-[2px] border-gold/20">
          {[
            { size: 'sm', speed: 'fast',   label: 'Processing...' },
            { size: 'md', speed: 'normal', label: 'Loading...' },
            { size: 'lg', speed: 'slow',   label: 'Archiving...' },
          ].map((v, i) => (
            <div key={v.size} className={`flex flex-col items-center gap-4 p-8 ${i < 2 ? 'border-r-[2px] border-gold/20' : ''}`}>
              <FileStackLoader size={v.size} speed={v.speed} label={v.label} />
              <code className="font-mono text-[10px] text-gold/40 text-center">size="{v.size}" speed="{v.speed}"</code>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-body text-[10px] tracking-[0.2em] text-gold/50 mb-6">LOGO PARTICLE LOADER — LIVE PREVIEW</p>
        <div className="border-[2px] border-gold/20 p-10 flex flex-col items-center gap-6">
          <LogoParticleLoader
            logoSrc="/logo-light.svg"
            width={360}
            height={94}
            particleSize={2}
            label="Loading..."
            autoPlay={true}
          />
          <code className="font-mono text-[10px] text-gold/40">particleSize=2 (default)</code>
        </div>
      </div>
    </div>
  )
}

// ── Files tab ─────────────────────────────────────────────────────────────────

// Inventario de archivos por producto
// zip: nombre del archivo en private/ | files: contenido del ZIP para referencia
const PRODUCT_FILES = [
  {
    id:    'filestack-loader',
    name:  'FileStack Loader',
    price: '$9',
    zip:   'filestack-loader.zip',
    status: 'ready',
    contents: ['FileStackLoader.jsx', 'README.md'],
    notes: 'Componente principal + README con props y ejemplos.',
  },
  {
    id:    'logo-particle-loader',
    name:  'Logo Particle Loader',
    price: '$12',
    zip:   'logo-particle-loader.zip',
    status: 'ready',
    contents: ['LogoParticleLoader.jsx', 'README.md'],
    notes: 'Canvas 2D, zero deps. Incluye README con todos los props.',
  },
  {
    id:    'neo-brutalism-kit',
    name:  'Neo Brutalism Starter Kit',
    price: '$19',
    zip:   'neo-brutalism-kit.zip',
    status: 'ready',
    contents: ['tailwind.config.js', 'index.css', 'components/Button.jsx', 'components/Card.jsx', 'components/Input.jsx', 'components/Badge.jsx', 'components/SectionDivider.jsx', 'components/index.js', 'fonts/BebasNeue-Regular.woff2', 'fonts/SpaceGrotesk-Variable.woff2', 'README.md'],
    notes: 'Kit completo con fuentes self-hosted, tailwind config, 5 componentes y README.',
  },
  {
    id:    'growth-line',
    name:  'GrowthLine',
    price: '$9',
    zip:   'growth-line.zip',
    status: 'ready',
    contents: ['GrowthLine.jsx', 'README.md'],
    notes: 'SVG puro, cero dependencias. 3 variantes: decorative, score, hero.',
  },
  {
    id:    'ops-console',
    name:  'OPS Console UI',
    price: '$19',
    zip:   'ops-console.zip',
    status: 'ready',
    contents: ['OpsConsole.jsx', 'README.md'],
    notes: 'Componente standalone con 4 módulos. Conectá tus props (brief, users, content, tokens).',
  },
  {
    id:    'empty-state-generator',
    name:  'Empty State Generator',
    price: '$12',
    zip:   'empty-state-generator.zip',
    status: 'ready',
    contents: ['EmptyStatePreset.jsx', 'EmptyStateScene.jsx', 'emptyStateConfig.js', 'README.md'],
    notes: '16 estados, 8 estilos, 16 escenas animadas. Requiere Tailwind CSS.',
  },
]

const ZIP_BASE_PATH = 'C:\\Users\\isaso\\Documents\\cvitae-studio\\private\\'

function CopyPathBtn({ path }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(path)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button
      onClick={copy}
      className="px-3 py-1.5 border-[2px] border-gold/40 font-body text-[10px] font-bold tracking-wide text-gold/60 hover:text-gold hover:border-gold transition-colors"
      title={path}
    >
      {copied ? 'COPIADO ✓' : '📋 RUTA'}
    </button>
  )
}

function FilesTab() {
  const { products, upsert } = useProducts()
  const [uploading, setUploading] = useState({})
  const [saved, setSaved]         = useState({})
  const [expanded, setExpanded]   = useState({})
  const fileRefs = useRef({})

  function toggleExpand(id) {
    setExpanded(e => ({ ...e, [id]: !e[id] }))
  }

  function getLsUrl(productId) {
    const p = products.find(x => x.id === productId)
    return p?.buyUrl ?? null
  }

  function getStoredDownloadUrl(productId) {
    const p = products.find(x => x.id === productId)
    return p?.downloadUrl ?? null
  }

  async function handleUpload(productId, file) {
    setUploading(u => ({ ...u, [productId]: true }))
    const { url, error } = await uploadMedia(file, 'downloads')
    setUploading(u => ({ ...u, [productId]: false }))
    if (error) { alert('Error: ' + error); return }
    const product = products.find(p => p.id === productId)
    if (!product) return
    const err = await upsert({ ...product, downloadUrl: url })
    if (!err) {
      setSaved(s => ({ ...s, [productId]: true }))
      setTimeout(() => setSaved(s => ({ ...s, [productId]: false })), 2500)
    }
  }

  async function saveLsUrl(productId, url) {
    const product = products.find(p => p.id === productId)
    if (!product) return
    await upsert({ ...product, buyUrl: url })
    setSaved(s => ({ ...s, [`ls-${productId}`]: true }))
    setTimeout(() => setSaved(s => ({ ...s, [`ls-${productId}`]: false })), 2500)
  }

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <p className="font-body text-xs tracking-[0.2em] text-gold/50 mb-1">PRODUCT FILES</p>
        <p className="font-body text-xs text-cream/30 leading-relaxed">
          Los ZIPs están en <span className="font-mono text-gold/50">private\</span> en tu máquina.
          Subílos a Supabase Storage para que Quick Deliver los envíe automáticamente.
          También podés pegar el link de Lemon Squeezy de cada producto.
        </p>
      </div>

      {PRODUCT_FILES.map(pf => {
        const lsUrl        = getLsUrl(pf.id)
        const downloadUrl  = getStoredDownloadUrl(pf.id)
        const isUploading  = uploading[pf.id]
        const wasSaved     = saved[pf.id]
        const lsSaved      = saved[`ls-${pf.id}`]
        const isExpanded   = expanded[pf.id]
        const [lsInput, setLsInput] = [lsUrl, () => {}]

        return (
          <div key={pf.id} className="border-[2px] border-gold/20">

            {/* Header fila */}
            <div className="flex items-center gap-4 px-5 py-4">

              {/* Status dot */}
              <div className="flex-shrink-0">
                {pf.status === 'ready'
                  ? <span className="w-2.5 h-2.5 rounded-full bg-green-400 block" title="ZIP listo" />
                  : <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 block" title="Pendiente" />
                }
              </div>

              {/* Nombre + precio */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <p className="font-display text-xl text-gold tracking-widest">{pf.name.toUpperCase()}</p>
                  <span className="font-body text-xs text-cream/40">{pf.price}</span>
                  {lsUrl   && <span className="font-body text-[10px] border border-green-500/40 text-green-400/70 px-1.5 py-0.5">LS ✓</span>}
                  {downloadUrl && <span className="font-body text-[10px] border border-blue-400/40 text-blue-300/70 px-1.5 py-0.5">STORAGE ✓</span>}
                </div>
                <p className="font-body text-xs text-cream/30 mt-0.5">{pf.notes}</p>
              </div>

              {/* Acciones rápidas */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {wasSaved && <span className="font-body text-[10px] text-green-400">GUARDADO ✓</span>}

                {/* Copiar ruta del ZIP local */}
                {pf.zip && (
                  <CopyPathBtn path={`${ZIP_BASE_PATH}${pf.zip}`} />
                )}

                {/* Subir a Storage */}
                {pf.zip && (
                  <>
                    <button
                      onClick={() => fileRefs.current[pf.id]?.click()}
                      disabled={isUploading}
                      className={`px-3 py-1.5 border-[2px] font-body text-[10px] font-bold tracking-wide transition-colors disabled:opacity-40
                        ${downloadUrl ? 'border-cream/20 text-cream/40 hover:border-gold/50 hover:text-gold/70' : 'border-gold text-gold hover:bg-gold hover:text-black'}`}
                    >
                      {isUploading ? 'SUBIENDO…' : downloadUrl ? '↑ REEMPLAZAR' : '↑ SUBIR A STORAGE'}
                    </button>
                    <input
                      type="file"
                      accept=".zip,application/zip,application/x-zip-compressed"
                      className="hidden"
                      ref={el => { fileRefs.current[pf.id] = el }}
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) handleUpload(pf.id, file)
                        e.target.value = ''
                      }}
                    />
                  </>
                )}

                {/* Expandir para ver link LS + storage URL */}
                <button
                  onClick={() => toggleExpand(pf.id)}
                  className="px-2 py-1.5 border-[2px] border-gold/20 font-mono text-[10px] text-gold/30 hover:text-gold/60 hover:border-gold/40 transition-colors"
                >
                  {isExpanded ? '▲' : '▼'}
                </button>
              </div>
            </div>

            {/* Panel expandido */}
            {isExpanded && (
              <div className="border-t border-gold/10 px-5 py-4 bg-black/20 space-y-4">

                {/* Contenido del ZIP */}
                <div>
                  <p className="font-body text-[10px] tracking-[0.2em] text-gold/40 mb-2">CONTENIDO DEL ZIP</p>
                  <div className="flex flex-wrap gap-1.5">
                    {pf.contents.map(f => (
                      <span key={f} className="font-mono text-[10px] text-cream/40 border border-gold/10 px-2 py-0.5">{f}</span>
                    ))}
                  </div>
                </div>

                {/* Ruta local */}
                {pf.zip && (
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] text-gold/40 mb-1">RUTA LOCAL</p>
                    <p className="font-mono text-[10px] text-cream/30">{ZIP_BASE_PATH}{pf.zip}</p>
                  </div>
                )}

                {/* Storage URL */}
                {downloadUrl && (
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] text-gold/40 mb-1">SUPABASE STORAGE URL</p>
                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer"
                      className="font-mono text-[10px] text-blue-300/60 hover:text-blue-300 break-all">
                      {downloadUrl}
                    </a>
                  </div>
                )}

                {/* Lemon Squeezy URL */}
                <LsUrlField
                  productId={pf.id}
                  currentUrl={lsUrl}
                  saved={lsSaved}
                  onSave={saveLsUrl}
                />
              </div>
            )}
          </div>
        )
      })}

      {/* Leyenda */}
      <div className="flex gap-4 pt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 block" />
          <span className="font-body text-[10px] text-cream/30">ZIP listo en private\</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow-500/60 block" />
          <span className="font-body text-[10px] text-cream/30">Archivo pendiente de crear</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-body text-[10px] border border-green-500/40 text-green-400/70 px-1.5 py-0.5">LS ✓</span>
          <span className="font-body text-[10px] text-cream/30">Link de Lemon Squeezy guardado</span>
        </div>
      </div>
    </div>
  )
}

function LsUrlField({ productId, currentUrl, saved, onSave }) {
  const [val, setVal] = useState(currentUrl ?? '')
  // Sincronizar cuando Supabase carga el valor real
  useEffect(() => { setVal(currentUrl ?? '') }, [currentUrl])

  return (
    <div>
      <p className="font-body text-[10px] tracking-[0.2em] text-gold/40 mb-2">LEMON SQUEEZY — CHECKOUT URL</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="https://studio-cvitae.lemonsqueezy.com/checkout/buy/…"
          className="flex-1 border-[2px] border-gold/20 bg-black/40 text-cream px-3 py-1.5 font-mono text-xs focus:outline-none focus:border-gold"
        />
        <button
          onClick={() => onSave(productId, val)}
          disabled={val === (currentUrl ?? '')}
          className="px-4 py-1.5 border-[2px] border-gold/40 font-body text-[10px] font-bold tracking-wide text-gold/60 hover:text-gold hover:border-gold transition-colors disabled:opacity-30"
        >
          {saved ? 'GUARDADO ✓' : 'GUARDAR'}
        </button>
      </div>
    </div>
  )
}

// ── Admin as a component (also sold) ─────────────────────────────────────────

export function AdminPanelComponent({ children }) {
  return (
    <div className="bg-black text-cream min-h-screen">
      {children}
    </div>
  )
}

// ── Main Admin page ───────────────────────────────────────────────────────────

const TABS = ['DASHBOARD', 'PRODUCTS', 'FILES', 'BLOG', 'LOADERS']

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab]       = useState('DASHBOARD')

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  return (
    <div className="min-h-screen bg-black text-cream" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      {/* Header */}
      <header className="border-b-[3px] border-gold px-6 py-4 flex items-center justify-between sticky top-0 bg-black z-40">
        <div className="flex items-center gap-4">
          <img src="/logo-light.svg" alt="CVitae Studio" className="h-7" />
          <span className="border-l-[2px] border-gold/30 pl-4 font-body text-xs tracking-[0.3em] text-gold/60">ADMIN</span>
        </div>

        {/* Tabs */}
        <nav className="flex gap-0">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 font-body text-xs font-bold tracking-[0.2em] border-[2px] -ml-[2px] transition-colors duration-100 ${
                tab === t
                  ? 'bg-gold text-black border-gold'
                  : 'bg-transparent text-gold/60 border-gold/20 hover:text-gold hover:border-gold/40'
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setAuthed(false)}
          className="font-body text-[10px] tracking-widest text-gold/30 hover:text-gold/70 transition-colors"
        >
          LOGOUT
        </button>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {tab === 'DASHBOARD' && <Dashboard />}
        {tab === 'PRODUCTS'  && <ProductsTab />}
        {tab === 'FILES'     && <FilesTab />}
        {tab === 'BLOG'      && <BlogTab />}
        {tab === 'LOADERS'   && <LoadersTab />}
      </main>
    </div>
  )
}
