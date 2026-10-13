import { createBrowserClient } from '@supabase/ssr'
import { createDemoClient } from './demo'

export function createClient() {
  if (typeof document !== 'undefined' && document.cookie.includes('sps_demo_session=super_admin')) {
    return createDemoClient()
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
  return createBrowserClient(url, key)
}
