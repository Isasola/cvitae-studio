import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'
import { products as defaultProducts } from '../data/productsData.js'
import { posts as defaultPosts } from '../data/blogData.js'

// ── Products ─────────────────────────────────────────────────────────────────

function dbToProduct(row) {
  return {
    id:          row.id,
    name:        row.name,
    category:    row.category,
    tagline:     row.tagline,
    description: row.description,
    price:       row.price,
    currency:    row.currency,
    screenshot:  row.screenshot,
    gifUrl:      row.gif_url,
    videoUrl:    row.video_url,
    demoUrl:     row.demo_url,
    buyUrl:      row.buy_url,
    tags:        row.tags ?? [],
    status:      row.status,
    sortOrder:   row.sort_order,
  }
}

function productToDb(p) {
  return {
    id:          p.id,
    name:        p.name,
    category:    p.category,
    tagline:     p.tagline,
    description: p.description,
    price:       p.price,
    currency:    p.currency,
    screenshot:  p.screenshot,
    gif_url:     p.gifUrl,
    video_url:   p.videoUrl,
    demo_url:    p.demoUrl,
    buy_url:     p.buyUrl,
    tags:        p.tags ?? [],
    status:      p.status,
    sort_order:  p.sortOrder ?? 0,
  }
}

export function useProducts() {
  const [products, setProducts] = useState(defaultProducts)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      setError(error.message)
      setProducts(defaultProducts)
    } else {
      setProducts((data ?? []).map(dbToProduct))
      setError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const upsert = useCallback(async (product) => {
    const { error } = await supabase
      .from('products')
      .upsert(productToDb(product), { onConflict: 'id' })
    if (!error) await load()
    return error
  }, [load])

  const remove = useCallback(async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) await load()
    return error
  }, [load])

  return { products, loading, error, upsert, remove, reload: load }
}

// ── Posts ─────────────────────────────────────────────────────────────────────

function dbToPost(row) {
  return {
    id:        row.id,
    slug:      row.slug,
    title:     row.title,
    excerpt:   row.excerpt,
    content:   row.content,
    tags:      row.tags ?? [],
    readTime:  row.read_time,
    published: row.published,
    link:      row.link,
    date:      row.created_at ? row.created_at.slice(0, 10) : '',
  }
}

function postToDb(p) {
  const row = {
    slug:      p.slug,
    title:     p.title,
    excerpt:   p.excerpt,
    content:   p.content,
    tags:      p.tags ?? [],
    read_time: p.readTime,
    published: p.published ?? true,
    link:      p.link ?? null,
    updated_at: new Date().toISOString(),
  }
  if (p.id) row.id = p.id
  return row
}

export function usePosts() {
  const [posts, setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
      setPosts(defaultPosts.map(p => ({ ...p, id: null, published: true })))
    } else {
      setPosts((data ?? []).map(dbToPost))
      setError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const upsert = useCallback(async (post) => {
    const row = postToDb(post)
    const { error } = post.id
      ? await supabase.from('posts').update(row).eq('id', post.id)
      : await supabase.from('posts').insert(row)
    if (!error) await load()
    return error
  }, [load])

  const remove = useCallback(async (id) => {
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (!error) await load()
    return error
  }, [load])

  return { posts, loading, error, upsert, remove, reload: load }
}

// ── Upload media to Supabase Storage ─────────────────────────────────────────

export async function uploadMedia(file, folder = 'products') {
  const ext  = file.name.split('.').pop()
  const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { data, error } = await supabase.storage
    .from('products')
    .upload(name, file, { upsert: true, contentType: file.type })

  if (error) return { url: null, error: error.message }

  const { data: urlData } = supabase.storage.from('products').getPublicUrl(data.path)
  return { url: urlData.publicUrl, error: null }
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export async function trackView(page, productId = null) {
  await supabase.from('page_views').insert({ page, product_id: productId })
}

export async function fetchStats() {
  const [productsRes, postsRes, viewsRes, salesRes] = await Promise.all([
    supabase.from('products').select('id, name, price, status', { count: 'exact' }),
    supabase.from('posts').select('id', { count: 'exact' }),
    supabase.from('page_views').select('page, product_id, created_at'),
    supabase.from('sales').select('*').order('created_at', { ascending: false }),
  ])

  const views      = viewsRes.data ?? []
  const sales      = salesRes.data ?? []
  const products   = productsRes.data ?? []

  // Views last 7 days
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const recentViews = views.filter(v => v.created_at > cutoff)

  // Views per product
  const viewsByProduct = {}
  for (const v of views) {
    if (v.product_id) {
      viewsByProduct[v.product_id] = (viewsByProduct[v.product_id] || 0) + 1
    }
  }

  // Revenue
  const totalRevenue = sales.reduce((s, r) => s + Number(r.amount), 0)
  const revenueThisMonth = sales
    .filter(s => s.created_at > new Date(new Date().setDate(1)).toISOString())
    .reduce((s, r) => s + Number(r.amount), 0)

  return {
    productCount:  productsRes.count ?? products.length,
    postCount:     postsRes.count ?? 0,
    totalViews:    views.length,
    viewsThisWeek: recentViews.length,
    viewsByProduct,
    totalRevenue,
    revenueThisMonth,
    recentSales:   sales.slice(0, 10),
    products,
  }
}

export async function addSale(sale) {
  const { error } = await supabase.from('sales').insert(sale)
  return error
}
