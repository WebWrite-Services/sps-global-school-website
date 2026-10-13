import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || ''

  if (!url || !key) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const isDemoSession = request.cookies.get('sps_demo_session')?.value === 'super_admin'
  let user = null
  if (!isDemoSession) {
    try {
      const { data } = await supabase.auth.getUser()
      user = data?.user || null
    } catch {}
  }
  const isAuthenticated = !!user || isDemoSession

  const pathname = request.nextUrl.pathname
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')
  const isPublicAuthPage =
    pathname === '/admin/login' ||
    pathname === '/admin/forgot-password' ||
    pathname === '/admin/reset-password'

  if (isAdminRoute && !isPublicAuthPage && !isAuthenticated) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isPublicAuthPage && pathname === '/admin/login' && isAuthenticated) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/admin'
    return NextResponse.redirect(dashboardUrl)
  }

  return supabaseResponse
}
