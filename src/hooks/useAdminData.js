// Thin re-export — all public pages (Components, Wrappers, Blog, BlogPost)
// import from here so we only need to change the source in one place.
export { useProducts as useAdminProducts, usePosts as useAdminPosts } from './useSupabaseData.js'
