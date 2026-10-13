import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createDemoClient } from './demo'

export async function createClient() {
  const cookieStore = await cookies()

  if (cookieStore.get('sps_demo_session')?.value === 'super_admin') {
    return createDemoClient()
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || ''

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from Server Component — can be safely ignored if middleware refreshes sessions
          }
        },
      },
    }
  )
}
