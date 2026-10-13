import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import BannersManager from '@/components/admin/BannersManager'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Homepage Banners' }

export default async function BannersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: banners } = await supabase
    .from('homepage_banners')
    .select('*')
    .order('display_order')

  return (
    <AdminShell title="Homepage Banners">
      <BannersManager initialBanners={banners ?? []} uploadedBy={user.id} />
    </AdminShell>
  )
}
