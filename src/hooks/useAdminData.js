import { useState, useEffect, useCallback } from 'react'
import { products as defaultProducts } from '../data/productsData.js'
import { posts as defaultPosts } from '../data/blogData.js'

const PRODUCTS_KEY = 'cvitae_studio_products'
const POSTS_KEY    = 'cvitae_studio_posts'

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function useAdminProducts() {
  const [products, setProducts] = useState(() => load(PRODUCTS_KEY, defaultProducts))

  const update = useCallback((id, patch) => {
    setProducts(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...patch } : p)
      save(PRODUCTS_KEY, next)
      return next
    })
  }, [])

  const add = useCallback((product) => {
    setProducts(prev => {
      const next = [...prev, product]
      save(PRODUCTS_KEY, next)
      return next
    })
  }, [])

  const remove = useCallback((id) => {
    setProducts(prev => {
      const next = prev.filter(p => p.id !== id)
      save(PRODUCTS_KEY, next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    save(PRODUCTS_KEY, defaultProducts)
    setProducts(defaultProducts)
  }, [])

  return { products, update, add, remove, reset }
}

export function useAdminPosts() {
  const [posts, setPosts] = useState(() => load(POSTS_KEY, defaultPosts))

  const update = useCallback((slug, patch) => {
    setPosts(prev => {
      const next = prev.map(p => p.slug === slug ? { ...p, ...patch } : p)
      save(POSTS_KEY, next)
      return next
    })
  }, [])

  const add = useCallback((post) => {
    setPosts(prev => {
      const next = [...prev, post]
      save(POSTS_KEY, next)
      return next
    })
  }, [])

  const remove = useCallback((slug) => {
    setPosts(prev => {
      const next = prev.filter(p => p.slug !== slug)
      save(POSTS_KEY, next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    save(POSTS_KEY, defaultPosts)
    setPosts(defaultPosts)
  }, [])

  return { posts, update, add, remove, reset }
}

// Hook to export current state as JSON for deployment
export function useExport(products, posts) {
  const exportData = useCallback(() => {
    const productsCode = `export const products = ${JSON.stringify(products, null, 2)}\n`
    const postsCode    = `export const posts = ${JSON.stringify(posts, null, 2)}\n`
    return { productsCode, postsCode }
  }, [products, posts])

  return { exportData }
}
