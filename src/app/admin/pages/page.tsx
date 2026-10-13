import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import PagesManager from '@/components/admin/PagesManager'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Website Pages' }

export default async function PagesAdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: pages } = await supabase
    .from('school_pages')
    .select('*')
    .order('title')

  return (
    <AdminShell title="Website Pages">
      <PagesManager initialPages={pages ?? []} updatedBy={user.id} />
    </AdminShell>
  )
}
