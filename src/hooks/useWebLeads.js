import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

export async function createWebLead(lead) {
  return supabase.from('web_service_leads').insert(lead)
}

export function useWebLeads(enabled = true) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const reload = useCallback(async () => {
    if (!enabled) return
    setLoading(true)
    const { data, error: queryError } = await supabase.from('web_service_leads').select('*').order('created_at', { ascending: false })
    setLeads(data ?? []); setError(queryError?.message ?? null); setLoading(false)
  }, [enabled])
  useEffect(() => { reload() }, [reload])
  const update = useCallback(async (id, values) => {
    const { error: updateError } = await supabase.from('web_service_leads').update(values).eq('id', id)
    if (!updateError) await reload()
    return updateError
  }, [reload])
  return { leads, loading, error, reload, update }
}
