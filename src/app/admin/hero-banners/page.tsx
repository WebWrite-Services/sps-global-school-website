import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import HeroBannersManager from '@/components/admin/HeroBannersManager'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Hero Banners' }

export default async function HeroBannersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: banners } = await supabase
    .from('hero_banners')
    .select('*')
    .order('display_order')

  return (
    <AdminShell title="Hero Banners">
      <HeroBannersManager initialBanners={banners ?? []} uploadedBy={user.id} />
    </AdminShell>
  )
}
