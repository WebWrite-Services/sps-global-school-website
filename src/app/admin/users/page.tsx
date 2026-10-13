import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import UsersManager from '@/components/admin/UsersManager'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = { title: 'Users & Roles' }

export default async function UsersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'super_admin') redirect('/admin')

  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminShell title="Users & Roles">
      <UsersManager initialUsers={users ?? []} currentUserId={user.id} />
    </AdminShell>
  )
}
