import { createClient } from '@supabase/supabase-js'

const url = (import.meta.env.VITE_SUPABASE_URL ?? '').trim()
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').replace(/\s+/g, '')

export const supabaseConfigured = Boolean(url && key)
export const supabase = createClient(
  url || 'https://configuration-required.supabase.co',
  key || 'configuration-required',
)
